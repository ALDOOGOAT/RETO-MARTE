#!/usr/bin/env python3
"""P2 · Geometría paramétrica, interferencias y planos de MILPA-360 (arquitectura B).

Lee SOLO config/milpa360.parameters.json (fuente única) y lo valida contra su esquema.

    python3 analysis/milpa360_p2.py

Escribe tres cosas, todas derivadas de esos parámetros:

    config/milpa360.geometria.json        geometría resuelta que consumen simulador y planos
    prototipo/planos/P02-corte-transversal.html
    prototipo/planos/P03-planta-carrusel.html

Todo resultado es CÁLCULO. Una malla o una lámina NO son prueba de resistencia, de estanqueidad
ni de que el mecanismo funcione: son la geometría nominal dibujada a escala desde el JSON.
Las holguras verticales NO quedan verificadas: dependen de dos parámetros pendientes
(estaciones.altura_libre_bajo_equipo y estaciones.altura_dosel_maxima).
"""
import json, math, pathlib

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CFG = json.loads((RAIZ / "config" / "milpa360.parameters.json").read_text(encoding="utf-8"))
ESCENARIOS = ("conservador", "nominal", "favorable")
TAU = 2 * math.pi

# Separación mecánica mínima entre cartuchos vecinos. Es un criterio de P2, no una norma:
# por debajo de esto un roce de sustrato o una junta de riego dejan de ser tolerables.
GAP_MIN_MM = 20.0


def validar():
    try:
        import jsonschema
    except ImportError:
        return "SIN VALIDAR (pip install jsonschema)"
    esquema = json.loads((RAIZ / "config" / "milpa360.parameters.schema.json").read_text(encoding="utf-8"))
    jsonschema.validate(CFG, esquema)
    return "validado contra el esquema"


def v(ruta, esc="nominal"):
    g, k = ruta.split(".")
    p = CFG["parametros"][g][k]
    return p["escenarios"][esc] if "escenarios" in p else p["valor"]


def titulo(t):
    print(f"\n## {t}")


def linea(nombre, valor, unidad="", nota=""):
    print(f"  {nombre:<52}{valor:>14}  {unidad:<8}{nota}")


# ── Estaciones del ciclo (P1 §3.3). El orden ES la posición en el anillo. ──────────────────
ESTACIONES = [
    ("S1",  "Reacondicionamiento", "lavado de verificación; salmuera al reactor separado", "#8E9298"),
    ("S2",  "Aviario",             "deposición de estiércol de codorniz",                  "#C98A3C"),
    ("S3",  "Larvario",            "Hermetia illucens; sale frass y larva cosechada",      "#9C7B4A"),
    ("S4",  "Descanso + inóculo",  "cóctel microbiano",                                    "#7A6E5D"),
    ("S5",  "Cobertura de musgo",  "hipótesis antipolvo",                                  "#5C8A4A"),
    ("S6",  "Consolidación",       "sin intervención",                                     "#6B6B70"),
    ("S7",  "Muestreo",            "ClO₄⁻, conductividad y patógenos",                     "#B5502A"),
    ("S8",  "Compuerta de liberación", "pasa a cultivo o sale a cuarentena",               "#1D3F28"),
]
ESTACIONES += [(f"C{i}", "Cultivo", "luz fija y goteo sobre pivote", "#3F7A2E") for i in range(1, 13)]


def geometria():
    """Resuelve la arquitectura B a partir de los parámetros. Misma derivación que P1 §3.1."""
    assert v("arquitectura.seleccionada")["opcion"] == "B", \
        "milpa360_p2.py modela la arquitectura B; cambia el script si el equipo elige otra"

    r_casco = v("geometria_actual.r_casco")
    h_casco = v("geometria_actual.altura_casco")
    pared   = v("acceso.holgura_pared")
    alcance = v("acceso.alcance_desde_un_lado")
    pasillo = v("acceso.ancho_pasillo")
    hol     = v("geometria_actual.holgura_angular")
    hondo   = v("geometria_actual.profundidad_sustrato")
    cubierta = v("geometria_actual.altura_cubierta")
    caja    = v("arquitectura_b.altura_caja_cartucho")

    n   = v("arquitectura_b.n_cartuchos")
    nrg = v("arquitectura_b.n_regeneracion")
    ncu = v("arquitectura_b.n_cultivo")
    assert nrg + ncu == n, "las posiciones de regeneración y cultivo deben sumar el anillo"
    assert len(ESTACIONES) == n, "la lista de estaciones debe cubrir exactamente el anillo"

    r1 = r_casco - pared                 # borde exterior del cartucho
    r0 = r1 - alcance                    # borde interior: el ancho ES el alcance de un brazo
    r_eq = r0 - pasillo                  # radio máximo de los equipos centrales

    paso_ang = TAU / n                   # 18°
    sector   = paso_ang * hol            # arco útil del cartucho
    gap      = paso_ang - sector         # hueco angular entre cartuchos vecinos

    a_cart = 0.5 * sector * (r1**2 - r0**2)
    vol    = a_cart * hondo
    cuerda = 2 * r1 * math.sin(sector / 2)     # ancho máximo del cartucho, en su borde exterior

    return dict(
        r_casco=r_casco, h_casco=h_casco, r0=r0, r1=r1, r_eq=r_eq,
        pared=pared, alcance=alcance, pasillo=pasillo, hol=hol, hondo=hondo,
        cubierta=cubierta, caja=caja,
        n=n, n_regeneracion=nrg, n_cultivo=ncu,
        repuestos=v("arquitectura_b.cartuchos_repuesto"),
        paso_ang=paso_ang, sector=sector, gap=gap,
        area_cartucho=a_cart, area_total=a_cart * n,
        area_regeneracion=a_cart * nrg, area_cultivo=a_cart * ncu,
        volumen_cartucho=vol, cuerda=cuerda, ancho_radial=r1 - r0,
        soles_paso=v("geometria_actual.soles_por_paso"),
    )


def barrido(G, pasos_por_sol=1):
    """Recorre un giro y mide holguras entre cartuchos, casco y núcleo nominales.

    No modela la huella de los equipos fijos ni las interferencias verticales.
    """
    n, soles = G["n"], G["soles_paso"]
    total = n * soles * pasos_por_sol
    vecino = {"min": math.inf, "max": -math.inf}
    casco  = {"min": math.inf, "max": -math.inf}
    centro = {"min": math.inf, "max": -math.inf}

    for k in range(total):
        avance = k / (soles * pasos_por_sol)              # posiciones avanzadas
        for i in range(n):
            a_c = (i + avance) * G["paso_ang"]
            a1  = a_c + G["sector"] / 2                   # borde de salida de este cartucho
            a0_vecino = (i + 1 + avance) * G["paso_ang"] - G["sector"] / 2
            arco = (a0_vecino - a1) * G["r1"]             # el hueco es más estrecho por dentro,
            vecino["min"] = min(vecino["min"], arco)      # pero el roce se mide donde hay más
            vecino["max"] = max(vecino["max"], arco)      # velocidad tangencial: el borde exterior
            casco["min"]  = min(casco["min"],  G["r_casco"] - G["r1"])
            casco["max"]  = max(casco["max"],  G["r_casco"] - G["r1"])
            centro["min"] = min(centro["min"], G["r0"] - G["r_eq"])
            centro["max"] = max(centro["max"], G["r0"] - G["r_eq"])
    return dict(pasos=total, vecino=vecino, casco=casco, centro=centro)


def masas(G):
    return {e: G["volumen_cartucho"] * v("sustrato.densidad_aparente", e) for e in ESCENARIOS}


# ── Dibujo ────────────────────────────────────────────────────────────────────────────────
def pol(cx, cy, r, a):
    """Polar a cartesiano en coordenadas SVG (y hacia abajo, ángulo antihorario en pantalla)."""
    return cx + r * math.cos(a), cy - r * math.sin(a)


def sector_path(cx, cy, r0, r1, a0, a1, esc):
    x0, y0 = pol(cx, cy, r0 * esc, a0)
    x1, y1 = pol(cx, cy, r1 * esc, a0)
    x2, y2 = pol(cx, cy, r1 * esc, a1)
    x3, y3 = pol(cx, cy, r0 * esc, a1)
    grande = 1 if (a1 - a0) > math.pi else 0
    return (f"M{x0:.1f} {y0:.1f} L{x1:.1f} {y1:.1f} "
            f"A{r1 * esc:.1f} {r1 * esc:.1f} 0 {grande} 0 {x2:.1f} {y2:.1f} "
            f"L{x3:.1f} {y3:.1f} A{r0 * esc:.1f} {r0 * esc:.1f} 0 {grande} 1 {x0:.1f} {y0:.1f} Z")


def figura_humana(x, suelo, esc, alto=1.75):
    """Silueta de 1.75 m a escala. Da la referencia de tamaño que ninguna cota sustituye."""
    h = alto * esc
    cab, tor, pie = h * 0.13, h * 0.42, suelo
    return f"""<g fill="#23211d" opacity=".82">
<circle cx="{x:.0f}" cy="{pie - h + cab / 2:.0f}" r="{cab / 2:.1f}"/>
<path d="M{x - h * .085:.0f} {pie - h + cab:.0f} h{h * .17:.0f} v{tor:.0f} h-{h * .17:.0f} Z"/>
<path d="M{x - h * .085:.0f} {pie - h + cab + tor:.0f} l-{h * .015:.0f} {h * .45:.0f} h{h * .06:.0f} l{h * .04:.0f} -{h * .42:.0f} Z"/>
<path d="M{x + h * .085:.0f} {pie - h + cab + tor:.0f} l{h * .015:.0f} {h * .45:.0f} h-{h * .06:.0f} l-{h * .04:.0f} -{h * .42:.0f} Z"/>
<path d="M{x - h * .085:.0f} {pie - h + cab + h * .04:.0f} l-{h * .10:.0f} {h * .30:.0f} l{h * .045:.0f} {h * .02:.0f} l{h * .085:.0f} -{h * .27:.0f} Z"/>
<path d="M{x + h * .085:.0f} {pie - h + cab + h * .04:.0f} l{h * .10:.0f} {h * .30:.0f} l-{h * .045:.0f} {h * .02:.0f} l-{h * .085:.0f} -{h * .27:.0f} Z"/>
</g>
<text x="{x:.0f}" y="{pie + 18:.0f}" class="ts" text-anchor="middle">tripulante 1.75 m</text>"""


def cota_h(x0, x1, y, texto, clase="cota"):
    return (f'<path d="M{x0:.0f} {y:.0f} H{x1:.0f}" class="dim"/>'
            f'<path d="M{x0 + 6:.0f} {y - 6:.0f} l-6 6 l6 6 Z" fill="#b5502a"/>'
            f'<path d="M{x1 - 6:.0f} {y - 6:.0f} l6 6 l-6 6 Z" fill="#b5502a"/>'
            f'<text x="{(x0 + x1) / 2:.0f}" y="{y - 9:.0f}" class="{clase}" text-anchor="middle">{texto}</text>')


def barra_escala(x, y, esc, metros=2):
    """Escala gráfica. Sobrevive a cualquier reescalado del PNG; una razón «1:40» no."""
    p = [f'<text x="{x}" y="{y - 10}" class="ts">escala gráfica</text>']
    for k in range(metros):
        p.append(f'<rect x="{x + k * esc:.0f}" y="{y}" width="{esc:.0f}" height="9" '
                 f'fill="{"#23211d" if k % 2 == 0 else "#f6f2e9"}" stroke="#23211d" stroke-width="1"/>')
        p.append(f'<text x="{x + k * esc:.0f}" y="{y + 25}" class="ts" text-anchor="middle">{k}</text>')
    p.append(f'<text x="{x + metros * esc:.0f}" y="{y + 25}" class="ts" text-anchor="middle">{metros} m</text>')
    return "\n".join(p)


def cabecera(num, h1, h2, escala):
    return (f'<link rel="stylesheet" href="_estilo.css">\n<div class="marco"></div>\n'
            f'<div class="cab"><h1>{h1}</h1>\n<h2>{h2}</h2>\n'
            f'<div class="n"><b>{num}</b><span>{escala}</span></div></div>\n')


PIE = ('<div class="pie"><span>BioMars Chiapas</span><span>MILPA-360</span>'
       '<span>UNACH</span><span>Mars Challenge 2026</span></div>\n')

GENERADO = ("<b>Lámina generada</b> por <code>analysis/milpa360_p2.py</code> desde "
            "<code>config/milpa360.parameters.json</code>. No editar a mano: se sobrescribe. "
            "Geometría nominal a escala; <b>no es prueba estructural ni de estanqueidad</b>.")


def plano_p03(G, m_nom):
    """Planta del carrusel: un anillo de 20 cartuchos bajo estaciones fijas."""
    cx, cy, esc = 500, 408, 158.0                      # px/m
    W, H = 1520, 880
    s = [cabecera("P-03", "Planta del carrusel — arquitectura B",
                  f"Un anillo de {G['n']} cartuchos idénticos · estaciones fijas · pasillo central",
                  "ESC. GRÁFICA"),
         f'<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}">']

    # casco y pasillo
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{G["r_casco"] * esc:.1f}" fill="#e7e0d2" stroke="#23211d" stroke-width="3"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{(G["r_casco"] - G["pared"]) * esc:.1f}" fill="#f6f2e9" stroke="#8d8577" stroke-width="1"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{G["r0"] * esc:.1f}" fill="#f2ece0" stroke="#8d8577" stroke-width="1"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{G["r_eq"] * esc:.1f}" fill="#dfe8ea" stroke="#2f7d8f" stroke-width="1.8" stroke-dasharray="6 4"/>')
    s.append(f'<text x="{cx}" y="{cy + 36}" class="tb" text-anchor="middle" style="fill:#2f7d8f">EQUIPOS</text>')
    s.append(f'<text x="{cx}" y="{cy + 52}" class="ts" text-anchor="middle">Ø {2 * G["r_eq"]:.2f} m máx.</text>')
    s.append(f'<text x="{cx}" y="{cy + 68}" class="ts" text-anchor="middle">digestor + reactor</text>')

    # cartuchos. Medio paso de desfase: así el eje horizontal cae en un hueco entre cartuchos
    # y la cadena de cotas no cruza ninguna etiqueta de sector.
    for i, (cod, nom, _, color) in enumerate(ESTACIONES):
        a_c = i * G["paso_ang"] + math.pi / 2 + G["paso_ang"] / 2
        a0, a1 = a_c - G["sector"] / 2, a_c + G["sector"] / 2
        relleno = "#cdd9c6" if cod.startswith("C") else "#e6ddcb"
        s.append(f'<path d="{sector_path(cx, cy, G["r0"], G["r1"], a0, a1, esc)}" '
                 f'fill="{relleno}" stroke="#23211d" stroke-width="1.3"/>')
        tx, ty = pol(cx, cy, (G["r0"] + G["r1"]) / 2 * esc, a_c)
        s.append(f'<text x="{tx:.0f}" y="{ty + 4:.0f}" class="tb" text-anchor="middle">{cod}</text>')
        # marca de estación fija, por fuera del casco
        mx, my = pol(cx, cy, (G["r_casco"] + 0.12) * esc, a_c)
        s.append(f'<circle cx="{mx:.0f}" cy="{my:.0f}" r="5" fill="{color}"/>')

    # sentido de giro, dentro del pasillo
    rg = (G["r_eq"] + G["r0"]) / 2 * esc
    ax, ay = pol(cx, cy, rg, math.radians(26))
    bx, by = pol(cx, cy, rg, math.radians(74))
    s.append(f'<path d="M{ax:.0f} {ay:.0f} A{rg:.0f} {rg:.0f} 0 0 0 {bx:.0f} {by:.0f}" '
             f'class="dim" stroke-width="2.4"/>')
    px, py = pol(cx, cy, rg, math.radians(80))          # punta, sobre la tangente
    l1x, l1y = pol(cx, cy, rg + 8, math.radians(74))
    l2x, l2y = pol(cx, cy, rg - 8, math.radians(74))
    s.append(f'<path d="M{px:.0f} {py:.0f} L{l1x:.0f} {l1y:.0f} L{l2x:.0f} {l2y:.0f} Z" fill="#b5502a"/>')
    lx, ly = pol(cx, cy, rg - 30, math.radians(50))
    s.append(f'<text x="{lx:.0f}" y="{ly:.0f}" class="cota" text-anchor="middle">1 paso / {G["soles_paso"]} soles</text>')

    # tripulante en planta, en el pasillo, frente a la compuerta S8
    a_op = 7 * G["paso_ang"] + math.pi / 2 + G["paso_ang"] / 2
    ox, oy = pol(cx, cy, (G["r_eq"] + G["r0"]) / 2 * esc, a_op)
    s.append(f'<ellipse cx="{ox:.0f}" cy="{oy:.0f}" rx="{0.24 * esc:.0f}" ry="{0.15 * esc:.0f}" '
             f'transform="rotate({-a_op * 180 / math.pi:.0f} {ox:.0f} {oy:.0f})" '
             f'fill="#6a6155" stroke="#23211d" stroke-width="1.2" opacity=".55"/>')
    s.append(f'<text x="{ox - 6:.0f}" y="{oy + 44:.0f}" class="ts" text-anchor="middle">tripulante en S8</text>')

    # cotas encadenadas sobre el eje horizontal: hueco central + ancho del cartucho
    s.append(cota_h(cx - G["r0"] * esc, cx + G["r0"] * esc, cy, f"Ø {2 * G['r0']:.2f} m · hueco central"))
    s.append(cota_h(cx + G["r0"] * esc, cx + G["r1"] * esc, cy, f"{G['ancho_radial']:.2f} m"))
    yb = cy + G["r_casco"] * esc + 54
    s.append(cota_h(cx - G["r_casco"] * esc, cx + G["r_casco"] * esc, yb, f"Ø {2 * G['r_casco']:.2f} m · casco presurizado"))
    s.append(barra_escala(96, yb + 26, esc))

    # leyenda
    X = 1010
    s.append(f'<text x="{X}" y="46" class="tt">Ciclo de un cartucho · {G["n"] * G["soles_paso"]} soles</text>')
    y = 74
    for cod, nom, det, color in ESTACIONES[:8]:
        s.append(f'<rect x="{X}" y="{y - 10}" width="10" height="10" fill="{color}"/>')
        s.append(f'<text x="{X + 18}" y="{y}" class="tb">{cod} · {nom}</text>')
        s.append(f'<text x="{X + 18}" y="{y + 15}" class="ts">{det}</text>')
        y += 38
    s.append(f'<rect x="{X}" y="{y - 10}" width="10" height="10" fill="#3F7A2E"/>')
    s.append(f'<text x="{X + 18}" y="{y}" class="tb">C1–C{G["n_cultivo"]} · Cultivo</text>')
    s.append(f'<text x="{X + 18}" y="{y + 15}" class="ts">{G["n_cultivo"] * G["soles_paso"]} soles · camote, frijol y rábano</text>')
    y += 44
    s.append(f'<path d="M{X} {y - 8} H{W - 40}" stroke="#b9b1a2" stroke-width="1"/>')
    for k, val in (("Cartucho", f"{G['area_cartucho']:.3f} m² · {G['sector'] * 180 / math.pi:.1f}° · {G['ancho_radial']:.2f} m de ancho"),
                   ("Superficie de cultivo", f"{G['area_cultivo']:.2f} m² ({G['n_cultivo']} × {G['area_cartucho']:.3f})"),
                   ("Superficie de regeneración", f"{G['area_regeneracion']:.2f} m² ({G['n_regeneracion']} × {G['area_cartucho']:.3f})"),
                   ("Masa por cartucho (nominal)", f"{m_nom:.0f} kg · {m_nom * v('mision.gravedad_marte'):.0f} N en Marte"),
                   ("Descanso entre deposiciones", f"{(G['n'] - 1) * G['soles_paso']} soles")):
        y += 26
        s.append(f'<text x="{X}" y="{y}" class="t">{k}</text>')
        s.append(f'<text x="{W - 40}" y="{y}" class="t" text-anchor="end" style="font-weight:700">{val}</text>')

    s.append("</svg>")
    s.append(f'<div class="nota">{GENERADO}</div>')
    s.append(PIE)
    return "\n".join(s)


def plano_p02(G, m_nom):
    """Corte transversal: el anillo, el pasillo y la ruta de cambio de cartucho en S8."""
    esc = 158.0
    cx, suelo = 520, 640                                # suelo = cara interior del piso
    W, H = 1520, 820
    s = [cabecera("P-02", "Corte transversal del módulo — arquitectura B",
                  "Anillo único, pasillo central de acceso y cambio de cartucho en S8",
                  "ESC. GRÁFICA"),
         f'<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}">']

    hc, rc = G["h_casco"] * esc, G["r_casco"] * esc
    hcaja = G["caja"] * esc
    hdeck = (G["cubierta"] - G["caja"]) * esc        # estructura giratoria bajo el cartucho
    y_cart = suelo - hdeck                           # cara superior del deck = base del cartucho
    y_top = suelo - G["cubierta"] * esc              # cara superior del cartucho
    xe = G["r_eq"] * esc

    # casco
    s.append(f'<path d="M{cx - rc:.0f} {suelo:.0f} v{-hc:.0f} h{2 * rc:.0f} v{hc:.0f} Z" '
             f'fill="#f6f2e9" stroke="#23211d" stroke-width="3"/>')
    s.append(f'<path d="M{cx - rc:.0f} {suelo:.0f} h{2 * rc:.0f}" stroke="#23211d" stroke-width="5" fill="none"/>')

    for signo in (-1, 1):
        xa = cx + signo * G["r0"] * esc
        xb = cx + signo * G["r1"] * esc
        xa, xb = min(xa, xb), max(xa, xb)
        # deck giratorio
        s.append(f'<rect x="{xa:.0f}" y="{y_cart:.0f}" width="{xb - xa:.0f}" height="{hdeck:.0f}" '
                 f'fill="#d8d2c4" stroke="#23211d" stroke-width="1.4"/>')
        s.append(f'<circle cx="{(xa + xb) / 2:.0f}" cy="{y_cart + hdeck / 2:.0f}" r="7" fill="none" stroke="#8d8577" stroke-width="1.4"/>')
        # cartucho: sustrato con fondo de cubeta
        s.append(f'<rect x="{xa:.0f}" y="{y_top:.0f}" width="{xb - xa:.0f}" height="{hcaja:.0f}" '
                 f'fill="#8a4a2c" stroke="#23211d" stroke-width="1.8"/>')
        s.append(f'<rect x="{xa:.0f}" y="{y_top + hcaja * 0.79:.0f}" width="{xb - xa:.0f}" '
                 f'height="{hcaja * 0.21:.0f}" fill="#6b5a43"/>')

    # izquierda: estación fija S2 (aviario) colgada sobre el cartucho
    xa, xb = cx - G["r1"] * esc, cx - G["r0"] * esc
    y_av = y_top - 0.55 * esc
    s.append(f'<rect x="{xa:.0f}" y="{y_av:.0f}" width="{xb - xa:.0f}" height="{0.55 * esc:.0f}" '
             f'fill="#eef3ee" stroke="#1d3f28" stroke-width="2.4"/>')
    s.append(f'<g stroke="#1d3f28" stroke-width="1">'
             + "".join(f'<path d="M{xa + 14 + k * 13:.0f} {y_av + 6:.0f} v{0.55 * esc - 12:.0f}"/>' for k in range(6))
             + '</g>')
    s.append(f'<text x="{(xa + xb) / 2:.0f}" y="{y_av - 10:.0f}" class="tb" text-anchor="middle">S2 · AVIARIO</text>')

    # derecha: posición de cultivo con luminaria fija y dosel
    xa, xb = cx + G["r0"] * esc, cx + G["r1"] * esc
    for k in range(7):
        px = xa + (xb - xa) * (0.10 + k * 0.133)
        s.append(f'<rect x="{px:.0f}" y="{y_top - 0.34 * esc:.0f}" width="5" height="{0.34 * esc:.0f}" fill="#3f7a2e"/>')
    s.append(f'<path d="M{xa:.0f} {y_top - 0.34 * esc:.0f} h{xb - xa:.0f}" stroke="#2f6b3f" '
             f'stroke-width="1.3" stroke-dasharray="4 3" fill="none"/>')
    y_luz = y_top - 0.95 * esc
    s.append(f'<rect x="{xa + 8:.0f}" y="{y_luz:.0f}" width="{xb - xa - 16:.0f}" height="14" '
             f'fill="#2b2b2b" stroke="#23211d" stroke-width="1.2"/>')
    s.append(f'<text x="{(xa + xb) / 2:.0f}" y="{y_luz - 8:.0f}" class="tb" text-anchor="middle">LUMINARIA</text>')
    # la holgura que NO está verificada
    s.append(f'<path d="M{(xa + xb) / 2:.0f} {y_top - 0.34 * esc:.0f} V{y_luz + 14:.0f}" '
             f'stroke="#b5502a" stroke-width="1.6" stroke-dasharray="3 3" fill="none"/>')
    s.append(f'<text x="{(xa + xb) / 2 + 10:.0f}" y="{(y_top - 0.34 * esc + y_luz) / 2:.0f}" '
             f'class="cota">¿?</text>')

    # equipos centrales
    s.append(f'<rect x="{cx - xe:.0f}" y="{suelo - 1.30 * esc:.0f}" width="{2 * xe:.0f}" height="{1.30 * esc:.0f}" '
             f'fill="#dfe8ea" stroke="#2f7d8f" stroke-width="2" stroke-dasharray="6 4"/>')
    for k, (t, cl) in enumerate([("DIGESTOR", "tb"), ("+ reactor de salmuera", "ts"),
                                 ("envolvente disponible,", "ts"), ("sin dimensionar", "ts")]):
        est = ' style="fill:#2f7d8f"' if cl == "tb" else ""
        s.append(f'<text x="{cx}" y="{suelo - 0.95 * esc + k * 17:.0f}" class="{cl}"{est} text-anchor="middle">{t}</text>')

    s.append(figura_humana(cx - (G["r_eq"] + G["pasillo"] / 2) * esc, suelo, esc))

    # cotas
    s.append(cota_h(cx - rc, cx + rc, suelo + 96, f"Ø {2 * G['r_casco']:.2f} m · casco presurizado"))
    s.append(cota_h(cx + G["r_eq"] * esc, cx + G["r0"] * esc, suelo - 16, f"{G['pasillo']:.2f} m pasillo"))
    s.append(cota_h(cx + G["r0"] * esc, cx + G["r1"] * esc, suelo + 44, f"{G['ancho_radial']:.2f} m de ancho"))
    xd = cx + rc + 48
    s.append(f'<path d="M{cx + rc:.0f} {suelo:.0f} H{xd + 16:.0f} M{cx + rc:.0f} {suelo - hc:.0f} H{xd + 16:.0f} '
             f'M{xd:.0f} {suelo - hc:.0f} V{suelo:.0f}" class="dim"/>')
    s.append(f'<text x="{xd + 24:.0f}" y="{suelo - hc / 2:.0f}" class="cota">{G["h_casco"]:.2f} m</text>')
    # presupuesto vertical sobre el cartucho: es lo que está en disputa
    xi = cx - rc - 46
    s.append(f'<path d="M{cx - rc:.0f} {y_top:.0f} H{xi - 16:.0f} M{cx - rc:.0f} {suelo - hc:.0f} H{xi - 16:.0f} '
             f'M{xi:.0f} {suelo - hc:.0f} V{y_top:.0f}" class="dim"/>')
    s.append(f'<text x="{xi - 24:.0f}" y="{(y_top + suelo - hc) / 2:.0f}" class="cota" text-anchor="end">'
             f'{G["h_casco"] - G["cubierta"]:.2f} m</text>')
    s.append(f'<text x="{xi - 24:.0f}" y="{(y_top + suelo - hc) / 2 + 16:.0f}" class="ts" text-anchor="end">'
             f'dosel + equipo</text>')
    s.append(cota_h(cx - G["r1"] * esc, cx - G["r0"] * esc, suelo + 44, f"{G['cuerda']:.2f} m de cuerda"))

    # ruta de cambio de cartucho: se iza del anillo y baja al pasillo contiguo, sin cruzar el núcleo
    yr = suelo - 1.42 * esc
    x_ini = cx + (G["r0"] + G["r1"]) / 2 * esc
    x_fin = cx + G["r_eq"] * esc + 24         # borde interior del pasillo: no tapa la cota
    s.append(f'<path d="M{x_ini:.0f} {y_luz + 26:.0f} V{yr:.0f} H{x_fin:.0f} V{suelo - 34:.0f}" '
             f'stroke="#b5502a" stroke-width="2.2" fill="none" stroke-dasharray="9 5"/>')
    s.append(f'<path d="M{x_fin:.0f} {suelo - 26:.0f} l-7 -10 l14 0 Z" fill="#b5502a"/>')
    s.append(f'<text x="{x_fin - 14:.0f}" y="{yr - 12:.0f}" class="cota" text-anchor="end">'
             f'izado en S8 → pasillo → esclusa</text>')
    s.append(barra_escala(96, suelo + 140, esc))

    # llamadas
    X = 1090
    s.append(f'<text x="{X}" y="46" class="tt">Acceso y mantenimiento</text>')
    filas = [
        ("1 · Pasillo central continuo", f"{G['pasillo']:.2f} m de ancho en todo el perímetro interior"),
        ("2 · Alcance desde el pasillo", f"{G['ancho_radial']:.2f} m — el ancho del cartucho ES el alcance"),
        ("3 · Holgura al casco", f"{G['pared'] * 1000:.0f} mm para estructura, aislamiento y tubería"),
        ("4 · Envolvente central", f"Ø {2 * G['r_eq']:.2f} m disponible para digestor y reactor"),
        ("5 · Cambio de cartucho (S8)", f"huella {G['cuerda']:.2f} × {G['ancho_radial']:.2f} m · {m_nom:.0f} kg"),
        ("6 · Altura libre sobre el cartucho", f"{G['h_casco'] - G['cubierta']:.2f} m para dosel y equipo"),
    ]
    y = 78
    for a, b in filas:
        s.append(f'<text x="{X}" y="{y}" class="tb">{a}</text>')
        s.append(f'<text x="{X}" y="{y + 16}" class="ts">{b}</text>')
        y += 42

    # aviso honesto
    s.append(f'<rect x="{X}" y="{y + 8}" width="390" height="118" fill="#fdf6ec" stroke="#b5502a" stroke-width="1.6"/>')
    s.append(f'<text x="{X + 16}" y="{y + 34}" class="tb" style="fill:#b5502a">SIN VERIFICAR</text>')
    for k, t in enumerate(["La holgura vertical no está comprobada: faltan la",
                           "altura de dosel y la del equipo de estación. La masa",
                           "manipulable por un tripulante en 0.38 g tampoco tiene",
                           "fuente. Ver docs/madrid/P2-GEOMETRIA.md §4."]):
        s.append(f'<text x="{X + 16}" y="{y + 56 + k * 19}" class="t">{t}</text>')

    s.append("</svg>")
    s.append(f'<div class="nota">{GENERADO}</div>')
    s.append(PIE)
    return "\n".join(s)


def inyectar_geom(geo):
    """Escribe la geometría dentro del simulador, entre marcadores.

    El simulador tiene que abrir sin servidor (file://), así que no puede hacer fetch de un
    JSON: la única forma de que no se desincronice del generador es que el generador lo
    escriba. Sólo se toca lo que hay entre los marcadores.
    """
    ruta = RAIZ / "prototipo-3d" / "milpa360-simulador.html"
    compacto = {
        "casco": geo["casco"], "anillo": geo["anillo"], "cartucho": {
            k: geo["cartucho"][k] for k in ("area", "profundidad_sustrato",
                                            "cuerda_exterior", "ancho_radial")},
        "areas": geo["areas"],
        "pasillo": {"ancho": geo["pasillo"]["ancho"],
                    "r_equipos_max": geo["pasillo"]["r_equipos_max"]},
        "mision": {"soles_horizonte": geo["mision"]["soles_horizonte"]},
        "ciclo": {"n_regeneracion": geo["ciclo"]["n_regeneracion"],
                  "n_cultivo": geo["ciclo"]["n_cultivo"]},
    }
    nuevo = ("/*←P2:GEOM*/\nconst GEOM = "
             + json.dumps(compacto, ensure_ascii=False, separators=(",", ":"))
             + ";\n/*P2:GEOM→*/")
    t = ruta.read_text(encoding="utf-8")
    i, j = t.index("/*←P2:GEOM*/"), t.index("/*P2:GEOM→*/") + len("/*P2:GEOM→*/")
    ruta.write_text(t[:i] + nuevo + t[j:], encoding="utf-8")


def main():
    print("# P2 · Geometría paramétrica e interferencias — MILPA-360")
    print(f"  config/milpa360.parameters.json v{CFG['meta']['version']} · {validar()}")

    G = geometria()
    m = masas(G)
    g_marte, g_tierra = v("mision.gravedad_marte"), 9.81

    titulo("1. Arquitectura seleccionada")
    linea("Opción (decisión D1)", "B", "", "un anillo de cartuchos idénticos, pasillo central")
    linea("Horizonte de diseño (decisión D2)", f"{v('mision.horizonte_diseno_superficie'):.0f}", "d",
          "DRA 5.0; el caso de las bases son ~355 d")

    titulo("2. Geometría resuelta (toda derivada, nada escrito a mano)")
    linea("Casco", f"Ø {2 * G['r_casco']:.2f} × {G['h_casco']:.2f}", "m", "geometria_digital")
    linea("Anillo de cartuchos", f"r {G['r0']:.2f} → {G['r1']:.2f}", "m",
          f"ancho {G['ancho_radial']:.2f} m = alcance supuesto")
    linea("Cartuchos", f"{G['n']} + {G['repuestos']}", "", f"{G['sector'] * 180 / math.pi:.2f}° útiles de {G['paso_ang'] * 180 / math.pi:.0f}°")
    linea("Área por cartucho", f"{G['area_cartucho']:.4f}", "m²", f"cuerda exterior {G['cuerda']:.3f} m")
    linea("Área de cultivo", f"{G['area_cultivo']:.2f}", "m²", f"{G['n_cultivo']} posiciones")
    linea("Área de regeneración", f"{G['area_regeneracion']:.2f}", "m²", f"{G['n_regeneracion']} posiciones")
    linea("Área total de sustrato", f"{G['area_total']:.2f}", "m²", "")
    linea("Hueco central libre", f"Ø {2 * G['r0']:.2f}", "m", "")
    linea("Envolvente para equipos centrales", f"Ø {2 * G['r_eq']:.2f}", "m", f"con pasillo de {G['pasillo']:.2f} m")
    linea("Altura libre sobre el cartucho", f"{G['h_casco'] - G['cubierta']:.2f}", "m", "a repartir entre dosel y equipo")

    titulo("3. Masa por escenario de densidad")
    for e in ESCENARIOS:
        linea(f"Cartucho ({e}, ρ={v('sustrato.densidad_aparente', e):.0f} kg/m³)",
              f"{m[e]:.0f}", "kg",
              f"{m[e] * g_marte:.0f} N en Marte · {m[e] * g_tierra:.0f} N en la Tierra")
    linea("Anillo completo (nominal)", f"{m['nominal'] * G['n']:,.0f}", "kg",
          f"con {G['repuestos']} repuestos: {m['nominal'] * (G['n'] + G['repuestos']):,.0f} kg")

    titulo("4. Interferencias a lo largo de un giro completo")
    B = barrido(G)
    print(f"  Barrido de {B['pasos']} pasos ({G['n']} posiciones × {G['soles_paso']} soles):")
    for nombre, d, lim in (("Hueco entre cartuchos vecinos (borde exterior)", B["vecino"], GAP_MIN_MM / 1000),
                           ("Holgura cartucho ↔ casco", B["casco"], None),
                           ("Ancho del pasillo central", B["centro"], None)):
        cte = "constante" if abs(d["max"] - d["min"]) < 1e-9 else f"VARÍA {d['min']:.4f}–{d['max']:.4f}"
        marca = ""
        if lim is not None:
            marca = " ✓" if d["min"] >= lim else f" ✗ POR DEBAJO DE {lim * 1000:.0f} mm"
        linea(nombre, f"{d['min'] * 1000:.0f}", "mm", cte + marca)
    print("  Sin solapamiento nominal entre cartuchos, casco y núcleo durante el giro.")
    print("  No se modeló la huella de los equipos fijos ni la holgura vertical.")

    print("\n  NO VERIFICADO — holgura vertical. Faltan dos parámetros:")
    for ruta, que in (("estaciones.altura_dosel_maxima", "altura del dosel de camote, frijol y rábano"),
                      ("estaciones.altura_libre_bajo_equipo", "cara inferior del equipo de cada estación")):
        assert v(ruta) is None, f"{ruta} ya tiene valor: actualiza esta comprobación"
        print(f"    · {ruta:<40} {que}")
    print(f"    Presupuesto disponible a repartir entre ambos: {G['h_casco'] - G['cubierta']:.2f} m")

    titulo("5. Cambio de cartucho en S8 y acceso humano")
    diag = math.hypot(G["cuerda"], G["ancho_radial"])
    linea("Huella del cartucho", f"{G['cuerda']:.3f} × {G['ancho_radial']:.2f}", "m", "cuerda exterior × ancho radial")
    linea("Pasa de frente por el pasillo", f"{G['cuerda']:.3f} < {G['pasillo']:.2f}", "m",
          f"margen {(G['pasillo'] - G['cuerda']) * 1000:.0f} mm ✓")
    linea("Diagonal (giro en el pasillo)", f"{diag:.3f} vs {G['pasillo']:.2f}", "m",
          f"margen {(G['pasillo'] - diag) * 1000:.0f} mm" + (" ✓" if diag < G["pasillo"] else " ✗ NO GIRA"))
    linea("Alcance necesario desde el pasillo", f"{G['ancho_radial']:.2f}", "m",
          f"= alcance supuesto {G['alcance']:.2f} m · SIN MARGEN")
    assert v("acceso.masa_max_manipulable") is None
    print(f"    NO VERIFICADO: {m['nominal']:.0f} kg ({m['nominal'] * g_marte:.0f} N en Marte) sin límite de")
    print("    manipulación con fuente. En la Tierra el mismo cartucho pesa "
          f"{m['nominal'] * g_tierra:.0f} N y exige polipasto.")

    titulo("6. Ciclo y calendario")
    dps = v("mision.dias_por_sol")
    ciclo_soles = G["n"] * G["soles_paso"]
    cultivo_soles = G["n_cultivo"] * G["soles_paso"]
    linea("Ciclo completo de un cartucho", f"{ciclo_soles}", "soles", f"{ciclo_soles * dps:.1f} d")
    linea("Tramo de cultivo", f"{cultivo_soles}", "soles", f"{cultivo_soles * dps:.1f} d")
    linea("Descanso entre deposiciones", f"{(G['n'] - 1) * G['soles_paso']}", "soles",
          "el plan decía 56; con un anillo son más")
    for c in ("camote", "frijol", "rabano"):
        ciclo = v(f"cultivo_{c}.ciclo")
        cabe = cultivo_soles * dps / ciclo
        linea(f"  {c}: ciclo {ciclo:.0f} d", f"{cabe:.2f}", "siembras", "✓" if cabe >= 1 else "✗ NO CABE")
        assert cabe >= 1, f"{c} no cabe en el tramo de cultivo"
    giros = v("mision.horizonte_diseno_superficie") / (ciclo_soles * dps)
    linea("Giros en el horizonte de diseño", f"{giros:.2f}", "", f"{v('mision.horizonte_diseno_superficie'):.0f} d")

    # ── Salidas ───────────────────────────────────────────────────────────────────────────
    geo_out = {
        "_generado_por": "analysis/milpa360_p2.py",
        "_fuente": f"config/milpa360.parameters.json v{CFG['meta']['version']}",
        "_aviso": "ARCHIVO GENERADO. No editar a mano: se sobrescribe en cada ejecución.",
        "arquitectura": "B",
        "casco": {"radio": round(G["r_casco"], 4), "diametro": round(2 * G["r_casco"], 4),
                  "altura": G["h_casco"], "cubierta": G["cubierta"]},
        "anillo": {"r0": round(G["r0"], 4), "r1": round(G["r1"], 4),
                   "n": G["n"], "holgura_angular": G["hol"],
                   "paso_grados": round(G["paso_ang"] * 180 / math.pi, 4),
                   "sector_grados": round(G["sector"] * 180 / math.pi, 4),
                   "soles_por_paso": G["soles_paso"]},
        "cartucho": {"area": round(G["area_cartucho"], 5), "profundidad_sustrato": G["hondo"],
                     "altura_caja": G["caja"], "cuerda_exterior": round(G["cuerda"], 4),
                     "ancho_radial": round(G["ancho_radial"], 4),
                     "masa_kg": {e: round(m[e], 1) for e in ESCENARIOS},
                     "repuestos": G["repuestos"]},
        "areas": {"cultivo": round(G["area_cultivo"], 4),
                  "regeneracion": round(G["area_regeneracion"], 4),
                  "total": round(G["area_total"], 4)},
        "pasillo": {"ancho": G["pasillo"], "r_equipos_max": round(G["r_eq"], 4),
                    "diametro_equipos_max": round(2 * G["r_eq"], 4),
                    "altura_libre_sobre_cartucho": round(G["h_casco"] - G["cubierta"], 4)},
        "estaciones": [{"codigo": c, "nombre": n, "detalle": d, "color": col,
                        "posicion": i, "grados": round(i * G["paso_ang"] * 180 / math.pi, 2)}
                       for i, (c, n, d, col) in enumerate(ESTACIONES)],
        "ciclo": {"soles_total": ciclo_soles, "soles_cultivo": cultivo_soles,
                  "dias_total": round(ciclo_soles * dps, 2),
                  "n_regeneracion": G["n_regeneracion"], "n_cultivo": G["n_cultivo"],
                  "descanso_soles": (G["n"] - 1) * G["soles_paso"]},
        "mision": {"horizonte_diseno_d": v("mision.horizonte_diseno_superficie"),
                   "soles_horizonte": round(v("mision.horizonte_diseno_superficie") / dps),
                   "estancia_bases_d": round(v("mision.duracion_total_bases")
                                             - v("mision.transito_ida") - v("mision.transito_vuelta"))},
        "sin_verificar": ["estaciones.altura_dosel_maxima",
                          "estaciones.altura_libre_bajo_equipo",
                          "acceso.masa_max_manipulable",
                          "digestor.diametro_envolvente"],
    }
    (RAIZ / "config" / "milpa360.geometria.json").write_text(
        json.dumps(geo_out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    planos = RAIZ / "prototipo" / "planos"
    (planos / "P03-planta-carrusel.html").write_text(plano_p03(G, m["nominal"]), encoding="utf-8")
    (planos / "P02-corte-transversal.html").write_text(plano_p02(G, m["nominal"]), encoding="utf-8")
    inyectar_geom(geo_out)

    titulo("7. Archivos escritos")
    for p in ("config/milpa360.geometria.json",
              "prototipo/planos/P02-corte-transversal.html",
              "prototipo/planos/P03-planta-carrusel.html",
              "prototipo-3d/milpa360-simulador.html  (solo el bloque GEOM)"):
        print(f"  {p}")
    print("\n  Una lámina es geometría nominal dibujada a escala. No es prueba estructural.")


if __name__ == "__main__":
    main()
