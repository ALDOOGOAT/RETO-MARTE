#!/usr/bin/env python3
"""P0 · Verificación reproducible de geometría, masa, energía y reglas del simulador MILPA-360.

Lee las constantes DEL SIMULADOR ACTUAL (no las copia a mano), recalcula y compara con lo que
dicen los documentos. Solo biblioteca estándar.

    python3 analysis/p0_verificacion.py

Todo lo que imprime es CÁLCULO sobre constantes digitales o supuestos del equipo; nada es medición.
"""
import hashlib, math, pathlib, re, subprocess

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SIM = RAIZ / "prototipo-3d" / "milpa360-simulador.html"


def constante(nombre, texto):
    m = re.search(rf"\b{nombre}\s*=\s*([0-9.]+)", texto)
    if not m:
        raise SystemExit(f"No encontré la constante {nombre} en {SIM.name}: el simulador cambió.")
    return float(m.group(1))


def sector(r0, r1, n, holgura):
    """Área de un sector anular: A = ½·(R1² − R0²)·θ, con θ = 2π/n · holgura."""
    return 0.5 * (r1**2 - r0**2) * (2 * math.pi / n) * holgura


def main():
    html = SIM.read_text(encoding="utf-8")
    c = {k: constante(k, html) for k in
         ("N_IN", "N_OUT", "SOLES_PASO", "HOLGURA", "R0_IN", "R1_IN", "R0_OUT", "R1_OUT",
          "HONDO", "CUBIERTA", "R_CASCO", "H_CASCO")}
    commit = subprocess.run(["git", "-C", str(RAIZ), "rev-parse", "--short", "HEAD"],
                            capture_output=True, text=True).stdout.strip()
    print(f"# P0 · commit {commit} · simulador sha256 {hashlib.sha256(SIM.read_bytes()).hexdigest()[:16]}")
    print("constantes:", c)

    # ── 1. Geometría nominal digital ──
    ai = sector(c["R0_IN"], c["R1_IN"], c["N_IN"], c["HOLGURA"])
    ao = sector(c["R0_OUT"], c["R1_OUT"], c["N_OUT"], c["HOLGURA"])
    A_in, A_out = c["N_IN"] * ai, c["N_OUT"] * ao
    A = A_in + A_out
    huella = math.pi * c["R_CASCO"] ** 2
    print("\n## Geometría (nominal digital)")
    print(f"ángulo útil interior {360 / c['N_IN'] * c['HOLGURA']:.1f}° · exterior {360 / c['N_OUT'] * c['HOLGURA']:.1f}°")
    print(f"sector interior {ai:.3f} m² ×{c['N_IN']:.0f} = {A_in:.3f} m²")
    print(f"sector exterior {ao:.3f} m² ×{c['N_OUT']:.0f} = {A_out:.3f} m²")
    print(f"total bandejas {A:.3f} m² · sin holgura angular {A / c['HOLGURA']:.3f} m²")
    print(f"huella del casco Ø{2 * c['R_CASCO']:.2f} m = {huella:.3f} m² · bandeja/huella {A / huella:.1%}")
    print(f"holgura radial borde exterior→casco {c['R_CASCO'] - c['R1_OUT']:.3f} m")
    print(f"separación radial entre anillos {c['R0_OUT'] - c['R1_IN']:.3f} m")
    print(f"distancia casco→borde interior del anillo interior {c['R_CASCO'] - c['R0_IN']:.3f} m (alcance sin pasillo)")
    print(f"altura de cubierta {c['CUBIERTA']:.2f} m · altura libre bajo casco sobre cubierta {c['H_CASCO'] - c['CUBIERTA']:.2f} m")
    assert abs(A - 10.288) < 0.01 and abs(huella - 16.331) < 0.01, "la geometría cambió: revisar AUDITORIA §3"

    # ── 2. Masa de sustrato (densidad SUPUESTA, sin humedad ni contenedor) ──
    print("\n## Masa de sustrato a profundidad", c["HONDO"], "m (cálculo con densidad supuesta)")
    for rho in (1200, 1500, 1800):
        print(f"ρ={rho} kg/m³ → total {A * c['HONDO'] * rho:,.0f} kg · bandeja int {ai * c['HONDO'] * rho:.0f} kg"
              f" · ext {ao * c['HONDO'] * rho:.0f} kg · capa lavada 2.5 cm int {ai * 0.025 * rho:.1f} kg")
    m15 = A * c["HONDO"] * 1500
    print(f"peso en Marte (3.71 m/s²) {m15 * 3.71 / 1000:.1f} kN · en la Tierra {m15 * 9.81 / 1000:.1f} kN (la inercia es la misma)")
    frac_lavada = 0.025 / c["HONDO"]
    print(f"fracción del volumen de cubeta lavada por ciclo: {frac_lavada:.1%}")

    # ── 3. Perclorato por bandeja interior (supuesto: distribución uniforme en masa) ──
    print("\n## Perclorato por bandeja interior, ρ=1500 (dato publicado Phoenix 0.4–0.6 %; docs dicen 0.5–1 %)")
    for w in (0.004, 0.006, 0.01):
        print(f"{w:.1%} → capa 2.5 cm {ai * 0.025 * 1500 * w * 1000:.0f} g · cubeta 22 cm {ai * c['HONDO'] * 1500 * w * 1000:.0f} g")

    # ── 4. Energía química bruta del biogás con los supuestos del plan ──
    kg_carga, rend, ch4, pci = 2.0, 0.24, 0.60, 35.8
    mj = kg_carga * rend * ch4 * pci
    print("\n## Biogás (energía química bruta; NO electricidad neta)")
    print(f"{kg_carga} kg × {rend} m³/kg × {ch4:.0%} CH₄ × {pci} MJ/m³ = {mj:.2f} MJ/d = {mj / 3.6:.3f} kWh/d")
    print(f"con grupo electrógeno al 40 % (FAO, cap. 3): {mj / 3.6 * 0.40:.2f} kWh eléctricos/d brutos, antes de auxiliares")
    assert abs(mj / 3.6 - 2.864) < 0.001

    # ── 5. Ración y huevo con las cifras del plan (cálculo sobre supuestos del equipo) ──
    aves, g_ave, postura, g_huevo, soles = 24, 23, 0.68, 10.8, 730
    print("\n## Aviario (cifras del plan, no verificadas)")
    print(f"ración {aves * g_ave} g/d → {aves * g_ave * soles / 1000:.0f} kg en {soles} días (entrada externa si es grano)")
    print(f"huevo {aves * postura:.1f}/d · {aves * postura * g_huevo:.0f} g/d · {aves * postura * g_huevo / 6:.0f} g/persona/d")
    print(f"días vs soles: {soles} soles = {soles * 1.0275:.0f} días terrestres")

    # ── 6. Regla de tormenta del simulador: bandejas con posición continua ≥ 8.6 ──
    n = int(c["N_OUT"])
    posibles = sorted({sum(1 for i in range(n) if (i + k / 1000) % n >= 8.6) for k in range(n * 1000)})
    print("\n## Tormenta en el simulador (regla programada, no modelo agronómico)")
    print(f"bandejas marcadas como dañadas: {posibles} de {n} → {[f'{p / n:.0%}' for p in posibles]}",
          "· no depende de la duración ni de la energía; el daño se revierte al terminar")
    descanso = (c["N_IN"] - 1) * c["SOLES_PASO"]
    print(f"descanso entre deposiciones (regla geométrica): {descanso:.0f} soles · ciclo exterior {n * c['SOLES_PASO']:.0f} soles")
    assert posibles == [3, 4] and descanso == 56

    # ── 7. Diámetros declarados en el repositorio ──
    print("\n## Diámetros de casco/cubierta citados (texto, no geometría)")
    patron = re.compile(r"Ø\s?~?(\d\.\d{1,2})\s?m|(\d\.\d{2}) m de diámetro|R_CASCO = (\d\.\d+)")
    for f in sorted(RAIZ.rglob("*")):
        if f.suffix not in (".md", ".html", ".py") or "node_modules" in f.parts or f.name.startswith(("MISION", "pitch-", "kit-de-campo")) \
                or "docs" in f.parts or "analysis" in f.parts:
            continue
        for i, linea in enumerate(f.read_text(encoding="utf-8", errors="ignore").splitlines(), 1):
            for m in patron.finditer(linea):
                v = m.group(1) or m.group(2) or f"{2 * float(m.group(3)):.2f} (R_CASCO)"
                if v not in ("0.50", "0.30"):
                    print(f"  Ø {v} m · {f.relative_to(RAIZ)}:{i}")


if __name__ == "__main__":
    main()
