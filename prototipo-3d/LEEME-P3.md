# MILPA-360 · demostrador P3 sin Internet

Abra `milpa360-simulador.html` en Chrome. No necesita servidor ni instalar npm.
Conserve todos los archivos `milpa360-*.js`, `milpa360-interfaz.css` y `vendor/`.
El ZIP conserva también `visuales/atlas-marciano.html` y la documentación enlazada.

**ES / EN** traduce interfaz, fichas, mensajes y rótulos 3D sin Internet. También puede
abrir con `?lang=en`; el idioma pasa a los enlaces entre visores. Las fuentes y los
PDF técnicos conservan su idioma original. Cambiar idioma conserva lotes y controles.

**Iniciar recorrido** muestra cinco pasos. Puede cerrar cualquier ficha para explorar
libremente. El menú de calidad permite reducir sombras y resolución; ayuda incluye
teclado, pantalla completa y reducción de movimiento. El atlas incluye contexto y
controles de retardo/proceso. Las cifras de las fichas provienen de los mismos balances.

- **Marte / Módulo:** cambia de escala. El globo usa una imagen Viking NASA/JPL-Caltech
  procesada por USGS, sin elevación. El terreno del módulo es ilustrativo.
- **Pausar / Reiniciar:** la pausa detiene el modelo; reiniciar recrea el escenario completo.
- **Tormenta:** escenario de menos electricidad para luz, no fuga de polvo al cultivo.
- **Inspección técnica:** planta/lateral ortográficas, casco en corte, reducción de movimiento,
  historial del lote, inventarios y fallos de bomba, atasco o rechazo en S8.
- **Aislar / sustituir:** acción explícita con repuesto finito y tiempo ilustrativo. No prueba
  que se pueda maniobrar físicamente con la masa real del cartucho ni que el acceso cumpla requisitos.
- **Comparar siembras:** banco virtual de parcelas fijas; mismo recurso y reglas para ambas.
- **Estudio B19:** `milpa360-acceso.html`, también enlazado desde inspección técnica.
  Extraer → estacionar → habilitar paso → entrar/salir. Permite cortar energía durante
  el traslado y durante ocupación. Restaurar alimentación no reanuda automáticamente.
  Es una candidata aparte con reloj biológico detenido, no el acceso ya validado del módulo.

Los resultados químicos/sanitarios del recorrido son **simulados**. Para observar la retención
sin autorización abra `milpa360-simulador.html?vista=habitat&autorizacion=0`.
El modelo inicia con cultivos precargados; no demuestra arranque desde semillas.

## Límites visibles

S3/D8: piso 0 y techo 2.20 m; cama a 0.62 m con 1.58 m sobre su borde. Figura 1.75 m.
B19: entrada/evacuación a través del anillo sin resolver. Área útil corregida: 3.086 m². El acceso,
los equipos fijos, la estructura, los reactores y el aprovechamiento del gas están por diseñar.
La pérdida de alimento no es una predicción agronómica: las leyes de daño son ilustrativas.
La reserva de gas se contabiliza como energía química; su entrada nominal P1 no simula el
reactor durante fallos. No hay nueva medición física ni cumplimiento NASA demostrado.

La candidata B19 requiere vestíbulo adicional de 6.66 m², 0.916 m de paso con herrajes
supuestos y unos 180 kg de carga nominal más útiles pendientes. Con herrajes de 40 mm
por lado no llega al objetivo de 0.90 m. Véase `../docs/madrid/B19-ACCESO.md` y plano P06.

Ecuaciones, unidades, fronteras y evidencia: `../docs/madrid/P3-SIMULACION.md`.
Los archivos del hackathon señalados como históricos no son la defensa vigente de Madrid.

## Reproducir desde el repositorio

```bash
python3 analysis/milpa360_p3.py
python3 analysis/milpa360_acceso.py
python3 analysis/verificar_geometria.py
node analysis/verificar_p3.cjs
node --experimental-websocket analysis/verificar_p3_navegador.mjs
MILPA_SOLO_ACCESO=1 node --experimental-websocket analysis/verificar_p3_navegador.mjs
MILPA_VISUAL_V2=1 node --experimental-websocket analysis/verificar_p3_navegador.mjs
python3 analysis/empaquetar_p3.py
```

`npm test`, dentro de `prototipo-3d/`, ejecuta las pruebas del modelo. Three.js queda fijado
exactamente a 0.160.0 en package/lockfile y `vendor/`; se conserva la versión que utilizaba
la escena original. Las licencias de Three.js y fuentes locales están en `vendor/`.

## Capturas

Poses históricas en `../deck/LEEME.md`; la prueba de navegador genera nuevas capturas en
`../docs/madrid/capturas/`. `storm=1&sol=62` aplica diez soles previos de fallo desde el sol 52,
no marchita instantáneamente para una foto. La semilla visual es fija (360). Los renderizados
son ilustraciones del demostrador, no fotografías de maqueta ni topografía medida.

## Equipo del evento

Objetivo propuesto: 30 FPS a 1920×1080. Falta medirlo con la GPU, navegador y equipo reales
que se llevarán a Madrid. El informe headless con SwiftShader registra pruebas funcionales y
rendimiento por software; no debe extrapolarse al equipo del evento.
