# Resultados del cierre acumulado

Revisión S5-CIERRE-2026-09-21. Generado por `python3 analysis/cierre_acumulado.py`.
Todos son cálculos sobre literatura o supuestos; no resultados de ensayo.

## Provisiones sin crédito por cosecha

| Superficie + reserva d | kcal humanas | kg alimento empacado | kg ración animal |
|---|---:|---:|---:|
| 355 + 30 | 7010850 | 5520.90 | 296.60 |
| 539 + 30 | 10361490 | 8159.46 | 438.36 |

El factor 2.39 kg/persona/día procede de ICES-2019-126 p.2/BVAD y contiene 0.43 kg de empaque. No es un menú. Incluye el arranque dentro del horizonte; no sumar otros 85 días. Tránsito y reservas del hábitat completo se presupuestan aparte. No descontar los alimentos de MILPA hasta validarlos.

## Electricidad y térmica del casco nominal

| Escenario | Luz kWh/d | Auxiliares kWh/d | HVAC sensible kWh/d | Subtotal modelado kWh/d | kWh/sol | Pico sin HVAC kW |
|---|---:|---:|---:|---:|---:|---:|
| conservador | 14.887 | 7.280 | 64.089 | 86.257 | 88.629 | 1.292 |
| nominal | 10.476 | 3.380 | 11.404 | 25.261 | 25.956 | 0.817 |
| favorable | 9.429 | 1.445 | 1.468 | 12.342 | 12.681 | 0.659 |

E = P × horas/1000. Transmisión = U × área × (Tinterior − Texterior) × 24/1000. Se compara con disipación eléctrica, sin añadirla otra vez a la carga total. Calefacción resistiva; frío sensible/COP. Crédito eléctrico del biogás: cero hasta seleccionar conversión y auxiliares. El calor recuperable es sólo un techo por eficiencia supuesta.

Este subtotal excluye vestíbulo, esclusas, puentes térmicos, radiación solar, infiltración, metabolismo, tratamiento ISRU y dimensionado de deshumidificación. Los escenarios no representan una climatología ni probabilidades. No sirve para comprar HVAC o dimensionar un sistema de soporte vital.

## Agua de cultivo

| Cálculo | Valor |
|---|---:|
| transpiracion_L_d | 6.302 |
| reposicion_por_ET_L_d | 1.260 |
| autonomia_inventario_sin_reposicion_d | 31.734 |
| autonomia_sin_condensador_ni_reposicion_d | 6.347 |
| reserva_72h_ET_L | 3.781 |
| reserva_72h_sin_condensador_L | 18.907 |

No incluye limpieza, purga, agua animal ni consumo humano; una bomba fallada puede impedir usar el depósito.

## Tratamiento inicial de todo el sustrato

| Escenario | kg sustrato | kg ClO4 inicial | Lavado 1–5 L/kg: L | kg Cl ideal | kg DQO teórica |
|---|---:|---:|---:|---:|---:|
| conservador | 2036.6 | 20.366 | 2037–10183 | 7.260 | 13.106 |
| nominal | 1697.2 | 8.486 | 1697–8486 | 3.025 | 5.461 |
| favorable | 1357.7 | 5.431 | 1358–6789 | 1.936 | 3.495 |

ClO4− requiere 8 electrones/mol: equivalente ideal de 2 mol O2 (64 g) por mol. El cloro se conserva como cloruro (35.45 g/mol). No son dosis de reactivo: aceptores competidores, crecimiento, inhibición, contaminantes y purga deben medirse. L/S=1–5 es sensibilidad, no protocolo de descontaminación. No se puede calcular volumen útil del biorreactor de salmuera sin caudal y tiempo de tratamiento verificados.

## Alternativas de acceso

| Posiciones retiradas | Paso bruto m | Con 50 mm/lado m | kg sin útil | Cultivo restante m² | Depósito y trayectoria |
|---|---:|---:|---:|---:|---|
| 2 | 0.976 | 0.876 | 179.7 | 2.5715 | B19 digital |
| 3 | 1.435 | 1.335 | 269.6 | 2.3143 | Sin resolver: no adoptada |

Tres posiciones mejoran la garganta pero aumentan carga y exigen otro almacén. Un anillo fijo abierto evita el cruce, pero cambia transporte y ciclo. La decisión de esta revisión conserva B como concepto y B19 como estudio condicionado; no autoriza construir ni ocupar el módulo. Ampliar un hueco por sí solo no demuestra evacuación.
