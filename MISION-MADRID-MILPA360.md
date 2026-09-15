# MILPA-360: misión de preparación para Madrid

> **Nota de archivo.** Transcrito el 15 sep 2026 desde el mensaje del usuario a Claude Code, porque
> el archivo no existía en el repositorio. Las tablas se pasaron a formato Markdown; el contenido
> no se modificó. Es una especificación de trabajo, **no** una fuente científica: sus hallazgos se
> verificaron en `docs/madrid/AUDITORIA.md`.

Equipo: BioMars Chiapas. Responsable: Aldo Fabio Contreras Marroquín.
Preparado: 14 de septiembre de 2026. Horizonte de trabajo: 30 días.
Repositorio: https://github.com/ALDOOGOAT/RETO-MARTE
Corte revisado: c3e0ad3aae5f39214204d9a96c6e3a436e9944e7, rama master.

Este archivo contiene un diagnóstico, una guía de uso y el prompt maestro para mejorar el proyecto con Codex/Astra o Claude Code/Opus. Es una especificación de trabajo; no acredita que el sistema esté validado, que el presupuesto esté cotizado ni que la solución sea patentable. El pase a la final se toma como información confirmada por el equipo.

## 1. Cómo usar este archivo

Guárdalo con este mismo nombre en la raíz de tu copia local del repositorio, junto a README.md. Abre Codex o Claude Code desde esa carpeta, para que pueda leer las fuentes y editar los archivos reales. No pegues todo el repositorio en el chat ni repitas este documento en cada mensaje.

En Ubuntu, sustituyendo la ruta por la ubicación real:

```bash
cd /ruta/real/RETO-MARTE
codex
```

Dentro de Codex, usa /model para seleccionar GPT-6 Astra si está disponible en tu cuenta. Mi propuesta de uso es high para la auditoría y las decisiones de arquitectura, y medium para implementación acotada. Reserva esfuerzos superiores para una contradicción difícil que cambie el diseño. Estos niveles son una estrategia de trabajo, no una garantía de calidad. La selección de modelo y esfuerzo está documentada en Codex CLI; las capacidades de Astra aparecen en su ficha oficial.

Alternativa con Claude Code:

```bash
cd /ruta/real/RETO-MARTE
claude --model opus
```

Para alternar planificación y ejecución, Claude documenta `claude --model opusplan`: usa Opus durante el modo de planificación y Sonnet durante ejecución. Comprueba la versión instalada y el modelo efectivo; los alias cambian por proveedor. También puedes elegir explícitamente Opus para revisión y Sonnet para cambios delimitados. Configuración oficial de modelos de Claude Code.

Mensaje inicial para pegar dentro del agente:

> Lee MISION-MADRID-MILPA360.md. Usa la sección 5 como especificación maestra y ejecuta ahora el paquete P0 completo. Lee los documentos oficiales originales y el código necesario, verifica los hallazgos de la sección 2, crea los entregables de auditoría y deja un checkpoint útil. No te limites a proponer un plan. Trabaja sobre una rama local segura y conserva mis cambios existentes. Para la ciencia, distingue evidencia, cálculo, hipótesis y datos faltantes. Si falta una confirmación del organizador o una medición física, documenta ese bloqueo y sigue con el trabajo independiente. Al terminar resume los hallazgos críticos, los archivos creados y el siguiente paquete ejecutable. No empieces un rediseño visual amplio antes de cerrar la base técnica.

En ChatGPT Work, selecciona el proyecto o repositorio accesible y adjunta este archivo. Si el agente solo dispone de lectura de GitHub, no podrá modificar tu copia local: deberá entregar cambios como archivos o necesitar un entorno con escritura. Tener dos terminales abiertas no conecta por sí solo Codex con Claude.

### Consumo y coordinación

- Usa un agente implementador. Emplea el otro como revisor en los hitos de arquitectura y cierre. No dejes dos agentes editando a la vez los mismos archivos.
- Mi recomendación para este repositorio es Astra como implementador principal y una revisión puntual de Opus si ya tienes acceso. No hay una prueba comparativa realizada aquí que demuestre un ganador absoluto para MILPA-360.
- Un prompt enorme sirve como especificación guardada; las ejecuciones deben ser pequeñas y tener resultados verificables. Leerlo también consume contexto: no es memoria gratuita.
- No hacen falta tokens secretos en el prompt. Los tokens de texto se consumen automáticamente. La suscripción y la facturación API son modalidades distintas. No pegues API keys en archivos del repositorio.
- Revisa /status en Codex y /usage en versiones actuales de Claude Code. En Claude, las cifras estimadas de coste API no son automáticamente un cargo adicional para suscriptores. Gestión de consumo de Claude Code.
- No hay un número de tokens que garantice terminar esta misión. No fijes max_output_tokens como si fuera presupuesto de todo el trabajo: múltiples llamadas, herramientas y razonamiento pueden consumir recursos adicionales.
- Si usas API, establece límites reales de gasto en el proveedor y verifica qué límites son efectivos. Una instrucción como «no gastes más de X» es solo una indicación para el agente.
- Guarda estado antes de cambiar de modelo o conversación. Pasa al revisor el diff, los cálculos y las fuentes relevantes, no todo el historial.
- No instales grandes colecciones de skills o MCP por cantidad. Necesitas acceso a archivos/Git, búsqueda de fuentes, cálculo reproducible, Blender o geometría programática y navegador para inspección. Añade integraciones solo cuando resuelvan un bloqueo concreto.

## 2. Hallazgos que deben guiar la mejora

La revisión cubrió los cinco PDF de bases/contexto técnico, el plan maestro, documentación técnica y partes críticas del simulador y del script Blender. Se recalcularon geometría y energía con código. Se inspeccionó visualmente la página central del Reto Unificado. No se ejecutó aquí una prueba visual completa del simulador ni un ensayo biológico o mecánico.

### Bases y alcance

- La final pública anunciada es del 3 al 5 de noviembre de 2026, en Getafe, Comunidad de Madrid. El sitio describe presentación y evolución de los proyectos. El equipo indica que continuará con su solución actual. Usar 30 días como plazo interno y pedir al organizador la fecha exacta de entrega y el reglamento aplicable a su final; no sustituir esas condiciones por las del hackathon local. Sitio oficial, dinámica de la final.
- El Reto Unificado, páginas 2 y 3 del PDF del repositorio, exige conectar recuperación del suelo mediante animales, aprovechamiento de residuos en energía/abono y cultivo resistente. Su texto plantea movimiento rotativo de animales como ejemplo. No impone explícitamente codornices ni un vertebrado. No convertir una interpretación anterior del equipo en una obligación inexistente. PDF original.
- La guía del repositorio incluye nueve criterios de igual peso, tres entregables y presentación/video de cinco minutos. Son la base documentada disponible, no una confirmación de que Madrid conserve exactamente el formato. Guía.
- EL RETO .pdf habla de unos dos años de misión total de ida y vuelta, no de dos años completos en superficie. El plan usa 730 soles para consumibles y rendimiento. Es una elección de escenario que debe justificarse y distinguirse de la exigencia oficial. Días terrestres y soles tampoco son intercambiables. Marco original.
- El README dice seis integrantes y resume un máximo de cinco. Falta confirmar la regla y la autorización aplicables a la delegación final. Esto no invalida el pase comunicado por el usuario.

### Geometría y operación

Valores recalculados desde las constantes actuales; son geometría nominal digital, no medidas de una maqueta construida:

| Magnitud | Resultado nominal | Interpretación |
|---|---|---|
| Diámetro de casco | 4.56 m | Hay rótulos y documentos que aún dicen 4.76 m; queda incluso un comentario de 3.5 m |
| Área de huella circular | 16.331 m² | No equivale a superficie de cultivo |
| Área de 8 bandejas interiores | 4.025 m² | Sectores de 42.3°, radios 0.52–1.278 m |
| Área de 12 bandejas exteriores | 6.263 m² | Sectores de 28.2°, radios 1.34–1.979 m |
| Área total de bandejas | 10.288 m² | La zona exterior de cultivo es solo una parte de esta cifra |
| Sustrato a 22 cm y 1,500 kg/m³ | ≈3,395 kg | Depende de esa densidad supuesta; falta humedad, contenedores y equipos |
| Distancia radial del borde exterior al casco | 0.301 m | Es una holgura geométrica bruta, no prueba de acceso humano seguro |

Fórmula del sector: A = 0.5 × (R_exterior² − R_interior²) × ángulo_en_radianes. Masa estimada: m = A × profundidad × densidad.

Los sectores de los dos anillos no son la misma pieza. Si se pretende cambiar una bandeja del interior al exterior, hay que diseñar un recipiente compatible o un trasvase real de sustrato, con contención, tiempo y energía. La geometría actual tampoco prueba accesibilidad al reactor central. Afirmar que toda esa masa se obtiene in situ no elimina extracción, tratamiento, estructura, energía ni mantenimiento. Plan §4.1, simulador.

### Energía, materia y afirmaciones

- Con los supuestos del plan, 2 × 0.24 × 0.60 × 35.8 / 3.6 = 2.864 kWh/día. Es energía química bruta calculada. Falta comprobar compatibilidad entre kg de sólidos volátiles y la base del rendimiento citado, así como demostrar de dónde salen los 2 kg diarios. No acredita 2.9 kWh eléctricos ni autosuficiencia.
- Hay que descontar tratamiento de gas, conversión, calentamiento de digestores, bombas, luces, ventilación y control. El biogás puede aprovecharse térmica o eléctricamente mediante equipos apropiados; no son la misma salida. La EPA también describe el digestato como un producto que puede requerir tratamiento posterior. EPA AgSTAR.
- El reparto de residuos entre larvas, digestor y suelo no puede contabilizar cada kilogramo varias veces. La ración de las aves, los residuos humanos y los restos de cultivo deben aparecer en un mismo balance con sus entradas externas.
- Lavar 2.5 cm de una cubeta de 22 cm deja sin explicar el tratamiento inicial del resto del volumen. Eso no demuestra por sí solo descontaminación de toda la zona de raíces.
- «100%» aparece en las bases. Deben conservarse el requisito y cualquier brecha: distinguir captación de residuos, fracción tratada, recuperación útil y descarte controlado. No reinterpretar unilateralmente el requisito para marcar cumplimiento.
- El plan contiene afirmaciones absolutas como «único», «gratis», «nadie» o imposibilidad general de tratar sólidos, sin demostración suficiente. Se deben sustituir por comparaciones y evidencia acotadas.
- MELiSSA ya investiga ciclos biológicos para recuperar recursos, con compartimentos de funciones específicas. Conectar plantas, residuos y microorganismos no prueba novedad por sí solo. ESA: compartimentos MELiSSA.
- La NASA estudia cultivos como aporte de alimentos frescos; no basta mostrar plantas para demostrar alimentación completa. La productividad depende de superficie, luz y condiciones de crecimiento. NASA Veggie, USDA ARS.

### Normativa actual y demostración

- El PDF vigente consultado de NASA-STD-3001 Vol. 2 es revisión F, aprobado el 14 de julio de 2026, y sustituye a E. Su requisito V2 6253, sección 6.2.8.4, establece para polvo marciano menor de 10 µm un promedio ponderado inferior a 0.1 mg/m³ en escenarios de hasta 30 días. El polvo lunar tiene otro requisito. Ese horizonte no justifica automáticamente 730 soles. Mantener la copia de E proporcionada por el concurso y comparar contra F, con la aplicabilidad que corresponda. Norma oficial, portada y página 65 del PDF.
- El daño por tormenta y el gasómetro actuales siguen reglas programadas. Un porcentaje animado de pérdida no es un ensayo agronómico. El simulador necesita explicar el mecanismo: polvo exterior → disponibilidad energética/luz → temperatura o iluminación interior → respuesta de cultivos. Un hábitat cerrado no debe comportarse como plantas expuestas directamente al polvo exterior sin que exista una fuga modelada.

## 3. Qué sería una mejora defendible en un mes

Objetivo: una propuesta con límites explícitos, cálculos reproducibles, un demostrador comprensible y evidencia terrestre inicial de la parte más incierta que sea factible ensayar. Ningún modelo de IA puede garantizar ganar, certificar seguridad ni sustituir validación experimental.

| Días | Resultado verificable | Trabajo del equipo humano |
|---|---|---|
| 1–4 | Matriz de requisitos, auditoría, parámetros y alternativas de arquitectura | Aportar feedback del jurado, condiciones de final, recursos y presupuesto máximo |
| 5–10 | Balances, geometría cerrada, selección razonada de arquitectura | Revisión de mentor de agronomía/bioprocesos y mecánica; iniciar ensayos viables |
| 11–18 | 3D paramétrico, funcionamiento por estados, fallas explicables y pruebas digitales | Medir maqueta o banco, registrar vídeos/datos originales, obtener cotizaciones |
| 19–24 | Resultados preliminares, presupuesto trazable, memoria y aplicación en Chiapas | Repeticiones factibles, revisión de limitaciones, consulta de propiedad industrial |
| 25–28 | Deck, vídeo, paquete sin Internet y defensa técnica | Ensayos cronometrados ante personas que no conocen el proyecto |
| 29–30 | Correcciones finales, congelación de versión y copias de respaldo | Verificar entregas y condiciones logísticas |

Los cultivos o bioprocesos que requieran más tiempo deben seguir como ensayo en curso o plan de validación. No se puede acelerar ficticiamente un ciclo largo para declararlo probado. El objetivo de 30 días no implica tener un sistema apto para vuelo espacial.

Candidata de mejora, todavía sin comprobar: identidad e historial por lote de sustrato; separación de tratamiento de salmuera y producción de biogás; transferencia a cultivo condicionada a controles de calidad; aislamiento de una bandeja o lote fallido; operación degradada con reservas y cultivos escalonados. Comparar esta arquitectura contra una más simple antes de adoptarla. La ventaja debe medirse en reducción de contaminación cruzada, recuperación, tiempo de mantenimiento o energía; no solo en atractivo visual.

## 4. Patente y publicación

La patentabilidad no se demuestra con un prompt ni con una búsqueda sin coincidencias. La combinación debe examinarse por características técnicas concretas, antecedentes, novedad y actividad inventiva. La búsqueda inicial debe abarcar publicaciones, patentes y productos, y conservar fecha, consultas y documentos revisados.

El repositorio es público. En Europa, la divulgación pública anterior a la solicitud puede formar parte del estado de la técnica; existen excepciones limitadas, y no se debe asumir que una competición las cumple. Conservar una cronología de lo divulgado y consultar cuanto antes con la oficina de transferencia de UNACH o un profesional de patentes que evalúe países, autoría, titularidad y contenido. Hacer privado después un repositorio no borra lo ya divulgado. EPO: estado de la técnica, artículo 55.

## 5. PROMPT MAESTRO PARA EL AGENTE

Las instrucciones siguientes son la especificación del trabajo. Ejecuta el paquete solicitado por el usuario y conserva el resto como contexto de objetivos. No interpretes el diagnóstico previo como una fuente científica: verifica sus hallazgos frente a los archivos y fuentes actuales.

### A. Misión, alcance y forma de trabajar

Actúa como ingeniero de sistemas que integra modelado computacional, documentación científica y comunicación técnica. Ayúdame a preparar MILPA-360 / BioMars Chiapas para la final de Mars Challenge en Madrid, preservando la identidad del proyecto que ya clasificó. Tenemos un mes de preparación. El objetivo es aumentar su plausibilidad, rigor, claridad y cumplimiento real de las bases. No prometas perfección, premio, certificación, autosuficiencia ni patente.

Trabaja en español. Formula conclusiones claras con fuente, fórmula o prueba. No escribas razonamiento interno extenso: entrega supuestos, alternativas, decisión, evidencia y límites. No inventes mediciones, cotizaciones, DOI, fuentes, avales, patentes, validación, porcentajes de avance ni resultados del jurado.

Revisa primero git status, rama, commit y reglas existentes. No sobrescribas cambios del usuario. Usa una rama local de preparación si es viable. No hagas push, publicación, compras, contrataciones ni contacto con terceros como parte de la ejecución local. Deja cambios revisables y comandos de reproducción. No alteres los PDF oficiales de origen. Conserva los diseños previos como historial; identifica con claridad cuál es la revisión vigente.

Completa el trabajo autorizado de cada paquete, no solo un plan. Si una tarea depende de datos inaccesibles, regístrala con el dato exacto que falta y continúa con las tareas independientes. No trates un dato desconocido como cero ni inventes una fuente para cerrar un bloqueo. Distingue un supuesto reversible de una decisión que cambia el concepto clasificado.

No crees subagentes automáticamente. Si el usuario autoriza delegación posterior, úsala solo para una revisión delimitada con archivos concretos y un resultado breve. No dupliques auditorías completas ni dejes dos agentes con escritura en el mismo archivo.

### B. Inventario y autoridad de las fuentes

Comprueba la versión actual del repo antes de dar por vigentes estas rutas:

- CLAUDE.md y cualquier AGENTS.md aplicable.
- El Reto Mars Challenge 2026 UNACH (1).pdf y EL RETO .pdf.
- Guia Participante Mars Challenge 2026 FINAL.docx (4).pdf.
- ECLSS Requirements Mars Habitat 2026.pdf y Mars Challenge Human Habitation 2026.pdf.
- CONTEXTO-RETO-MARTE.md y PLAN-MAESTRO-BIOMARS.md.
- DOCUMENTO-TECNICO-FORMAL-BIOMARS.md, SISTEMA-MILPA-360.md, INVESTIGACION-MARTE.md.
- prototipo-3d/milpa360-simulador.html, milpa360_build.py, package.json y lockfile.
- prototipo/planos/, deck/, documentos de fases y cualquier feedback real.

Los documentos técnicos del equipo son afirmaciones por comprobar; la convocatoria es autoridad sobre requisitos, no sobre todas sus simplificaciones científicas. Una explicación divulgativa como «el suelo no tiene nutrientes» no debe copiarse como caracterización mineralógica exacta. Una norma NASA es una referencia de diseño cuyo alcance y revisión se deben documentar; no equivale a certificación ni a una regla del concurso salvo adopción expresa.

Crea una lista de archivos activos, superados, duplicados, generados y faltantes. Registra hashes o commit para vincular resultados a una versión. Reutiliza estructura útil del repo en lugar de generar varias memorias que compitan entre sí.

### C. Requisitos y trazabilidad de cumplimiento

Construye docs/madrid/matriz-requisitos.md con estas columnas:

ID | texto/paráfrasis fiel | fuente y página | autoridad/revisión | obligatorio o ejemplo | subsistema | método de verificación | evidencia | estado | brecha | responsable.

Estados permitidos: cumplido con evidencia, parcial, pendiente, no aplicable justificado, por confirmar con organizador. Una casilla marcada en un documento del equipo no basta como evidencia.

Separa las obligaciones de las tres partes, los entregables y los criterios de evaluación. Usa los nueve criterios conocidos sin inventar pesos nuevos: impacto, creatividad, diseño, culminación, aprendizaje, validez, relevancia técnica, presentación y retorno a la humanidad. Si hay una rúbrica de Madrid posterior, registra su precedencia y las diferencias.

Verifica especialmente:

- qué significa el 100% de residuos exigido; conserva su literal y reporta la interpretación operacional por confirmar;
- la alimentación de seis tripulantes y la ausencia de reabastecimiento: cuantifica qué fracción cubre el módulo y qué provisiones iniciales o subsistemas complementarios requiere;
- si animales, movimiento, biogás, suelo local, duración o dimensiones están prescritos o son decisiones del equipo;
- si los seis integrantes están autorizados para la final y cuántos presentan;
- extensión/formato de memoria, idioma, pitch, preguntas, vídeo, uso de IA, dimensiones de exposición y fechas, cuando se consiga documentación final;
- qué cambió tras la retroalimentación del jurado, con evidencia real.

Define cobertura de requisitos verificables con denominador explícito. No traduzcas esa cobertura en probabilidad de ganar ni en «100% científicamente probado».

### D. Política científica y registro de afirmaciones

Para cada cifra importante o afirmación causal crea un registro:

claim_id | afirmación | valor/rango | unidad | condiciones | especie/cepa/material | escala | fuente primaria | página/tabla | fecha | tipo de evidencia | incertidumbre | aplicación al diseño | limitación | archivos que la usan.

Tipos: dato publicado, requisito, medición propia, resultado calculado, hipótesis, escenario ilustrativo, pendiente. Las fuentes deben abrirse y leerse en el apartado pertinente; un resultado de búsqueda o una cita indirecta no basta. Para un valor crítico, busca corroboración independiente cuando sea posible. Si las fuentes discrepan, explica métodos y condiciones, no promedies resultados incompatibles.

Prioriza normas y datos oficiales de NASA/ESA/USGS, trabajos originales revisados por pares, documentación de FAO/INIFAP y datos oficiales mexicanos según el tema. Usa enciclopedias para orientación y para encontrar originales. Verifica año, DOI o URL, organismo, edición, unidades y metodología. No uses una tasa terrestre como si estuviera demostrada a gravedad marciana. No conviertas supervivencia temporal en crecimiento productivo continuo.

Revisa retracciones/correcciones cuando una publicación sea decisiva. No cites un artículo inaccesible como si lo hubieras leído. Etiqueta las referencias identificadas pero pendientes de lectura. Agrupa búsquedas por decisión técnica y guarda extractos breves o notas, no páginas completas repetidas en el contexto.

Empieza por los riesgos con mayor efecto sobre viabilidad: aporte alimentario, energía neta, descontaminación, acceso mecánico, residuos y condiciones de los organismos. Amplía la búsqueda solo si cambia una decisión o resuelve una contradicción.

### E. Sistema de parámetros y control dimensional

Crea una fuente única de parámetros legible por máquinas, por ejemplo config/milpa360.parameters.json, con esquema validable. Cada entrada debe tener valor o null, unidad, estado de evidencia, fuente, rango si existe y nota de aplicación. No introduzcas parámetros de apariencia como si fueran dimensiones de fabricación.

Incluye: cantidad de bandejas, radios, ángulos, holguras, espesores, profundidad efectiva, elevación de trabajo, altura total e interior, puertas, volúmenes útiles de tanques, tubería, masas, densidad/humedad del sustrato, velocidad y período de indexado, escalas temporales y condiciones de simulación. Separa valores de demostrador terrestre y de concepto marciano.

El 3D, los planos, las tablas, las etiquetas y los cálculos deben derivar de ese archivo. El generador debe identificar versión y fecha. Evita escribir la misma dimensión manualmente en varios sitios.

Recalcula áreas de sectores, volúmenes, masa seca/húmeda, carga por bandeja, centro de masa, recorridos y envolventes de movimiento. Distingue volumen del casco, volumen habitable útil y volumen de proceso. Distingue masa de peso; la gravedad cambia el peso, no elimina inercia ni energía de procesado.

No congeles Ø4.56 m por costumbre: es el valor digital actual, no una dimensión validada. Revisa acceso al núcleo, alcance, mantenimiento, limpieza, entrada/salida y compatibilidad con toda la instalación. Si no cabe, compara aumentar el módulo, reducir bandejas, cambiar disposición o reubicar equipos. Documenta efectos sobre requisitos, área de cultivo, masa y presupuesto.

Resuelve la incompatibilidad geométrica entre sectores de 8 y 12 posiciones. Define si se mueve la cubeta, un cartucho interior o el sustrato. Modela la transferencia, no teletransportes material. Revisa capacidad de entrada/salida, recipientes de espera, limpieza y tiempos de residencia.

Separa tolerancia numérica de software de tolerancia de fabricación. La primera debe responder a precisión geométrica y exportación; la segunda a material, proceso y medición. No prometas concordancia física exacta a partir de una malla. Para la maqueta, especifica instrumentos, puntos de medida e incertidumbre.

### F. Balances y viabilidad del proceso

Define fronteras claras: módulo agrícola, hábitat completo, provisiones iniciales y ambiente exterior. El módulo no puede consumir agua, calor, oxígeno o electricidad «del hábitat» sin contabilizarlo.

Masa y materia: entradas, inventarios, salidas, acumulación, purgas, pérdidas y material retenido. Calcula agua, materia seca, sólidos volátiles y elementos relevantes como C/N/P/K/Cl según datos disponibles. No confundas kg húmedos, kg secos, SV o DQO.

Reparto de residuos: sigue cada flujo entre aves, larvas, tratamiento y plantas. El mismo sustrato alimentario no puede producir toda la biomasa larvaria y todo el biogás como si pasara íntegro por ambas rutas. Identifica alimento importado, lixiviado, frass y mortalidad.

Agua: lavado inicial y recurrente, relación líquido/sólido, recuperación, evapotranspiración, condensación, purga de sales y agua incorporada en producto. El agua recuperada no es potable por defecto. Separa circuito de riego y agua humana.

Percloratos: comprueba concentración y variabilidad local, no asumas el rango de Phoenix para toda la superficie de Marte. Define qué volumen de sustrato se trata. El lavado transfiere contaminante al agua; no lo destruye. Revisa selectividad, residual y subproductos, consumo de donador de electrones, pH, salinidad, inhibición y tiempo de residencia. No llames al cloruro «sal inerte» sin evaluar acumulación y concentración. No uses musgo o una MFC como certificado químico de seguridad sin validación específica.

Reactores: separa hipótesis de biorreducción y metanogénesis. Verifica compatibilidad de comunidades y entradas, volumen útil, tasa de carga, tiempo de retención hidráulica y de sólidos, espacio de gas, arranque y mantenimiento. Compara un reactor separado para salmuera con una integración de dos cámaras. No supongas que compartir anoxia basta para compatibilidad biológica.

Energía: calcula gas bajo condiciones explícitas de presión/temperatura, fracción de metano y poder calorífico. Distingue energía química, calor útil y electricidad neta; incluye eficiencias y auxiliares. Calcula consumos por subsistema y por sol. Presenta picos de potencia y energía acumulada; son magnitudes distintas.

Cultivo: superficie realmente cultivada, calendario por especie/variedad, rendimiento comestible, masa fresca/seca, cosechas, densidad, recuperación y descarte. Usa necesidades de luz con PPFD, fotoperíodo, DLI y eficiencia de luminaria, además de agua, nutrientes y temperatura. No impongas a todos los cultivos una cosecha cada 96 soles sin evidencia.

Alimentación: aporte de kcal, proteína y alimentos frescos por persona; contabiliza la dieta de animales y humanos. Identifica qué reservas iniciales permiten vivir durante arranque y fallos. No declaremos alimentar seis personas con el módulo actual sin demostrar el porcentaje real.

Térmica y ambiente: envolvente, aislamiento, intercambio, radiación térmica, ventilación, humedad y condensación. Separa microclima de cultivos, animales, digestores y cabina humana. No apliques un intervalo de confort humano a todas las especies.

Operación: motor, reducción, torque de arranque, soportes, bloqueo, tubería móvil, juntas rotativas, limpieza, cambio de filtros y acceso. Verifica compatibilidad del giro con riego y trasvase. Un avance cada ocho soles no elimina el riego cotidiano.

Guarda ecuaciones y código en analysis/ o una ubicación existente equivalente. Cada resultado debe poder regenerarse con un comando. Comprueba unidades, signos, límites de inventario y cierre de balances. El residuo del balance numérico no es el porcentaje de recuperación del proceso. En una medición, considera incertidumbre instrumental antes de declarar cierre.

Presenta escenario conservador, nominal y favorable con supuestos separados. Haz sensibilidad solo de parámetros que puedan cambiar viabilidad. Si una variable no tiene distribución conocida, usa intervalos y escenarios; no fabriques una distribución ni una probabilidad de éxito con Monte Carlo decorativo.

### G. Sanidad, normativa y realismo marciano

Conserva el anexo ECLSS de la competencia y registra la revisión NASA que realmente se emplea. Compara la revisión F publicada con la E del anexo por requisito, sin actualizar números a ciegas. Distingue límite, objetivo nominal, recomendación histórica y evidencia de cumplimiento. Comprueba duración de exposición y población/compartimento al que aplica.

La validación del módulo debe tratar separación de gases de proceso y cabina, polvo, olores, amoníaco, aerosoles, contaminantes de agua, fallas de ventilación, fuego y recuperación segura. No muestres combustión abierta en la cabina como solución operativa aprobada. Modela el equipo de aprovechamiento de gas de forma coherente y señala el diseño pendiente.

El término «presión negativa» del aviario debe referirse al compartimento presurizado adyacente, no al vacío exterior marciano. HEPA no sustituye controles de gases o contaminantes disueltos. Documenta rutas separadas de materia fecal, agua y alimento. La reintegración de larvas o digestato a alimentación/cultivos requiere criterios sanitarios, no solo balances.

No asumas productividad o reproducción normal de codornices, BSF, microorganismos o cultivos durante una misión en gravedad parcial. Clasifica evidencia terrestre, análogos, microgravedad y gravedad marciana. Define revisión veterinaria/bioprocesos para cualquier ensayo vivo y no presentes procedimientos peligrosos como actividad casera.

Define el escenario de emplazamiento y sus incertidumbres. Usa datos planetarios y material cartográfico verificables para escala y contexto. Si el terreno es procedural, rotúlalo como ilustración; si procede de MOLA/HiRISE u otro conjunto, guarda identificador, resolución, sistema de coordenadas, créditos y transformaciones. No inventes topografía local a partir de una textura.

### H. Arquitectura y originalidad

Compara un máximo inicial de tres opciones viables:

1. diseño actual corregido;
2. versión con separación de tratamiento, identificación de lotes y liberación a cultivo según calidad;
3. versión mecánicamente más simple que conserve las tres partes del Reto Unificado.

Evalúa cumplimiento, riesgo biológico, carga de mantenimiento, masa, energía, validación disponible y posibilidad de demostrarlo en 30 días. No asignes puntuaciones numéricas como si fueran mediciones; si usas una matriz de decisión, identifica los pesos como preferencias y comprueba sensibilidad.

Estudia la siguiente hipótesis de mejora: cada lote de sustrato tiene identidad, historial de tratamiento y estado de autorización; una válvula o transferencia permanece bloqueada cuando faltan condiciones de calidad; un lote contaminado se aísla y el resto opera con reservas. El control debe tener un modo seguro determinista, sensores reales cuando existan y revisión de muestras cuando los sensores no midan el contaminante. Una IA no reemplaza un análisis químico.

Busca antecedentes por mecanismos concretos: cultivo en carrusel, transferencia de sustrato entre etapas, tratamiento de percloratos, recuperación de residuos, cuarentena de lotes y control de cultivos por estados. Usa publicaciones originales y registros de patentes. Registra identificadores, prioridad/publicación y características comparables; distingue reivindicaciones de descripción. No concluyas «patentable» por ausencia de resultados ni confundas libertad de operación con patentabilidad.

Entrega una tabla de características compartidas/diferentes, una hipótesis técnica de novedad, un ensayo capaz de mostrar ventaja y un informe para revisión profesional. No presentes una solicitud ni publiques novedades técnicas automáticamente. Preserva autoría humana, contribuciones y cronología de divulgaciones; no borres historial para aparentar novedad.

### I. Modelado 3D preciso y experiencia para el jurado

Preserva lo que funciona del simulador actual. No migres de motor/framework por moda. Si modularizar reduce errores y facilita pruebas, hazlo incrementalmente. Unifica Three.js, dependencias y versiones de exportación. Define ejecución local documentada y un paquete sin dependencias de Internet para el evento.

Usa geometría paramétrica para piezas funcionales. Blender mediante Python puede servir para detalles, materiales y renders; utiliza los mismos parámetros del modelo interactivo. Un GLB sirve para visualización, pero no lo llames plano de fabricación ni CAD sólido. Genera planos o formato CAD adicional solo cuando se requiera y con herramientas que realmente existan.

No uses imágenes generadas por IA como evidencia dimensional, química, biológica o topográfica. Pueden apoyar una portada o ambiente claramente ilustrativo. Las piezas críticas deben tener dimensiones comprobables. Registra licencias y créditos de todos los recursos externos.

Diseña dos modos:

- **Recorrido del jurado:** contexto breve de Marte, llegada al módulo, escala humana, corte del casco, tres partes conectadas, resultado/limitaciones y aplicación en Chiapas. Permite saltar introducción; lo esencial debe entenderse sin instrucciones del autor.
- **Inspección técnica:** vistas ortográficas, cotas, capas, corte y explosión de ensamblaje, flujos seleccionables, parámetros, fuentes, estado de validación y acceso al resumen de cálculos.

La transición espacio → planeta → superficie → módulo debe ser visualmente clara y honesta sobre cambios de escala. El planeta no comparte escala física continua con una pieza milimétrica salvo que la implementación lo resuelva explícitamente. Indica cuándo se exagera relieve o se comprime distancia.

El corte del casco es una herramienta visual, no un hábitat abierto en operación. Muestra protección exterior, interior presurizado, entrada, mantenimiento y separación sanitaria. Añade una figura humana de referencia con altura declarada. No ocultes accesos imposibles mediante cámaras favorecedoras.

Permite seguir una bandeja o lote de principio a fin y entender qué entra, qué sale, qué cambia y cuánto tarda. Distingue estado de proceso de animación decorativa. Las tuberías deben conectar equipos reales y mostrar su fluido, dirección y aislamiento; si se exagera grosor para lectura, ofrécelo como representación esquemática.

El panel de información debe mostrar unidades, fuente y una etiqueta simple: medido, calculado, literatura o ilustrativo. No proyectes precisión falsa con muchos decimales. Usa diseño accesible, contraste, controles de pausa/reinicio, modo con menos movimiento y tamaño de texto legible en proyector. Mantén el estilo oscuro existente si funciona.

### J. Simulación y pruebas

Separa el reloj del modelo del renderizado. Usa paso temporal estable, estado reproducible y semilla fija cuando haya aleatoriedad. Las tasas deben indicar sus unidades. La velocidad de reproducción solo acelera la presentación; no cambia la biología. Evita que un reinicio modular de 730 soles borre inventarios sin aviso.

Si faltan parámetros, el modo ilustrativo debe seguir identificado como tal. No lo llames gemelo digital validado sin datos físicos y una correspondencia demostrada. No uses el acuerdo de dos modelos de lenguaje como validación científica.

Implementa escenarios comparables: nominal, disponibilidad solar reducida, bomba detenida, atasco mecánico y lote fuera de especificación. Cada fallo requiere mecanismo, umbral, respuesta, recursos disponibles, efecto y condición de recuperación. No simules todas las fallas posibles a costa del cierre del proyecto.

Para comparar siembra escalonada y sincronizada, conserva iguales recursos, área, clima y reglas de daño. Mantén daño acumulado y recuperación con estados; una planta muerta no revive porque termine la tormenta. Calcula alimento perdido y tiempo de recuperación según modelo; no programes el porcentaje ganador.

Pruebas necesarias:

- correspondencia de parámetros, tablas y geometría, incluida exportación/importación;
- radios, unidades, áreas, volúmenes, masa y contención de piezas;
- interferencias relevantes a lo largo del movimiento, no solo en una captura;
- transferencia de material e inventarios consistentes;
- ausencia de volúmenes o masas negativos y cierre numérico definido;
- reproducción determinista y casos límite del reloj;
- arranque del simulador, controles principales, vista técnica, fallos, reinicio y modo offline;
- errores de consola y desempeño medido en el equipo de presentación.

Una prueba de colisión de malla no certifica resistencia estructural. Una captura no prueba volumen útil. Para resistencia usa cargas y propiedades verificadas, cálculo apropiado o análisis especializado. Evita colorear una malla como «FEA» sin condiciones de frontera, material, mallado y resultados reproducibles.

Propón un objetivo de desempeño, por ejemplo 30 FPS a 1080p en el equipo del evento, como criterio del proyecto pendiente de medir. Registra hardware, navegador y escenario; optimiza materiales, luces e instancias si fallan. No vuelvas a diseñar toda la escena por una microoptimización innecesaria.

### K. Ensayos terrestres en 30 días

Propón el ensayo mínimo que más reduzca una incertidumbre decisiva. Distingue demostrador didáctico, banco mecánico y experimento biológico. No necesitas construir en escala real todo el módulo para validar un mecanismo.

Para cada ensayo define pregunta, variable primaria, hipótesis, control, unidades, instrumentos, calibración, repeticiones justificadas, calendario, datos crudos, análisis y criterio de éxito establecido antes de ver resultados. Si no hay base para potencia estadística, decláralo exploratorio. No confundir muchas mediciones del mismo recipiente con réplicas biológicas independientes.

Prioriza: transferencia/indexado con cargas representativas y medición del accionamiento; riego/recuperación de agua; demostración de aislamiento por fallo; pruebas de crecimiento tempranas o caracterización de materiales viables en el tiempo disponible. Para salmueras con percloratos, digestión de residuos o ensayos animales, define trabajo con laboratorio y supervisión competentes. No fabriques resultados ni aceleres la maduración de cultivos en el informe.

Conserva fotografías reales, vídeo, fechas y hojas de datos. Marca los renders de arcilla/alambre del repo como proceso digital, no como fotos de maqueta física. Relaciona cada conclusión con lo que realmente se ensayó. Una prueba terrestre no demuestra operación a 0.38 g, radiación o durante toda la misión.

### L. Presupuesto real y comparable

No entregues un total aparentemente exacto antes de cerrar la lista de materiales. Construye tres presupuestos separados:

1. demostrador y preparación para la final: fabricación, sensores, electrónica, materiales, impresión, embalaje y recursos digitales;
2. piloto terrestre funcional en Chiapas: equipos, instalación, consumibles, análisis, mantenimiento, energía y horas de trabajo;
3. concepto marciano: masa/volumen/potencia, consumibles, repuestos y complejidad de integración; solo estimación económica de orden de magnitud cuando exista base. Un precio de tienda no acredita componente apto para vuelo.

Separa gastos de viaje/exposición si se solicitan, porque no representan coste del sistema. No incluyas vuelos sin fecha/ruta ni financiación concedida sin constancia.

Para cada partida registra:

ID de pieza | función | especificación | cantidad | unidad | proveedor | modelo/SKU | URL o cotización | fecha | moneda | precio unitario | IVA incluido/excluido | envío | plazo | subtotal | estado | alternativa.

Relaciona los ID con geometría y planos. Distingue material ya disponible, donado, prestado y por comprar; muestra coste de reemplazo separado del desembolso. Registra horas voluntarias sin convertirlas en «coste cero» del piloto replicable. Incluye análisis y validación, no solo piezas visibles.

Usa precios de fabricantes/distribuidores o cotizaciones verificables y dos alternativas para partidas críticas si es posible. Si no hay precio, usa pendiente de cotizar; nunca cero. La contingencia debe estar separada y justificada por incertidumbre. Distingue estimación, precio público y cotización formal. Para MXN/EUR usa fuente/fecha de tipo de cambio y aclara comisiones no cubiertas.

Si hay un límite de gasto proporcionado, ajusta el alcance al límite. Si falta, produce opciones con compromisos explícitos y pide ese dato al entregar el presupuesto preliminar. No lo inventes ni detengas la auditoría por ello.

Usa hoja de cálculo con fórmulas, fuentes y supuestos cuando se produzca el presupuesto. Recalcula y verifica subtotales, moneda, impuestos, envío, contingencia y ausencia de dobles conteos. No inventes ingresos por bonos de carbono, socios confirmados o retorno de inversión. Separa ahorro de masa de ahorro económico.

### M. Documentación y defensa ante jueces

Produce una memoria con el formato final exigido. Si todavía no se conoce, crea una versión modular que pueda ajustarse sin reescribir la ciencia. Debe incluir problema, requisitos, sistema, interfaces, parámetros, balances, evidencia, alternativas, limitaciones, riesgos, validación, presupuesto, aplicación en Chiapas y fuentes.

El Documento Concepto debe conservar aprendizaje: qué cambió desde el pase a la final, por qué y con qué evidencia. La memoria técnica no reemplaza el registro de proceso exigido por la guía.

Prepara planos general/planta/corte/explosión y esquema de flujos con los mismos ID y valores. Incluye leyenda de unidades y revisión. Los renders y el deck deben corresponder a esa revisión; retira exportaciones viejas de la carpeta de entrega sin borrar el historial.

Para el pitch, usa una duración base de cinco minutos mientras se confirma Madrid. Da más tiempo a mecanismo, evidencia y retorno a Chiapas que a la introducción espacial. Presenta una afirmación defendible sobre novedad y una sobre beneficio. No uses «demostramos» donde solo calculamos o proponemos.

Prepara respuestas concretas a: por qué un carrusel; cómo se mueve el material; cuánto alimento aporta; qué comen los animales; qué fracción energética es externa; cómo se limpia el sustrato; qué ocurre con sales/patógenos; qué pasa si se atasca o se contamina; quién mantiene el sistema; cuánto cuesta; qué se validó; qué cambia respecto a antecedentes; y dónde funciona en Chiapas.

En el retorno terrestre elige un caso de uso piloto concreto. No equipares pastoreo regenerativo a éxito automático por rotación. Define indicador base y comparación: consumo de agua, efluente tratado, coste por unidad de producto, sustitución de insumo o carga de trabajo. Usa datos locales comprobables y no atribuyas alianzas a UNACH/INIFAP/NASA por el hecho de citarlos.

Exporta documentos con tablas legibles, figuras con pies, referencias clicables y numeración coherente. Renderiza PDF/diapositivas y revisa visualmente recortes, solapamientos y decimales. Comprueba que un lector pueda seguir una afirmación desde el pitch hasta la memoria, el cálculo y su fuente.

El paquete final necesita demo offline, instrucciones de arranque, vídeo de respaldo, deck, memoria, archivos fuente y manifiesto de versiones. Verifica su ejecución desde una carpeta limpia y que la entrega contenga exactamente las versiones aprobadas.

### N. Artefactos y paquetes de ejecución

Reutiliza archivos equivalentes si ya existen. Estas rutas son una propuesta de organización, no nombres presentes garantizados:

| Paquete | Trabajo | Entregables mínimos |
|---|---|---|
| P0: auditoría | Bases, fuentes, discrepancias y plan | docs/madrid/AUDITORIA.md, matriz-requisitos.md, ESTADO.md, registro inicial de afirmaciones y datos faltantes |
| P1: ingeniería | Parámetros, balances, alternativas y diseño base | configuración validable, cálculos reproducibles, tabla dimensional, decisión de arquitectura y riesgos |
| P2: geometría | Modelo paramétrico y interfaces | escena/Blender coherentes, planos nominales, informe de áreas/masas/interferencias y transferencia resuelta |
| P3: simulación y relato visual | Estados, fallos, interfaz y offline | simulador verificable, comparaciones honestas, capturas y prueba en equipo objetivo |
| P4: validación y costes | Ensayos documentados y compras posibles | protocolos/datos existentes, resultados limitados, presupuesto con fórmulas, cotizaciones y faltantes |
| P5: presentación y cierre | Evidencia integrada y defensa | memoria, Documento Concepto, deck/guion/vídeo, preguntas del jurado y paquete de entrega |

Al concluir cada paquete actualiza docs/madrid/ESTADO.md en aproximadamente 500–800 palabras: commit o archivos cambiados, estado por requisito, decisiones vigentes, resultados, fuentes nuevas, pruebas ejecutadas, bloqueos y siguiente acción exacta. No llenes el resumen con todo el análisis anterior.

No declares concluido un paquete si falta su condición de aceptación. Puedes cerrar una tarea como «documentado el bloqueo» sin afirmar que el requisito se cumplió. Distingue finalización documental de validación del sistema físico.

### O. Condiciones de cierre

El trabajo estará listo para revisión del equipo cuando:

- Las bases aplicables estén identificadas y las ambigüedades visibles.
- Las cifras críticas tengan fuente, cálculo o medición trazable, o estén claramente pendientes.
- No existan contradicciones activas de dimensiones, unidades, cantidades o revisión entre modelo, planos y memoria.
- La transferencia y el mantenimiento sean explicables sin movimientos imposibles.
- Los balances muestren aportes externos, pérdidas y límites de rendimiento.
- El simulador distinga ilustración y resultados de un modelo, y haya pasado las pruebas relevantes.
- El presupuesto tenga fórmulas y evidencia de precios, con faltantes visibles.
- Los ensayos tengan datos originales y conclusiones limitadas a lo medido.
- La novedad se presente como hipótesis comparada con antecedentes, con revisión profesional pendiente cuando corresponda.
- Los entregables funcionen sin Internet y el equipo pueda defender el mecanismo y sus límites.

Si alguna condición falla, informa la brecha y una corrección viable en el tiempo restante. Nunca hagas que un contador llegue al 100% cambiando la definición de cumplimiento.

## 6. Prompts cortos para continuar

**Después de P0:**

> Lee MISION-MADRID-MILPA360.md y docs/madrid/ESTADO.md. Ejecuta P1. Prioriza duración de misión, aporte alimentario, energía neta, descontaminación y acceso/trasvase entre anillos. Usa cálculos reproducibles y fuentes leídas. Entrega la arquitectura más defendible con las incertidumbres visibles. No cambies el concepto clasificado por uno ajeno al Reto Unificado.

**Modelo 3D:**

> Ejecuta P2 con la arquitectura y parámetros vigentes. Haz que geometría, cotas y tablas se generen desde la misma configuración. Resuelve la transferencia de sustrato y muestra el acceso humano y el mantenimiento. Verifica exportaciones e interferencias relevantes; no presentes una malla como prueba de resistencia. Actualiza ESTADO.md con comandos para reproducir el resultado.

**Simulador y visuales:**

> Ejecuta P3. Implementa el recorrido Marte-superficie-módulo y el modo de inspección técnica. Conecta las animaciones al estado del modelo, muestra unidades y tipo de evidencia, y compara escenarios sin programar el resultado favorable. Prueba navegación, fallos, reinicio y uso sin Internet. Adjunta capturas reales del simulador ejecutado.

**Presupuesto y ensayo:**

> Ejecuta P4 desde el diseño vigente y los recursos disponibles. Genera un presupuesto con fórmulas y precios verificables para el demostrador; separa piloto terrestre y concepto marciano. Incorpora datos reales de ensayos si existen y define los que faltan con alcance realizable. No inventes mediciones, cotizaciones ni socios. Señala qué dato del equipo permitiría cerrar cada pendiente.

**Revisión independiente con Opus o Astra:**

> Actúa como revisor técnico independiente. Lee ESTADO.md, la matriz de requisitos, los cálculos, las fuentes críticas y el diff del paquete terminado. No edites archivos. Busca errores que cambien viabilidad, cumplimiento o credibilidad. Devuelve hasta 10 hallazgos priorizados con archivo, afirmación cuestionada, evidencia, impacto y corrección propuesta. Si no encuentras un fallo, no lo inventes. Tu acuerdo no sustituye validación experimental. Evita repetir el diagnóstico histórico si ya está corregido.

**Cierre para la final:**

> Ejecuta P5. Integra la evidencia vigente y la retroalimentación real; sincroniza memoria, Documento Concepto, planos, deck, vídeo y demo offline. Usa el formato de Madrid si ya está disponible. Verifica visualmente los archivos exportados. Entrega el paquete con versiones identificables y una lista breve de limitaciones que debemos poder explicar ante el jurado.

## 7. Fuentes verificadas de partida

Consultadas el 14 de septiembre de 2026. Estas fuentes orientan decisiones; ninguna valida automáticamente MILPA-360 completo.

| Fuente | Qué aporta | Qué no prueba |
|---|---|---|
| Repositorio y versión revisada | Estado de documentos, geometría y reglas programadas | Ensayos físicos no registrados |
| Mars Challenge | Fecha y sede públicas de la final | Condiciones particulares de la delegación |
| Dinámica Grand Jam | Presentación y evolución de proyectos | Rúbrica contractual completa del equipo |
| NASA-STD-3001 Vol. 2, revisión F | Requisitos y alcance de diseño humano | Certificación del concepto o cumplimiento experimental |
| NASA: datos de Marte | Contexto planetario general | Ambiente de un emplazamiento elegido sin datos locales |
| NASA Veggie | Investigación de cultivo y alimento fresco en órbita | Producción del policultivo propuesto en Marte |
| USDA ARS: cultivo espacial | Relación entre condiciones de cultivo y soporte a tripulación | Una tasa universal por m² para cualquier diseño |
| ESA MELiSSA | Antecedente de ciclos biológicos por compartimentos | Novedad de nuestra combinación o compatibilidad de sus especies |
| EPA AgSTAR | Biogás, digestato y aprovechamiento | Rendimiento específico de nuestras mezclas o autosuficiencia |
| NASA Eyes | Referencia de comunicación espacial interactiva | Licencia automática de cada recurso ni topografía de nuestro sitio |
| EPO: estado de la técnica | Efecto general de divulgación pública | Dictamen de patentabilidad individual |
| EPO: artículo 55 | Excepciones limitadas de divulgación | Que el concurso esté amparado por una excepción |
| Astra y Codex CLI | Capacidades y selección del agente | Disponibilidad concreta en todas las cuentas |
| Claude: modelos y consumo | Selección de Opus/Sonnet y seguimiento de uso | Presupuesto fijo para completar el proyecto |

La revisión específica de productividad de codornices, BSF, percloratos, especies vegetales, musgo, sensores y antecedentes patentarios sigue siendo trabajo de P0/P1 según riesgo. No presentar esas áreas como una revisión sistemática ya terminada.
