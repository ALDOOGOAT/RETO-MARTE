# V6 · Presentación, modelado y comprobación visual

23 de septiembre de 2026. Revisión del demostrador interactivo, manteniendo la arquitectura B y los parámetros de proceso.

## Uso

Abrir `prototipo-3d/milpa360-simulador.html`, entrar en **Módulo** y explorar el interior. La vista de estudio quita el terreno del encuadre y utiliza iluminación de estudio para leer superficies y ensamblajes. **Entorno marciano** recupera el terreno, paneles solares y conexiones; **Exterior cerrado** muestra la envolvente con su contexto. El suelo de estudio es un recurso de presentación, no una modificación física.

La consola inferior reúne las estaciones y el reloj. En móvil, las filas de vistas y estaciones se desplazan horizontalmente. Dos dedos acercan/alejan; un dedo orbita. **Proyección con voz** conserva sus capítulos, subtítulos, controles de idioma y navegación. La cámara y las animaciones respetan la reducción de movimiento; cambiar a otra pestaña no acumula tiempo de simulación al regresar.

**Validar modelo** comprueba directamente veinte cartuchos, el área integrada en los triángulos de la cama, la altura erguida de la figura y la ausencia del pase adicional de transmisión. **Medir fluidez** toma cinco segundos de fotogramas reales y registra FPS, percentil 95 del intervalo, resolución efectiva, GPU, calidad y vista. El informe JSON se descarga con **Guardar informe**. Una pestaña oculta invalida esa medición. En calidad automática, la resolución puede adaptarse durante la muestra; utilizar detalle alto para comparaciones controladas.

## Cambios

- Interfaz con Archivo variable, cifras en IBM Plex Mono, navegación de escala agrupada, estados visibles y una consola que se adapta a la altura real de los controles. Fichas con mejor contraste y distribución en escritorio y móvil.
- Persona común a ambos visores: rostro de superficie continua, mandíbula y nariz modeladas, cabello ajustado, ropa con silueta anatómica, cuello, cremalleras, bolsillos, dedos, rodillas y calzado. Piezas rígidas agrupadas por material; se conservan hombros, codos, caderas y rodillas articulados. Figura de 1.75 m, ilustrativa.
- Hojas curvas y acorazonadas, relieve menos exagerado, variación por especie, suelo con textura y metales con reflejos de un entorno local. Bastidor de apoyo bajo el equipo exterior de gas. Sombras más concentradas sobre el módulo.
- Vegetación instanciada: 400 piezas en diez grupos de dibujo, conservando crecimiento, daños, identidad y transformaciones de cada planta. La prueba compara matrices contra las plantas fuente. No se sustituyen los estados de los lotes por una animación decorativa.
- Sin bibliotecas ni recursos remotos nuevos. Se mantiene Three.js 0.160.0. No se introduce `transmission`, posprocesado de pantalla ni fuentes externas. Las sombras del acceso se actualizan como máximo diez veces por segundo, con cámara a frecuencia completa.

## Pruebas y límites

`PRUEBA-VISUAL-V6.json` y `capturas-v6/` documentan geometría, transformaciones de instancias, conservación del modelo al cambiar presentación, ES/EN, gestos, teclado, movimiento reducido, tamaños 390/800/1024, proyección móvil y acceso. Se ejecuta desde `file://`, sin permisos adicionales para archivos y con HTTP/HTTPS bloqueado.

`COMPARACION-RENDIMIENTO-V6.json` compara V5 y V6 con el mismo navegador, GPU, 1920×1080, resolución 1×, detalle alto, sombras activas, sol 62, proceso pausado y cámara orbitando. Ambas versiones usan el entorno marciano. El orden V5/V6/V6/V5 reduce el sesgo de medir siempre una al final; cada pasada incluye dos segundos de calentamiento y seis de muestra. Los resultados tienen variación por carga del equipo; no son un mínimo garantizado ni una prueba de la GPU del evento.

`PRUEBA-REGRESION-V5-V6.json` conserva la prueba de la narración y acceso en la revisión actual: audio ES/EN, pausa, reactivación de voz, nueve capítulos, restauración del escenario, caminar, retener ocupación y salir sin energía. Durante la automatización el navegador está silenciado; se verifica reproducción/estado, no audibilidad de altavoces.

No cambian diámetro de 4.56 m, altura de 2.20 m, cama a 0.62 m, área útil nominal de cultivo de 3.0858 m² ni balances. La figura y el acabado no acreditan antropometría, resistencia, estanqueidad, seguridad de evacuación ni desempeño biológico. Las exportaciones y ZIP previos conservan su revisión anterior; este cambio corresponde al visor del repositorio.

### Medición final en la RTX 4060 local

| Revisión | FPS en las dos pasadas | Media | Llamadas de dibujo |
|---|---|---|---|
| V5 | 104.4 / 101.0 | 102.7 | 822 |
| V6 | 116.4 / 120.3 | 118.3 | 597 |

En este ensayo, la media aumenta 15.2% y las llamadas de dibujo bajan 27.4%. La geometría visible pasa de 415,436 a 470,986 triángulos: la optimización permite más detalle. El percentil 95 del intervalo fue 12.2 ms en las cuatro pasadas. Consulta el JSON para las duraciones reales y el método; no extrapolar a otro equipo.

## Reproducir

```bash
npm --prefix prototipo-3d test
node analysis/verificar_modelo_geometrico.cjs
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia \
MILPA_VISIBLE=1 MILPA_GPU=1 MILPA_FILE_ESTRICTO=1 MILPA_VISUAL_V6=1 \
node --experimental-websocket analysis/verificar_p3_navegador.mjs
```

Para repetir la regresión de voz y acceso sin sobrescribir los informes V5:

```bash
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia \
MILPA_VISIBLE=1 MILPA_GPU=1 MILPA_FILE_ESTRICTO=1 MILPA_VISUAL_V5=1 MILPA_REGRESION_V6=1 \
node --experimental-websocket analysis/verificar_p3_navegador.mjs
```

La combinación PRIME/X11 corresponde a la RTX 4060 de este equipo. Para software, omitir `MILPA_GPU=1` y las variables PRIME; no comparar sus FPS como si fueran GPU.

La comparación requiere una carpeta completa de la revisión anterior:

```bash
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia \
MILPA_VISIBLE=1 MILPA_GPU=1 MILPA_FILE_ESTRICTO=1 \
node --experimental-websocket analysis/comparar_visual_v6.mjs /ruta/a/la/version-anterior
```
