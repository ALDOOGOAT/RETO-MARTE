# Personas del simulador (V8)

**Microsoft Rocketbox Avatar Library**, © 2020 Microsoft, licencia **MIT**
([Rocketbox-LICENSE.txt](Rocketbox-LICENSE.txt)). Fuente: https://github.com/microsoft/Microsoft-Rocketbox

- Operador: `Assets/Avatars/Professions/Gardener_Male_01`. Clips `m_idle_neutral_01`,
  `m_documents_check` (motextr_static) y `m_walk_slow_01` (motextr_xy).
- Científica: `Assets/Avatars/Professions/Medical_Female_02`. Clips `f_idle_neutral_01`,
  `f_documents_check`, `f_gestic_talk_neutral_01` (fotogramas 1–420) y `f_walk_slow_01`.

Adaptación MILPA-360, reproducible con `python3 analysis/preparar_tripulacion.py`:
overol del operador recoloreado de marrón a azul pizarra y botas amarillas a gris; clips
reorientados al reposo del avatar (horneado en Blender), sin huesos faciales ni escala;
rugosidad derivada del mapa especular; texturas WebP a 1024 px; deriva de avance de la
pelvis retirada en el visor. Tableta añadida en la mano derecha.

Son figuras de referencia visual: no representan al equipo ni validan antropometría.
Altura declarada 1.75 m (operador, la que usan las cotas) y 1.68 m (científica).

El rostro escaneado de V7 (Lee Perry-Smith, CC BY 3.0; `rostro-lee-perry.js`) ya no lo
cargan los visores. Se conserva con su licencia como registro de la revisión anterior.
