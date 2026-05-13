# WAR Simulator

Juego web de estrategia y conquista con mapa mundial, escenarios historicos, diplomacia, batallas, editor de continentes, creador de banderas, musica y eventos de campaña.

## Estado del proyecto

Esta es la version activa del juego. Las versiones HTML antiguas se conservan solo como referencia dentro de `obsolete/`.

## Como abrirlo

La forma recomendada para desarrollo es usar el servidor local:

```powershell
cd "C:\Users\trewq\Documents\New project"
node dev-server.js
```

Luego abre:

```text
http://localhost:5173/
```

Tambien se puede abrir `index.html` directamente, pero algunas funciones funcionan mejor desde el servidor local.

## Estructura

```text
.
├── index.html              # Pantallas, menus y estructura principal del juego
├── dev-server.js           # Servidor local simple para desarrollo
├── src/
│   ├── data/
│   │   └── world-map.js    # Provincias, paises, escenarios, recursos y mapa
│   ├── legacy/
│   │   └── game.js         # Logica principal del juego
│   └── styles/
│       └── game.css        # Estilos visuales
├── docs/
│   └── refactor-plan.md    # Plan tecnico para dividir mejor el codigo
├── obsolete/
│   ├── WW V2.html          # Version antigua de referencia
│   └── wwar beta.html      # Version beta original de referencia
└── logs/
    ├── server.err.log      # Logs locales, no se suben a GitHub
    └── server.out.log      # Logs locales, no se suben a GitHub
```

## Archivos importantes

- `index.html`: entrada principal del juego.
- `src/legacy/game.js`: contiene la mayoria de sistemas actuales: turnos, IA, batallas, tienda, diplomacia, musica, campaña y editor.
- `src/data/world-map.js`: contiene los datos del mapa, escenarios historicos, recursos, territorios y facciones.
- `src/styles/game.css`: controla el aspecto visual, menus, mapas, batalla y pantallas.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. En esta carpeta, ejecuta:

```powershell
git add index.html src docs obsolete README.md dev-server.js .gitignore
git commit -m "Primera version ordenada del juego"
git remote add origin https://github.com/TU_USUARIO/NOMBRE_DEL_REPO.git
git branch -M main
git push -u origin main
```

3. En GitHub entra en:

```text
Settings -> Pages -> Build and deployment -> Deploy from branch
```

4. Selecciona:

```text
Branch: main
Folder: /root
```

GitHub dara una URL publica parecida a:

```text
https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/
```

## Siguiente limpieza recomendada

El juego ya esta separado en archivos, pero `src/legacy/game.js` sigue siendo muy grande. El siguiente paso bueno seria dividirlo por sistemas:

- `src/game/` para estado, turnos, economia e IA.
- `src/map/` para mapa, provincias, recursos y etiquetas.
- `src/battle/` para combate, unidades, proyectiles y fisicas.
- `src/ui/` para menus, modales, tienda, banderas y editor.
- `src/audio/` para musica, efectos y ambientes por epoca.

