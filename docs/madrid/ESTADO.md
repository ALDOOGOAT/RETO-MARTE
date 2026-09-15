# ESTADO · preparación para Madrid

**Paquete cerrado:** P0 · auditoría. Está documentada; no valida el sistema físico.
**Fecha:** 15 sep 2026 · **Base:** `c3e0ad3` · **Rama:** `preparacion-madrid-p0` (local, sin commit ni push)
**Final:** 3–5 nov 2026, Getafe. La fecha de entrega está sin confirmar.

## Archivos creados

| Archivo | Contenido |
|---|---|
| `MISION-MADRID-MILPA360.md` | Especificación maestra, transcrita del mensaje del usuario porque no existía |
| `docs/madrid/AUDITORIA.md` | Inventario con hashes, verificación del diagnóstico, 12 hallazgos críticos, fuentes y bloqueos |
| `docs/madrid/matriz-requisitos.md` | 59 requisitos: Reto Unificado, marco general, guía, criterios, Madrid y referencias NASA E/F |
| `docs/madrid/registro-afirmaciones.csv` | 57 afirmaciones con su tipo de evidencia y verificación |
| `analysis/p0_verificacion.py` | Recalcula geometría, masa, perclorato, energía, ración y la regla de tormenta leyendo las constantes del simulador |

No se modificó ningún archivo existente. Los presupuestos del usuario sin commit quedaron intactos.

## Pruebas ejecutadas

- El script pasa sus 3 aserciones: 10.288 m², 16.331 m², 2.864 kWh/d, 56 soles, y la regla de tormenta en 3 o 4 bandejas de 12.
- El CSV tiene 57 filas de 16 columnas. Todos los estados de la matriz son de los permitidos.
- No se ejecutó el simulador en navegador. No hay mediciones ni ensayos.

## Cobertura

Denominador: **27 requisitos obligatorios** del organizador.

| Estado | Nº |
|---|---:|
| Cumplido con evidencia (documental) | 1 |
| Parcial | 18 |
| Pendiente | 7 |
| Por confirmar con el organizador | 1 |

Referencias NASA: 12, ninguna con cumplimiento demostrado. La cobertura no es una probabilidad de ganar.

## Hallazgos críticos

1. **Cinco diámetros activos:** 4.56, 4.76, 3.5, 5.40 y 6.00 m, repartidos entre simulador, rótulos, documento técnico y láminas P-02 y P-03. Además, dos modelos con bandejas cuadradas.
2. **Sin acceso humano:** 0.301 m de holgura al casco, 0.062 m entre anillos y 1.76 m hasta el núcleo.
3. **Trasvase indefinido:** los sectores de 42.3° y 28.2° no son intercambiables.
4. **Percloratos:**
   - Phoenix midió ≈0.4–0.6 %, no 0.5–1 %.
   - El lavado cubre el 11.4 % de la cubeta, que contiene 664–996 g.
   - El «semáforo» de musgo es más tolerante que el cultivo, así que puede dar falsos «apto».
5. **Energía:**
   - El 0.24 m³/kg no aparece en la guía FAO citada.
   - Los 2.864 kWh/d son energía química; como electricidad serían ≈1.15 kWh/d brutos.
   - Se habla de autosuficiencia sin ningún consumo calculado.
6. **Sin balance de masa:** la ración de las aves, 403 kg en 730 días, no se contabiliza.
7. **Normativa:** en Rev. F el polvo marciano es V2 6253 (<0.1 mg/m³, ≤30 días), y los documentos usan 0.3. HEPA es un enfoque histórico, no un requisito.
8. **Precedentes inexactos:**
   - Lunar Palace 1 regeneró el 55 % del alimento; no cierra al 97 %.
   - MELiSSA no tiene animales.
   - BSF sobre estiércol de codorniz: 62.49 % de degradación en base seca.
9. **Simulador:** el «25 %» es una regla de posición que da 25 o 33 %. Las plantas reviven y el caso «100 % sincronizado» no se simula.
10. **Alcance:**
    - El «100 %» exigido se refiere a los residuos de la Parte 1.
    - La misión dura ~2 años en total; operar 730 soles (≈750 días) en superficie es decisión del equipo.

## Decisiones vigentes

- P0 no corrige documentos. Las correcciones saldrán de una **fuente única de parámetros** en P1.
- Se conserva el concepto clasificado. Hay que rediseñar acceso, trasvase y tratamiento, no abandonarlo.
- La referencia normativa es la **Rev. F**, citando el anexo E del concurso donde difiera.

## Bloqueos (detalle en AUDITORIA §5)

| # | Qué falta | Quién |
|---|---|---|
| B1 | Reglamento, rúbrica, formato y fecha de entrega de Madrid | Organizador |
| B2 | Qué reto se evalúa | Organizador |
| B3 | Delegación autorizada | Organizador |
| B4 | Retroalimentación del jurado local | Equipo |
| B5 | Interpretación del «100 %» | Organizador |
| B6 | Presupuesto máximo | Equipo |
| B7 | Densidad y humedad del sustrato | Medición |
| B8 | Origen de seis cifras críticas | Fuentes |
| B9 | Visibilidad del repositorio | Usuario |

## Siguiente acción: P1

1. Crear `config/milpa360.parameters.json` con esquema. `analysis/` debe leerlo en lugar del HTML.
2. Resolver geometría con acceso y trasvase comparando tres opciones: (a) actual con pasillo, (b) lotes con tratamiento separado, (c) versión más simple.
3. Hacer los balances de masa, agua y energía en tres escenarios, incluidas ración importada y consumos.
4. Calcular kcal y proteína por persona, y las provisiones de arranque.
5. Justificar el escenario temporal.
6. Leer las fuentes pendientes: DPRB y metanogénesis, lavado de perclorato, biogás de gallinaza por kg de SV y cifras de codorniz.

## Reproducir

```bash
git switch preparacion-madrid-p0
python3 analysis/p0_verificacion.py
python3 -c "import csv;r=list(csv.reader(open('docs/madrid/registro-afirmaciones.csv')));print(len(r)-1,{len(x) for x in r})"
```
