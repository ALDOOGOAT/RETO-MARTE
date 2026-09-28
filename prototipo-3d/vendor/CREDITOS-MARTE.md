# Mapa de imagen de Marte

Fuente abierta el 21 sep 2026: https://science.nasa.gov/3d-resources/mars/
Imagen: https://assets.science.nasa.gov/content/dam/science/cds/3d/resources/image/mars/Mars.jpg
Crédito indicado: NASA/Jet Propulsion Laboratory & Caltech. Imágenes Viking
procesadas por USGS; base de mapas planetarios JPL/Caltech.
SHA-256 del JPEG: 12ec6bf02ebd42a246edc778cb2ce8c595b4d9f0892badf0bfff8abb2303c780

El JPEG se conserva sin modificación. mars-viking.js contiene sus mismos bytes
codificados en base64 para cargar por file:// sin red ni políticas CORS externas.
No es un modelo de elevación ni prueba de topografía del emplazamiento de MILPA.
No implica colaboración o aval de NASA. El terreno del módulo sigue siendo ilustrativo.

## V9: mosaico 4K y relieve MOLA (26 sep 2026)

Servicio WMS de USGS Astrogeology (dominio público), capas `MDIM21_color` (mosaico Viking MDIM 2.1)
y `MOLA_bw` (relieve sombreado de MOLA / Mars Global Surveyor), descargadas a 4096 × 2048:
https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map
`analysis/preparar_marte.py` iguala la media y la dispersión de color al JPEG de NASA de arriba y
empaqueta ambas capas en `marte-usgs.js`. El relieve es un sombreado usado como mapa de relieve:
da forma a cráteres, volcanes y cañones, pero no es un modelo de elevación medida.
