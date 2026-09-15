# ESTADO · preparación para Madrid

**Paquete cerrado:** P1 · ingeniería (documental y de cálculo; no valida el sistema físico)
**Fecha:** 15 sep 2026 · **Rama:** `preparacion-madrid-p1`, local y sin push
**Commits:** P0 en `7ea6b3f`; P1 en el commit que acompaña a este archivo
**Final:** 3–5 nov 2026, Getafe. La fecha de entrega está sin confirmar.

## Archivos de P1

| Archivo | Contenido |
|---|---|
| `config/milpa360.parameters.json` | Fuente única: 83 parámetros con valor, unidad, evidencia, fuente y escenarios |
| `config/milpa360.parameters.schema.json` | Esquema JSON 2020-12. Obliga a que un valor nulo sea «pendiente» y viceversa |
| `analysis/milpa360_p1.py` | Escenario temporal, geometría de 5 opciones, balances diarios, provisiones y perclorato |
| `docs/madrid/P1-INGENIERIA.md` | Decisiones, tabla dimensional, ciclo de cartucho, balances, riesgos y frases a retirar |
| `docs/madrid/matriz-requisitos.md` | Estados actualizados |
| `docs/madrid/registro-afirmaciones.csv` | 76 afirmaciones: 19 nuevas y 12 anotadas con resultados de P1 |

Sin cambios en simulador, planos, deck ni documentos del plan. Los presupuestos del usuario siguen sin commit e intactos.

## Pruebas ejecutadas

- `python3 analysis/milpa360_p1.py`
  - Valida el JSON contra el esquema y comprueba que cada valor coincide con su escenario nominal.
  - Aserciones: masas y energías no negativas, reparto de cultivos igual a 1, energía del huevo menor que la de la ración, y horizonte mayor o igual a la estancia de las bases.
- El CSV sigue teniendo 16 columnas en todas sus filas.
- P0 sigue pasando: `python3 analysis/p0_verificacion.py`.

## Cobertura de requisitos

Denominador: **27 obligatorios**.

| Estado | P1 | P0 |
|---|---:|---:|
| Cumplido (documental) | 1 | 1 |
| Parcial | 21 | 18 |
| Pendiente | 4 | 7 |
| Por confirmar | 1 | 1 |

Pasaron a parcial RU-03 (aporte alimentario), RU-P2-01 (flujo de residuos) y MG-02 (duración). No es una probabilidad de ganar.

## Resultados principales (nominal, con rango de escenarios)

1. **Duración.** Las bases dan ≈355 días de superficie. Se propone diseñar para **539 días** (DRA 5.0). Los 730 soles del plan más los tránsitos suman 3.1 años.
2. **Arquitectura B.** Un anillo de 20 cartuchos idénticos (0.333 m², 110 kg) en el mismo Ø 4.56 m, con pasillo central.
   - **A cambio: −36 % de área de cultivo** (6.26 → 4.00 m²).
   - A cambio de la pérdida resuelve el acceso, elimina el trasvase y permite poner un lote en cuarentena.
   - La opción A, con dos anillos accesibles, necesita Ø 6.05 m y no resuelve el trasvase.
3. **Alimento.** Cubre el **2.6 %** de las kcal (2.0–3.3 %) y aporta ≈5 g de proteína de huevo por persona al día.
4. **Masa.** La ración importada (415 kg en 539 días) supera el alimento ahorrado: **+214 kg netos**.
5. **Energía.**
   - Biogás: **0.24 kWh/d químicos** (0.12–0.46), frente a los 2.864 que decía el plan.
   - Iluminación: **13.6 kWh/d**. El biogás eléctrico equivale al 0.3–1.5 % de ese consumo.
   - El módulo es consumidor neto y necesita refrigeración.
6. **Perclorato.** La salmuera sale a **20–40 mM**, en el rango inhibitorio de los metanógenos (10–20 mM), así que va a un reactor separado. El lavado inicial pide 1.8–13 m³ de agua (ISRU fuera del módulo).
7. **Agua.** Hay que condensar 8.2 L/d de transpiración.

## Decisiones vigentes

- **Propuestas pendientes de aprobación del equipo:**
  - D1: arquitectura B.
  - D2: horizonte de 539 días.
- **Propuestas técnicas:**
  - D3: reactor de salmuera separado.
  - D4: desintoxicación inicial fuera del módulo.
  - D5: liberación de lotes por análisis, no por musgo.
- **Discurso:**
  - D6: el biogás es un producto demostrativo.
  - D7: la cobertura alimentaria se comunica como 2–3 %.

La tabla de frases a retirar está en `P1-INGENIERIA.md` §8.

## Bloqueos

Siguen abiertos B1–B9 de P0: reglamento de Madrid, reto evaluado, delegación, retroalimentación del jurado, interpretación del 100 %, presupuesto, medición del sustrato, fuentes y visibilidad del repo.

Nuevos:

| # | Qué falta |
|---|---|
| B10 | Aprobación de D1–D2 por el equipo |
| B11 | Excreción específica de codorniz |
| B12 | Umbrales de liberación de ClO₄⁻ |
| B13 | Antropometría en 0.38 g |
| B14 | Consumos auxiliares y envolvente térmica |

## Siguiente acción exacta

1. **El equipo** decide D1 (B, A o C) y D2 (539 o 355 días). Sin eso, P2 no puede fijar la geometría.
2. **P2**, con la decisión tomada:
   - Generar desde el JSON la geometría del simulador (rótulos, radios, reloj) y los planos P02/P03.
   - Retirar los cinco diámetros activos.
   - Modelar el cambio de cartucho en S8 y la ruta de acceso con una figura humana.
   - Comprobar interferencias a lo largo del giro.
3. **En paralelo**, completar B11, B12 y los micronutrientes antes de redactar el pitch.

## Reproducir

```bash
git switch preparacion-madrid-p1
python3 analysis/milpa360_p1.py
python3 analysis/p0_verificacion.py
```
