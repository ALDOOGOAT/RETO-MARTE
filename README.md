# MILPA-360 · BioMars Chiapas

Preparación para Madrid · **revisión digital V4, 21 de septiembre de 2026**.
Responsable: Aldo Fabio Contreras Marroquín.

## Abrir el proyecto

| Recurso | Uso |
|---|---|
| [Simulador](prototipo-3d/milpa360-simulador.html) | Marte, módulo completo/corte, procesos, aves, fallos e inspección. ES/EN, sin Internet |
| [Paquete de presentación](outputs/madrid-s5/LEEME.md) | Memoria, deck editable/PDF, vídeo de cinco minutos, Blender y GLB |
| [Fundamentos matemáticos](outputs/madrid-s5/FUNDAMENTOS-MILPA360.pdf) | Geometría, masa, energía, balances, química y animación; [fuente LaTeX](docs/madrid/latex/fundamentos.tex) |
| [Estado actual](docs/madrid/ESTADO.md) | Checkpoint para continuar sin repetir trabajo |
| [Cierre V4](docs/madrid/CIERRE-V4.md) | Trabajo terminado, decisiones, pruebas y pendientes exactos |
| [Plan de continuidad](docs/madrid/PLAN-CONTINUIDAD-ASTRA.md) | Paquetes, sesiones, modelos y condiciones de aceptación |

Descargar o clonar el repositorio y abrir `prototipo-3d/milpa360-simulador.html`
en Chrome. La página de archivos de GitHub no ejecuta la demo. **Exterior cerrado**
muestra la envolvente completa; **Interior** abre el corte de inspección. **Giro 360°**
mueve la cámara; **Reanudar** mueve la simulación. No son el mismo reloj.

## Qué representa

Arquitectura B: veinte cartuchos iguales, ocho posiciones de recuperación y doce de
cultivo; Ø4.56 m nominal. El diseño propone recuperación de sustrato, aprovechamiento
de residuos y cultivo complementario. Salmuera y digestión se representan separadas.
Los valores proceden de [configuración](config/milpa360.parameters.json) y cálculos
reproducibles en `analysis/`.

La demo distingue cálculo, literatura e ilustración. **No acredita un sistema físico
validado, autosuficiencia, seguridad, patente ni cumplimiento completo del concurso.**
El acceso B19 es un estudio independiente; la tapa cerrada no resuelve por sí misma
presurización, evacuación ni mantenimiento. Ver [B1–B19](docs/madrid/CIERRE-ACUMULADO.md).

## Evidencia y reproducción

- [Matriz de requisitos](docs/madrid/matriz-requisitos.md) y [registro de afirmaciones](docs/madrid/registro-afirmaciones.csv).
- [Cálculos vigentes](docs/madrid/CALCULOS-CIERRE.md), [presupuesto](docs/madrid/P4-PRESUPUESTO-CHIAPAS.md) y [protocolos](docs/madrid/P4-MECANICA-ENSAYOS.md).
- [Mejoras visuales y pruebas](docs/madrid/MEJORA-VISUAL-BILINGUE.md) y [recorrido ES/EN](docs/madrid/RECORRIDO-BILINGUE.md).
- [Comandos de generación y verificación](outputs/madrid-s5/LEEME.md#reproducir-desde-la-raíz-del-repo).
- `python3 analysis/empaquetar_s5.py` genera `entregas/madrid-s5-revision.zip` con manifiesto SHA-256; requiere los artefactos descritos en el LEEME.

## Fuentes e historial

Los PDF oficiales originales se conservan sin modificación. [CONTEXTO-RETO-MARTE.md](CONTEXTO-RETO-MARTE.md)
registra bases y revisiones; [MISION-MADRID-MILPA360.md](MISION-MADRID-MILPA360.md) es la
especificación maestra. `PLAN-MAESTRO-BIOMARS.md`, `deck/`, `milpa360_build.py` y fotos
anteriores conservan el proceso del hackathon; sus cifras/exportaciones históricas
no prevalecen sobre `docs/madrid/ESTADO.md` y la configuración vigente.

Se retiraron únicamente 37 fotogramas intermedios de la animación antigua, con copia
local verificada y recuperación por Git: [registro de limpieza](docs/madrid/LIMPIEZA-V4.json).
Las fuentes gráficas y el mapa Viking tienen créditos/licencias en `prototipo-3d/vendor/`.
