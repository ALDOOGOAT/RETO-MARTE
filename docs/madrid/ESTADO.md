# ESTADO · preparación para Madrid

**Sesión:** S5/P5, candidata documental y visual para revisión del equipo.
**Fecha:** 21 sep 2026 UTC (20 sep en Chiapas).
**Rama:** `preparacion-madrid-p1`. Base S4 `a24a687`; el commit que contiene este
checkpoint identifica S5. Push de checkpoints autorizado, sin force-push.
**No es cierre físico ni entrega oficial:** B15–B19 y S6 permanecen abiertos.

## Archivos y resultado

`P5-DEFENSA.md` integra memoria modular, Documento Concepto, requisitos, balances
S3, alternativas de acceso, ODS con límites, guion provisional de cinco minutos,
13 respuestas para el jurado y trazabilidad de nueve láminas. Se exportó una memoria
de nueve páginas, un deck editable de nueve diapositivas con notas/fuentes, su PDF
y un MP4 de 300 s a 1080p sin audio, pensado para narración en vivo. No se presenta
como vídeo oficial narrado ni como registro de ensayo.

`outputs/madrid-s5/LEEME.md` identifica archivos, comandos, herramientas y límites.
P02/P03 mantienen parámetros comunes; se corrigió su cabecera y modo HTML. Los
nuevos P04/P05 de `prototipo/planos/madrid/` muestran fronteras abiertas y procesos
separados. Se conservaron el deck y planos históricos. El paquete ZIP S5 reúne
demo, fuentes y defensa con manifiesto SHA-256; no sustituye revisión independiente.

## Cambios de modelo y hallazgos

El simulador conserva Three 0.160, interacción por objeto, tubos seleccionables,
fuentes locales y ausencia de transmisión. S5 añade cartuchos identificados,
pernos instanciados, guías/rodillos ilustrativos, casco seccionado, señal de entrada
pendiente y despiece visual que pausa el modelo. Al reanudar vuelve al ensamblaje.
La selección resalta el cartucho del lote, sin modificar sus inventarios.

Los postes de varias estaciones atravesaban la trayectoria de cartuchos: se
sustituyeron por ménsulas esquemáticas desde el casco. Se corrigieron rocas que
flotaban sobre el terreno, orientación de una placa y paisaje en vistas técnicas.
Faltan envolventes de dosel, herramientas, tuberías, aviario y cargas; el detalle
visual no cierra B15–B18 ni selecciona componentes.

**B19:** se compararon cruce elevado, sector desmontable y disposición abierta/fija.
Dos posiciones retiradas dan 0.976 m de cuerda interior nominal antes de estructura.
La candidata requiere retirar unos 180 kg, almacenar cartuchos, abrir guía y esclusa
y bloquear mecánicamente el giro durante toda ocupación. Si quedan diez cartuchos
de cultivo activos, son 2.5715 m²; no se conserva la producción de doce. Se solicitó
criterio al usuario, sin respuesta registrada; no se adoptó ni se declaró evacuación
resuelta. También se corrigió una frase antigua de P1 que daba por probado el acceso.

## Blender, evidencia y pruebas

Se exportó la geometría evaluada de Three por bloques a JSON y se importó mediante
Python en Blender 5.2. El GLB se reimportó: 1194 mallas y dimensiones del piso
coincidentes con tolerancia digital de 1e-5 m. El BLEND incluye texturas empaquetadas.
El sombreado conserva el tinte de hojas grises. Se generó un render y se importó
el GLB mediante MCP en una escena nueva de la aplicación, preservando la original.
El modo seguro rechazó cargar bibliotecas BLEND; la importación GLB permitida
resolvió esa operación. La captura de viewport MCP falló; se revisó el render
producido por Blender, sin atribuir una captura de interfaz inexistente.

Pasaron P0, regeneración P1/P2/P3, verificaciones geométricas, P4 y pruebas del modelo.
Chrome pasó pausa, reloj, fallos, cuarentena, fichas, vistas, despiece, selección y
comparación sin errores ni solicitudes HTTP. Su medición usa SwiftShader: no
acredita 30 FPS en la GPU del evento. Se conservaron seis poses S3 y sus equivalentes
S5, con comparador HTML; se añadió captura del despiece.
Se repitió la prueba completa desde el ZIP extraído en una carpeta temporal limpia:
controles correctos, cero errores y cero solicitudes HTTP; manifiesto y CRC verificados.

Se revisaron visualmente nueve páginas, nueve diapositivas y cuatro planos. El
finalizador reabrió PPTX y verificó estructura, tabla y fuentes; PowerPoint nativo
sigue sin probar. FFmpeg decodificó el vídeo completo sin errores. CSV mantiene
16 columnas e IDs únicos. Los cinco archivos preexistentes sin seguimiento
conservan sus hashes. No hubo compras, contactos ni publicación de plataforma.

## Estado y siguiente acción

La matriz conserva 27 obligatorios: uno con evidencia documental, 24 parciales,
uno pendiente y uno por confirmar. G-01/G-05 pasan a parcial por los documentos y
respaldo disponibles, sin inventar fotografías físicas, feedback ni URL publicada.
P4 sigue abierto para mediciones, recursos y cotizaciones. Persisten B1–B7, B10,
B15–B19 y prueba de legibilidad/rendimiento en equipo real.

**Siguiente acción exacta:** continuar S5 por B19 y envolventes, usando §3 de
`P5-DEFENSA.md` y la respuesta del equipo sobre la candidata desmontable. Antes de
cambiar arquitectura, modelar guía, cartuchos retirados, depósito externo, persona,
herramienta y ruta que siga libre sin energía. Actualizar parámetros/balances si
cambia área o casco. Después ejecutar S6 sobre una candidata corregida: revisión
independiente acotada, reglas de Madrid, ensayo humano, equipo/proyector y backups.
No repetir P0 ni presentar esta candidata como final aprobada.
