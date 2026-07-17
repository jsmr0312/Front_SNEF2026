# SNEF 2026 Frontend

Frontend React de la plataforma SNEF 2026. La app contiene la experiencia visual actual para login, registro, home, catalogo, preview de peliculas, reproduccion, quiz, progreso y design system.

Este repositorio esta preparado para que backend/devops pueda instalarlo, revisarlo, desplegarlo como SPA y planear la integracion de servicios. Hoy funciona principalmente con mocks y datos locales; no hay integracion productiva con backend.

## Stack

- React 19
- Vite 8
- TailwindCSS 4
- React Router 7
- ESLint 10
- lucide-react

## Requisitos

- Node recomendado: `v24.15.0` para paridad con la validacion local.
- npm recomendado: `11.12.1`.
- Alternativa esperada: una version moderna de Node compatible con Vite 8.

Versiones usadas en esta preparacion:

```bash
node --version
# v24.15.0

npm.cmd --version
# 11.12.1
```

En Windows/PowerShell puede ser necesario usar `npm.cmd` si la politica de ejecucion bloquea `npm.ps1`.

## Instalacion

```bash
npm install
```

Para una instalacion limpia desde `package-lock.json`:

```bash
npm ci
```

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Variables de entorno

Usar `.env.example` como referencia y crear un `.env` local cuando haga falta. No subir `.env` con valores reales.

```bash
VITE_API_URL=
VITE_USE_MOCKS=true
VITE_ASSETS_BASE_URL=
VITE_S3_ASSETS_BASE_URL=
VITE_UNITY_BUILD_URL=
VITE_CLOUDFRONT_URL=
```

- `VITE_API_URL`: URL base futura del backend. Actualmente solo se usa si `VITE_USE_MOCKS=false`.
- `VITE_USE_MOCKS`: controla si `src/services/api.js` responde con datos mock. Default efectivo: `true`.
- `VITE_ASSETS_BASE_URL`: prevista para assets publicos generales.
- `VITE_S3_ASSETS_BASE_URL`: prevista para assets definitivos en S3/CloudFront.
- `VITE_UNITY_BUILD_URL`: prevista para servir Unity WebGL desde S3/CloudFront.
- `VITE_CLOUDFRONT_URL`: prevista para documentar o consumir la URL final de distribucion.

## Estructura

```text
src/
  App.jsx                         Rutas principales de React Router
  main.jsx                        Bootstrap de React, Router y AuthProvider
  services/api.js                 Capa de API/mock inicial
  context/                        Estado de autenticacion local
  data/sponsors/                  Catalogo, sponsors, videos y quizzes mock
  utils/                          Utilidades de catalogo y progreso local
  pages/                          Pantallas principales
  components/                     Componentes por dominio y UI base
  assets/                         Imagenes y logos usados por la app
public/                           Assets publicos estaticos
public-local/                     Builds locales de Unity ignorados por Git
```

## Rutas principales

- `/`: Login
- `/registro`: Registro
- `/recuperar-password`: Recuperacion de password
- `/home`: Home con seleccion de sponsors y peliculas
- `/catalogo`: Catalogo completo con filtros
- `/preview/:movieId`: Detalle/preview de pelicula
- `/watch/:movieId`: Reproductor
- `/quiz/:movieId`: Quiz de pelicula
- `/progreso`: Progreso y misiones
- `/design-system`: Referencia visual interna

## Estado de datos

La app usa mocks/datos locales en:

- `src/services/api.js`: login mock e invitado.
- `src/data/sponsors/`: sponsors, catalogo, peliculas, quizzes y video de prueba.
- `src/utils/movieProgress.js`: progreso guardado en `localStorage`.
- `src/pages/Progress/Progress.jsx`: metricas y misiones hardcodeadas.

El quiz contiene respuestas correctas en frontend porque aun no hay API. Registro y recuperacion muestran flujo visual, pero no estan conectados a servicios reales.

## Notas para backend

- Revisar primero `src/services/api.js`, `src/context/AuthContext.jsx`, `src/context/authState.js`, `src/App.jsx`, `src/data/`, `src/utils/`, `src/pages/` y `src/components/ui/Navbar.jsx`.
- Mantener `VITE_USE_MOCKS=true` mientras no exista API estable.
- Definir contratos para auth, catalogo, detalle de pelicula, playback, progreso, quiz, ditas/wallet, misiones, likes y metricas.
- No poner secretos en variables `VITE_*`; todo lo expuesto por Vite queda disponible en el bundle del navegador.

## Deploy CloudFront/S3

- `npm run build` genera `dist`.
- Desplegar el contenido de `dist` en S3 y servirlo por CloudFront.
- Configurar fallback/rewrite de rutas SPA hacia `index.html`.
- Los assets finales pueden moverse a S3/CloudFront y consumirse con `VITE_ASSETS_BASE_URL` o `VITE_S3_ASSETS_BASE_URL`.
- Si Unity WebGL vive en S3/CloudFront, revisar MIME types, compresion, CORS y cache para `.wasm`, `.br`, `.gz`, `.data`, `.js` y `.unityweb`.

Ver tambien:

- `BACKEND_HANDOFF.md`
- `DEPLOYMENT_CLOUDFRONT_S3.md`
- `KNOWN_ISSUES.md`
- `INTEGRATION_PLAN.md`
