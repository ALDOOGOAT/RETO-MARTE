# Revisión visual y bilingüe · V4 · 21 sep 2026

## Revisión vigente V4 sobre c99e151

Exterior completo de 360°, techo a 2.20 m nominal, talud continuo, conexión de energía
y acceso rotulado como estudio. Los modos exterior/interior evitan confundir un corte
con la operación del hábitat. La selección filtra ancestros invisibles; no se puede
seleccionar una pieza oculta a través de la tapa. Cerrar el casco pausa el proceso.

Giro de cámara independiente, despiece/indexado interpolados y pausa que conserva
la pose de las aves. Calidad automática con ventanas de tres segundos, actualización
de datos cada 120 ms, plantas inactivas excluidas del render y 32 llamadas de dibujo
en el exterior. La cámara ajusta el campo vertical en pantalla estrecha. Navegación
por suelo/animales/tratamiento/cultivo, controles ES/EN y fundamentos con MathML.

Las cifras finales de rendimiento están en `PRUEBA-VISUAL-V4.json`: GPU RTX 4060 Laptop,
Chrome visible X11, 1920×1080, muestras de ocho segundos en detalle alto. No comparar
como experimento controlado con V3: carga, escena, frecuencia de pantalla y estado
varían. Se mantiene pendiente proyector/equipo del evento y ensayo humano.

La documentación [CIERRE-V4.md](CIERRE-V4.md) registra decisiones, fórmulas, limpieza y
estado por paquete. [Fundamentos PDF](../../outputs/madrid-s5/FUNDAMENTOS-MILPA360.pdf)
y [fuente LaTeX](latex/fundamentos.tex) explican las ecuaciones con valores regenerados.
Tectonic 0.17.0 se instaló desde su binario oficial; no requiere un MCP de LaTeX.
Los BLEND/GLB V4 interior y exterior proceden de Three evaluado, con reimportación.
Las capturas V4 están en `capturas-v4/`. Los apartados V2/V3 siguientes son historial.

Fuentes primarias consultadas el 21 sep 2026: [Three.js, instancias](https://threejs.org/docs/pages/InstancedMesh.html),
[NASA, acceso/tareas](https://www.nasa.gov/reference/8-0-architecture-vol-2/),
[Tectonic](https://tectonic-typesetting.github.io/en-US/install.html) y
[Grand Jam](https://thegrandjam2026.mars-challenge.com/en/la-experiencia/como-funciona).
No se promovió una referencia química indirecta a lectura nueva ni se usaron imágenes
IA como evidencia. Las matemáticas químicas reutilizan el cierre previamente registrado.


## Refinamiento V3 sobre e6c989b

Solicitud: mejorar realismo de carteles, estructura y aves, y comprobar el recorrido
en ambos idiomas. Los apartados posteriores conservan el registro V2.

- **38 rótulos, 65 líneas:** ajuste de fuente sin deformar glifos; proporción de la
  textura igual a la superficie física; márgenes, contraste en placas claras,
  tipografía Archivo para nombres e IBM Plex Mono para códigos. Bastidores de chapa,
  tornillos, soportes al piso y panel de presentación con pedestal. Se corrige el
  orden de rotación de las placas inclinadas. Ambas caras se leen sin reflejo.
- **Estructura:** ménsulas para luminarias, carteles unidos a sus equipos, rejilla
  abierta del aviario y apoyos fijos fuera del cartucho. Son detalles de visualización;
  cargas, dosel, sellos, sanidad y tolerancias de fabricación siguen sin validar.
- **Codornices:** cuerpo, pecho moteado, alas plegadas, cola corta, patas con dedos,
  ojos y pico; cuello articulado para mover la cabeza completa. Siete figuras
  ilustrativas, no evidencia de espacio suficiente para las 24 aves propuestas.
  Las piezas se identifican por ave en la exportación. La referencia fotográfica
  principal es [Kyoto City Zoo, Coturnix japonica](https://zoo.city.kyoto.lg.jp/zoo/animals/c_japonica),
  consultada el 21 sep 2026. Se crearon mallas y texturas procedurales propias; la foto
  no se distribuye como textura ni como recurso del proyecto.
- **Inspección:** botón «Ver aves de cerca / Inspect birds». En móvil cierra la ficha
  y encuadra el aviario para poder verlo. «Perspectiva» recupera la vista general.
- **Fluidez:** rocas instanciadas, rejilla y conjuntos estáticos fusionados por material,
  conservando las fichas; sombras en caché con actualización a 10 Hz durante el
  movimiento. La cámara mantiene la frecuencia del renderizado.

### Verificación V3

`PRUEBA-REFINAMIENTO-V3.json` comprueba márgenes y proporción de todas las placas
en ES/EN, carga de fuentes, apoyo de las aves, aproximación con teclado, vista móvil
y los cinco pasos de ambos recorridos. Las cotas nominales y el modelo de proceso
conservan sus pruebas. No se añadieron dependencias ni servicios de traducción.

En este portátil se detectaron Intel RPL-P y RTX 4060 Laptop, con pantalla interna
2560 × 1440 y sin proyector conectado. La muestra inicial V3 con Intel en Chrome
headless dio 24.12 FPS en detalle alto y 23.12 sin sombras a 1920 × 1080. No son
mediciones del proyector ni una garantía de fluidez constante. Evidencia conservada
en `RENDIMIENTO-V3-INTEL.json`.

La RTX no creó contexto WebGL en el primer intento headless; sí funcionó con Chrome
en ventana X11 y un perfil temporal aislado. La primera muestra de ocho segundos
dio 72.46 FPS en detalle alto y 67.55 sin sombras. Los resultados de la comprobación
final desde carpeta limpia quedaron en `PRUEBA-REFINAMIENTO-V3.json`: 134.75 FPS
en detalle alto y 146.58 sin sombras, ocho segundos por modo. La variación entre
ejecuciones es grande; son muestras breves, no rendimiento mínimo garantizado ni
prueba de que el ajuste de calidad causó la diferencia.

Una ejecución inicial en ventana visible encontró otra ficha abierta al comprobar
el idioma y terminó sin completar la prueba. La repetición íntegra con el mismo
código pasó. No se atribuye la causa a una interacción externa sin evidencia ni se
oculta ese intento; los resultados finales corresponden a la ejecución completada.

Comando de prueba en este portátil (abre y cierra su propia ventana):

```sh
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia \
MILPA_VISIBLE=1 MILPA_GPU=1 MILPA_REFINAMIENTO_V3=1 \
node --experimental-websocket analysis/verificar_p3_navegador.mjs
```

El [guion bilingüe](RECORRIDO-BILINGUE.md) permite practicar con una persona ajena al
equipo. El recorrido automático pasó; el ensayo humano, el proyector y los ensayos
físicos mantienen su estado pendiente. La comparación enlazada más abajo conserva
su ruta histórica `COMPARACION-VISUAL-V2.html` y muestra ahora V2 frente a V3.

## Registro de V2

Autorizada por Aldo: priorizar ahora la presentación visual y la claridad de todos los
modelos activos. No cambia las decisiones dimensionales ni la aceptación física.

## Dirección

Exposición científica interactiva: el modelo ocupa el escenario; navegación y datos
lo acompañan. Paleta: espacio `#080f18`, panel `#102333`, aluminio `#d9e4e6`, agua
`#74c8df`, cultivo `#b9d393`, señal `#ffbc83`. Archivo variable para títulos/controles;
IBM Plex Mono para cifras. Alineación izquierda, lectura por niveles, controles de
44 px y foco visible. La geografía y la ingeniería explican la forma visual.

```
Marca             Marte / Módulo / Acceso      Calidad / ES EN
Introducción      Escena interactiva           Ficha al seleccionar
Recorrido         Selección y corte            Datos / fuente / límite
                  Reloj y controles
```

Se elige exposición guiada frente a un tablero lleno de telemetría o una animación
cinematográfica sin control. La información avanzada se abre a demanda. El recorrido
puede saltarse. Reducir movimiento y cambiar idioma no alteran inventarios.

## Trabajo y aceptación

1. Marte: mapa de imagen NASA/JPL-Caltech, créditos y escala explícitos; terreno local
   procedural identificado. No inferir relieve medido del color.
2. Módulo: iluminación, materiales, detalle de equipos y presentación coherentes con
   la configuración; selección legible y modos de inspección. Sin transmisión costosa.
3. B19: misma identidad visual, mejor lectura de cargas, trayectoria y estados;
   conservar enclavamientos y mostrar reserva geométrica como reserva.
4. Interfaz española/inglesa local: navegación, fichas, mensajes y rótulos 3D; mantener
   cifras, fórmulas e identificadores. Documentos fuente conservan su idioma original.
5. Atlas: contexto visual vigente, conexión clara con los modelos y bilingüismo.
6. Blender/GLB y capturas: regenerar desde la escena, conservar comparativa anterior.
7. Verificar geometría, lógica, cambio de idioma, móvil, teclado, reducción de
   movimiento, ambas escenas offline y exportación. Medir rendimiento con el hardware
   realmente disponible e identificar renderizado por software.

Las herramientas presentes (Three160, Chrome y Blender 5.2/MCP) cubren este trabajo.
Sólo se añade un recurso cuando aporta algo comprobable. No se requieren cuentas,
servicios de pago, modelos generados que inventen mecanismos ni publicación externa.

## Resultado de V2

| Superficie | Cambios entregados | Límite conservado |
|---|---|---|
| Marte | Imagen Viking local, iluminación y marcadores alineados con la textura | Imagen global sin elevación; emplazamiento ilustrativo |
| Módulo | Materiales, juntas, bridas, instrumentación esquemática, placas legibles por ambas caras y vistas rápidas | Configuración dimensional y modelo de proceso sin cambios |
| Acceso B19 | Iluminación, lectura de cartuchos y cargas, reserva transparente del núcleo, secuencia visible | Candidata separada; no acceso físico aceptado |
| Información | 27 fichas ES/EN, fuente enlazada, cifras compartidas, recorrido de cinco pasos y controles avanzados agrupados | Cada ficha identifica cálculo, literatura, hipótesis o escenario |
| Atlas | Contexto, retardo ajustable, ciclo seleccionable y aporte alimentario vigente | Se retira el cálculo simplificado de blindaje sin validación |
| Blender | BLEND/GLB regenerados, normales y texturas conservadas, render nuevo | Mallas de visualización, no CAD de fabricación |
| Presentación | Memoria de diez páginas, nueve diapositivas y respaldo de 300 segundos con nuevos visuales | Documentos estáticos en español; vídeo sin audio para narración en vivo |

La interfaz permite cambiar ES/EN sin red y sin reiniciar el lote o fallo seleccionado.
La navegación conserva el idioma. Hay órbita por teclado, foco visible, ayuda, pausa,
reducción de movimiento, pantalla completa y selección de calidad. La inspección
mantiene los valores introducidos al cambiar idioma. El texto de las fichas vive en
`prototipo-3d/milpa360-contenido.js`; el vocabulario de controles y rótulos está en
`milpa360-traducciones.js`. Los documentos científicos enlazados mantienen su idioma
original. No se depende de traducción automática ni de servicios externos.

Se conserva [la comparación antes/después](COMPARACION-VISUAL-V2.html), junto con
quince capturas de escritorio y móvil. La imagen NASA tiene procedencia y hash en
[CREDITOS-MARTE.md](../../prototipo-3d/vendor/CREDITOS-MARTE.md).

## Comprobaciones

- `npm test --prefix prototipo-3d`: determinismo, conservación, cuatro fallos,
  recuperación, comparación y secuencia B19.
- `python3 analysis/verificar_geometria.py` y
  `node analysis/verificar_modelo_geometrico.cjs`: sectores, envolvente y cotas.
- Chrome con red deshabilitada: recorrido, selección, formularios, teclado, idioma,
  atlas y ausencia de desbordamiento horizontal a 390 × 844; escritorio 1440 × 1000.
  Las pruebas se ejecutan también desde una extracción limpia. Evidencia:
  `PRUEBA-P3-NAVEGADOR.json`, `PRUEBA-B19-NAVEGADOR.json`, `PRUEBA-VISUAL-V2.json`.
- Blender 5.2: exportación y reimportación de 1,267 mallas; piso comprobado con
  tolerancia digital de 1e-5 m. MCP importa el GLB en `MILPA360_V2_REVISION` y conserva
  `MILPA360_S5_REVISION`. No se guarda encima de la sesión abierta del usuario.
- Revisión visual de las diez páginas de memoria, nueve diapositivas, render Blender
  y capturas interactivas. El PPTX se reabre con Artifact Tool; falta prueba en
  PowerPoint nativo. El MP4 se decodifica completo sin errores.
- ZIP con manifiestos SHA-256 y verificador S6 para enlaces, fuentes, artefactos y
  correspondencia con los archivos realmente probados sin red.

La medición gráfica usa SwiftShader por software. Una primera prueba agotó el tiempo
al esperar treinta fotogramas bajo carga; el verificador ahora mide una ventana
temporal y registra fotogramas, duración real y FPS. Esto no demuestra 30 FPS en el
equipo del evento. La GPU, el proyector y la comprensión por una persona ajena al
proyecto requieren comprobación allí.

La repetición completa de controles desde `/tmp/milpa-v2-limpia-5gjrp2g9` terminó
correctamente: cero errores de consola y cero solicitudes HTTP. Su muestra fue de
cinco fotogramas en 5,019 ms (aproximadamente 1 FPS por software). ES/EN y B19 también
pasaron desde esa extracción. Se reutilizan las capturas ya revisadas mediante
`MILPA_SIN_CAPTURAS=1`; esta opción conserva las comprobaciones de controles y modelo.
S6 comprobó 156 archivos por SHA-256, 24 enlaces documentales y 27 archivos de la
aplicación idénticos a la extracción probada. El paquete P3 contiene 123 archivos.

## Reproducir y continuar

Los comandos de exportación están en
[LEEME del paquete](../../outputs/madrid-s5/LEEME.md). Para la interfaz:

```sh
node --experimental-websocket analysis/verificar_p3_navegador.mjs
MILPA_SOLO_ACCESO=1 node --experimental-websocket analysis/verificar_p3_navegador.mjs
MILPA_VISUAL_V2=1 node --experimental-websocket analysis/verificar_p3_navegador.mjs
```

Para repetir desde otra carpeta, anteponer `MILPA_DEMO_DIR=/ruta/prototipo-3d`.
El modelo físico, presupuesto y condiciones del organizador conservan sus brechas
en `CIERRE-ACUMULADO.md`. Continuar B14–B19/E4 después de revisar esta versión visual;
no reiniciar auditorías ni instalar de nuevo las herramientas disponibles. Los cinco
archivos preexistentes del usuario se conservan sin cambios y fuera de este commit.
