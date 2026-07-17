# Backend Handoff - SNEF 2026 Frontend

Este documento resume el estado actual del frontend para que backend/devops pueda estudiarlo, correrlo y planear la integracion.

## 1. Estado actual

- Proyecto React + Vite + TailwindCSS.
- Build productivo con `npm run build` genera `dist`.
- Lint con `npm run lint` esta limpio tras ignorar builds generados/locales de Unity.
- La app funciona principalmente con datos locales y mocks.
- No hay endpoints reales conectados.
- `src/services/api.js` usa `VITE_USE_MOCKS=true` por defecto y solo intenta backend si se define `VITE_USE_MOCKS=false`.

## 2. Pantallas y rutas

- `/`: login con usuario mock e ingreso como invitado.
- `/registro`: formulario visual de registro.
- `/recuperar-password`: flujo visual de recuperacion.
- `/home`: home con hero/secciones de sponsors y peliculas.
- `/catalogo`: catalogo completo con filtros por categoria.
- `/preview/:movieId`: preview/detalle de pelicula, sponsor y acciones.
- `/watch/:movieId`: reproductor de video mock y pantalla final.
- `/quiz/:movieId`: quiz local con feedback y resultado.
- `/progreso`: resumen de progreso y misiones hardcodeadas.
- `/design-system`: referencia interna de UI.

## 3. Partes en mocks

- Login y usuario invitado: `src/services/api.js`.
- Usuario y sesion local: `src/context/AuthContext.jsx`.
- Catalogo, sponsors y peliculas: `src/data/sponsors/`.
- Video de prueba Cloudinary: `src/data/sponsors/movieVideo.js`.
- Quizzes y respuestas correctas: `src/data/sponsors/movieQuizData.js`.
- Progreso de peliculas vistas: `src/utils/movieProgress.js`.
- Misiones/progreso general: `src/pages/Progress/Progress.jsx`.
- Links sociales de sponsors: placeholders `#`.

## 4. Datos esperados del backend

- Usuario autenticado: id, username, avatar, roles/permisos, saldo de Ditas, flags de invitado.
- Tokens/sesion: access token, refresh token o estrategia definida por backend.
- Catalogo: sponsors, tiers, peliculas, categorias, assets, disponibilidad y orden.
- Detalle de pelicula: synopsis, sponsor, imagenes responsive, links sociales, metadata.
- Playback: provider, URL/manifest/token de reproduccion, restricciones y eventos.
- Progreso: peliculas vistas, quizzes completados, timestamps y porcentaje.
- Quiz: preguntas, opciones, validacion de respuestas y recompensas.
- Ditas/wallet: saldo, movimientos, recompensas y reglas.
- Misiones: objetivos, progreso, recompensas y estado.
- Likes/favoritos: alta, baja y conteo.
- Metricas: eventos de reproduccion, quiz, navegacion e interacciones clave.
- Unity: identidad/sesion compartida, progreso y eventos generados desde WebGL.

## 5. Servicios/API que hacen falta

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/recover-password/validate`
- `POST /auth/recover-password/reset`
- `GET /me`
- `GET /catalog`
- `GET /movies/:movieId`
- `GET /movies/:movieId/playback`
- `POST /movies/:movieId/progress`
- `GET /movies/:movieId/quiz`
- `POST /movies/:movieId/quiz/answers`
- `GET /progress`
- `GET /missions`
- `POST /missions/:missionId/claim`
- `GET /wallet`
- `POST /movies/:movieId/like`
- `DELETE /movies/:movieId/like`
- `POST /metrics/events`
- Endpoints/bridge para Unity segun arquitectura final.

Los nombres son propuesta inicial; backend debe confirmar convenciones.

## 6. Archivos clave

- `src/services/api.js`
- `src/context/AuthContext.jsx`
- `src/context/authState.js`
- `src/App.jsx`
- `src/data/`
- `src/utils/`
- `src/pages/`
- `src/components/ui/Navbar.jsx`

## 7. Flujo a integrar primero

Integrar autenticacion primero. Es el flujo que condiciona Navbar, usuario, sesion, progreso, Ditas, quiz, likes, metricas y Unity.

Orden recomendado:

1. Auth/login/invitado.
2. Usuario actual y sesion persistente.
3. Catalogo y detalle de pelicula.
4. Playback.
5. Progreso.
6. Quiz y recompensas.

## 8. Limitaciones conocidas

- El frontend aun expone quiz y respuestas correctas en cliente.
- `localStorage` guarda sesion mock y progreso local.
- Login/registro/recuperacion no validan contra backend.
- Video usa configuracion de prueba Cloudinary.
- Unity no comparte sesion ni progreso con React.
- Assets definitivos y rutas S3/CloudFront estan pendientes.
- No hay manejo final de refresh token, expiracion, RBAC o errores backend.

## 9. Decisiones pendientes

- Contrato de auth y manejo de tokens.
- Si usuarios invitados existen en backend o solo en frontend.
- Modelo de catalogo/sponsors/tiers.
- Proveedor final de video y esquema de proteccion.
- Si quizzes se validan por pregunta o al finalizar.
- Reglas de Ditas, recompensas, misiones y anti-fraude.
- Estrategia de Unity: misma distribucion CloudFront o subdominio separado.
- Politicas de cache e invalidacion para assets pesados.

## 10. Informacion requerida de backend/devops

- URL base por ambiente: local, staging, produccion.
- Contratos OpenAPI/Postman o ejemplos JSON.
- Estrategia de auth y expiracion.
- CORS permitido para dominios CloudFront.
- Dominio final y subdominios.
- S3 buckets y CloudFront distributions para app, assets y Unity.
- Headers/MIME types esperados para Unity.
- Politicas de cache por tipo de asset.
- Observabilidad: eventos y proveedor de metricas.
- Reglas de seguridad para no exponer secretos en frontend.
