# Revisión visual y bilingüe · 21 sep 2026

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
