# Recursos locales

Three.js 0.160.0: paquete npm `three@0.160.0`, licencia MIT adjunta.
La versión es la que ya usaba el HTML; no se cambió de motor.

Fuentes Google Fonts descargadas el 20 sep 2026, licencias OFL adjuntas:

- archivo.ttf: https://raw.githubusercontent.com/google/fonts/main/ofl/archivo/Archivo%5Bwdth,wght%5D.ttf
- archivo-OFL.txt: https://raw.githubusercontent.com/google/fonts/main/ofl/archivo/OFL.txt
- ibmplexmono-OFL.txt: https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt
- mono-regular.ttf: https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/IBMPlexMono-Regular.ttf
- mono-medium.ttf: https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/IBMPlexMono-Medium.ttf
- mono-semibold.ttf: https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/IBMPlexMono-SemiBold.ttf

Las texturas de escena son procedurales del proyecto; no representan topografía medida.

S5, 21 sep 2026 UTC: Bodoni Moda para el deck (OFL adjunta).
- bodoni-moda.ttf: https://raw.githubusercontent.com/google/fonts/main/ofl/bodonimoda/BodoniModa%5Bopsz%2Cwght%5D.ttf
- bodoni-OFL.txt: https://raw.githubusercontent.com/google/fonts/main/ofl/bodonimoda/OFL.txt

V7: rostro escaneado y texturas de Lee Perry-Smith (CC BY 3.0), empaquetados localmente. Adaptaciones, fuente y licencia en [CREDITOS-PERSONA.md](CREDITOS-PERSONA.md).

V8, 25 sep 2026 (ver `docs/madrid/MEJORA-VISUAL-V8.md`):

- three-addons.js: `examples/jsm` de three 0.160.0 (MIT, mismo paquete npm) empaquetados con
  esbuild 0.28.2 para el `THREE` global: GLTFLoader, SkeletonUtils, EffectComposer, RenderPass,
  ShaderPass, OutputPass, UnrealBloomPass y GTAOPass. `node analysis/empaquetar_three_addons.mjs`.
- tripulacion.js: avatares Microsoft Rocketbox (MIT). Detalle en [CREDITOS-PERSONA.md](CREDITOS-PERSONA.md).
- texturas-pbr.js: Poly Haven (CC0, https://polyhaven.com), mapas 2k reducidos a 1024:
  red_laterite_soil_stones (terreno), rock_boulder_dry (rocas), brown_mud_dry (sustrato),
  metal_plate (cubierta) y el HDRI goegap (sólo reflejos, virado a cielo marciano).
  `python3 analysis/preparar_texturas_pbr.py`. No representan suelo ni roca medidos en Marte.
