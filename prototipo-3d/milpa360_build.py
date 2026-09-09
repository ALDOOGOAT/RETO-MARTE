# MILPA-360 - modelo 3D procedural  |  BioMars Chiapas / Mars Challenge 2026
# uso: blender --background --python milpa360_build.py
import bpy, math, os, sys
from mathutils import Vector

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fotos-para-subir")
BLEND = os.path.join(os.path.dirname(os.path.abspath(__file__)), "MILPA-360.blend")
os.makedirs(OUT, exist_ok=True)
TAU = math.tau

# ---------------------------------------------------------------- limpieza
bpy.ops.wm.read_factory_settings(use_empty=True)
S = bpy.context.scene

# ---------------------------------------------------------------- materiales
def mat(name, rgb, rough=.6, metal=0., emit=0.):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*rgb, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if emit:
        b.inputs["Emission Color"].default_value = (*rgb, 1)
        b.inputs["Emission Strength"].default_value = emit
    return m

def hx(h):
    h = h.lstrip('#'); return tuple((int(h[i:i+2], 16)/255)**2.2 for i in (0, 2, 4))

M = {
 'deck':    mat('deck',    hx('2f3138'), .45, .70),
 'column':  mat('column',  hx('4a4d55'), .40, .80),
 'regolito':mat('regolito',hx('8a4a2c'), .95),
 'lavado':  mat('lavado',  hx('7b7d84'), .85),
 'estier':  mat('estier',  hx('5c4326'), .95),
 'larva':   mat('larva',   hx('c9a24b'), .70),
 'musgo':   mat('musgo',   hx('4f8f3a'), .90),
 'sustrato':mat('sustrato',hx('6b4a30'), .95),
 'tray':    mat('tray',    hx('9aa0a6'), .35, .85),
 'frame':   mat('frame',   hx('d0d4d8'), .30, .90),
 'ave':     mat('ave',     hx('c2ad93'), .80),
 'digA':    mat('digA',    hx('2f7d8f'), .35, .55),
 'digB':    mat('digB',    hx('c1440e'), .35, .55),
 'tubo':    mat('tubo',    hx('8f959b'), .35, .90),
 'mfc':     mat('mfc',     hx('ff3b30'), .30, 0., 6.),
 'txt':     mat('txt',     hx('f2ece6'), .50, 0., 1.4),
 'planta1': mat('planta1', hx('3f7a2e'), .90),
 'planta2': mat('planta2', hx('5aa03c'), .90),
 'raiz':    mat('raiz',    hx('b4552d'), .90),
 'suelo':   mat('suelo',   hx('6d3a22'), 1.0),
 'flecha':  mat('flecha',  hx('ffb340'), .40, 0., 2.0),
}

def put(o, m, parent=None):
    o.data.materials.append(M[m])
    if parent: o.parent = parent
    return o

def cyl(r, d, loc, m, rot=(0,0,0), v=48, parent=None):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d, location=loc, rotation=rot, vertices=v)
    return put(bpy.context.object, m, parent)

def box(s, loc, m, rot=(0,0,0), parent=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.object; o.scale = s
    return put(o, m, parent)

def sph(r, loc, m, s=(1,1,1), parent=None):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, location=loc, segments=24, ring_count=12)
    o = bpy.context.object; o.scale = s
    bpy.ops.object.shade_smooth()
    return put(o, m, parent)

def cone(r, d, loc, m, rot=(0,0,0), parent=None):
    bpy.ops.mesh.primitive_cone_add(radius1=r, depth=d, location=loc, rotation=rot, vertices=20)
    return put(bpy.context.object, m, parent)

def label(txt, loc, m='txt', size=.115, rotz=0, parent=None):
    if math.cos(rotz) < -1e-6: rotz += math.pi   # evita texto espejeado en vista de planta
    bpy.ops.object.text_add(location=loc, rotation=(0, 0, rotz))
    o = bpy.context.object
    o.data.body = txt; o.data.size = size; o.data.align_x = 'CENTER'
    o.data.align_y = 'CENTER'; o.data.extrude = .004
    return put(o, m, parent)

# ---------------------------------------------------------------- base fija
cyl(2.95, .12, (0, 0, .70), 'deck')                 # plataforma
cyl(2.98, .05, (0, 0, .63), 'column')               # borde
cyl(.34, .70, (0, 0, .35), 'column')                # columna central
cyl(.55, .06, (0, 0, .78), 'column')                # buje del eje
cyl(1.58, .012, (0, 0, .757), 'column')             # banda separadora de anillos
cyl(2.14, .012, (0, 0, .757), 'column')

# empties: las estaciones NO giran, el sustrato SI
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, 0, 0)); E_IN  = bpy.context.object; E_IN.name  = 'ANILLO_INTERIOR'
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, 0, 0)); E_OUT = bpy.context.object; E_OUT.name = 'ANILLO_EXTERIOR'

# ---------------------------------------------------------------- anillo interior (8 bandejas)
R1, N1 = 1.28, 8
ESTADO = ['lavado', 'estier', 'larva', 'sustrato', 'musgo', 'sustrato', 'sustrato', 'sustrato']
for i in range(N1):
    a = i * TAU / N1
    x, y = R1*math.cos(a), R1*math.sin(a)
    box((.50, .50, .10), (x, y, .82), 'tray', rot=(0, 0, a), parent=E_IN)      # bandeja
    box((.43, .43, .07), (x, y, .875), ESTADO[i], rot=(0, 0, a), parent=E_IN)  # sustrato
    if i == 2:  # larvas visibles
        for k in range(9):
            aa = a + (k % 3 - 1)*.09; rr = R1 + (k//3 - 1)*.13
            sph(.028, (rr*math.cos(aa), rr*math.sin(aa), .925), 'larva', s=(2.2, 1, .8), parent=E_IN)
    if i == 4:  # costra de musgo
        for k in range(7):
            aa = a + (k % 4 - 1.5)*.075; rr = R1 + (k//4 - .5)*.16
            sph(.055, (rr*math.cos(aa), rr*math.sin(aa), .915), 'musgo', s=(1, 1, .35), parent=E_IN)

# ---------------------------------------------------------------- anillo exterior (12 bandejas)
R2, N2 = 2.42, 12
for i in range(N2):
    a = i * TAU / N2
    x, y = R2*math.cos(a), R2*math.sin(a)
    box((.62, .62, .10), (x, y, .82), 'tray', rot=(0, 0, a), parent=E_OUT)
    box((.54, .54, .07), (x, y, .875), 'suelo', rot=(0, 0, a), parent=E_OUT)
    t = i / (N2 - 1)                       # desfase: cada bandeja en otra etapa
    if i == 0:
        label('COSECHADA', (x, y, .93), 'txt', .075, a + math.pi/2, parent=E_OUT)
    else:
        h = .06 + t*.55
        # camote (raiz profunda) - leguminosa - rabano
        cone(.055, h, (x + .16*math.cos(a+1.4), y + .16*math.sin(a+1.4), .91 + h/2), 'planta1', parent=E_OUT)
        cone(.045, h*.8, (x - .14*math.cos(a+1.4), y - .14*math.sin(a+1.4), .91 + h*.4), 'planta2', parent=E_OUT)
        sph(.05, (x, y, .93), 'raiz', s=(1, 1, .6), parent=E_OUT)
        if h > .3:
            sph(.07, (x + .05, y + .05, .93 + h*.55), 'planta2', s=(1, 1, .7), parent=E_OUT)

# ---------------------------------------------------------------- aviario (estacion fija S2)
aA = TAU / N1                        # angulo de S2
ax, ay = R1*math.cos(aA), R1*math.sin(aA)
for dx, dy in ((.30, .30), (-.30, .30), (.30, -.30), (-.30, -.30)):
    cyl(.022, .85, (ax+dx, ay+dy, 1.40), 'frame')
cyl(.42, .04, (ax, ay, 1.83), 'frame')
for k in range(12):                                       # barrotes de la jaula
    bk = k*TAU/12
    cyl(.012, .78, (ax+.40*math.cos(bk), ay+.40*math.sin(bk), 1.42), 'frame')
cyl(.41, .025, (ax, ay, 1.79), 'frame')                   # aro superior
cyl(.41, .025, (ax, ay, 1.05), 'frame')                   # aro inferior
box((.66, .66, .02), (ax, ay, 1.00), 'frame')             # rejilla de caida
for k, (dx, dy) in enumerate(((.13, .10), (-.11, .14), (.02, -.15), (-.16, -.06))):
    sph(.075, (ax+dx, ay+dy, 1.13), 'ave', s=(1.5, 1, 1))
    sph(.038, (ax+dx+.10, ay+dy, 1.20), 'ave')
for k in range(6):                                        # estiercol cayendo
    sph(.018, (ax + (k%3-1)*.11, ay + (k//3-.5)*.13, 1.03 - k*.005), 'estier')

# ---------------------------------------------------------------- biodigestor (base, fijo)
DX, DY = 0., -3.95
cyl(.52, .95, (DX-.62, DY, .48), 'digA')
cyl(.52, .95, (DX+.62, DY, .48), 'digB')
cyl(.54, .05, (DX-.62, DY, .97), 'tubo'); cyl(.54, .05, (DX+.62, DY, .97), 'tubo')
cyl(.075, 1.24, (DX, DY, .78), 'tubo', rot=(0, math.pi/2, 0))          # A -> B
cyl(.062, 1.30, (DX+.62, DY+.68, 1.02), 'tubo', rot=(math.pi/2, 0, 0))     # biogas -> deck
cyl(.062, 1.30, (DX-.62, DY+.68, .58), 'tubo', rot=(math.pi/2, 0, 0))      # salmuera <- S1
cyl(.062, .48, (DX+.62, DY+1.30, 1.02), 'tubo', rot=(0, 0, 0))
label('BIOGAS', (DX+1.02, DY+.70, 1.16), 'txt', .085)
label('SALMUERA CIO4-', (DX-1.28, DY+.70, .72), 'txt', .085)
sph(.30, (DX+.62, DY, 1.20), 'digB', s=(1, 1, .55))                    # campana de gas
label('A  ANOXICA', (DX-.62, DY-.56, .60), 'txt', .105)
label('CIO4- - CI- + O2', (DX-.62, DY-.56, .44), 'txt', .080)
label('B  METANOGENICA', (DX+.62, DY-.56, .60), 'txt', .105)
label('BIOGAS + DIGESTATO', (DX+.62, DY-.56, .44), 'txt', .080)
label('BIODIGESTOR DE DOS CAMARAS', (DX, DY-.95, .05), 'txt', .17)

# ---------------------------------------------------------------- etiquetas de estacion (fijas)
EST = ['S1 LAVADO', 'S2 CODORNIZ', 'S3 LARVAS', 'S4 DESCANSO',
       'S5 MUSGO', 'S6 SIEMBRA', 'S7 CRECIMIENTO', 'S8 COSECHA']
for i, t in enumerate(EST):
    a = i * TAU / N1
    label(t, (1.86*math.cos(a), 1.86*math.sin(a), .805), 'txt', .132, a + math.pi/2)
    ab = a + TAU/16
    cone(.045, .15, (1.86*math.cos(ab), 1.86*math.sin(ab), .81), 'flecha',
         rot=(math.pi/2, 0, ab + math.pi))                     # sentido de giro

# sensores MFC
for lx, ly, lz in ((ax, ay-.55, .95), (DX+.10, DY+1.25, 1.05), (R2-.30, .35, .95)):
    sph(.055, (lx, ly, lz), 'mfc')

label('MILPA-360', (0, 3.92, .06), 'txt', .38)
label('BioMars Chiapas  -  Mars Challenge 2026', (0, 3.58, .06), 'txt', .15)

label('ANILLO INTERIOR - 8 BANDEJAS - REGENERACION DE SUELO', (0, 3.30, .06), 'txt', .128)
label('ANILLO EXTERIOR - 12 BANDEJAS - CULTIVO ESCALONADO', (0, 3.10, .06), 'txt', .128)

# ---------------------------------------------------------------- suelo marciano
bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 0, -.02))
put(bpy.context.object, 'regolito')

# ---------------------------------------------------------------- luces y mundo
w = bpy.data.worlds.new('W'); S.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs[0].default_value = (.045, .035, .030, 1)
w.node_tree.nodes['Background'].inputs[1].default_value = 1.1

def light(t, loc, e, size=4., rot=(0,0,0)):
    d = bpy.data.lights.new('L', type=t); d.energy = e
    if t == 'AREA': d.size = size
    o = bpy.data.objects.new('L', d); o.location = loc; o.rotation_euler = rot
    S.collection.objects.link(o); return o

light('AREA', (5.5, -5.5, 7.0), 2600, 7, (math.radians(38), 0, math.radians(45)))
light('AREA', (-6.0, -3.0, 5.0), 1100, 6, (math.radians(45), 0, math.radians(-55)))
light('AREA', (0, 6.5, 4.5), 900, 6, (math.radians(-50), 0, 0))
light('POINT', (0, 0, 2.6), 220)

# ---------------------------------------------------------------- render
eng = [i.identifier for i in S.render.bl_rna.properties['engine'].enum_items]
S.render.engine = 'BLENDER_EEVEE_NEXT' if 'BLENDER_EEVEE_NEXT' in eng else ('BLENDER_EEVEE' if 'BLENDER_EEVEE' in eng else 'CYCLES')
if S.render.engine == 'CYCLES':
    S.cycles.samples = 48; S.cycles.use_denoising = True
else:
    try: S.eevee.taa_render_samples = 64
    except Exception: pass
S.render.resolution_x, S.render.resolution_y = 1920, 1080
S.render.film_transparent = False
S.view_settings.look = 'AgX - Medium High Contrast' if 'AgX - Medium High Contrast' in [l.name for l in S.view_settings.bl_rna.properties['look'].enum_items] else 'None'
print('MOTOR:', S.render.engine)

cam_d = bpy.data.cameras.new('C'); CAM = bpy.data.objects.new('CAM', cam_d)
S.collection.objects.link(CAM); S.camera = CAM
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, -.2, .9)); TGT = bpy.context.object
c = CAM.constraints.new('TRACK_TO'); c.target = TGT; c.track_axis = 'TRACK_NEGATIVE_Z'; c.up_axis = 'UP_Y'

def shot(name, loc, lens=45):
    CAM.location = loc; cam_d.lens = lens
    S.render.filepath = os.path.join(OUT, name)
    bpy.ops.render.render(write_still=True)
    print('  ->', name)

SHOTS = [
 ('01-vista-general',        (7.6, -8.4, 5.6), 46),
 ('02-planta-los-dos-anillos',(0.02, -0.3, 17.0), 40),
 ('03-detalle-aviario-codornices', (2.5, -2.9, 2.5), 62),
 ('04-detalle-biodigestor',  (2.4, -7.4, 2.0), 62),
 ('05-vista-frontal',        (0.0, -11.0, 3.2), 50),
 ('06-vista-lateral-desfase',(10.0, 0.6, 3.4), 48),
 ('07-picado-tres-cuartos',  (-7.0, -7.6, 7.4), 46),
]
for n, l, f in SHOTS: shot(n, l, f)


def _fcurves(action):
    """Blender <4.4 expone action.fcurves; 5.x lo mueve a layers/strips/channelbags."""
    if hasattr(action, 'fcurves') and len(getattr(action, 'fcurves', [])):
        return list(action.fcurves)
    out = []
    for layer in getattr(action, 'layers', []):
        for strip in getattr(layer, 'strips', []):
            bags = getattr(strip, 'channelbags', None)
            if bags is None and hasattr(strip, 'channelbag'):
                bags = [strip.channelbag(s) for s in action.slots]
            for cb in (bags or []):
                out.extend(cb.fcurves)
    return out

# ------------------------------------------------- proceso (para Documento Concepto)
_final_engine = S.render.engine
try:
    S.render.engine = 'BLENDER_WORKBENCH'
    sh = S.display.shading
    sh.light = 'STUDIO'; sh.color_type = 'SINGLE'; sh.single_color = (.72, .74, .78)
    sh.show_object_outline = True
    shot('08-proceso-modelo-arcilla', (7.6, -8.4, 5.6), 46)
    sh.type = 'WIREFRAME'
    shot('09-proceso-estructura-alambre', (7.6, -8.4, 5.6), 46)
    sh.type = 'SOLID'
except Exception as e:
    print('proceso omitido:', e)
S.render.engine = _final_engine

# ---------------------------------------------------------------- animacion: giran los anillos
FR = 96
S.frame_start, S.frame_end = 1, FR
for E, vueltas in ((E_IN, 1.0), (E_OUT, 1.0)):
    E.rotation_euler = (0, 0, 0); E.keyframe_insert('rotation_euler', frame=1)
    E.rotation_euler = (0, 0, TAU*vueltas); E.keyframe_insert('rotation_euler', frame=FR)
    for fc in _fcurves(E.animation_data.action):
        for kp in fc.keyframe_points: kp.interpolation = 'LINEAR'

CAM.location = (7.0, -7.8, 5.2); cam_d.lens = 46
S.render.resolution_x, S.render.resolution_y = 1280, 720
if S.render.engine == 'CYCLES': S.cycles.samples = 24
S.render.image_settings.file_format = 'PNG'
S.render.filepath = os.path.join(OUT, 'anim', 'f')
bpy.ops.render.render(animation=True)

# ---------------------------------------------------------------- guardar
bpy.ops.wm.save_as_mainfile(filepath=BLEND)
print('LISTO ->', BLEND)
