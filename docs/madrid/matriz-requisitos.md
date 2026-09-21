# Matriz de requisitos — MILPA-360 · P0

**Corte original:** commit `c3e0ad3`, 15 sep 2026 · **evidencia actualizada hasta S5, 21 sep 2026 UTC**, con `analysis/milpa360_p1.py` y [`P5-DEFENSA.md`](P5-DEFENSA.md). Evidencia y cálculos en [`AUDITORIA.md`](AUDITORIA.md) y
`python3 analysis/p0_verificacion.py`.

**Estados permitidos:** cumplido con evidencia · parcial · pendiente · no aplicable justificado · por confirmar con organizador.

**Regla:** una casilla «✔» en un documento del equipo **no** cuenta como evidencia. «Cumplido con evidencia (documental)» significa que el
requisito es estructural y el diseño lo satisface por construcción. No significa validación física.

**Responsables:** propuestos según los roles de `PLAN-MAESTRO §3`; el CEO debe confirmarlos.

**Precedencia:** reglamento de Madrid (no disponible) > Reto Unificado UNACH > marco general EL RETO > Guía del Participante > anexos técnicos
(referencia de diseño, salvo adopción expresa del organizador).

## A · Reto Unificado UNACH (`El Reto Mars Challenge 2026 UNACH (1).pdf`, autoridad: organizador local, jul 2026)

| ID | Texto / paráfrasis fiel | Fuente y pág. | Autoridad / rev. | Oblig. o ejemplo | Subsistema | Método de verificación | Evidencia | Estado | Brecha | Responsable |
|---|---|---|---|---|---|---|---|---|---|---|
| RU-01 | «plantas y animales van a trabajar juntos para que nada se desperdicie: lo que uno produce, el otro lo usa» | p.1 | UNACH 2026 | Obligatorio | Sistema | Balance de masa por flujo | P1/S3 y CALCULOS-CIERRE: reparto diario, agua y tratamiento inicial (CALC) | parcial | Balances completos de C/N/P/K, humedad, purgas y mediciones siguen abiertos | Ing. Soporte Vital |
| RU-02 | Lograr al mismo tiempo recuperar el suelo, eliminar la basura y producir comida estable, con las tres partes conectadas | p.1 | UNACH 2026 | Obligatorio | Sistema | Revisión de interfaces con caudales y tiempos | P1/P4: flujo diario y HRT candidato; P04/P05 vigentes; CIERRE-ACUMULADO | parcial | Caudales reales, capacidad de salmuera y compatibilidad sanitaria sin validar | Ing. Soporte Vital |
| RU-03 | «de él depende directamente la alimentación de la tripulación, que no puede recibir reabastecimiento» | p.1 | UNACH 2026 | Obligatorio (condición de diseño) | Cultivo · Aviario | Balance de kcal, proteína y micronutrientes por persona; provisiones de arranque | P1/S3: 2.46% kcal; CALCULOS-CIERRE: provisiones completas + 30 d sin crédito por cosecha | parcial | Inventario logístico calculado; faltan menú/micronutrientes, almacenamiento y validación de producción | CMO + Ing. Soporte Vital |
| RU-P1-01 | Animales en espacio pequeño y controlado que ayuden a mejorar el suelo en vez de dañarlo | p.1 | UNACH 2026 | Obligatorio | Aviario · Sustrato | Indicadores de suelo antes y después (MO, N, P, K, CE, ClO₄⁻) en ensayo | Protocolo E5 definido en CIERRE-ACUMULADO; no hay datos físicos | pendiente | Faltan resultados de suelo/cultivo y criterio sanitario del laboratorio | Científico Planetario |
| RU-P1-02 | «por ejemplo, moviéndolos de forma rotativa para que su estiércol fertilice sin agotar el terreno» | p.1 | UNACH 2026 | **Ejemplo** | Carrusel | Cálculo cinemático y carga de nutrientes por bandeja | P2/S0: 160 soles por vuelta y 152 fuera del aviario (CALC); no prueba regeneración | parcial | Rotar el sustrato es interpretación del equipo, no obligación; falta la carga de N por bandeja | Ing. Soporte Vital |
| RU-P1-03 | «No puedes traer suelo fértil desde la Tierra, así que tienes que crearlo ahí mismo» | p.1 | UNACH 2026 | Obligatorio (restricción) | Sustrato | Lista de insumos importados frente a in situ, con masas | Regolito in situ supuesto; inóculos, semillas y ración importados | parcial | Extracción, tratamiento y masa importada no contabilizados | Científico Planetario |
| RU-P2-01 | Mecanismo que «tome el 100% de esos residuos de la Parte 1» (excremento, agua sucia) | p.1 | UNACH 2026 | Obligatorio | Tratamiento | Balance por flujo: generado → captado → tratado → recuperado útil → descarte controlado | P1: estiércol de 0.06–0.17 kg SV/d y ruta aviario → larvas → digestor sin doble conteo (CALC) | parcial | **Se conserva el literal.** Interpretación operacional por confirmar (B5). El PLAN amplía el alcance a aguas negras y rastrojo | Ing. Soporte Vital |
| RU-P2-02 | Convertir esos residuos en **energía (biogás)** | p.1 | UNACH 2026 | Obligatorio | Digestor | Cálculo con base de sustrato coherente (SV/MS/húmedo), luego ensayo | P1/S3: 0.199 kWh químicos/d; CIERRE: auxiliares y cero crédito eléctrico para abastecimiento | parcial | Conversión útil, rendimientos de mezcla y potencias reales requieren equipo/ensayo | Ing. Soporte Vital |
| RU-P2-03 | …y en **abono para las plantas** | p.1 | UNACH 2026 | Obligatorio | Larvario · Digestor | Caracterización de NPK, sales y patógenos; criterio sanitario de reintegración | Estiércol de codorniz con 5.21 % N (Diola 2024, base seca); frass y digestato sin caracterizar | parcial | Sin criterios sanitarios ni caracterización propia | Científico Planetario |
| RU-P2-04 | «puede ser un biodigestor o compostaje con microorganismos» | p.1 | UNACH 2026 | **Ejemplo** | Tratamiento | Revisión documental | D3: digestor y reactor de salmuera separados; BSF (P1) | cumplido con evidencia | Ninguna sobre la elección; la viabilidad está en RU-P2-02/03 | — |
| RU-P3-01 | Usar la energía y el abono de la Parte 2 para alimentar la zona de cultivo | p.2 | UNACH 2026 | Obligatorio | Cultivo | Balance de energía por subsistema; ruta digestato → riego con dosis | P04 vigente; CIERRE-ACUMULADO: vía térmica externa preferida y retención de digestato | parcial | Aprovechamiento del gas y dosis sanitaria siguen sin demostrar | Ing. Soporte Vital |
| RU-P3-02 | «Propón sensores baratos, mezclar varios cultivos resistentes, o un riego muy eficiente» | p.2 | UNACH 2026 | **Ejemplo** (medios sugeridos) | Cultivo · Control | Especificación y prueba | Goteo sobre pivote; DLI por especie en config; escenarios de fotoperiodo y potencia | parcial | Caudal/pérdidas reales, variedades y sensores aún sin validar | UX/UI + Ing. Soporte Vital |
| RU-P3-03 | Producción de alimento **estable** aunque el clima sea difícil | p.2 | UNACH 2026 | Obligatorio | Cultivo | Modelo por estados con recursos iguales; siembra escalonada frente a sincronizada | P3: estado persistente, fallos y comparación con igual recurso (ILUS); pruebas Node/Chrome | parcial | Regla de daño no calibrada; falta térmica y validación agronómica | Ing. Soporte Vital |
| RU-RC-01 | P1 → P2 → P3 encadenadas; «No se aceptan proyectos que resuelvan solo una parte» | p.2 | UNACH 2026 | Obligatorio (eliminatorio) | Sistema | Revisión de interfaces | PLAN §4 y §7: las tres partes están conectadas por diseño | cumplido con evidencia | Flujos sin cuantificar (ver RU-02) | CEO |
| RU-E1 | Entregable: diseño del sistema animal-vegetal (cómo se conectan las tres partes) | p.2 | UNACH 2026 | Obligatorio | Memoria · Prototipo | Revisión documental con geometría única | P2-GEOMETRIA.md; P02–P03 generadas; simulador con anillo único | parcial | P02/P03 y anillo derivan del JSON; documentos y láminas antiguos señalados como históricos. S3 separa piso/cama y área útil; entrada, mantenimiento y validación física pendientes (B15–B19) | UX/UI |
| RU-E2 | Entregable: cómo se convierte el residuo en energía y abono | p.2 | UNACH 2026 | Obligatorio | Memoria | Revisión documental y cálculos | P1/S3, P05 vigente y CALCULOS-CIERRE: tratamiento completo, Cl y DQO ideal | parcial | Faltan cinética/eficiencia de salmuera, purga, dosis y acondicionamiento sanitario | Científico Planetario |
| RU-E3 | Entregable: cómo la zona de cultivo resiste el clima extremo | p.2 | UNACH 2026 | Obligatorio | Memoria | Revisión documental y modelo | P3: polvo reduce electricidad/luz; CALCULOS-CIERRE: transmisión térmica y auxiliares | parcial | U/temperaturas son escenarios; faltan envolvente/equipos, radiación y ensayo agronómico | Científico Planetario |
| RU-E4 | Entregable: explicación simple de por qué, si falla una parte, falla todo | p.2 | UNACH 2026 | Obligatorio | Memoria | Revisión documental; tiempos calculados | CIERRE-ACUMULADO §4: fallos por mecanismo, recursos y recuperación; modelo P3 | parcial | Reservas digitales y lógica verificadas; sin tiempos reales de supervivencia ni pruebas físicas | Ing. Soporte Vital |
| RU-T-01 | Retorno: en Chiapas, ganadería extensiva que degrada el suelo, residuos avícolas y porcícolas en el agua, clima que afecta café y maíz | p.2 | UNACH 2026 | Obligatorio (junto con G-C9) | Retorno | Caso piloto concreto con indicador base | S4 propone huerto Tuxtla y comparación de riego; INEGI CA2022 lámina 15 leída | parcial | Sitio/operador y línea base pendientes; banco hidráulico no valida tratamiento pecuario ni café/maíz | CMO + Científico Planetario |

## B · Marco general (`EL RETO .pdf`, organizador global; Guía Anexo A p.32)

| ID | Texto / paráfrasis fiel | Fuente y pág. | Autoridad / rev. | Oblig. o ejemplo | Subsistema | Método de verificación | Evidencia | Estado | Brecha | Responsable |
|---|---|---|---|---|---|---|---|---|---|---|
| MG-01 | Mantener con vida a una tripulación de **6 personas** | p.1 | Mars Challenge 2026 | Obligatorio (escenario) | Sistema | Cálculos por persona | P1/S3: aporte complementario; CALCULOS-CIERRE: provisiones completas de seis personas | parcial | Menú, micronutrientes, almacenamiento y soporte vital del hábitat no validados | Ing. Soporte Vital |
| MG-02 | Misión de ida y vuelta de «aprox. 2 años, no porque vivan 2 años en Marte» | p.1; Guía p.32 | Mars Challenge 2026 | Obligatorio (escenario) | Operación | Definir fases (tránsito y superficie) y justificar la duración operativa | D2 ratificada por delegación, 21 sep: 539 d de diseño y caso bases 355 d | parcial | Confirmación del escenario aplicable por el organizador; 355 d es cálculo, no literal de bases | Científico Planetario |
| MG-03 | Recursos muy limitados, entorno hostil, aislamiento prolongado, cero margen de error | p.1; Guía p.32 | Mars Challenge 2026 | Obligatorio | Sistema | Análisis de modos de falla, reservas y recuperación | CIERRE-ACUMULADO: tabla de fallos, reservas alimentarias y agua con límites | parcial | FMEA preliminar sin frecuencias; faltan equipos y respuesta física | Ing. Soporte Vital |
| MG-04 | Explicar el «camino de regreso» a la Tierra | p.1 | Mars Challenge 2026 | Obligatorio | Retorno | Ver RU-T-01 | PLAN §9 | parcial | Ver RU-T-01 | CMO |
| MG-05 | Desafío 7: «al menos tres componentes biológicos conectados» | pp.3–4 | Mars Challenge 2026 | Solo si aplica el desafío 7 | Sistema | Revisión documental | 5 componentes (PLAN R1) | por confirmar con organizador | Falta saber si Madrid evalúa contra el reto general o el Reto Unificado (B2) | CEO |

## C · Guía del Participante: entregables y proceso (`Guia…FINAL.docx (4).pdf`)

| ID | Texto / paráfrasis fiel | Fuente y pág. | Autoridad / rev. | Oblig. o ejemplo | Subsistema | Método de verificación | Evidencia | Estado | Brecha | Responsable |
|---|---|---|---|---|---|---|---|---|---|---|
| G-01 | **Documento Concepto:** registro del proceso con fotos del trabajo físico, investigación, ideas descartadas y por qué, retroalimentación y cómo se aplicó, aprendizaje | pp.2–3, 35 | Guía TGJ 2026 | Obligatorio | Documentación | Revisión documental | P5-DEFENSA.md §7 consolida cronología, decisiones y aprendizaje | parcial | Sin fotos de ensayo físico ni retroalimentación real del jurado (B4) | Comunicaciones |
| G-02 | **Prototipo esquemático** con fotos del proceso, bocetos y versiones anteriores | pp.3, 20–22 | Guía TGJ 2026 | Obligatorio | Prototipo | Revisión y prueba de comprensión por terceros | Simulador/Blender S5, P02/P03 paramétricos, flujos en planos/madrid y comparación S3/S5 | parcial | B15–B19 abiertos; los renders son digitales y no hay fotos de ensayo físico | UX/UI |
| G-03 | «Cualquiera que lo vea entiende qué hace y para quién es — sin que el equipo tenga que explicarlo» | p.21 | Guía TGJ 2026 | Criterio de preparación | Prototipo | Prueba cronometrada con personas ajenas | — | pendiente | Sin prueba con usuarios | UX/UI |
| G-04 | **Presentación de 5 min:** apertura → problema con datos → solución → prototipo → viabilidad → retorno | pp.3, 24 | Guía TGJ 2026 | Obligatorio | Presentación | Ensayo cronometrado y trazabilidad de cada afirmación | Deck S5 de 9 diapositivas; guion y trazabilidad P5-DEFENSA.md §8–10 | parcial | Falta ensayo humano cronometrado y formato Madrid; no afirma autosuficiencia ni validación | UX/UI 2 + Comunicaciones |
| G-05 | **Video obligatorio** (presencial y virtual) | pp.3, 24, 28 | Guía TGJ 2026 | Obligatorio | Presentación | Archivo, duración y URL activa | RESPALDO-PITCH-S5.mp4, 300 s sin audio, para narrar en vivo | parcial | No es vídeo oficial aprobado; falta formato Madrid, narración y publicación autorizada (B1) | UX/UI 2 |
| G-06 | Final: «Hasta 5 minutos de presentación», preguntas del jurado, prototipo visible | p.30 | Guía TGJ 2026 (formato local) | Obligatorio localmente | Presentación | — | — | por confirmar con organizador | El formato de Madrid es desconocido (B1) | CEO |
| G-07 | ODS: 1 a 5, cada uno con dónde aplica **y dónde no** | pp.22–23 | Guía TGJ 2026 | Obligatorio | Retorno | Revisión de cada justificación contra datos | P5-DEFENSA.md §6: ODS 2, 6 y 12 con aplicación y límites | parcial | Beneficios del piloto aún sin mediciones; no acredita tratar el 100% ni sustituir ración animal | Científico Planetario |
| G-08 | Problemática respaldada con **datos duros** verificables | p.15 | Guía TGJ 2026 | Obligatorio | Documentación | Registro de afirmaciones con fuente leída | `registro-afirmaciones.csv` (P0) | parcial | Varios datos discrepantes o sin fuente primaria (AUD C4, C5, C8) | Ing. Soporte Vital |
| G-09 | IA permitida para el prototipo; empezar con bocetos a lápiz y subir ambos | p.20 | Guía TGJ 2026 | Recomendación | Prototipo | — | Sin bocetos a mano en el repo | pendiente | Política de IA de Madrid por confirmar (B1) | UX/UI |

## D · Criterios de evaluación (Guía p.31, nueve criterios de igual peso, sin pesos nuevos)

El jurado evalúa estos criterios; no se «cumplen». El estado refleja la **preparación verificable**.

| ID | Criterio (qué observa el jurado) | Fuente y pág. | Autoridad / rev. | Oblig. o ejemplo | Subsistema | Método de verificación | Evidencia | Estado | Brecha | Responsable |
|---|---|---|---|---|---|---|---|---|---|---|
| G-C1 | Impacto: diferencia real en la vida de las personas, en Marte y en la Tierra | p.31 | Guía TGJ 2026 | Criterio | Sistema | Cifra de aporte alimentario y caso piloto | P5: 2.46% kcal calculadas; piloto Tuxtla en P4-PRESUPUESTO-CHIAPAS.md | parcial | Aporte e impacto sin medir; sitio/operador pendientes. RU-03 y RU-T-01 | CMO |
| G-C2 | Creatividad: original, más allá de lo obvio | p.31 | Guía TGJ 2026 | Criterio | Sistema | Tabla de antecedentes y rasgos compartidos o diferentes | CIERRE-ACUMULADO §5: comparación WO2018035314A1/MELiSSA y ensayo de ventaja | parcial | Búsqueda acotada; no acredita novedad, actividad inventiva ni ventaja medida | Científico Planetario |
| G-C3 | Diseño: bien pensado; el prototipo comunica cómo funciona | p.31 | Guía TGJ 2026 | Criterio | Prototipo | Geometría única, acceso y trasvase explicables | P02/P03, P04/P05, Three/Blender y deck S5; candidato B19 con visor, cálculo continuo y P06 | parcial | Paso B19 condicionado a herrajes; vestíbulo adicional. Equipos, carga, rescate y comprensión por terceros pendientes | UX/UI |
| G-C4 | Culminación: proceso completo, coherente y profundo | p.31 | Guía TGJ 2026 | Criterio | Documentación | Documento Concepto y versión congelada | Historial de fases | parcial | G-01 | CEO |
| G-C5 | Aprendizaje real a lo largo del proceso | p.31 | Guía TGJ 2026 | Criterio | Documentación | Registro de cambios con motivo y evidencia | P5-DEFENSA.md §7: decisiones P0–S5 con motivos y límites | parcial | Falta retroalimentación real del jurado y su aplicación (B4) | Comunicaciones |
| G-C6 | Validez: problemática respaldada con datos; pertinente, viable, implementable | p.31 | Guía TGJ 2026 | Criterio | Documentación | Registro de afirmaciones depurado | Registro actualizado P0–S5 y cálculos reproducibles | parcial | G-08; parámetros biológicos y mecánicos sin validación física | Ing. Soporte Vital |
| G-C7 | Relevancia técnica: viable en el contexto de Marte | p.31 | Guía TGJ 2026 | Criterio | Sistema | Balances, normativa aplicable y límites | — | pendiente | C4, C5, C6, C7 | Ing. Soporte Vital |
| G-C8 | Presentación clara y convincente en 5 minutos | p.31 | Guía TGJ 2026 | Criterio | Presentación | Ensayos cronometrados ante personas ajenas | Deck actual | parcial | G-04 | Comunicaciones |
| G-C9 | Retorno a la humanidad: contribución significativa a la Tierra | p.31 | Guía TGJ 2026 | Criterio | Retorno | Caso piloto con indicador base | P4-PRESUPUESTO-CHIAPAS.md §5; comparación y presupuesto preliminares | parcial | RU-T-01: sin línea base ni resultados reales | CMO |

## E · Final de Madrid (organizador internacional)

| ID | Texto / paráfrasis fiel | Fuente y pág. | Autoridad / rev. | Oblig. o ejemplo | Subsistema | Método de verificación | Evidencia | Estado | Brecha | Responsable |
|---|---|---|---|---|---|---|---|---|---|---|
| M-01 | The Grand Jam 2026, «3–5 de noviembre de 2026 · Getafe · Comunidad de Madrid» | thegrandjam2026.mars-challenge.com (15 sep 2026) | Organizador (web) | Dato de referencia | Logística | Confirmación escrita | Web; la página de España también dice «Final Internacional en Octubre de 2026» | por confirmar con organizador | Incoherencia en la web; falta la fecha límite de entregables | CEO |
| M-02 | Reglamento y rúbrica de la final, y su precedencia sobre la guía local | — | — | Obligatorio (desconocido) | Todos | Documento oficial | No disponible | por confirmar con organizador | B1 | CEO |
| M-03 | Integrantes autorizados de la delegación y número de presentadores | — | — | Obligatorio (desconocido) | Logística | Documento oficial | README: 6 integrantes | por confirmar con organizador | B3 | CEO |
| M-04 | Formato de memoria, idioma, pitch, preguntas, video, IA y exposición («Divergence Global Expo») | mars-challenge.com/espana | Organizador (web) | Obligatorio (desconocido) | Presentación | Documento oficial | Solo menciona presentaciones, preguntas, prototipos y expo | por confirmar con organizador | B1 | Comunicaciones |
| M-05 | Evidencia de qué cambió tras la retroalimentación del jurado | Guía pp.26–29 | Guía TGJ 2026 | Obligatorio (proceso) | Documentación | Registro fechado | No hay en el repo | pendiente | B4 | Comunicaciones |

## F · Referencias técnicas de diseño (anexo ECLSS del concurso = Rev. E; comparado con NASA-STD-3001 Vol. 2 Rev. F)

**No son reglas del concurso salvo adopción expresa.** El estado indica si el cumplimiento está **demostrado**.

| ID | Texto / paráfrasis fiel | Fuente y pág. | Autoridad / rev. | Oblig. o ejemplo | Subsistema | Método de verificación | Evidencia | Estado | Brecha | Responsable |
|---|---|---|---|---|---|---|---|---|---|---|
| N-01 | ppCO₂ ≤ 3 mmHg, promedio de 1 h [V2 6004] | Anexo p.1 | Rev. E (anexo); F sin comparar | Referencia de diseño | Aviario · Cabina | Balance de CO₂ con ventilación | «La fotosíntesis compensa» (HIP) | pendiente | Sin cálculo | Ing. Soporte Vital |
| N-02 | Salud 18 °C/75 % HR a 27 °C/25 % HR; desempeño ~20–25 °C y 30–60 % HR [6012/6013] | Anexo p.1 | Rev. E | Referencia (cabina humana) | Cabina | Separar microclimas | El PLAN aplica el confort humano al cultivo | pendiente | Aviario, cultivo y digestor necesitan rangos propios | Científico Planetario |
| N-03 | Contaminantes gaseosos bajo SMAC (JSC-20584) [6050] | Anexo p.2 | Rev. E | Referencia | Aviario · Digestor | Emisiones de NH₃, H₂S y CH₄, y monitoreo | — | pendiente | Sin balance de emisiones; H₂S del biogás sin tratar | Ing. Soporte Vital |
| N-04 | Polvo total < 3 mg/m³; respirable < 1 mg/m³ [6052] | Anexo p.2; F §6.2.8.2 p.62 | E = F (texto equivalente) | Referencia | Aviario | Tasa de generación y remoción | — | pendiente | Sin cálculo | Ing. Soporte Vital |
| N-05 | **Polvo marciano.** Anexo (E): 6053 «Lunar/Martian <0.3 mg/m³, hasta 6 meses intermitente». **F: 6253 <0.1 mg/m³ promedio ponderado, escenarios ≤30 días**; 6053 queda solo para lunar | Anexo p.2; F §6.2.8.3–6.2.8.4 pp.63–64 | **E (concurso) vs F (NASA vigente)** | Referencia | Carrusel · Sustrato | Medir resuspensión en ensayo; declarar alcance temporal | Los documentos mezclan 0.3 y 0.1 (AUD C7) | pendiente | F no cubre >30 días y pide reevaluar estancias largas; tampoco cubre la captación de perclorato por cultivos | Científico Planetario |
| N-06 | Aire microbiológicamente seguro [6059]; HEPA 99.97 % a 0.3 µm es el **enfoque histórico** citado | Anexo p.2; F §6.2.8.5 p.64 | E / F | Referencia | Aviario · Digestor | Caudal, renovaciones y muestreo | Los documentos presentan HEPA como requisito cumplido | pendiente | Mal atribuido | Ing. Soporte Vital |
| N-07 | Ventilación de 4.57 a 36.58 m/min, sin bolsas de CO₂ ni térmicas [6107] | Anexo p.2 | Rev. E | Referencia | Módulo | Cálculo de caudal | — | pendiente | Sin cálculo | Ing. Soporte Vital |
| N-08 | Registro continuo, visualización y alerta local y remota de presión, HR, T, ppO₂ y ppCO₂ por compartimento [6020–6022] | Anexo p.2 | Rev. E | Referencia | Control | Arquitectura de sensores | La MFC no mide esas variables | pendiente | Sin sensores especificados | Ing. Soporte Vital |
| N-09 | Monitorear y alertar sobre polvo celeste [6153] | Anexo p.2; F §6.2.6.5 p.60 | E / F | Referencia | Control | Sensor de partículas | — | pendiente | Sin sensor | Ing. Soporte Vital |
| N-10 | Monitoreo en tiempo real de productos de combustión (CO, HCN, HCl, HF) [6024] | Anexo p.2 | Rev. E | Referencia | Uso del biogás | Diseño del equipo de aprovechamiento | S0 retira la llama abierta; aprovechamiento de gas aislado por diseñar | pendiente | Combustión en cabina sin diseño | Ing. Soporte Vital |
| N-11 | Agua potable segura en el punto de uso [6026]; control de contaminación [6051]; mínimo 2.5 L/tripulante/día [Tabla 6.3-1] | Anexo p.2 | Rev. E (F sin comparar) | Referencia | Agua | Separar los circuitos de riego y potable | El PLAN declara el circuito de riego «no potable» | parcial | Sin balance de agua | Ing. Soporte Vital |
| N-12 | Ruido NC-40 en zonas de sueño (>30 d) [6079]; NC-50 en trabajo [6078]; dosis ≤ 100 [6115] | Anexo p.3 | Rev. E | Referencia | Aviario · Motor | Niveles en dB de las fuentes | «Las codornices cantan» (HIP) | pendiente | Sin datos de nivel sonoro | UX/UI |

## Cobertura (definición y conteo)

**Denominador:** requisitos marcados **obligatorios** en las secciones A, B y C que ya están documentados por el organizador. Son **27**:

- 16 del Reto Unificado. Se excluyen los tres ejemplos RU-P1-02, RU-P2-04 y RU-P3-02.
- 4 del marco general. Se excluye el condicional MG-05.
- 7 de la guía. Se excluyen G-03 (preparación) y G-09 (recomendación).

Criterios, requisitos de Madrid y referencias NASA van aparte porque no son requisitos verificables del mismo tipo.

| Estado | Nº | % de 27 |
|---|---:|---:|
| cumplido con evidencia | 1 (RU-RC-01) | 3.7 % |
| parcial | 24 | 88.9 % |
| pendiente | 1 | 3.7 % |
| por confirmar con organizador | 1 (G-06) | 3.7 % |
| no aplicable justificado | 0 | 0 % |

La cobertura **no** mide la probabilidad de ganar ni la validez científica.
«Parcial» significa que existe un documento o diseño que responde al requisito, pero sin la evidencia que pide su método de verificación.

- **Madrid (E):** 5 requisitos. Estados: 4 por confirmar con organizador, 1 pendiente.
- **Referencias NASA (F):** 12 revisadas. Estados: 11 pendientes, 1 parcial, 0 con cumplimiento demostrado.
