# P3 · Modelo y demostrador digital

**Revisión:** S1, 20 sep 2026. Modelo ilustrativo; no gemelo digital validado.
**Base:** P0 `7ea6b3f`, P1 `508f30a`, P2 `e8ffad4`, correcciones S0 `25f39e4`.
Los datos salen de `config/milpa360.parameters.json`; `analysis/milpa360_p3.py`
reutiliza los balances P1 y el generador P2 para exportar `milpa360-datos.js`.

## Fronteras y evidencia

- **Geometría nominal calculada:** 20 cartuchos, 8 posiciones de regeneración y 12 de cultivo.
- **Literatura terrestre:** rendimientos y ciclos de BVAD, alimentación/postura de codorniz.
  Las condiciones de esas fuentes no son una validación en regolito ni gravedad marciana.
- **Escenario ilustrativo:** crecimiento, daño, reservas, recuperación de agua y cambio de lote.
  Parámetros identificados como `supuesto`, con unidad y nota en `simulacion`.
- **Pendiente:** térmica, C/N/P/K/Cl, metabolismo, digestión dinámica, gases de cabina,
  pérdidas sanitarias y potencia auxiliar. No se sustituyen por ceros.
- **Sin mediciones propias nuevas.** El estado inicial representa operación precargada:
  doce lotes ya plantados, reservas y dos cartuchos de repuesto. No demuestra arranque.

## Ecuaciones y reloj

El paso fijo es $\Delta t=0.125$ sol; los días terrestres se obtienen con
$\Delta d=1.0275\Delta t$. El render solicita tiempo y el modelo acumula pasos; velocidad
visual y FPS no alteran las tasas. Al llegar a 525 soles se detiene. Sólo «Reiniciar»
recrea inventarios, daño, autorizaciones y registros.

Agua del depósito (L):

$$W_{t+1}=W_t+W_{externa}+W_{condensada}-W_{riego}-W_{purga}.$$

La entrega se limita al inventario y se anula con bomba detenida. Se supone retorno inmediato
de 80 % del agua entregada; no modela retraso, humedad del sustrato ni tratamiento. Reposición
externa ilustrativa: 2 L/d. Purga es salida contabilizada, no descarga ambiental autorizada.
No se obtiene un porcentaje de recuperación biológica del residuo numérico de esa igualdad.

Almacén de gas (kWh **químicos**, no volumen ni electricidad):

$$G_{t+1}=G_t+G_{entrada}-G_{exportado}-G_{retenido\ fuera}.$$

La entrada constante se toma del escenario nominal P1 (~0.240 kWh/d). **La frontera es el
almacén:** esa entrada no demuestra producción del digestor bajo fallos, ni se calcula de nuevo
con las cosechas simuladas. El exceso se cuenta como necesidad de retención externa sin
capacidad física resuelta. El gasómetro dibujado no está dimensionado por esa energía.

Para cada especie se usa su propio ciclo publicado (85/85/25 días), tasa y fracción de área.
Sea $u=\min(f_{luz},f_{agua})$ y $D$ el daño ilustrativo:

$$D_{t+1}=\min(1,D_t+k(1-u)\Delta d),\quad k=0.04\ d^{-1}.$$

La biomasa comestible equivalente crece con la tasa de referencia multiplicada por $u(1-D)$;
la fracción dañada de lo acumulado se pierde para cosecha. Doce días equivalentes de déficit
matan la planta. **Ni esa tasa ni el umbral tienen calibración agronómica:** permiten comprobar
causalidad y persistencia, no pronosticar producción. Una planta muerta no revive al reparar;
una siembra posterior es un estado nuevo. No se llama a esta variable balance de masa del
organismo: faltan CO₂, respiración, agua incorporada y biomasa no comestible.

## Estados y fallos

| Fallo | Mecanismo | Respuesta / recuperación | Límite |
|---|---|---|---|
| Menos energía | Polvo exterior → disponibilidad eléctrica para luz (25 % ilustrativo, 21 soles) → daño | Termina la reducción; el daño previo permanece hasta cosecha/nueva siembra | Sin térmica ni predicción meteorológica |
| Bomba detenida | Entrega de agua cero, aun con depósito lleno | Reparar restaura entrega; conserva el daño | Sin curva de retención del sustrato |
| Atasco | El reloj y los cultivos continúan; el anillo no avanza | Reparación explícita; sin recuperar pasos de golpe | Torque, bloqueo y dosis real pendientes |
| Lote rechazado | Resultado no apto en S8 | Retener giro; sustitución explícita de 0.5 sol con un repuesto y lote antiguo en cuarentena | Duración y maniobra ilustrativas; B19 y masa de 110 kg abiertos |

Sin autorización, S8 queda retenida. El constructor inicia seguro (`autorizacionesIlustrativas=false`).
El recorrido didáctico activa resultados **simulados** para enseñar la secuencia; `?autorizacion=0`
permite comprobar la retención por falta de datos. No hay umbral químico inventado ni conexión
con actuadores físicos. La cuarentena conserva identidad, historial y masa; los repuestos son
finitos. Digestato y larvas hacia alimento/cultivo se dibujan con cierre; la salmuera no conecta
al digestor ni al riego. El depósito de riego representa aporte acondicionado externo.

## Comparación de siembras

`MILPA.comparar` usa un banco virtual **distinto del anillo operativo**: doce parcelas fijas,
misma área, especies, recursos, tasas, ley de daño y cantidad inicial de biomasa para ambas
estrategias. Sólo cambia la fase de siembra. Cada estrategia tiene además su control sin fallo.
La siembra sincronizada no se presenta como otra cinemática del carrusel.

Se informa cosecha, biomasa aún en pie, kcal perdidas frente al control de cada estrategia,
agua, energía y demora hasta primera cosecha posterior al fallo. Esa demora **no** prueba
recuperación de productividad nominal. No se exige que el desfase gane. Cambiar inicio,
duración o energía cambia el resultado; una ventana finita puede favorecer fases diferentes.
Sin fallo, ambas pérdidas frente a su propio control son cero. Los kg vegetales mezclan
productos con distinta humedad: no son kg de materia seca.

## Reproducir y aceptación S1

```bash
python3 analysis/milpa360_p3.py
python3 analysis/verificar_geometria.py
node analysis/verificar_p3.cjs
```

La prueba P3 falló inicialmente porque faltaba el modelo independiente. Se corrigió después
un error de permanencia durante atasco: la residencia continúa aunque el motor no avance.
Ahora verifica particiones temporales equivalentes, tiempo inválido, pausa, horizonte sin
reinicio, bloqueo sin autorización, cuarentena/repuestos, sequía persistente, recuperación
mecánica, inventarios no negativos y cierre numérico de agua/gas/sustrato. También comprueba
recursos y biomasa inicial iguales y sensibilidad a duración e intensidad del fallo.

**S1 digital verificada; S2 pendiente de navegador/offline/capturas.** La cantidad conservada
de sustrato no implica densidad medida ni cierre de los balances biológicos. B1–B19 siguen
abiertos según `ESTADO.md`. P4 dimensionará equipos y protocolos; no se fabricaron resultados.
