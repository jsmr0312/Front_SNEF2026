# Proyecto

SNEF 2026 es un frontend web React/Vite con tematica de streaming/cine y gamificacion. El checkout inspeccionado esta en `C:\Mis archivos\SNEF 2026\snef-frontend`. **Hecho comprobado:** no contiene backend fuente ni proyecto Unity fuente completo; contiene builds Unity WebGL estaticos. Base: `package.json`, `vite.config.js`, `src/main.jsx`, `public/unity-local/`, `public-local/unity/`.

# Objetivo funcional

La aplicacion busca ofrecer autenticacion, modo invitado, catalogo de peliculas, reproduccion de videos, trivias, Ditas, misiones, progreso y acceso a una experiencia Unity WebGL. **Hecho comprobado:** esas piezas existen parcialmente en frontend/mocks. Base: `src/pages/Login/Login.jsx`, `src/pages/Home/Home.jsx`, `src/pages/Catalog/Catalog.jsx`, `src/pages/Watch/WatchPage.jsx`, `src/pages/Quiz/QuizPage.jsx`, `src/pages/Progress/Progress.jsx`, `src/components/ui/Navbar.jsx`.

# Stack comprobado

- React 19, React DOM 19. Base: `package.json`.
- React Router 7. Base: `package.json`, `src/App.jsx`, `src/main.jsx`.
- Vite 8. Base: `package.json`, `vite.config.js`.
- Tailwind CSS 4 con `@tailwindcss/vite`. Base: `package.json`, `vite.config.js`, `src/index.css`.
- lucide-react para iconos. Base: `package.json`, multiples componentes en `src/components/**`.
- ESLint flat config. Base: `eslint.config.js`.
- JavaScript/JSX/CSS/HTML; no TypeScript. Base: `src/**/*.jsx`, `src/**/*.js`, `src/**/*.css`, ausencia de `tsconfig.json`.

# Estructura principal

```text
src/
  main.jsx
  App.jsx
  index.css
  styles/tokens.css
  context/AuthContext.jsx
  services/api.js
  utils/catalog.js
  utils/movieProgress.js
  data/sponsors/*
  pages/*
  components/*
  assets/*
public/unity-local/*
public-local/unity/*
```

Base: estructura del repositorio y `rg --files`.

# Arquitectura actual

- `src/main.jsx` monta `BrowserRouter`, `AuthProvider` y `App`. **Hecho comprobado.**
- `src/App.jsx` declara todas las rutas con React Router. **Hecho comprobado.**
- `src/context/AuthContext.jsx` centraliza sesion local. **Hecho comprobado.**
- `src/services/api.js` centraliza el cliente API actual y mocks de login. **Hecho comprobado.**
- `src/data/sponsors/*` provee catalogo, sponsors, peliculas, quizzes y video mock. **Hecho comprobado.**
- `src/utils/catalog.js` normaliza secciones de catalogo. **Hecho comprobado.**
- `src/utils/movieProgress.js` guarda progreso local en `localStorage`. **Hecho comprobado.**
- **Inferencia:** la arquitectura esta preparada para reemplazar mocks por backend manteniendo contratos de datos similares. Base: `src/services/api.js`, `src/data/sponsors/*`, `src/utils/*`.

# Rutas y paginas existentes

Base: `src/App.jsx`.

```text
/                    Login
/registro            Register
/recuperar-password  RecoverPassword
/home                Home
/catalogo            Catalog
/preview/:movieId    MoviePreview
/watch/:movieId      WatchPage
/quiz/:movieId       QuizPage
/design-system       DesignSystem
/progreso            Progress
*                    redirect a /
```

No hay rutas protegidas implementadas. Base: `src/App.jsx`, `src/context/AuthContext.jsx`.

# Componentes relevantes

- UI base: `src/components/ui/Button.jsx`, `FormInput.jsx`, `Modal.jsx`, `Navbar.jsx`, `OptionSelector.jsx`, `PasswordInput.jsx`, `SelectInput.jsx`, `StepIndicator.jsx`.
- Home/catalogo: `src/components/home/*`, `src/components/catalog/*`.
- Preview: `src/components/movie-preview/*`.
- Watch: `src/components/watch/WatchPlayer.jsx`, `WatchControls.jsx`, `WatchEndScreen.jsx`, `AutoQuizButton.jsx`.
- Quiz: `src/components/quiz/*`.

# Manejo de estado y autenticacion

- Auth global por Context. Base: `src/context/AuthContext.jsx`.
- Claves locales usadas: `snef_user`, `snef_token`. Base: `src/context/AuthContext.jsx`, `src/services/api.js`.
- Invitado soportado con `isGuest`. Base: `src/services/api.js`, `src/context/AuthContext.jsx`.
- Progreso de peliculas vistas en `localStorage` con clave `snefMovieProgress`. Base: `src/utils/movieProgress.js`.
- **Pendiente:** auth real, refresh/session validation, guards de rutas y persistencia por usuario. Base: `src/App.jsx`, `src/services/api.js`.

# Servicios y contratos API

- Servicio central: `src/services/api.js`.
- `getHeaders()` agrega `Content-Type` y `Authorization` si existe token local. Base: `src/services/api.js`.
- `loginUser()` tiene rama mock activa y rama real preparada para `/auth/login`. Base: `src/services/api.js`.
- `loginAsGuest()` devuelve sesion invitada mock. Base: `src/services/api.js`.
- **Pendiente:** `registerUser`, `validateRecoveryData`, `resetPassword`, catalogo, progreso, wallet/Ditas, misiones, inventario y metricas. Base: `src/pages/Register/Register.jsx`, `src/pages/RecoverPassword/RecoverPassword.jsx`, ausencia de otros exports en `src/services/api.js`.

# Datos simulados y mocks

- Usuario e invitado mock. Base: `src/services/api.js`.
- Sponsors Oro/Plata/Bronce y peliculas mock. Base: `src/data/sponsors/sponsorShelves.js`.
- Sala de cine/Condusef mock. Base: `src/data/sponsors/homeCinemaSponsors.js`.
- Resolucion de pelicula por ID. Base: `src/data/sponsors/platformMovies.js`.
- Quiz y recompensa Ditas mock. Base: `src/data/sponsors/movieQuizData.js`.
- Video Cloudinary de ejemplo. Base: `src/data/sponsors/movieVideo.js`.
- Progreso local. Base: `src/utils/movieProgress.js`.

# Integracion Unity WebGL

- `Navbar` redirige a `/unity-local/Build2/index.html` para "Set de grabacion" y "Visitar cine". Base: `src/components/ui/Navbar.jsx`.
- Builds encontrados en `public/unity-local/Build2/`, `public/unity-local/Build SNEF 2.0/`, `public-local/unity/Build2/`, `public-local/unity/build-0-1-snef-2026/`. Base: estructura `public/` y `public-local/`.
- No hay comunicacion React-Unity detectada (`postMessage`, `SendMessage`) en `src/`. Base: busqueda en `src/`.
- **Riesgo:** `public/unity-local/` y `public-local/` estan ignorados. Base: `.gitignore`.
- **Pendiente:** confirmar fuente Unity, version, escenas, scripts, input, cursor, avatar, inventario y estrategia de despliegue. Base: ausencia de `ProjectSettings/ProjectVersion.txt`, `Packages/manifest.json`, `Assets/`.

# Convenciones obligatorias

- Mantener componentes funcionales JSX y estructura por dominio. Base: `src/components/*`, `src/pages/*`.
- Usar imports relativos mientras no exista alias configurado. Base: `vite.config.js`, imports actuales.
- Mantener estilos con Tailwind utilities, `src/index.css` y tokens en `src/styles/tokens.css`. Base: esos archivos.
- Centralizar API en `src/services/api.js`. Base: arquitectura actual.
- Mantener contratos mock compatibles con backend futuro. Base: `src/data/sponsors/*`, `src/services/api.js`.
- No introducir TypeScript sin decision explicita. Base: repo actual sin TS.

# Estado actual del build

- `npm.cmd run build`: exitoso. Base: salida del comando ejecutado en auditoria.
- `npm.cmd run lint`: falla con `194 problems (193 errors, 1 warning)`. Base: salida del comando ejecutado en auditoria.
- Causas principales de lint: artefactos Unity generados bajo `public/unity-local/*` y `public-local/unity/*`; errores propios en `src/context/AuthContext.jsx` y `src/pages/RecoverPassword/RecoverPassword.jsx`. Base: salida de `npm.cmd run lint`.
- No hay tests ni typecheck declarados. Base: `package.json`.

# Cambios locales que deben preservarse

Base: `git status --short` previo a crear esta documentacion.

```text
M .gitignore
M src/App.jsx
M src/components/ui/Navbar.jsx
M src/index.css
M src/pages/DesignSystem/DesignSystem.jsx
M src/pages/Home/Home.jsx
M src/pages/Login/Login.jsx
M src/pages/Progress/Progress.jsx
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

# Riesgos conocidos

- Mocks activos y auth no real. Base: `src/services/api.js`.
- Rutas sin proteccion. Base: `src/App.jsx`.
- Registro y recuperacion incompletos. Base: `src/pages/Register/Register.jsx`, `src/pages/RecoverPassword/RecoverPassword.jsx`.
- Progreso solo en localStorage. Base: `src/utils/movieProgress.js`.
- Lint roto por artefactos Unity y errores React. Base: `eslint.config.js`, salida de lint.
- Unity WebGL referenciado desde ruta ignorada por Git. Base: `src/components/ui/Navbar.jsx`, `.gitignore`.
- Cloudinary cargado desde CDN externo en runtime. Base: `src/components/watch/WatchPlayer.jsx`.
- No hay backend, tests ni typecheck. Base: `package.json`, estructura del repo.

# Pendientes tecnicos

- Definir contratos backend finales. Base: `src/services/api.js`, `src/data/sponsors/*`.
- Migrar URL de API a variable de entorno por nombre, sin exponer valor. Base: `src/services/api.js`.
- Implementar guards de rutas. Base: `src/App.jsx`, `src/context/AuthContext.jsx`.
- Resolver estrategia de versionado/despliegue de Unity. Base: `.gitignore`, `public/unity-local/*`.
- Decidir como excluir artefactos generados de lint sin ocultar errores reales. Base: `eslint.config.js`.
- Conectar registro, recuperacion, progreso, Ditas, misiones, inventario y metricas. Base: paginas y servicios actuales.
- Confirmar fuente Unity y su configuracion. Base: ausencia de fuentes Unity.

# Archivos clave

```text
package.json
vite.config.js
eslint.config.js
.gitignore
src/main.jsx
src/App.jsx
src/context/AuthContext.jsx
src/services/api.js
src/components/ui/Navbar.jsx
src/components/watch/WatchPlayer.jsx
src/utils/catalog.js
src/utils/movieProgress.js
src/data/sponsors/*
src/pages/*
src/components/*
public/unity-local/*
public-local/unity/*
```

# Comandos disponibles

Base: `package.json`.

```text
npm run dev
npm run build
npm run lint
npm run preview
```

No hay scripts de tests, typecheck, backend, base de datos o Unity WebGL. Base: `package.json`.

# Reglas para futuras modificaciones

- No sobrescribir cambios locales existentes.
- Revisar `git diff` antes de editar.
- Centralizar las llamadas de backend en `src/services/api.js`.
- Mantener los mocks con la estructura esperada del backend.
- No mezclar logica compleja dentro del JSX.
- No modificar componentes o paginas ajenas a la tarea.
- No cambiar dependencias sin justificarlo.
- Ejecutar build despues de cada implementacion.
- Informar todos los archivos modificados.
- No ocultar errores desactivando ESLint o validaciones.
- Mantener compatibilidad con React, Vite y TailwindCSS existentes.
- Preservar la integracion actual de Unity WebGL.
- No revelar valores de secretos, tokens, contrasenas, cookies ni variables privadas.
- Distinguir hechos comprobados, inferencias y pendientes de confirmar.
