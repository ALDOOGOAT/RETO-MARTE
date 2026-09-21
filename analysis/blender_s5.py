"""Blender: importar la escena Three evaluada, cotejar cotas y exportar GLB/BLEND.

MILPA_EXPORT_GLB=1 node --experimental-websocket analysis/verificar_p3_navegador.mjs
blender -b --python analysis/blender_s5.py
Mallas de visualización; no CAD, análisis resistente ni diseño de equipos aprobado.
"""
import base64, hashlib, json, math, os
from pathlib import Path
import bpy
from mathutils import Matrix, Vector

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'outputs/madrid-s5'
exterior = os.environ.get('MILPA_EXTERIOR') == '1'
entrada = 'escena-exterior.json' if exterior else 'escena-three.json'
nombre = 'MILPA360-EXTERIOR-V4' if exterior else 'MILPA360-S5'
render_name = 'blender-exterior-V4.png' if exterior else 'blender-S5.png'
data = json.loads((OUT / entrada).read_text())
geom = json.loads((ROOT / 'config/milpa360.geometria.json').read_text())
assert data['parametros']['casco'] == geom['casco']
assert data['parametros']['anillo']['n'] == geom['anillo']['n']
# Se ejecuta en proceso background independiente; no borra la escena abierta del usuario.
scene = bpy.data.scenes.new('MILPA360_S5')
bpy.context.window.scene = scene
scene['estado'] = 'Visualización nominal. B15-B19 pendientes. No ensayos físicos.'
scene['fuente'] = 'config/milpa360.parameters.json + escena Three160 evaluada'
scene['revision'] = 'V4 visual / ' + geom['_fuente']
scene.unit_settings.system = 'METRIC'
scene.unit_settings.scale_length = 1
materials, meshes = {}, {}
for key, value in data['materiales'].items():
    mat = bpy.data.materials.new('Material-' + key[:8]); mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value = (*value['color'], 1)
    bsdf.inputs['Metallic'].default_value = value['metal']
    bsdf.inputs['Roughness'].default_value = value['rough']
    # Transparencia de la representación, sin transmisión ni vidrio refractivo.
    bsdf.inputs['Alpha'].default_value = value['alpha']
    tex = data['texturas'].get(value.get('map'))
    if tex:
        p = OUT / ('tex-' + value['map'] + '.png')
        p.write_bytes(base64.b64decode(tex['png'].split(',', 1)[1]))
        img = bpy.data.images.load(str(p), check_existing=True); img.pack()
        node = mat.node_tree.nodes.new('ShaderNodeTexImage'); node.image = img
        coord = mat.node_tree.nodes.new('ShaderNodeTexCoord')
        mapping = mat.node_tree.nodes.new('ShaderNodeVectorMath'); mapping.operation = 'MULTIPLY'
        mapping.inputs[1].default_value = (*tex['repeat'], 1)
        mat.node_tree.links.new(coord.outputs['UV'], mapping.inputs[0])
        mat.node_tree.links.new(mapping.outputs['Vector'], node.inputs['Vector'])
        tint = mat.node_tree.nodes.new('ShaderNodeMixRGB'); tint.blend_type='MULTIPLY'
        tint.inputs[0].default_value=1; tint.inputs[2].default_value=(*value['color'],1)
        mat.node_tree.links.new(node.outputs['Color'],tint.inputs[1])
        mat.node_tree.links.new(tint.outputs[0], bsdf.inputs['Base Color'])
    materials[key] = mat
for key, value in data['geometrias'].items():
    vertices = list(zip(*[iter(value['pos'])]*3))
    index = value['index'] if value['index'] is not None else list(range(len(vertices)))
    faces = list(zip(*[iter(index)]*3))
    mesh = bpy.data.meshes.new('Malla-' + key[:8]); mesh.from_pydata(vertices, [], faces)
    if value['uv']:
        layer = mesh.uv_layers.new(name='UVMap')
        for loop in mesh.loops:
            i = loop.vertex_index*2
            layer.data[loop.index].uv = value['uv'][i:i+2]
    mesh.update()
    if value.get('normales'):
        for polygon in mesh.polygons: polygon.use_smooth = True
        mesh.normals_split_custom_set_from_vertices(list(zip(*[iter(value['normales'])]*3)))
    meshes[key] = mesh
rotation = Matrix.Rotation(math.pi/2, 4, 'X')
for value in data['objetos']:
    # Material por objeto: las instancias pueden compartir malla con diferentes tintes.
    mesh = meshes[value['geometria']]
    obj = bpy.data.objects.new(value['nombre'], mesh); scene.collection.objects.link(obj)
    if not mesh.materials: mesh.materials.append(materials[value['material']])
    obj.material_slots[0].link = 'OBJECT'; obj.material_slots[0].material = materials[value['material']]
    m = value['matrix']; obj.matrix_world = rotation @ Matrix([[m[c*4+r] for c in range(4)] for r in range(4)])
    obj['tipo'] = 'Malla de visualización Three160'
floor = next(o for o in scene.objects if o.name.startswith('piso-modulo'))
bpy.context.view_layer.update()
points = [floor.matrix_world @ Vector(p) for p in floor.bound_box]
min_z, max_z = min(p.z for p in points), max(p.z for p in points)
assert abs(max_z - geom['casco']['piso']) < 1e-5
assert abs(floor.dimensions.x - (geom['casco']['diametro']-.10)) < 1e-5

world = bpy.data.worlds.new('Fondo editorial'); world.use_nodes = True
world.node_tree.nodes['Background'].inputs[0].default_value = (.18,.23,.27,1)
world.node_tree.nodes['Background'].inputs[1].default_value = .35; scene.world = world
def area(name, location, energy, color, size):
    lamp = bpy.data.lights.new(name, 'AREA'); lamp.energy=energy; lamp.color=color; lamp.shape='DISK'; lamp.size=size
    obj=bpy.data.objects.new(name,lamp);scene.collection.objects.link(obj);obj.location=location
    obj.rotation_euler=(Vector((0,0,1))-obj.location).to_track_quat('-Z','Y').to_euler()
area('Luz principal', (3,4,7), 1400, (1,.84,.70),5)
area('Relleno frío', (-4,1,5), 1000, (.62,.80,1),4)
area('Borde', (0,-4,6), 1700, (1,.71,.45),3)
camera=bpy.data.objects.new('Camara-S5',bpy.data.cameras.new('Camara-S5'))
scene.collection.objects.link(camera);camera.location=(7.5,5.4,6.4)
camera.rotation_euler=(Vector((0,0,.9))-camera.location).to_track_quat('-Z','Y').to_euler()
camera.data.type='ORTHO';camera.data.ortho_scale=8.4;scene.camera=camera
scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=True
try:
    devices=bpy.context.preferences.addons['cycles'].preferences
    devices.compute_device_type='OPTIX';devices.get_devices()
    for device in devices.devices: device.use=device.type=='OPTIX'
    if any(d.use for d in devices.devices): scene.cycles.device='GPU'
except (TypeError, RuntimeError):
    scene.cycles.device='CPU'
scene.render.resolution_x=1920;scene.render.resolution_y=1440;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.filepath=str(OUT/render_name)
scene.view_settings.view_transform='AgX'
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/(nombre+'.blend')),compress=True)
# GLB reimportado en una escena aparte: comprueba tamaño del piso y recuento de mallas.
for obj in scene.objects: obj.select_set(obj.type=='MESH')
bpy.context.view_layer.objects.active=floor
bpy.ops.export_scene.gltf(filepath=str(OUT/(nombre+'.glb')),use_selection=True,use_active_scene=True,export_format='GLB',export_yup=True)
verify=bpy.data.scenes.new('Verificacion-GLB');bpy.context.window.scene=verify
bpy.ops.import_scene.gltf(filepath=str(OUT/(nombre+'.glb')))
floor2=next(o for o in verify.objects if o.name.startswith('piso-modulo'))
bpy.context.view_layer.update()
assert max(abs(a-b) for a,b in zip(floor.dimensions, floor2.dimensions)) < 1e-5
assert len([o for o in verify.objects if o.type=='MESH']) == len(data['objetos']), (len(verify.objects),len(data['objetos']))
report={'fuente_sha256':hashlib.sha256((OUT/entrada).read_bytes()).hexdigest(),
        'config_sha256':hashlib.sha256((ROOT/'config/milpa360.parameters.json').read_bytes()).hexdigest(),
        'revision_visual':'V4','blender':bpy.app.version_string,'render':scene.cycles.device,'sol':data['sol'],'mallas':len(data['objetos']),
        'piso_diametro_m':floor.dimensions.x,'piso_z_m':max_z,'base_piso_z_m':min_z,
        'reimportacion_glb':'recuento y dimensiones del piso coinciden a 1e-5 m',
        'limite':'Sólo mallas exportadas; no tolerancia física, resistencia ni interferencias completas.'}
(OUT/('VERIFICACION-EXTERIOR.json' if exterior else 'VERIFICACION-BLENDER.json')).write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
bpy.context.window.scene=scene
bpy.ops.render.render(write_still=True)
print(json.dumps(report,ensure_ascii=False))
