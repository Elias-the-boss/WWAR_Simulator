# Plan de refactor

## Estado actual

La version `obsolete/wwar beta.html` se ha convertido en un proyecto web separado:

- HTML en `index.html`.
- CSS en `src/styles/game.css`.
- Datos del mapa mundial en `src/data/world-map.js`.
- JavaScript en `src/legacy/game.js`.

La logica no se ha reescrito todavia para evitar introducir errores grandes de golpe. El mapa ya usa D3/GeoJSON y genera una provincia por pais.

## Prioridad 1: ordenar datos

Crear:

- `src/data/nations.js`
- `src/config.js`

Mover ahi `CONFIG` y `nations` iniciales.

## Prioridad 2: dividir sistemas

Separar `src/legacy/game.js` en modulos por responsabilidad:

- `src/game/state.js`
- `src/game/turns.js`
- `src/game/economy.js`
- `src/game/ai.js`
- `src/map/map.js`
- `src/ui/hud.js`
- `src/ui/modals.js`
- `src/ui/flags.js`
- `src/battle/battle.js`
- `src/battle/physics.js`
- `src/battle/units.js`

## Prioridad 3: quitar dependencias globales

Actualmente muchas funciones se llaman desde atributos HTML como `onclick`.
El siguiente paso es sustituir eso por `addEventListener` en JavaScript.

## Prioridad 4: aislar mapa

Mover la logica D3 desde `src/legacy/game.js` a `src/map/map.js`, manteniendo los clics de diplomacia, ataques, espias, nukes y defensas.
