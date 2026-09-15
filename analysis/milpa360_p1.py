#!/usr/bin/env python3
"""P1 · Arquitectura, balances y aporte alimentario de MILPA-360.

Lee SOLO config/milpa360.parameters.json (fuente única) y lo valida contra su esquema.

    python3 analysis/milpa360_p1.py

Todo resultado es CÁLCULO sobre datos publicados, supuestos y decisiones del equipo declarados
en el archivo de parámetros. Nada aquí es medición ni validación del sistema.
"""
import json, math, pathlib

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CFG = json.loads((RAIZ / "config" / "milpa360.parameters.json").read_text(encoding="utf-8"))
ESCENARIOS = ("conservador", "nominal", "favorable")


def validar():
    try:
        import jsonschema
    except ImportError:
        return "SIN VALIDAR (pip install jsonschema)"
    esquema = json.loads((RAIZ / "config" / "milpa360.parameters.schema.json").read_text(encoding="utf-8"))
    jsonschema.validate(CFG, esquema)
    for g, ps in CFG["parametros"].items():
        for k, p in ps.items():
            if "escenarios" in p and p["valor"] is not None:
                assert p["escenarios"]["nominal"] == p["valor"], f"{g}.{k}: valor ≠ escenario nominal"
    return "validado contra el esquema"


def v(ruta, esc="nominal"):
    g, k = ruta.split(".")
    p = CFG["parametros"][g][k]
    return p["escenarios"][esc] if "escenarios" in p else p["valor"]


def anillo(r0, r1, n_usadas, n_pos, hol):
    """Área de n_usadas sectores de un anillo con n_pos posiciones: n/N · π · hol · (R1² − R0²)."""
    return n_usadas / n_pos * math.pi * hol * (r1**2 - r0**2)


def r0_para_ancho(area, ancho, n_usadas, n_pos, hol):
    """Radio interior tal que un anillo de ancho dado tenga el área pedida."""
    k = n_usadas / n_pos * math.pi * hol
    return (area / k - ancho**2) / (2 * ancho)


def r1_para_area(r0, area, n_usadas, n_pos, hol):
    return math.sqrt(r0**2 + area / (n_usadas / n_pos * math.pi * hol))


def titulo(t):
    print(f"\n## {t}")


def fila(nombre, valores, fmt="{:,.2f}", unidad=""):
    print(f"  {nombre:<46}" + "".join(f"{fmt.format(x):>14}" for x in valores) + f"  {unidad}")


def main():
    print(f"# P1 · MILPA-360 · parámetros {CFG['meta']['version']} · {validar()}")
    hol, h = v("geometria_actual.holgura_angular"), v("geometria_actual.profundidad_sustrato")
    ancho, alcance, pared = v("acceso.ancho_pasillo"), v("acceso.alcance_desde_un_lado"), v("acceso.holgura_pared")
    r_casco = v("geometria_actual.r_casco")
    g_marte = v("mision.gravedad_marte")

    # ── 1. Escenario temporal ──
    titulo("1. Escenario temporal")
    total, ida, vuelta = v("mision.duracion_total_bases"), v("mision.transito_ida"), v("mision.transito_vuelta")
    estancia_bases = total - ida - vuelta
    dps = v("mision.dias_por_sol")
    for nombre, d in (("Bases (~730 d total − tránsitos DRA 5.0)", estancia_bases),
                      ("DRA 5.0 conjunción (perfil 2037)", v("mision.estancia_superficie_dra5")),
                      ("Oposición (alcance de V2 6253)", v("mision.estancia_superficie_oposicion")),
                      ("Plan actual: 730 soles en superficie", 730 * dps)):
        print(f"  {nombre:<46}{d:>8.0f} d = {d / dps:>5.0f} soles")
    print(f"  Plan actual + tránsitos DRA = {730 * dps + ida + vuelta:.0f} d ≈ {(730 * dps + ida + vuelta) / 365.25:.1f} años (bases: ~2)")
    horizonte = v("mision.horizonte_diseno_superficie")
    assert estancia_bases > 0 and horizonte >= estancia_bases

    # ── 2. Geometría y acceso ──
    titulo("2. Geometría y acceso (nominal digital; supuestos de pasillo y alcance en config)")
    n_i, n_o = v("geometria_actual.n_interior"), v("geometria_actual.n_exterior")
    r0i, r1i = v("geometria_actual.r0_interior"), v("geometria_actual.r1_interior")
    r0o, r1o = v("geometria_actual.r0_exterior"), v("geometria_actual.r1_exterior")
    A_regen = anillo(r0i, r1i, n_i, n_i, hol)
    A_cultivo = anillo(r0o, r1o, n_o, n_o, hol)
    opciones = {}

    # Actual: sin pasillo
    opciones["Actual (dos anillos)"] = dict(D=2 * r_casco, A_reg=A_regen, A_cul=A_cultivo, formas=2, giran=2,
        acceso=(r_casco - r1o) >= ancho and (r1i - r0i) <= alcance and (r0o - r1i) >= ancho)
    print(f"  Actual: holgura al casco {r_casco - r1o:.3f} m, entre anillos {r0o - r1i:.3f} m, "
          f"anchos {r1i - r0i:.3f}/{r1o - r0o:.3f} m frente a pasillo {ancho} m y alcance {alcance} m")

    # A: dos anillos con pasillo entre anillos y un hueco de servicio por anillo, misma área
    r0i_A = max(r0i, r0_para_ancho(A_regen, alcance, n_i - 1, n_i, hol))
    r1i_A = r1_para_area(r0i_A, A_regen, n_i - 1, n_i, hol)
    r0o_A = r1i_A + ancho
    r1o_A = r1_para_area(r0o_A, A_cultivo, n_o - 1, n_o, hol)
    ext_ok = (r1o_A - r0o_A) <= alcance
    rA = r1o_A + pared + (0 if ext_ok else ancho)
    opciones["A · dos anillos + pasillo + huecos"] = dict(D=2 * rA, A_reg=A_regen, A_cul=A_cultivo, formas=2, giran=2, acceso=True)
    print(f"  A: interior {r0i_A:.2f}–{r1i_A:.2f} m · pasillo {r1i_A:.2f}–{r0o_A:.2f} m · exterior {r0o_A:.2f}–{r1o_A:.2f} m"
          f" · {n_i - 1}+{n_o - 1} bandejas con 1 hueco por anillo")

    # B: un anillo de cartuchos idénticos contra el casco, pasillo central
    n_c, n_rg, n_cu = v("arquitectura_b.n_cartuchos"), v("arquitectura_b.n_regeneracion"), v("arquitectura_b.n_cultivo")
    assert n_rg + n_cu == n_c
    r1_B = r_casco - pared
    r0_B = r1_B - alcance
    A_B = anillo(r0_B, r1_B, n_c, n_c, hol)
    opciones["B · cartuchos Ø actual"] = dict(D=2 * r_casco, A_reg=A_B * n_rg / n_c, A_cul=A_B * n_cu / n_c, formas=1, giran=1, acceso=True)
    print(f"  B (Ø{2 * r_casco:.2f} m): anillo {r0_B:.2f}–{r1_B:.2f} m · cartucho {A_B / n_c:.3f} m² · "
          f"espacio central Ø{2 * r0_B:.2f} m · equipos centrales hasta Ø{2 * (r0_B - ancho):.2f} m con pasillo de {ancho} m")
    r0_B2 = r0_para_ancho(A_regen + A_cultivo, alcance, n_c, n_c, hol)
    opciones["B' · cartuchos, misma área"] = dict(D=2 * (r0_B2 + alcance + pared), A_reg=(A_regen + A_cultivo) * n_rg / n_c,
                                                  A_cul=(A_regen + A_cultivo) * n_cu / n_c, formas=1, giran=1, acceso=True)
    # C: bandejas fijas (misma huella que B) y aviario móvil sobre riel
    opciones["C · bandejas fijas + aviario móvil"] = dict(D=2 * r_casco, A_reg=A_B * n_rg / n_c, A_cul=A_B * n_cu / n_c, formas=1, giran=0, acceso=True)

    print(f"\n  {'Opción':<38}{'Ø casco m':>10}{'huella m²':>10}{'regen m²':>9}{'cultivo m²':>11}{'formas':>7}{'anillos que giran':>18}{'acceso':>8}")
    for nombre, o in opciones.items():
        print(f"  {nombre:<38}{o['D']:>10.2f}{math.pi * o['D'] ** 2 / 4:>10.1f}{o['A_reg']:>9.2f}{o['A_cul']:>11.2f}"
              f"{o['formas']:>7}{o['giran']:>18}{'sí' if o['acceso'] else 'NO':>8}")

    print("\n  Masa de sustrato a 22 cm (kg) por escenario de densidad:")
    fila("", ESCENARIOS, "{:>14}")
    for nombre in ("Actual (dos anillos)", "B · cartuchos Ø actual"):
        o = opciones[nombre]
        fila(nombre, [(o["A_reg"] + o["A_cul"]) * h * v("sustrato.densidad_aparente", e) for e in ESCENARIOS], "{:,.0f}", "kg")
    fila("  por cartucho B", [A_B / n_c * h * v("sustrato.densidad_aparente", e) for e in ESCENARIOS], "{:,.0f}", "kg")
    m_act = (A_regen + A_cultivo) * h * v("sustrato.densidad_aparente")
    mu = v("mecanica.coef_resistencia_rodadura")
    par = mu * m_act * g_marte * (r0o + r1i) / 2
    print(f"  Par de rodadura actual (μ={mu}, supuesto): {par:.0f} N·m; energía por paso de 30° ≈ {par * math.radians(30):.0f} J "
          "(despreciable; el par de arranque y el bloqueo no se calculan aquí)")

    # ── 3–7. Balances por escenario (arquitectura B nominal; A_cultivo actual como referencia) ──
    crew = v("mision.tripulacion")
    need_kcal = crew * v("tripulacion.energia_alimento")
    cultivos = CFG["parametros"]["cultivo"]["reparto_area"]["valor"]
    assert abs(sum(cultivos.values()) - 1) < 1e-9
    res = {}
    for area_nombre, A_cul in (("B", opciones["B · cartuchos Ø actual"]["A_cul"]), ("actual", A_cultivo)):
        for e in ESCENARIOS:
            r = {}
            n_aves = v("aviario.n_aves")
            alimento = n_aves * v("aviario.consumo_alimento") / 1000                         # kg/d
            huevos = n_aves * v("aviario.postura", e)
            g_huevo = huevos * v("aviario.peso_huevo")
            r["huevo_g"] = g_huevo
            r["huevo_kcal"] = g_huevo * v("aviario.energia_huevo") / 100
            r["huevo_prot"] = g_huevo * v("aviario.proteina_huevo") / 100
            r["alimento_kg"] = alimento
            r["alimento_kcal"] = alimento * v("aviario.energia_metabolizable_alimento")
            assert r["huevo_kcal"] < r["alimento_kcal"], "el huevo no puede contener más energía que la ración"
            st = alimento * v("aviario.solidos_excretados_por_alimento", e)
            sv = st * v("aviario.sv_sobre_st", e)
            f_l = v("larvas.fraccion_estiercol_a_larvas")
            sv_resid = sv * f_l * (1 - v("larvas.degradacion_materia_seca")) + sv * (1 - f_l)
            r["estiercol_st"], r["estiercol_sv"], r["sv_a_digestor"] = st, sv, sv_resid

            kcal = prot = no_com = fotones = transp = 0.0
            for c, frac in cultivos.items():
                a = A_cul * frac
                fresco = a * v(f"cultivo_{c}.comestible_fresco") * v("cultivo.factor_productividad", e)
                kcal += fresco * v(f"cultivo_{c}.energia") / 100
                prot += fresco * v(f"cultivo_{c}.proteina") / 100
                no_com += a * v(f"cultivo_{c}.no_comestible_seco") * v("cultivo.factor_productividad", e) / 1000
                fotones += a * v(f"cultivo_{c}.fotones_diarios")
                transp += a * v(f"cultivo_{c}.transpiracion") * v("cultivo.factor_productividad", e)
            r["cultivo_kcal"], r["cultivo_prot"], r["rastrojo_ms"] = kcal, prot, no_com
            r["luz_kwh"] = fotones / (v("luz.eficacia_luminaria", e) * 1e-6 * v("luz.eficiencia_entrega")) / 3.6e6
            r["transpiracion_L"] = transp

            ch4 = sv_resid * v("digestor.rendimiento_ch4_estiercol", e) + no_com * v("digestor.rendimiento_ch4_rastrojo", e)
            r["ch4_m3"] = ch4
            r["biogas_kwh_quimico"] = ch4 * v("digestor.pci_metano") / 3.6
            r["biogas_kwh_electrico"] = r["biogas_kwh_quimico"] * v("digestor.eficiencia_electrica")
            r["kcal_total"] = r["huevo_kcal"] + kcal
            r["cobertura_kcal"] = r["kcal_total"] / need_kcal
            for x in r.values():
                assert x >= 0
            res[(area_nombre, e)] = r

    for area_nombre, area_val in (("B", opciones["B · cartuchos Ø actual"]["A_cul"]), ("actual", A_cultivo)):
        titulo(f"3–7. Balances diarios · área de cultivo {area_val:.2f} m² ({'arquitectura B' if area_nombre == 'B' else 'anillo exterior actual'})")
        fila("", ESCENARIOS, "{:>14}")
        R = [res[(area_nombre, e)] for e in ESCENARIOS]
        for clave, nombre, fmt, u in (
                ("alimento_kg", "Ración de aves (entrada externa)", "{:.2f}", "kg/d"),
                ("alimento_kcal", "Energía metabolizable de la ración", "{:,.0f}", "kcal/d"),
                ("huevo_g", "Huevo", "{:,.0f}", "g/d"),
                ("huevo_kcal", "Huevo · energía", "{:,.0f}", "kcal/d"),
                ("cultivo_kcal", "Cultivo · energía comestible", "{:,.0f}", "kcal/d"),
                ("kcal_total", "Alimento total producido", "{:,.0f}", "kcal/d"),
                ("cobertura_kcal", f"Cobertura de {need_kcal:,} kcal/d de la tripulación", "{:.1%}", ""),
                ("huevo_prot", "Proteína de huevo", "{:.1f}", "g/d"),
                ("cultivo_prot", "Proteína de cultivo", "{:.1f}", "g/d"),
                ("estiercol_st", "Estiércol · sólidos totales", "{:.3f}", "kg/d"),
                ("estiercol_sv", "Estiércol · sólidos volátiles", "{:.3f}", "kg SV/d"),
                ("sv_a_digestor", "SV de estiércol que llegan al digestor", "{:.3f}", "kg SV/d"),
                ("rastrojo_ms", "Rastrojo al digestor", "{:.3f}", "kg MS/d"),
                ("ch4_m3", "Metano", "{:.4f}", "m³/d"),
                ("biogas_kwh_quimico", "Biogás · energía química", "{:.3f}", "kWh/d"),
                ("biogas_kwh_electrico", "Biogás · electricidad bruta", "{:.3f}", "kWh/d"),
                ("luz_kwh", "Iluminación de cultivo (electricidad)", "{:.1f}", "kWh/d"),
                ("transpiracion_L", "Transpiración a condensar", "{:.1f}", "L/d")):
            fila(nombre, [x[clave] for x in R], fmt, u)
        fila("Biogás eléctrico / iluminación", [x["biogas_kwh_electrico"] / x["luz_kwh"] for x in R], "{:.2%}")
        print("  Otros consumos (bombas, ventilación, HEPA, control, calefacción del digestor, carrusel): NO CALCULADOS — no son cero.")

    n = res[("B", "nominal")]
    print(f"\n  Comparación con el plan: 2 kg SV/d y 2.864 kWh/d químicos frente a {n['estiercol_sv']:.3f} kg SV/d generados "
          f"y {n['biogas_kwh_quimico']:.2f} kWh/d químicos (nominal B): ×{2.864 / n['biogas_kwh_quimico']:.0f}")
    sens = n["estiercol_sv"] * v("digestor.rendimiento_ch4_estiercol") * v("digestor.pci_metano") / 3.6
    print(f"  Sensibilidad: todo el estiércol directo al digestor (sin larvas) → +{sens - n['sv_a_digestor'] * v('digestor.rendimiento_ch4_estiercol') * v('digestor.pci_metano') / 3.6:.3f} kWh/d químicos")
    heces = crew * v("tripulacion.solidos_heces")
    print(f"  Flujo humano opcional (no incluido): {heces:.2f} kg/d de sólidos fecales de la tripulación")

    titulo("8. Provisiones y reabastecimiento")
    for d, etiqueta in ((estancia_bases, "estancia según bases"), (horizonte, "horizonte de diseño")):
        falta = need_kcal * d * (1 - n["cobertura_kcal"])
        print(f"  {etiqueta:<22} {d:>4.0f} d · kcal a llevar {falta / 1e6:,.2f} millones · "
              f"ración de aves a llevar {n['alimento_kg'] * d:,.0f} kg · alimento empacado ahorrado ≈ "
              f"{n['cobertura_kcal'] * crew * v('tripulacion.alimento_empacado') * d:,.0f} kg · masa neta importada por el "
              f"aviario y el cultivo {n['alimento_kg'] * d - n['cobertura_kcal'] * crew * v('tripulacion.alimento_empacado') * d:+,.0f} kg")
    print(f"  Arranque: primer huevo a los {v('aviario.edad_primer_huevo'):.0f} d y primera cosecha de camote a los "
          f"{v('cultivo_camote.ciclo'):.0f} d → las provisiones cubren el 100 % al menos ese periodo")
    print(f"  Agua: transpiración nominal {n['transpiracion_L']:.1f} L/d frente a {crew * v('tripulacion.agua_potable_minima'):.0f} L/d "
          "de agua potable mínima de la tripulación (circuitos separados)")

    titulo("9. Perclorato y lavado (escenarios ilustrativos de relación líquido/sólido)")
    mm = v("perclorato.masa_molar_clo4")
    fila("", ESCENARIOS, "{:>14}")
    m_cart = [A_B / n_c * h * v("sustrato.densidad_aparente", e) for e in ESCENARIOS]
    clo4_cart = [m * v("sustrato.fraccion_perclorato", e) for m, e in zip(m_cart, ESCENARIOS)]
    agua_cart = [m * v("sustrato.relacion_liquido_solido_lavado", e) for m, e in zip(m_cart, ESCENARIOS)]
    conc_mM = [c * 1000 / a / mm * 1000 for c, a in zip(clo4_cart, agua_cart)]
    fila("ClO₄⁻ por cartucho B (22 cm)", [c * 1000 for c in clo4_cart], "{:,.0f}", "g")
    fila("Agua de lavado por cartucho", agua_cart, "{:,.0f}", "L")
    fila("Concentración de la salmuera", conc_mM, "{:.1f}", "mM")
    fila("ClO₄⁻ total inicial (20 cartuchos)", [c * n_c for c in clo4_cart], "{:.1f}", "kg")
    fila("Agua de lavado inicial (20 cartuchos)", [a * n_c / 1000 for a in agua_cart], "{:.1f}", "m³")
    lim = v("perclorato.inhibicion_metanogenos")
    print(f"  Metanogénesis inhibida con {lim}–20 mM (Sci. Rep. 2021): la salmuera iguala o supera {lim} mM en "
          f"{sum(c >= lim for c in conc_mM)}/3 escenarios → la salmuera no debe entrar al digestor metanogénico")


if __name__ == "__main__":
    main()
