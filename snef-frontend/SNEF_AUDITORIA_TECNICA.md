# SNEF 2026 - Auditoria tecnica

## Alcance y criterios

Esta auditoria describe el estado comprobado del repositorio inspeccionado en `C:\Mis archivos\SNEF 2026\snef-frontend`. No se modifico codigo fuente, no se instalaron dependencias, no se ejecutaron migraciones y no se hicieron commits durante la inspeccion original. Los comandos seguros ejecutados fueron `npm.cmd run build` y `npm.cmd run lint`.

Las afirmaciones tecnicas se clasifican como:

- **Hecho comprobado:** observado directamente en archivos, estructura del repositorio o salida de comandos.
- **Inferencia:** conclusion derivada de hechos observados.
- **Pendiente de confirmar:** informacion que no existe en este checkout o requiere validacion externa.

No se documentan valores de secretos, tokens, contrasenas, cookies ni valores privados de archivos `.env`. Cuando aplica, solo se mencionan nombres de variables o claves locales.

## 1. Resumen del repositorio

### Tipo de repositorio

- **Hecho comprobado:** El checkout inspeccionado es un frontend web React/Vite con artefactos Unity WebGL publicados como archivos estaticos locales. Base: `package.json`, `vite.config.js`, `src/main.jsx`, `public/unity-local/`, `public-local/unity/`.
- **Hecho comprobado:** No se encontro backend fuente ni proyecto Unity fuente completo en este checkout. Base: ausencia de `server/`, `api/`, `routes/`, `controllers/`, `models/`, `migrations/`, `Assets/`, `Packages/manifest.json`, `ProjectSettings/ProjectVersion.txt`, `*.unity`.
- **Inferencia:** El proyecto operativo actual combina frontend web con builds Unity WebGL precompilados, no con fuentes Unity editables. Base: `src/components/ui/Navbar.jsx`, `public/unity-local/`, `public-local/unity/`.

### Ruta inspeccionada

- **Hecho comprobado:** Ruta del repositorio frontend inspeccionado: `C:\Mis archivos\SNEF 2026\snef-frontend`. Base: contexto de workspace y comandos ejecutados en esa ruta.
- **Hecho comprobado:** Git root reportado: `C:/Mis archivos/SNEF 2026`. Base: `git -c safe.directory='C:/Mis archivos/SNEF 2026' rev-parse --show-toplevel`.

### Rama actual

- **Hecho comprobado:** Rama actual: `main`. Base: `git -c safe.directory='C:/Mis archivos/SNEF 2026' branch --show-current`.

### Estado de Git

- **Hecho comprobado:** El repositorio tenia cambios locales previos a esta documentacion. Base: `git status --short`.
- **Hecho comprobado:** Git requirio `safe.directory` temporal por diferencia de propietario del repositorio, sin modificar la configuracion global. Base: salida inicial de `git branch --show-current` y uso posterior de `git -c safe.directory=...`.

### Archivos modificados sin commit

Base: `git status --short`.

```text
M .gitignore
M src/App.jsx
M src/components/ui/Navbar.jsx
M src/index.css
M src/pages/DesignSystem/DesignSystem.jsx
M src/pages/Home/Home.jsx
M src/pages/Login/Login.jsx
M src/pages/Progress/Progress.jsx
```

### Archivos y directorios sin tracking

Base: `git status --short`.

```text
?? src/assets/Materiales-sponsors/
?? src/components/catalog/
?? src/components/home/
?? src/components/movie-preview/
?? src/components/quiz/
?? src/components/ui/Modal.jsx
?? src/components/watch/
?? src/data/
?? src/pages/Catalog/
?? src/pages/MoviePreview/
?? src/pages/Quiz/
?? src/pages/Watch/
?? src/utils/
```

### Archivos ignorados relevantes

- **Hecho comprobado:** `dist/`, `node_modules/`, `public-local/`, `public/unity-local/` y logs `vite-*.log` estan ignorados. Base: `.gitignore`, `git status --short --ignored`.

### Tecnologias detectadas

- **Hecho comprobado:** React, React DOM, React Router, Vite, Tailwind CSS, lucide-react. Base: `package.json`.
- **Hecho comprobado:** ESLint con flat config, plugins de React Hooks y React Refresh. Base: `eslint.config.js`, `package.json`.
- **Hecho comprobado:** Cloudinary Video Player se carga dinamicamente desde CDN en runtime. Base: `src/components/watch/WatchPlayer.jsx`.
- **Hecho comprobado:** Unity WebGL se sirve como artefacto estatico. Base: `public/unity-local/Build2/index.html`, `public/unity-local/Build SNEF 2.0/index.html`, `src/components/ui/Navbar.jsx`.

### Lenguajes principales

- **Hecho comprobado:** JavaScript, JSX, CSS y HTML. Base: `src/**/*.js`, `src/**/*.jsx`, `src/**/*.css`, `index.html`, `public/unity-local/*/index.html`.
- **Hecho comprobado:** No se detecto TypeScript. Base: ausencia de `tsconfig.json` y archivos `*.ts`/`*.tsx` en el listado relevante.

### Package manager

- **Hecho comprobado:** npm. Base: `package-lock.json`, scripts en `package.json`.

## 2. Arbol de archivos relevante

Excluye `node_modules`, `dist` y dependencias externas. Incluye artefactos Unity ignorados porque son referenciados por el frontend.

```text
snef-frontend/
  .gitignore
  eslint.config.js
  index.html
  package.json
  package-lock.json
  vite.config.js
  public/
    favicon.svg
    icons.svg
    unity-local/
      Build SNEF 2.0/
        index.html
        Build/
        TemplateData/
      Build2/
        index.html
        Build/
        TemplateData/
  public-local/
    unity/
      build-0-1-snef-2026/
        index.html
        Build/
        TemplateData/
      Build2/
        index.html
        Build/
        TemplateData/
  src/
    main.jsx
    App.jsx
    index.css
    App.css
    styles/
      tokens.css
    context/
      AuthContext.jsx
    services/
      api.js
    utils/
      catalog.js
      movieProgress.js
    data/
      sponsors/
        homeCinemaSponsors.js
        movieQuizData.js
        movieVideo.js
        platformMovies.js
        sponsorShelves.js
    pages/
      Login/
      Register/
      RecoverPassword/
      Home/
      Catalog/
      MoviePreview/
      Watch/
      Quiz/
      Progress/
      DesignSystem/
    components/
      ui/
      home/
      catalog/
      movie-preview/
      watch/
      quiz/
    assets/
      brand/
      iconos/
      Materiales-sponsors/
```

Base: `rg --files`, `Get-ChildItem -Recurse -Directory -Depth 4`, `.gitignore`.

## 3. Frontend web

### Entry point

- **Hecho comprobado:** El entry point es `src/main.jsx`; monta `StrictMode`, `BrowserRouter`, `AuthProvider` y `App`. Base: `src/main.jsx`.
- **Hecho comprobado:** El documento HTML raiz carga `/src/main.jsx`. Base: `index.html`.

### Sistema de rutas

- **Hecho comprobado:** El sistema de rutas usa `react-router-dom` con `Routes`, `Route` y `Navigate`. Base: `src/App.jsx`.
- **Hecho comprobado:** Rutas existentes:

```text
/                    -> src/pages/Login/Login.jsx
/registro            -> src/pages/Register/Register.jsx
/recuperar-password  -> src/pages/RecoverPassword/RecoverPassword.jsx
/home                -> src/pages/Home/Home.jsx
/catalogo            -> src/pages/Catalog/Catalog.jsx
/preview/:movieId    -> src/pages/MoviePreview/MoviePreview.jsx
/watch/:movieId      -> src/pages/Watch/WatchPage.jsx
/quiz/:movieId       -> src/pages/Quiz/QuizPage.jsx
/design-system       -> src/pages/DesignSystem/DesignSystem.jsx
/progreso            -> src/pages/Progress/Progress.jsx
*                    -> Navigate a /
```

Base: `src/App.jsx`.

### Paginas existentes

- **Hecho comprobado:** Login implementa acceso mock y modo invitado con modal de advertencia. Base: `src/pages/Login/Login.jsx`, `src/context/AuthContext.jsx`, `src/services/api.js`.
- **Hecho comprobado:** Registro implementa formulario en dos pasos, pero no persiste contra backend. Base: `src/pages/Register/Register.jsx`.
- **Hecho comprobado:** Recuperacion de contrasena implementa flujo visual en dos pasos, pero no valida contra backend. Base: `src/pages/RecoverPassword/RecoverPassword.jsx`.
- **Hecho comprobado:** Home muestra seccion de cine y estantes de sponsors Oro/Plata/Bronce. Base: `src/pages/Home/Home.jsx`, `src/components/home/*`, `src/data/sponsors/sponsorShelves.js`.
- **Hecho comprobado:** Catalogo permite filtrar peliculas por categoria financiera. Base: `src/pages/Catalog/Catalog.jsx`, `src/components/catalog/*`, `src/utils/catalog.js`.
- **Hecho comprobado:** MoviePreview resuelve una pelicula por `movieId` y muestra hero con acciones. Base: `src/pages/MoviePreview/MoviePreview.jsx`, `src/components/movie-preview/*`, `src/data/sponsors/platformMovies.js`.
- **Hecho comprobado:** Watch reproduce video Cloudinary o fallback iframe y marca la pelicula como vista al terminar. Base: `src/pages/Watch/WatchPage.jsx`, `src/components/watch/WatchPlayer.jsx`, `src/utils/movieProgress.js`.
- **Hecho comprobado:** Quiz consume preguntas mock de la pelicula y muestra resultado con recompensa en Ditas. Base: `src/pages/Quiz/QuizPage.jsx`, `src/components/quiz/*`, `src/data/sponsors/movieQuizData.js`.
- **Hecho comprobado:** Progress muestra resumen y misiones hardcodeadas. Base: `src/pages/Progress/Progress.jsx`.
- **Hecho comprobado:** DesignSystem documenta visualmente componentes y menciona Unity WebGL. Base: `src/pages/DesignSystem/DesignSystem.jsx`.

### Componentes principales

- **UI compartida:** `Button`, `FormInput`, `Modal`, `Navbar`, `OptionSelector`, `PasswordInput`, `SelectInput`, `StepIndicator`. Base: `src/components/ui/*`.
- **Home/catalogo:** `CinemaSponsorSection`, `CinemaHeroSlider`, `CinemaHeroCard`, `SponsorShelfSection`, `SponsorShelfViewport`, `SponsorMovieCard`, `CatalogFilters`, `CatalogGrid`, `CatalogSection`. Base: `src/components/home/*`, `src/components/catalog/*`.
- **Preview:** `MoviePreviewHero`, `MoviePreviewActions`, `SponsorSocialLinks`. Base: `src/components/movie-preview/*`.
- **Watch:** `WatchPlayer`, `WatchControls`, `WatchEndScreen`, `AutoQuizButton`. Base: `src/components/watch/*`.
- **Quiz:** `QuizLayout`, `QuizQuestionCard`, `QuizOptionCard`, `QuizIncorrectModal`, `QuizProgressDots`, `QuizFooterBrand`, `QuizResultScreen`. Base: `src/components/quiz/*`.

### Layouts

- **Hecho comprobado:** No existe carpeta `layouts/`. Base: listado de archivos con `rg --files`.
- **Inferencia:** El layout se compone por pagina usando `Navbar` y clases globales (`snef-page`, `snef-layout-container`). Base: `src/pages/Home/Home.jsx`, `src/pages/Catalog/Catalog.jsx`, `src/index.css`, `src/components/ui/Navbar.jsx`.

### Manejo de estado y autenticacion

- **Hecho comprobado:** El estado global de autenticacion se maneja con React Context. Base: `src/context/AuthContext.jsx`.
- **Hecho comprobado:** La sesion se persiste en `localStorage` usando las claves `snef_user` y `snef_token`. Base: `src/context/AuthContext.jsx`, `src/services/api.js`.
- **Hecho comprobado:** El modo invitado existe con `isGuest`. Base: `src/services/api.js`, `src/context/AuthContext.jsx`.
- **Hecho comprobado:** No hay rutas protegidas en `App.jsx`; las rutas se declaran publicamente. Base: `src/App.jsx`.
- **Inferencia:** La autorizacion actual depende de UI/flujo, no de guardas de ruta. Base: `src/App.jsx`, `src/context/AuthContext.jsx`.

### Almacenamiento del JWT

- **Hecho comprobado:** La clave local usada para token es `snef_token`. Base: `src/context/AuthContext.jsx`, `src/services/api.js`.
- **Hecho comprobado:** Existe un token mock literal en codigo de mocks; su valor no se documenta aqui. Base: `src/services/api.js`.

### Servicios HTTP

- **Hecho comprobado:** El cliente API central actual esta en `src/services/api.js`. Base: `src/services/api.js`.
- **Hecho comprobado:** `getHeaders()` agrega `Content-Type` y `Authorization: Bearer ...` si existe token local. Base: `src/services/api.js`.
- **Hecho comprobado:** `loginUser()` tiene rama mock activa y rama fetch preparada hacia `/auth/login`. Base: `src/services/api.js`.
- **Hecho comprobado:** No existen servicios para registro, recuperacion, catalogo, quiz, Ditas, misiones, inventario o metricas. Base: `src/services/api.js`, busqueda de exports en `src/services`.

### Uso de mocks y datos locales

- **Hecho comprobado:** `USE_MOCKS` esta activo en el servicio API. Base: `src/services/api.js`.
- **Hecho comprobado:** Usuario mock e invitado mock viven en `src/services/api.js`. Base: `src/services/api.js`.
- **Hecho comprobado:** Sponsors, peliculas, categorias, quiz y video de ejemplo viven en `src/data/sponsors/*`. Base: `src/data/sponsors/sponsorShelves.js`, `src/data/sponsors/homeCinemaSponsors.js`, `src/data/sponsors/movieQuizData.js`, `src/data/sponsors/movieVideo.js`, `src/data/sponsors/platformMovies.js`.
- **Hecho comprobado:** Progreso de peliculas vistas se guarda localmente en `localStorage` con la clave `snefMovieProgress`. Base: `src/utils/movieProgress.js`.

### Variables de entorno esperadas

- **Hecho comprobado:** No se detectaron archivos `.env*` en el repositorio inspeccionado. Base: busqueda `Get-ChildItem -Recurse -Include '.env*'`.
- **Hecho comprobado:** No se detecto uso de `import.meta.env` ni variables `VITE_*`. Base: `rg "import.meta.env|VITE_" src`.
- **Pendiente de confirmar:** Podria requerirse una variable futura para la URL de API, por ejemplo `VITE_API_URL`, pero no esta implementada. Base: `src/services/api.js` usa una constante local fija.

### Tailwind y estilos globales

- **Hecho comprobado:** Tailwind se importa en `src/index.css` con `@import "tailwindcss"`. Base: `src/index.css`.
- **Hecho comprobado:** Vite usa `@tailwindcss/vite`. Base: `vite.config.js`, `package.json`.
- **Hecho comprobado:** Tokens CSS globales viven en `src/styles/tokens.css`. Base: `src/styles/tokens.css`.
- **Hecho comprobado:** No existe `tailwind.config.*` en el listado inspeccionado. Base: `rg --files`.
- **Hecho comprobado:** `src/App.css` esta vacio. Base: `src/App.css`.

### Convenciones de carpetas, nombres y componentes

- **Hecho comprobado:** Se usan carpetas por dominio bajo `src/pages`, `src/components`, `src/data`, `src/utils`, `src/services`, `src/context`. Base: estructura `src/`.
- **Hecho comprobado:** Los componentes usan funciones y `export default` en archivos JSX. Base: `src/components/**/*.jsx`, `src/pages/**/*.jsx`.
- **Hecho comprobado:** Los imports son relativos; no hay alias configurados. Base: `src/**/*.jsx`, `vite.config.js`.
- **Hecho comprobado:** El idioma de UI y comentarios es principalmente espanol, con identificadores mixtos en ingles. Base: `src/pages/*.jsx`, `src/components/*.jsx`.

### Dependencias relevantes

Base: `package.json`.

```text
@tailwindcss/vite
lucide-react
react
react-dom
react-router-dom
tailwindcss
@vitejs/plugin-react
eslint
eslint-plugin-react-hooks
eslint-plugin-react-refresh
vite
```

### Integracion actual con Unity WebGL

- **Hecho comprobado:** `Navbar` define `unityBuildUrl = '/unity-local/Build2/index.html'`. Base: `src/components/ui/Navbar.jsx`.
- **Hecho comprobado:** Los botones "Set de grabacion" y "Visitar cine" redirigen con `window.location.href` a esa URL. Base: `src/components/ui/Navbar.jsx`.
- **Hecho comprobado:** No hay iframe React ni comunicacion `postMessage`/`SendMessage` entre React y Unity. Base: `src/components/ui/Navbar.jsx`, busqueda `rg "SendMessage|postMessage|createUnityInstance" src`.
- **Inferencia:** La integracion actual es navegacion hacia una build estatica, no integracion embebida con estado compartido. Base: `src/components/ui/Navbar.jsx`, `public/unity-local/Build2/index.html`.

## 4. Unity

### Proyecto Unity fuente

- **Hecho comprobado:** No se encontro `ProjectSettings/ProjectVersion.txt`; no se puede determinar version de Unity desde fuente. Base: busqueda `rg --files -g 'ProjectVersion.txt'`.
- **Hecho comprobado:** No se encontraron `Packages/manifest.json`, `ProjectSettings.asset`, `EditorBuildSettings.asset`, escenas `.unity` ni scripts C#. Base: busqueda dirigida de archivos Unity.
- **Pendiente de confirmar:** Version exacta de editor Unity, render pipeline, Input System, escenas, scripts, prefabs, avatar selector, movie selector, inventario y Build Settings requieren el proyecto Unity fuente.

### Artefactos Unity WebGL encontrados

- **Hecho comprobado:** Existen artefactos WebGL en `public/unity-local/Build2/`. Base: `public/unity-local/Build2/index.html`, `public/unity-local/Build2/Build/*`.
- **Hecho comprobado:** Existen artefactos WebGL en `public/unity-local/Build SNEF 2.0/`. Base: `public/unity-local/Build SNEF 2.0/index.html`, `public/unity-local/Build SNEF 2.0/Build/*`.
- **Hecho comprobado:** Existen artefactos duplicados o alternativos en `public-local/unity/Build2/` y `public-local/unity/build-0-1-snef-2026/`. Base: `public-local/unity/*`.
- **Hecho comprobado:** `public/unity-local/Build2/index.html` declara `companyName: "DefaultCompany"`, `productName: "SNEF 2.0"` y `productVersion: "0.1.0"`. Base: `public/unity-local/Build2/index.html`.
- **Hecho comprobado:** `public/unity-local/Build2` usa archivos `Buil 0_6.data.unityweb`, `Buil 0_6.framework.js.unityweb`, `Buil 0_6.loader.js`, `Buil 0_6.wasm.unityweb`. Base: `public/unity-local/Build2/index.html`, `public/unity-local/Build2/Build/`.
- **Hecho comprobado:** `public/unity-local/Build SNEF 2.0` usa archivos `.br` precomprimidos. Base: `public/unity-local/Build SNEF 2.0/index.html`, `public/unity-local/Build SNEF 2.0/Build/`.

### Riesgos evidentes para WebGL

- **Alto, hecho comprobado:** `public/unity-local/` y `public-local/` estan ignorados, aunque `Navbar` apunta a `/unity-local/Build2/index.html`; un despliegue basado solo en archivos trackeados puede no incluir la build. Base: `.gitignore`, `src/components/ui/Navbar.jsx`, `git status --short --ignored`.
- **Medio, hecho comprobado:** La build con `.br` requiere headers correctos de `Content-Encoding: br` y servidor HTTP; Unity advierte sobre fallos si se sirve mal. Base: `public/unity-local/Build SNEF 2.0/index.html`, `public/unity-local/Build SNEF 2.0/Build/Build_SNEF.loader.js`.
- **Medio, hecho comprobado:** Hay nombres de carpeta/archivo con espacios o nombre truncado (`Build SNEF 2.0`, `Buil 0_6.*`) que pueden complicar scripts y despliegues. Base: `public/unity-local/*`.
- **Pendiente de confirmar:** Compatibilidad movil, memoria WebGL, cursor lock, input y performance requieren pruebas runtime de la build Unity. Base: ausencia de fuente Unity y pruebas automatizadas.

## 5. Backend y API

- **Hecho comprobado:** No existe backend fuente en este checkout. Base: ausencia de `server/`, `api/`, `routes/`, `controllers/`, `models/`, `migrations/`, `seeders/`.
- **Hecho comprobado:** No se detecto framework backend, ORM, migraciones, seeders, validadores, CORS ni middleware de errores. Base: estructura del repositorio y `package.json`.
- **Hecho comprobado:** Existe una constante local de URL base de API en `src/services/api.js`; no se documenta ningun valor secreto. Base: `src/services/api.js`.
- **Hecho comprobado:** Solo hay contrato preparado para login real: `POST /auth/login`. Base: `src/services/api.js`.
- **Hecho comprobado:** Registro y recuperacion mencionan funciones futuras en comentarios TODO. Base: `src/pages/Register/Register.jsx`, `src/pages/RecoverPassword/RecoverPassword.jsx`.
- **Inferencia:** El backend esperado debera cubrir auth, registro, recuperacion, catalogo, progreso, Ditas, misiones, inventario, Unity y metricas para reemplazar mocks. Base: `src/services/api.js`, `src/data/sponsors/*`, `src/pages/Progress/Progress.jsx`, `src/components/ui/Navbar.jsx`.

## 6. Modelos y contratos de datos

### Usuario

- **Implementado simulado:** `id`, `username`, `avatar`, `ditas`, `isGuest`. Base: `src/services/api.js`.

### Sesion invitada

- **Implementado simulado:** usuario invitado sin token y con `isGuest`. Base: `src/services/api.js`, `src/context/AuthContext.jsx`.

### Pelicula o contenido

- **Implementado simulado:** `id`, `title`, `category`, `categoryAccentColor`, `cover`, `coverDesktop`, `coverMobile`, `previewCover`, `synopsis`, `quiz`, `video`, `sponsorLogo`, `availabilityLabel` en algunos casos. Base: `src/data/sponsors/homeCinemaSponsors.js`, `src/data/sponsors/sponsorShelves.js`, `src/utils/catalog.js`.

### Sponsor

- **Implementado simulado:** `id`, `name`, `title`, `logo`, `socialLinks`, `movies`. Base: `src/data/sponsors/homeCinemaSponsors.js`, `src/data/sponsors/sponsorShelves.js`.

### Categoria de patrocinio

- **Implementado simulado:** `oro`, `plata`, `bronce`, `sala-de-cine`. Base: `src/data/sponsors/sponsorShelves.js`, `src/utils/catalog.js`, `src/data/sponsors/platformMovies.js`.

### Trivia, preguntas y opciones

- **Implementado simulado:** `rewardDitas`, `questions`, `options`, `isCorrect`, `incorrectExplanation`, `color`. Base: `src/data/sponsors/movieQuizData.js`, `src/pages/Quiz/QuizPage.jsx`.

### Progreso

- **Implementado local:** peliculas vistas por `movieId` en `localStorage`, con `watched` y `watchedAt`. Base: `src/utils/movieProgress.js`, `src/pages/Watch/WatchPage.jsx`.
- **Implementado simulado:** resumen de progreso con peliculas, quizzes y misiones. Base: `src/pages/Progress/Progress.jsx`.

### Ditas o wallet

- **Implementado parcial/simulado:** `ditas` en usuario mock y recompensa de quiz/misiones. Base: `src/services/api.js`, `src/data/sponsors/movieQuizData.js`, `src/pages/Progress/Progress.jsx`.
- **No existe:** wallet real, saldo persistente, endpoints o reglas transaccionales. Base: ausencia de servicios/modelos backend.

### Transacciones

- **No existe:** no se detectaron modelos ni mocks de transacciones. Base: busqueda en `src/` y ausencia de backend.

### Misiones

- **Implementado simulado:** lista hardcodeada de misiones activas. Base: `src/pages/Progress/Progress.jsx`.

### Inventario

- **No existe:** no se detectaron modelos, paginas ni servicios de inventario. Base: estructura `src/` y busqueda dirigida.

### Avatar

- **Implementado parcial:** avatar default en navbar y usuario mock. Base: `src/components/ui/Navbar.jsx`, `src/services/api.js`, `src/assets/iconos/foto_perfil.png`.
- **No existe:** selector de avatar web o Unity conectado. Base: estructura `src/`, ausencia de servicios.

### Objetos del set de grabacion

- **No existe en React:** solo hay boton hacia Unity. Base: `src/components/ui/Navbar.jsx`.
- **Pendiente de confirmar:** podria existir dentro de la build Unity, pero no se puede auditar sin fuentes. Base: `public/unity-local/*`.

### Eventos de metricas

- **No existe:** no se detectaron eventos analytics/metricas. Base: busqueda en `src/` y ausencia de backend.

## 7. Comandos disponibles

Base: `package.json`.

```text
npm run dev      -> vite
npm run build    -> vite build
npm run lint     -> eslint .
npm run preview  -> vite preview
```

- **Hecho comprobado:** No existen scripts declarados para tests. Base: `package.json`.
- **Hecho comprobado:** No existe script `typecheck`. Base: `package.json`.
- **Hecho comprobado:** No existen scripts backend, base de datos ni Unity WebGL. Base: `package.json`.

## 8. Estado actual de calidad

### Build

- **Comando:** `npm.cmd run build`.
- **Resultado:** exitoso.
- **Hecho comprobado:** Vite transformo 1811 modulos y genero salida en `dist/`. Base: salida de `npm.cmd run build`.
- **Nota:** `dist/` esta ignorado. Base: `.gitignore`.
- **Advertencia operativa:** `npm run build` via PowerShell fallo por politica de ejecucion de `npm.ps1`; `npm.cmd run build` funciono. Base: salida de comandos.

### Lint

- **Comando:** `npm.cmd run lint`.
- **Resultado:** falla.
- **Hecho comprobado:** ESLint reporto `194 problems (193 errors, 1 warning)`. Base: salida de `npm.cmd run lint`.
- **Hecho comprobado:** La mayoria de errores proviene de loaders Unity generados en:
  - `public-local/unity/Build2/Build/Buil 0_6.loader.js`
  - `public-local/unity/build-0-1-snef-2026/Build/Build SNEF 2.0.loader.js`
  - `public/unity-local/Build2/Build/Buil 0_6.loader.js`
  - `public/unity-local/Build SNEF 2.0/Build/Build_SNEF.loader.js`
  Base: salida de `npm.cmd run lint`.
- **Hecho comprobado:** Errores propios de React detectados:
  - `src/context/AuthContext.jsx:16`: `react-hooks/set-state-in-effect`.
  - `src/context/AuthContext.jsx:75`: `react-refresh/only-export-components`.
  - `src/pages/RecoverPassword/RecoverPassword.jsx:164`: `no-unused-vars` para `onBack`.
  Base: salida de `npm.cmd run lint`.
- **Hecho comprobado:** Advertencia propia:
  - `src/context/AuthContext.jsx:65`: dependencias faltantes de `useMemo`.
  Base: salida de `npm.cmd run lint`.

### Tests y typecheck

- **Hecho comprobado:** No se ejecutaron tests porque no hay script de tests. Base: `package.json`.
- **Hecho comprobado:** No se ejecuto typecheck porque no hay TypeScript ni script `typecheck`. Base: `package.json`, estructura del repo.

## 9. Convenciones existentes

- **Hecho comprobado:** Componentes funcionales React en JSX. Base: `src/components/**/*.jsx`, `src/pages/**/*.jsx`.
- **Hecho comprobado:** Estado local con `useState`, efectos con `useEffect`, memoizacion con `useMemo`, refs con `useRef`. Base: `src/pages/Quiz/QuizPage.jsx`, `src/components/watch/WatchPlayer.jsx`, `src/components/home/*`.
- **Hecho comprobado:** Rutas via React Router hooks (`useNavigate`, `useParams`, `NavLink`). Base: `src/App.jsx`, `src/pages/MoviePreview/MoviePreview.jsx`, `src/pages/Watch/WatchPage.jsx`, `src/components/ui/Navbar.jsx`.
- **Hecho comprobado:** CSS combina Tailwind utility classes con clases globales `snef-*` y clases por modulo visual. Base: `src/index.css`, `src/**/*.jsx`.
- **Hecho comprobado:** Tokens visuales centralizados en CSS variables. Base: `src/styles/tokens.css`.
- **Hecho comprobado:** No se detecta Prettier. Base: ausencia de configuraciones Prettier en listado de archivos.
- **Hecho comprobado:** ESLint ignora solo `dist` por configuracion, no `public-local` ni `public/unity-local`. Base: `eslint.config.js`.
- **Hecho comprobado:** Hay comentarios TODO para integracion backend/video. Base: `src/pages/Register/Register.jsx`, `src/pages/RecoverPassword/RecoverPassword.jsx`, `src/components/watch/WatchPlayer.jsx`.

## 10. Riesgos y deuda tecnica

### Critico

- **No se detecto un riesgo critico comprobable que impida el build frontend.** Base: `npm.cmd run build` exitoso.

### Alto

- **Mocks activos y auth no real.** `USE_MOCKS` esta activo, login usa datos simulados y existe token mock literal no documentado aqui. Base: `src/services/api.js`, `src/pages/Login/Login.jsx`.
- **Build Unity referenciado pero ignorado por Git.** `Navbar` apunta a `/unity-local/Build2/index.html`, mientras `.gitignore` ignora `public/unity-local/`. Base: `src/components/ui/Navbar.jsx`, `.gitignore`, `git status --short --ignored`.
- **Lint roto.** `eslint .` analiza artefactos Unity y tambien detecta problemas React propios. Base: `eslint.config.js`, salida de `npm.cmd run lint`.

### Medio

- **Rutas sin proteccion.** No hay guards para impedir acceso directo a rutas internas. Base: `src/App.jsx`, `src/context/AuthContext.jsx`.
- **Registro y recuperacion no integrados.** Solo tienen TODO y log local sin backend. Base: `src/pages/Register/Register.jsx`, `src/pages/RecoverPassword/RecoverPassword.jsx`.
- **Progreso no asociado a cuenta real.** Se guarda solo en `localStorage`. Base: `src/utils/movieProgress.js`.
- **Cloudinary depende de CDN externo en runtime.** El reproductor carga scripts/estilos desde `unpkg`. Base: `src/components/watch/WatchPlayer.jsx`.
- **Fallback de video simula fin de reproduccion.** En modo fallback se usa progreso simulado de duracion fija. Base: `src/components/watch/WatchPlayer.jsx`.
- **Artefactos Unity grandes y duplicados.** Existen builds en `public/unity-local` y `public-local/unity` con tamanos grandes. Base: `public/unity-local/*`, `public-local/unity/*`.

### Bajo

- **Mojibake visible en textos.** Hay cadenas con caracteres mal codificados en varios archivos. Base: `src/pages/Login/Login.jsx`, `src/pages/Register/Register.jsx`, `src/pages/RecoverPassword/RecoverPassword.jsx`, `src/data/sponsors/movieQuizData.js`.
- **`src/App.css` vacio.** Puede ser residuo de plantilla. Base: `src/App.css`.
- **README generico de Vite.** No documenta SNEF. Base: `README.md`.

## 11. Archivos que no deben modificarse sin autorizacion

- **Artefactos generados o pesados:** `dist/`, `node_modules/`, `public/unity-local/`, `public-local/`. Base: `.gitignore`, estructura del repo.
- **Configuracion sensible de tooling:** `.gitignore`, `package-lock.json`, `vite.config.js`, `eslint.config.js`. Base: raiz del repo.
- **Puntos centrales de arquitectura:** `src/main.jsx`, `src/App.jsx`, `src/context/AuthContext.jsx`, `src/services/api.js`, `src/components/ui/Navbar.jsx`. Base: arquitectura frontend.
- **Contratos mock:** `src/data/sponsors/*`, `src/utils/catalog.js`, `src/utils/movieProgress.js`. Base: flujos de catalogo, quiz, video y progreso.
- **Builds Unity:** `public/unity-local/*/Build/*`, `public/unity-local/*/TemplateData/*`, `public-local/unity/*/Build/*`, `public-local/unity/*/TemplateData/*`. Base: integracion Unity y archivos generados.
- **Assets sponsor:** `src/assets/Materiales-sponsors/`. Base: importaciones en `src/data/sponsors/*`.

## 12. Funcionalidades implementadas

- **Login mock y modo invitado.** Base: `src/pages/Login/Login.jsx`, `src/context/AuthContext.jsx`, `src/services/api.js`.
- **Persistencia local de sesion.** Base: `src/context/AuthContext.jsx`.
- **Home con carruseles/estantes de sponsors.** Base: `src/pages/Home/Home.jsx`, `src/components/home/*`, `src/data/sponsors/sponsorShelves.js`.
- **Catalogo filtrable.** Base: `src/pages/Catalog/Catalog.jsx`, `src/utils/catalog.js`, `src/components/catalog/*`.
- **Preview de pelicula.** Base: `src/pages/MoviePreview/MoviePreview.jsx`, `src/components/movie-preview/*`.
- **Reproductor de video Cloudinary/fallback.** Base: `src/pages/Watch/WatchPage.jsx`, `src/components/watch/WatchPlayer.jsx`.
- **Desbloqueo local de quiz tras ver pelicula.** Base: `src/components/movie-preview/MoviePreviewActions.jsx`, `src/utils/movieProgress.js`, `src/pages/Watch/WatchPage.jsx`.
- **Quiz con feedback y resultado.** Base: `src/pages/Quiz/QuizPage.jsx`, `src/components/quiz/*`, `src/data/sponsors/movieQuizData.js`.
- **Pantalla de progreso/misiones mock.** Base: `src/pages/Progress/Progress.jsx`.
- **Redireccion a Unity WebGL.** Base: `src/components/ui/Navbar.jsx`, `public/unity-local/Build2/index.html`.

## 13. Funcionalidades incompletas

- **Autenticacion real.** Solo login tiene rama fetch preparada; mocks activos. Base: `src/services/api.js`.
- **Registro real.** Formulario existe, integracion pendiente. Base: `src/pages/Register/Register.jsx`.
- **Recuperacion real de contrasena.** Flujo visual existe, integracion pendiente. Base: `src/pages/RecoverPassword/RecoverPassword.jsx`.
- **Progreso persistente por usuario.** Solo localStorage. Base: `src/utils/movieProgress.js`.
- **Ditas como wallet real.** Solo valores mock/recompensas visuales. Base: `src/services/api.js`, `src/data/sponsors/movieQuizData.js`, `src/pages/Progress/Progress.jsx`.
- **Unity conectado con React/backend.** Solo redireccion estatica. Base: `src/components/ui/Navbar.jsx`.
- **Video ended real en fallback.** Existe TODO. Base: `src/components/watch/WatchPlayer.jsx`.

## 14. Funcionalidades inexistentes

- **Backend fuente y base de datos.** Base: estructura del repositorio.
- **Migraciones y seeders.** Base: ausencia de carpetas/scripts.
- **Inventario web.** Base: estructura `src/`.
- **Selector de avatar web.** Base: estructura `src/`, `src/components/ui/Navbar.jsx`.
- **Transacciones de Ditas.** Base: busqueda en `src/`.
- **Eventos de metricas/analytics.** Base: busqueda en `src/`.
- **Tests automatizados.** Base: `package.json`.
- **Typecheck.** Base: `package.json`, ausencia de TypeScript.

## 15. Decisiones tecnicas pendientes

- **Definir contrato backend definitivo** para auth, registro, recuperacion, catalogo, progreso, Ditas, misiones, inventario y metricas. Base: `src/services/api.js`, `src/data/sponsors/*`, `src/pages/Progress/Progress.jsx`.
- **Decidir versionado/despliegue de Unity WebGL**: si los artefactos deben trackearse, subirse a CDN o generarse en pipeline. Base: `.gitignore`, `src/components/ui/Navbar.jsx`, `public/unity-local/*`.
- **Centralizar URL de API en variable de entorno** sin exponer valores. Base: `src/services/api.js`.
- **Definir estrategia de rutas protegidas.** Base: `src/App.jsx`, `src/context/AuthContext.jsx`.
- **Definir estrategia de lint para artefactos generados** sin ocultar errores reales. Base: `eslint.config.js`, salida de `npm.cmd run lint`.
- **Definir contratos de mocks compatibles con backend.** Base: `src/data/sponsors/*`, `src/services/api.js`.
- **Confirmar proyecto Unity fuente** para auditar escenas, scripts, render pipeline, input, cursor, avatar, peliculas, inventario y WebGL settings. Base: ausencia de fuentes Unity.

## 16. Bloque de contexto final

```text
Arquitectura: frontend React/Vite con datos mock locales y builds Unity WebGL estaticos. No hay backend fuente ni proyecto Unity fuente en este checkout.

Stack: React 19, React DOM 19, React Router 7, Vite 8, Tailwind CSS 4 via @tailwindcss/vite, lucide-react, ESLint 10. JavaScript/JSX/CSS/HTML.

Estructura: src/main.jsx monta BrowserRouter y AuthProvider. src/App.jsx define rutas. src/context/AuthContext.jsx maneja sesion. src/services/api.js centraliza API mock. src/data/sponsors contiene contratos mock de sponsors/peliculas/quiz/video. src/utils contiene catalogo y progreso local. src/components contiene UI, home, catalog, movie-preview, watch y quiz. public/unity-local contiene builds Unity WebGL ignorados.

Archivos clave: src/main.jsx, src/App.jsx, src/context/AuthContext.jsx, src/services/api.js, src/components/ui/Navbar.jsx, src/components/watch/WatchPlayer.jsx, src/utils/movieProgress.js, src/utils/catalog.js, src/data/sponsors/*, package.json, vite.config.js, eslint.config.js, .gitignore.

Convenciones: componentes funcionales JSX, imports relativos, Tailwind utilities combinadas con CSS global en src/index.css y tokens en src/styles/tokens.css, idioma UI principalmente espanol, sin TypeScript ni Prettier detectado.

Comandos: npm run dev, npm run build, npm run lint, npm run preview. No hay tests, typecheck, backend, DB ni Unity scripts.

Estado de build: npm.cmd run build pasa. npm.cmd run lint falla con errores en artefactos Unity generados y errores React en AuthContext/RecoverPassword. No hay tests.

Riesgos: mocks activos, auth no real, rutas sin proteccion, Unity referenciado desde ruta ignorada por Git, lint roto, registro/recuperacion incompletos, progreso solo local, Cloudinary depende de CDN en runtime, no backend, no tests.

Integraciones pendientes: backend real, rutas protegidas, persistencia de progreso/Ditas/misiones, inventario/avatar, metricas, comunicacion React-Unity o despliegue formal de Unity, configuracion de entorno para API.

Datos por confirmar: version Unity, fuente Unity, escenas, render pipeline, input, cursor, scripts, contratos backend definitivos, hosting/CDN de Unity y API.
```
