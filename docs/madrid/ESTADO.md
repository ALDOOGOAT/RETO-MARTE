# ESTADO · preparación para Madrid

**Sesión:** cierre acumulado S0–S5/B19 y verificación digital S6. **Fecha:** 21 sep 2026.
**Rama:** `preparacion-madrid-p1`; base `bd3eb2f`. El commit que contiene este archivo
identifica el checkpoint. Push autorizado en esta rama, sin force-push.
**Aceptación:** candidata digital revisada; ingeniería, validación física y cierre
independiente S6 parciales. No hay evidencia para declarar «cero pendientes».

## Decisiones ejecutadas

El usuario delegó preferencias de diseño. D1/D2 quedan ratificadas: arquitectura B,
20 cartuchos, ocho estaciones y doce de cultivo; horizonte de diseño 539 días y
caso de superficie 355 días. B10 deja de ser espera de aprobación interna.
La defensa sigue separando tratamiento de salmuera, metanogénesis y cultivo; ningún
lote se autoriza por color de musgo, MFC o animación. Los umbrales analíticos requieren
método, matriz y revisión competente.

Se elige entrega digital offline como base de Madrid, con maqueta manual 1:10
opcional según recursos. No se comprometió gasto ni se presentó solicitud oficial.
El piloto exploratorio de riego en Tuxtla queda ratificado, sin fingir sitio, operador
o cosechas disponibles. Los cambios no se atribuyen a retroalimentación inexistente.

Para supervivencia se provisiona dieta completa, sin descontar cosechas, huevos ni
biogás supuestos. Se añaden 30 días de reserva como decisión revisable. El inventario
de 539 + 30 días resulta en 8,159.46 kg de alimento humano empacado y 438.36 kg de
ración animal. El empaque ya está incluido; no se suma otra vez el arranque.
No constituye un menú nutricional ni un balance completo del hábitat.

## Resultados y archivos

`CIERRE-ACUMULADO.md` dispone individualmente B1–B19, con responsable y evidencia
necesaria; incorpora decisiones, fallos, antecedentes y autorrevisión. `cierre_acumulado.py`
reutiliza P1/P2/P4 y genera JSON, `CALCULOS-CIERRE.md` y plantilla P07 de E4. La nueva
configuración mantiene unidades, evidencia y escenarios, sin convertir nulos en ceros.

El subtotal eléctrico nominal calculado es 25.26 kWh/d: luz, auxiliares y térmica
sensible del casco. Excluye vestíbulo, ISRU, deshumidificación y otras cargas; sus
potencias, U y temperaturas son hipótesis. No acredita energía total ni autonomía.
El inventario de cultivo de 40 L daría 6.35 días sin condensación/reposición bajo ET
nominal; no incluye humanos, animales, purgas ni disponibilidad de la bomba.

Se cuantificó el lavado inicial de todo el sustrato y la estequiometría ideal Cl/DQO.
Son sensibilidad y equivalentes químicos, no dosis, cinética ni descontaminación
demostrada. El estudio de tres posiciones amplía la garganta, pero necesita otro
depósito y 269.6 kg nominales sin útil: no se adopta por una apertura mayor.
B19 conserva dos casetes como candidata; sus 0.916 m dependen de herrajes supuestos.
P07, P06 y `ensayos/datos-acceso.csv` preparan el ensayo humano sin carga.

Memoria, PPTX/PDF y vídeo se actualizaron. BLEND/GLB conservan geometría S5: la
comparación contra `589ca5b` sólo encuentra cambio de identificador de revisión.
El vestíbulo B19 sigue como estudio separado. CONTEXTO, matriz, afirmaciones y
continuidad apuntan a esta revisión, conservando los antecedentes históricos.

## Evidencia y verificación

Pasaron P0, P1/P2, geometría Three, mecánica P4 y pruebas de estados P3/B19. Se
comprobó que P1 falla si falta jsonschema. Se corrigieron la omisión del visor B19
en S5 y los enlaces externos dañados por el generador PDF. Ambos visores pasaron
Chrome sin red desde extracción limpia: cero errores y cero solicitudes HTTP.
SwiftShader midió aproximadamente 0.88 FPS; no es prueba de la GPU del evento.

Se verificaron hashes y enlaces del paquete, 103 afirmaciones con 16 columnas,
nueve diapositivas, PDF renderizados y vídeo de 300 segundos decodificado completo.
La revisión visual no detectó recortes de contenido. La matriz conserva 27 obligatorios:
uno cumplido con evidencia documental, 24 parciales, uno pendiente y uno por confirmar.

Se leyeron la dinámica oficial, NASA Vol.2 §8.3–8.4, compartimentos MELiSSA y resumen/
reivindicaciones 1–6 de WO2018035314A1. No es búsqueda exhaustiva ni dictamen de novedad.
GitHub confirma repositorio público; no acredita cuándo cambió su visibilidad.

## Próxima acción exacta

Leer el registro B1–B19 antes de repetir tareas. Ejecutar `python3 analysis/cierre_acumulado.py`
y `npm test --prefix prototipo-3d` al modificar parámetros. Completar ingeniería
B14–B19 con envolventes, cargas, selección de componentes y prueba E4; incorporar
reglamento, recursos, cotizaciones y datos cuando lleguen. La revisión independiente,
ensayo de pitch y prueba de GPU/proyector siguen abiertos. No repetir la auditoría
completa ni cambiar estados para alcanzar 100%. Los cinco archivos preexistentes
del usuario permanecen intactos y fuera del commit.
