# Rocketbox FBX (MIT) -> GLB con un clip por pista NLA. Lo llama preparar_tripulacion.py:
#   blender -b --factory-startup -P rocketbox_a_glb.py -- salida.glb avatar.fbx nombre=anim.fbx[:ultimo_fotograma] ...
# Sólo geometría, esqueleto y animación: las texturas las pone el visor por nombre de material.
import bpy, re, sys

args = sys.argv[sys.argv.index('--') + 1:]
salida, avatar = args[0], args[1]
clips = []
for a in args[2:]:
    nombre, f = a.split('=', 1)
    tope = None
    if re.search(r':\d+$', f):
        f, tope = f.rsplit(':', 1)
        tope = int(tope)
    clips.append((nombre, f, tope))

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.context.scene.render.fps = 30

def importar(f):
    objs, acts = set(bpy.data.objects), set(bpy.data.actions)
    bpy.ops.import_scene.fbx(filepath=f)
    return [o for o in bpy.data.objects if o not in objs], [a for a in bpy.data.actions if a not in acts]

def curvas(act):
    if getattr(act, 'fcurves', None) is not None and len(act.fcurves):
        return [(act.fcurves, c) for c in act.fcurves]
    return [(cb.fcurves, c) for l in act.layers for st in l.strips for cb in st.channelbags for c in cb.fcurves]

objs, _ = importar(avatar)
arm = next(o for o in objs if o.type == 'ARMATURE')
for o in objs:
    if o.type == 'EMPTY':
        bpy.data.objects.remove(o)
for a in list(bpy.data.actions):
    bpy.data.actions.remove(a)
arm.animation_data_create()
# Los huesos faciales no se animan en estos clips: fuera, igual que escala y traslaciones fijas.
FACIAL = ('Eye', 'Jaw', 'Lip', 'Tongue', 'Mouth', 'Masseter', 'Caninus', 'Cheek', 'Eyebrow', 'Nose')

bpy.context.view_layer.objects.active = arm
for nombre, f, tope in clips:
    nuevos, acts = importar(f)
    fuente = next(o for o in nuevos if o.type == 'ARMATURE')
    ini, fin = (int(v) for v in next(a for a in acts if 'Footsteps' not in a.name).frame_range)
    fin = min(fin, tope or fin)
    # Cada FBX de animación trae su propia pose de reposo: se copia la pose en espacio mundo
    # y se hornea sobre el reposo del avatar (retarget exacto, mismo esqueleto Biped).
    for pb in arm.pose.bones:
        if pb.name not in fuente.pose.bones or any(k in pb.name for k in FACIAL):
            continue
        c = pb.constraints.new('COPY_ROTATION'); c.target = fuente; c.subtarget = pb.name
        if pb.name == 'Bip01 Pelvis':
            c = pb.constraints.new('COPY_LOCATION'); c.target = fuente; c.subtarget = pb.name
    arm.select_set(True)
    bpy.ops.object.mode_set(mode='POSE')
    bpy.ops.pose.select_all(action='SELECT')
    r = bpy.ops.nla.bake(frame_start=ini, frame_end=fin, only_selected=False, visual_keying=True,
                     clear_constraints=True, clear_parents=False, use_current_action=False, bake_types={'POSE'})
    bpy.ops.object.mode_set(mode='OBJECT')
    act = arm.animation_data.action
    assert r == {'FINISHED'} and act, 'horneado fallido'
    act.name = nombre
    act.use_fake_user = True
    for o in nuevos:
        bpy.data.objects.remove(o)
    for a in acts:
        bpy.data.actions.remove(a)
    for coleccion, c in curvas(act):
        m = re.match(r'pose\.bones\["(.+)"\]\.(\w+)', c.data_path)
        if m and (m.group(2) == 'scale' or (m.group(2) == 'location' and m.group(1) != 'Bip01 Pelvis')
                  or any(k in m.group(1) for k in FACIAL)):
            coleccion.remove(c)
    pista = arm.animation_data.nla_tracks.new()
    pista.name = nombre
    tira = pista.strips.new(nombre, ini, act)
    if hasattr(tira, 'action_slot') and len(getattr(act, 'slots', [])):
        tira.action_slot = act.slots[0]
    arm.animation_data.action = None
    print('CLIP', nombre, ini, fin)

arm.animation_data.action = None
for m in bpy.data.materials:
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    nt.links.new(nt.nodes.new('ShaderNodeBsdfPrincipled').outputs[0], nt.nodes.new('ShaderNodeOutputMaterial').inputs[0])

bpy.ops.export_scene.gltf(filepath=salida, export_format='GLB', export_animation_mode='NLA_TRACKS',
    export_image_format='NONE', export_force_sampling=True, export_optimize_animation_size=True,
    export_morph=False, export_tangents=False, export_extras=False, export_cameras=False, export_lights=False)
print('OK', salida)
