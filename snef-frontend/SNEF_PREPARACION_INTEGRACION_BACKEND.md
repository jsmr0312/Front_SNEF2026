# Auditoria de preparacion para integracion backend - SNEF 2026

Fecha de inspeccion: 2026-07-16

Alcance: frontend actual en `snef-frontend`, enfocado exclusivamente en preparacion para consumir backend. No se modifico codigo fuente. Se creo solo este documento.

## Evidencia de inspeccion

- `git status --short`: el comando directo fallo por `dubious ownership`; se ejecuto despues con `git -c safe.directory='C:/Mis archivos/SNEF 2026' status --short`.
- Estado git comprobado: hay archivos modificados y muchos archivos nuevos sin seguimiento, incluyendo `src/data/`, `src/pages/Catalog/`, `src/pages/MoviePreview/`, `src/pages/Quiz/`, `src/pages/Watch/`, `src/utils/`, componentes de catalogo/home/movie-preview/quiz/watch y documentos previos.
- `npm run build`: PowerShell bloqueo `npm.ps1`; se ejecuto `npm.cmd run build`. Resultado: exitoso.
- `npm run lint`: PowerShell bloqueo `npm.ps1`; se ejecuto `npm.cmd run lint`. Resultado: fallido con 193 errores y 1 warning.
- No se encontraron archivos `.env*` mediante `rg --files -g '.env*'`.

# 1. Veredicto ejecutivo

Resultado: **Parcialmente preparado**.

El frontend ya tiene una base React/Vite funcional, rutas principales, formularios, un `AuthContext`, un servicio HTTP minimo y una experiencia completa de catalogo, preview, video, quiz y progreso. Sin embargo, la integracion backend aun no puede empezar de forma fluida sin acordar contratos y hacer ajustes minimos: casi toda la funcionalidad de negocio depende de mocks, hardcodes o `localStorage`; el login usa credenciales fijas; registro y recuperacion no llaman API; el quiz contiene `isCorrect` en frontend; Ditas, misiones, likes, inventario, avatar y metricas no tienen servicios reales; Unity se abre como build estatico sin sesion compartida.

Estimacion aproximada:

| Area | Preparacion | Lectura |
| --- | ---: | --- |
| Preparacion arquitectonica | 45% | Hay React Router, contexto de auth y un archivo de API, pero falta capa HTTP comun robusta y separacion real de datos remotos. |
| Preparacion de contratos | 25% | Los mocks permiten inferir objetos, pero no hay OpenAPI, DTOs estables ni normalizacion completa. |
| Preparacion de autenticacion | 35% | Hay JWT en `localStorage` y header Bearer, pero no validacion de sesion, refresh, expiracion, 401 ni rutas protegidas. |
| Preparacion de funcionalidades | 30% | Las pantallas existen; la mayoria no persiste contra backend. |
| Preparacion de Unity | 15% | Build existe y se abre, pero no comparte JWT, usuario, Ditas, progreso, avatar ni inventario. |
| Preparacion para despliegue | 40% | Build pasa; lint falla por Unity generado y errores menores. Falta estrategia de ambientes y assets. |

Hecho comprobado: `src/services/api.js` define `API_URL = 'https://api.snef.mx'`, `USE_MOCKS = true`, `getHeaders()`, `loginUser()` y `loginAsGuest()`.

Inferencia: la estructura actual permite iniciar conversaciones de contrato con backend, pero no una integracion directa de extremo a extremo sin ajustes.

Pendiente por confirmar: dominios finales, ambientes, duracion de JWT, estrategia de refresh, fuente definitiva de videos/assets y modelo de Unity.

# 2. Arquitectura actual

## Stack comprobado

- React `^19.2.5`
- React DOM `^19.2.5`
- React Router DOM `^7.15.0`
- Vite `^8.0.10`
- TailwindCSS `^4.3.0` con `@tailwindcss/vite`
- Lucide React `^1.14.0`
- ESLint `^10.2.1`

## Estructura

- Entrada: `src/main.jsx`.
- Rutas: `src/App.jsx`.
- Auth global: `src/context/AuthContext.jsx`.
- Servicio HTTP minimo: `src/services/api.js`.
- Paginas funcionales: Login, Register, RecoverPassword, Home, Catalog, MoviePreview, Watch, Quiz, Progress, DesignSystem.
- Datos locales: `src/data/sponsors/*`.
- Utilidades: `src/utils/catalog.js`, `src/utils/movieProgress.js`.
- Unity: `public/unity-local/*` y `public-local/unity/*`.

## Manejo de estado

Hecho comprobado:

- Estado local con `useState`, `useMemo`, `useEffect`, `useRef`, `useCallback`.
- Estado global de autenticacion via `AuthProvider`.
- Estado de pelicula vista en `localStorage` mediante `snefMovieProgress`.
- Estado de quiz solo en memoria de `QuizPage`.

Inferencia: no existe store global para wallet, progreso, inventario, avatar, likes, misiones ni metricas.

## Autenticacion

Hecho comprobado:

- `AuthContext` carga `snef_user` desde `localStorage` al montar.
- `saveSession()` guarda/remueve `snef_token` y guarda `snef_user`.
- `logout()` elimina `snef_token` y `snef_user`.
- `getHeaders()` agrega `Authorization: Bearer <token>` si existe `snef_token`.

Pendiente por confirmar:

- No hay endpoint de `me`, refresh token, expiracion, permisos ni validacion de token al recargar.

## Servicios HTTP

Hecho comprobado:

- Solo `loginUser()` tiene fetch real alternativo a mocks.
- `USE_MOCKS = true` impide consumir backend.
- No hay timeout, abort, reintentos, parseo centralizado, mapeo de errores ni manejo global de 401.

## Mocks

Hecho comprobado:

- Usuario mock y guest mock en `src/services/api.js`.
- Sponsors, peliculas, quizzes y video mock en `src/data/sponsors/*`.
- Progreso y misiones hardcodeados en `src/pages/Progress/Progress.jsx`.
- Catalogo generado localmente en `src/utils/catalog.js`.

## localStorage

Claves comprobadas:

- `snef_token`
- `snef_user`
- `snefMovieProgress`

## Variables de entorno

Hecho comprobado:

- No se encontraron archivos `.env*`.
- No hay uso de `VITE_API_URL`.
- `vite.config.js` solo registra plugins React y Tailwind.

## Rutas

Rutas comprobadas:

- `/`
- `/registro`
- `/recuperar-password`
- `/home`
- `/catalogo`
- `/preview/:movieId`
- `/watch/:movieId`
- `/quiz/:movieId`
- `/design-system`
- `/progreso`

Hecho comprobado: no hay componente de ruta protegida; todas las rutas quedan accesibles si se conoce la URL.

## Unity WebGL

Hecho comprobado:

- `Navbar.jsx` abre `'/unity-local/Build2/index.html'` con `window.location.href`.
- Existen builds en `public/unity-local/Build SNEF 2.0` y `public/unity-local/Build2`.
- Existen copias en `public-local/unity/...`.
- `.gitignore` ignora `public/unity-local/` y `public-local/`.
- El template Unity no recibe JWT ni usuario; no hay `postMessage` personalizado ni fetch de API.

# 3. Inventario de mocks y datos locales

| Archivo | Datos simulados | Pantallas que lo consumen | Sustitucion necesaria | Prioridad |
| --- | --- | --- | --- | --- |
| `src/services/api.js` | `mockUser`, `mockGuestUser`, token mock, login mock | Login, Navbar, AuthContext | Auth API real: login, guest, me, logout/refresh | Critica |
| `src/pages/Login/Login.jsx` | Credenciales fijas enviadas a `login()` | Login | Leer valores reales del formulario y validar errores | Critica |
| `src/pages/Register/Register.jsx` | Opciones de edad, sexo, estados, preguntas secretas; submit hace `console.log` | Registro | Endpoint de registro y catalogos controlados por backend o constantes acordadas | Critica |
| `src/pages/RecoverPassword/RecoverPassword.jsx` | Preguntas secretas locales; validacion cambia paso; reset hace `console.log` | Recuperacion | Endpoints de validacion y reset; no revelar preguntas/respuestas inseguras | Critica |
| `src/data/sponsors/homeCinemaSponsors.js` | Sponsors de cine, peliculas Condusef, quiz, video | Home, Catalog, Preview, Watch, Quiz | API de sponsors, peliculas, detalle, assets, quiz unlock | Critica |
| `src/data/sponsors/sponsorShelves.js` | Sponsors Oro/Plata/Bronce generados, peliculas generadas, redes sociales `#` | Home, Catalog, Preview, Watch, Quiz | API de catalogo por categoria/sponsor | Critica |
| `src/data/sponsors/movieVideo.js` | Video Cloudinary unico para todas las peliculas | Watch | Endpoint de playback/video URL firmado o publico | Critica |
| `src/data/sponsors/movieQuizData.js` | Preguntas, opciones, `isCorrect`, explicaciones, recompensa | Quiz | API de quiz sin respuestas correctas expuestas; submit server-side | Critica |
| `src/utils/catalog.js` | Filtros y secciones de catalogo locales | Catalog | API paginada/filtrable o contrato de secciones | Alta |
| `src/utils/movieProgress.js` | Pelicula vista en `snefMovieProgress` | Preview, Watch | API de progreso con idempotencia | Critica |
| `src/pages/Progress/Progress.jsx` | Resumen y misiones hardcodeadas | Progress | API de progreso, misiones, recompensas | Alta |
| `src/components/movie-preview/MoviePreviewActions.jsx` | Like visual sin estado/persistencia | MoviePreview | API de likes/favoritos | Media |
| `src/components/ui/Navbar.jsx` | Ditas desde `user.ditas`; avatar fijo local; URL Unity fija | Todas con Navbar | API wallet/profile/avatar; configuracion Unity | Alta |
| `public/unity-local/*` | Build Unity estatico | Navbar/Unity | Hosting/versionado definido; puente de sesion/API | Critica |
| No encontrado | Inventario, tienda, compras, avatar configurable, metricas reales | No hay pantalla/servicio dedicado comprobado | Definir pantallas o contratos minimos | Alta |

# 4. Mapa completo frontend -> backend

Todos los endpoints listados son **propuesta para discutir**, no decisiones definitivas.

| Funcionalidad | Archivo frontend | Estado actual | Endpoint requerido | Metodo | Request esperado | Response esperada | Requiere JWT | Prioridad | Bloqueadores |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Registro | `src/pages/Register/Register.jsx` | Form local + `console.log` | `/auth/register` | POST | username, password, ageRange, gender, state, secretQuestion, secretAnswer | user, accessToken, expiresAt | No | Critica | Validaciones, pregunta secreta, username unico |
| Login | `src/pages/Login/Login.jsx`, `src/services/api.js` | Credenciales hardcodeadas + mock | `/auth/login` | POST | username, password | user, accessToken, expiresAt, refresh? | No | Critica | Form no captura valores reales |
| Login invitado | `src/services/api.js` | Mock local sin token | `/auth/guest` | POST | device/session metadata opcional | guest user, guest token o sessionId | Opcional | Alta | Definir si invitado puede guardar algo |
| Cerrar sesion | `AuthContext.jsx` | Limpia localStorage | `/auth/logout` | POST | refreshToken/sessionId opcional | ok | Si | Media | Refresh/session server-side |
| Validar sesion | `AuthContext.jsx` | Solo rehidrata `snef_user` | `/auth/me` | GET | none | user actual | Si | Critica | No hay expiracion ni 401 |
| Recuperar password | `RecoverPassword.jsx` | Local + `console.log` | `/auth/recovery/validate`, `/auth/recovery/reset` | POST | username, question, answer; luego newPassword/token | recoveryToken; ok | No | Critica | Seguridad de preguntas secretas |
| Catalogo | `Home.jsx`, `Catalog.jsx`, `utils/catalog.js` | Mocks locales | `/catalog/sections` | GET | filters opcionales | sections con sponsors y movies | Opcional | Critica | Paginacion, categorias, assets |
| Detalle pelicula | `MoviePreview.jsx`, `platformMovies.js` | Busqueda local | `/movies/{movieId}` | GET | movieId | movie detail, sponsor, progress flags | Opcional/Si | Critica | Incluir `hasWatched`, `quizUnlocked`, liked |
| Obtener URL video | `WatchPage.jsx`, `WatchPlayer.jsx` | Cloudinary hardcodeado | `/movies/{movieId}/playback` | GET/POST | movieId | provider, urls, publicId/signedUrl, trackingSessionId | Si | Critica | CDN, firma, seguridad |
| Marcar inicio reproduccion | `WatchPlayer.jsx` | No existe | `/movies/{movieId}/playback/start` | POST | playbackSessionId, startedAt | eventId, progress | Si | Alta | Idempotencia y metricas |
| Marcar pelicula terminada | `WatchPage.jsx`, `movieProgress.js` | `localStorage` al evento ended | `/movies/{movieId}/complete` | POST | playbackSessionId, durationWatched, completedAt, idempotencyKey | watched true, quizUnlocked true, rewards pending | Si | Critica | Validar reproduccion real |
| Desbloquear quiz | `MoviePreviewActions.jsx` | Lee `localStorage` | `/movies/{movieId}/quiz/unlock` o incluido en complete | POST/GET | movieId | quizUnlocked true | Si | Critica | Evitar desbloqueo falso |
| Obtener quiz | `QuizPage.jsx` | Quiz local con respuestas | `/movies/{movieId}/quiz` | GET | movieId | quizId, questions sin `isCorrect` | Si | Critica | No exponer respuestas |
| Enviar respuestas | `QuizPage.jsx` | Evalua en frontend | `/quizzes/{quizId}/submissions` | POST | answers: questionId, optionId, idempotencyKey | submissionId, score, result | Si | Critica | Reintentos y premio unico |
| Obtener resultado | `QuizResultScreen.jsx` | Calculado local | `/quiz-submissions/{id}` | GET | submissionId | score, correctCount, total, reward | Si | Alta | Historial |
| Otorgar Ditas | `QuizResultScreen.jsx` | Solo texto visual | `/wallet/rewards/quiz` o server-side en submit | POST | submissionId/idempotencyKey | wallet balance, transaction | Si | Critica | Doble recompensa |
| Consultar balance | `Navbar.jsx` | `user.ditas` | `/wallet` | GET | none | balance, currency | Si | Alta | Fuente unica de verdad |
| Movimientos Ditas | No existe pantalla | No implementado | `/wallet/transactions` | GET | pagination | transactions | Si | Media | UI pendiente |
| Likes | `MoviePreviewActions.jsx` | Boton sin estado | `/movies/{movieId}/like` | PUT/DELETE | movieId | liked true/false, count | Si | Media | Definir invitado |
| Progreso | `Progress.jsx`, `movieProgress.js` | Hardcode/localStorage | `/users/me/progress` | GET | none | watched, quizzes, missions | Si | Alta | Modelo de progreso |
| Misiones | `Progress.jsx` | Hardcode | `/missions`, `/users/me/missions` | GET | none | missions con progreso | Si | Alta | Reglas de recompensa |
| Inventario | No encontrado | No implementado | `/inventory` | GET | none | items owned/equipped | Si | Alta | Modelo de item |
| Avatar | `Navbar.jsx` | Imagen fija | `/users/me/avatar` | GET/PUT | config/avatar item ids | avatar config/url | Si | Alta | Compartir con Unity |
| Tienda | No encontrada | No implementada | `/store/items` | GET | filters | items, price, availability | Si | Media | UI pendiente |
| Compra objetos | No encontrada | No implementada | `/store/purchases` | POST | itemId, idempotencyKey | purchase, wallet, inventory | Si | Alta | Moneda y duplicados |
| Entrada Unity | `Navbar.jsx` | Redireccion estatica | `/unity/session` | POST | returnUrl/clientVersion | temporary token/session payload | Si | Critica | Estrategia de sesion |
| Metricas | No encontrado | No implementado | `/analytics/events` | POST/batch | eventName, entity, metadata, timestamp | accepted/eventId | Si/opcional | Alta | Taxonomia de eventos |

# 5. Contratos actuales de datos

Nota: estos contratos salen de mocks/componentes actuales. Donde no existe implementacion, se marca como inferencia o pendiente.

## User

```json
{
  "id": "mock-user-001",
  "username": "Oscar0312",
  "avatar": "/src/assets/iconos/foto_perfil.png",
  "ditas": 230,
  "isGuest": false
}
```

- Obligatorios actuales: `id`, `username`, `avatar`, `ditas`, `isGuest`.
- Tipos: string, string, string, number, boolean.
- IDs usados: `id`.
- Inconsistencias: `avatar` existe en user pero Navbar usa siempre `defaultAvatar`, no `user.avatar`.
- Calculado en frontend: fallback `Invitado`, fallback `0 Ditas`.
- Debe ser backend: balance real, avatar real, permisos, expiracion de sesion.

## AuthResponse

```json
{
  "token": "<jwt>",
  "user": {
    "id": "mock-user-001",
    "username": "Oscar0312",
    "avatar": "/src/assets/iconos/foto_perfil.png",
    "ditas": 230,
    "isGuest": false
  }
}
```

- Obligatorios actuales: `token`, `user`.
- Opcionales necesarios: `expiresAt`, `refreshToken`, `tokenType`.
- Backend debe definir duracion, refresh y payload.

## GuestSession

```json
{
  "token": null,
  "user": {
    "id": "guest-user",
    "username": "Invitado",
    "avatar": "/src/assets/iconos/foto_perfil.png",
    "ditas": 0,
    "isGuest": true
  }
}
```

- Obligatorios actuales: `token`, `user`.
- Pendiente: decidir si invitado usa token anonimo, sessionId o solo modo local.

## Sponsor

```json
{
  "id": "condusef",
  "name": "Condusef",
  "title": "Coleccion Condusef",
  "logo": "<asset importado>",
  "socialLinks": {
    "facebook": "#",
    "x": "#",
    "linkedin": "#"
  },
  "movies": []
}
```

- Obligatorios actuales: `id`, `name`, `logo`, `socialLinks`, `movies`.
- Opcional actual: `title`.
- Inconsistencia: algunos sponsors generados usan nombre con secuencia (`Condusef 1`).
- Backend debe entregar URLs de assets publicas, no imports locales.

## Movie

```json
{
  "id": "condusef-pelicula-1",
  "title": "Recupera el rumbo",
  "category": "Seguridad financiera",
  "categoryAccentColor": "#E13B8A",
  "availabilityLabel": "Disponible en cine",
  "synopsis": "Dos ninos decididos...",
  "quiz": { "rewardDitas": 30, "questions": [] },
  "video": {
    "provider": "cloudinary",
    "cloudName": "dzzd4o6su",
    "publicId": "ORIGINAL_DUSEF_tuz5io",
    "embedUrl": "https://player.cloudinary.com/embed/?..."
  },
  "sponsorLogo": "<asset importado>",
  "coverDesktop": "<asset importado>",
  "coverMobile": "<asset importado>",
  "coverResponsive": "<asset importado>",
  "previewCover": "<asset importado>",
  "thumbnail": "<asset importado>"
}
```

- Obligatorios actuales: `id`, `title`, `category`, imagenes para render, `synopsis`.
- Opcionales actuales: `availabilityLabel`, `quiz`, `video`, `thumbnail`.
- Calculado frontend: `cover`, `sponsor`, `sponsorLogo`, `sponsorData`, `sectionType`, `categoryAccentColor` normalizado.
- Backend debe ser fuente de disponibilidad, video, progreso, quiz unlock, sponsor.

## MovieDetail

```json
{
  "categoryType": "sala-de-cine",
  "shelf": null,
  "sponsor": { "id": "condusef", "name": "Condusef" },
  "movie": { "id": "condusef-pelicula-1", "title": "Recupera el rumbo" }
}
```

- Este wrapper lo crea `getPlatformMovieById()`.
- Pendiente: backend podria devolver detalle plano o wrapper con relaciones.

## Quiz

```json
{
  "rewardDitas": 30,
  "questions": []
}
```

- Obligatorios actuales: `rewardDitas`, `questions`.
- Backend debe evitar que recompensa sea confiada desde cliente.

## QuizQuestion

```json
{
  "id": "q1",
  "prompt": "Cual es la mision de la CONDUSEF como institucion publica?",
  "options": []
}
```

- Obligatorios actuales: `id`, `prompt`, `options`.

## QuizOption

```json
{
  "id": "a",
  "text": "Supervisar a las instituciones financieras del pais.",
  "color": "green",
  "isCorrect": true,
  "incorrectExplanation": "Texto de explicacion cuando aplica."
}
```

- Obligatorios actuales: `id`, `text`, `color`, `isCorrect`.
- Opcional actual: `incorrectExplanation`.
- Riesgo: `isCorrect` no debe llegar en `GET /quiz`; debe evaluarse server-side.

## QuizSubmission

```json
{
  "movieId": "condusef-pelicula-1",
  "answers": [
    { "questionId": "q1", "optionId": "a" }
  ],
  "idempotencyKey": "client-generated-key"
}
```

- Inferencia: no existe objeto actual de submission; frontend evalua click por click.
- Backend debe calcular resultado y recompensa.

## QuizResult

```json
{
  "correctAnswersCount": 3,
  "totalQuestions": 4,
  "rewardDitas": 30
}
```

- Hecho comprobado: `QuizResultScreen` recibe esos props.
- Debe ser backend: resultado oficial, recompensa otorgada, transaccion.

## Wallet

```json
{
  "balance": 230,
  "currency": "DITAS"
}
```

- Inferencia desde `user.ditas` y Navbar.
- Backend debe ser fuente unica.

## WalletTransaction

```json
{
  "id": "tx_001",
  "type": "QUIZ_REWARD",
  "amount": 30,
  "balanceAfter": 260,
  "entityType": "quizSubmission",
  "entityId": "submission_001",
  "createdAt": "2026-07-16T00:00:00.000Z"
}
```

- Inferencia: no existe en frontend.

## Mission

```json
{
  "id": 1,
  "title": "Primer maraton financiero",
  "description": "Ve 3 peliculas de cualquier categoria.",
  "progress": 2,
  "total": 3,
  "reward": 40,
  "completed": false
}
```

- Obligatorios actuales: `id`, `title`, `description`, `progress`, `total`, `reward`.
- Opcional actual: `completed`.
- Calculado frontend: porcentaje de barra.
- Backend debe definir reglas y estado de cobro de recompensa.

## UserProgress

```json
{
  "moviesWatched": { "value": 8, "total": 20 },
  "quizzesCompleted": { "value": 5, "total": 15 },
  "missionsCompleted": { "value": 2, "total": 6 }
}
```

- Inferencia desde `progressSummary`.
- Local real parcial: `snefMovieProgress[movieId] = { "watched": true, "watchedAt": "..." }`.

## InventoryItem

```json
{
  "id": "item_001",
  "name": "Gorra SNEF",
  "type": "avatar_accessory",
  "owned": true,
  "equipped": false
}
```

- Pendiente por confirmar: no existe implementacion actual comprobada.

## AvatarConfiguration

```json
{
  "avatarUrl": "/src/assets/iconos/foto_perfil.png",
  "equippedItemIds": []
}
```

- Inferencia desde avatar fijo.
- Backend debe definir configuracion compartida con Unity.

## AnalyticsEvent

```json
{
  "eventName": "movie_completed",
  "userId": "mock-user-001",
  "entityType": "movie",
  "entityId": "condusef-pelicula-1",
  "metadata": {
    "category": "Seguridad financiera"
  },
  "occurredAt": "2026-07-16T00:00:00.000Z"
}
```

- Pendiente por confirmar: no hay servicio de metricas actual.

# 6. Autenticacion y seguridad

Hechos comprobados:

- JWT se almacena en `localStorage` con clave `snef_token`.
- Usuario se almacena en `localStorage` con clave `snef_user`.
- El token se envia como `Authorization: Bearer <token>` en `getHeaders()`.
- Al recargar, `AuthContext` confia en `snef_user`; no valida token contra backend.
- No hay manejo de expiracion.
- No hay manejo de 401.
- No hay rutas protegidas.
- Modo invitado guarda `snef_user` local con `isGuest: true`, aunque no guarda token.
- Logout elimina `snef_token` y `snef_user`.
- Unity no recibe token ni sesion.

Riesgos:

- `localStorage` expone token ante XSS.
- El usuario persistido puede quedar desincronizado con backend.
- Ditas en `user.ditas` pueden quedar obsoletas.
- Invitado persiste como usuario local aunque el texto dice que no guarda progreso real.
- Sin `me`/refresh, la app no sabe si una sesion recargada sigue siendo valida.

Decisiones concretas con backend:

1. Definir si JWT vive en `localStorage`, cookie httpOnly o memoria con refresh cookie.
2. Definir duracion de access token y refresh token.
3. Definir endpoint `/auth/me` y comportamiento al recargar.
4. Definir respuesta estandar para 401, 403, 409 y 422.
5. Definir si logout invalida refresh/session server-side.
6. Definir si invitado usa token anonimo, sessionId o solo estado local.
7. Definir que acciones permite invitado: ver catalogo, reproducir, quiz, Ditas, Unity.
8. Definir como Unity obtiene autorizacion: URL token temporal, `postMessage`, exchange endpoint o mismo dominio.
9. Definir claims minimos del JWT: userId, isGuest, roles/scopes, sessionId.
10. Definir proteccion de recompensas con idempotency keys y validacion server-side.

# 7. Flujo pelicula -> quiz -> Ditas

1. Seleccion de pelicula
   - Frontend actual: Home/Catalog muestran peliculas desde mocks y navegan a `/preview/:movieId`.
   - Backend requerido: entregar catalogo y flags de usuario (`liked`, `watched`, `quizUnlocked`).
   - Intercambio: movieId, sponsorId, categoria, imagenes.

2. Preview
   - Frontend actual: `getPlatformMovieById(movieId)` busca en memoria.
   - Backend requerido: endpoint de detalle.
   - Intercambio: detalle, sponsor, social links, disponibilidad, estado de progreso.

3. Reproduccion
   - Frontend actual: boton navega a `/watch/:movieId`; video viene del mock `sampleCloudinaryVideo`.
   - Backend requerido: crear sesion de reproduccion y entregar URL/metadata de video.
   - Intercambio: playbackSessionId, provider, publicId/signedUrl, duracion esperada.

4. Evento de video terminado
   - Frontend actual: Cloudinary `ended` o fallback simulado llama `onEnded()`.
   - Backend requerido: validar completado con sesion, duracion, porcentaje y reglas.
   - Intercambio: playbackSessionId, watchedSeconds, completedAt, idempotencyKey.

5. Pelicula marcada como vista
   - Frontend actual: `markMovieAsWatched(movieId)` guarda `watched` y `watchedAt` en `localStorage`.
   - Backend requerido: persistir progreso.
   - Idempotencia: `POST /movies/{id}/complete` debe aceptar reintentos sin duplicar efectos.

6. Quiz desbloqueado
   - Frontend actual: `MoviePreviewActions` habilita quiz si `isMovieWatched(movie.id)`.
   - Backend requerido: `quizUnlocked` server-side.
   - Riesgo: hoy basta manipular `localStorage` para desbloquear.

7. Envio de respuestas
   - Frontend actual: evalua cada opcion localmente usando `isCorrect`.
   - Backend requerido: recibir respuestas y evaluar en servidor.
   - Intercambio: quizId, answers, idempotencyKey.

8. Resultado
   - Frontend actual: `correctAnswersCount` se calcula en React y se muestra al final.
   - Backend requerido: devolver resultado oficial.

9. Recompensa de Ditas
   - Frontend actual: solo muestra `+ rewardDitas`; no actualiza `user.ditas` ni wallet.
   - Backend requerido: otorgar una sola vez por submission/regla.
   - Idempotencia: recompensa debe estar ligada a `submissionId` unico.

10. Actualizacion de misiones y progreso
   - Frontend actual: progreso/misiones hardcodeados, no se actualizan por quiz.
   - Backend requerido: recalcular misiones tras eventos de pelicula/quiz.

11. Registro de metricas
   - Frontend actual: no hay servicio de metricas.
   - Backend requerido: eventos para view, preview, playback start, playback complete, quiz started, answer selected, quiz completed, reward granted, like, Unity entry.

Acciones que necesitan idempotencia:

- Inicio de reproduccion si crea sesion.
- Completar pelicula.
- Enviar quiz.
- Otorgar Ditas.
- Completar/cobrar mision.
- Compra de objetos.
- Eventos de metricas criticos si alimentan recompensas.

# 8. Integracion Unity WebGL

Estado real:

- Como se abre: `Navbar.jsx` usa `window.location.href = '/unity-local/Build2/index.html'`.
- Recibe JWT: no.
- Comunicacion React -> Unity: no encontrada.
- Comunicacion Unity -> React: no encontrada.
- Consume API: no encontrada en template inspeccionado.
- Como se despliega: actualmente como archivos estaticos bajo `public/unity-local`.
- Archivos versionados: existen en workspace, pero `.gitignore` ignora `public/unity-local/`; por el estado git aparecen como no trackeados o ignorados segun origen. Riesgo alto de que no viajen al repo/deploy.
- Riesgos `.gitignore`: `public/unity-local/` y `public-local/` estan ignorados; lint revisa esos JS generados porque no estan ignorados en ESLint.
- Dominios/CORS: si Unity vive en mismo dominio, menos CORS; si vive en subdominio/CDN, backend debe permitir origenes y headers de auth o token de intercambio.
- Datos que necesita Unity: usuario, JWT/token temporal, Ditas, progreso, avatar, inventario, items equipados, misiones, metricas.
- Operaciones que necesita Unity: consultar perfil/inventario/wallet/progreso, gastar Ditas/comprar/equipar, reportar metricas, sincronizar recompensas.

Opciones para discutir:

A. Unity recibe un token temporal en la URL.
- Pros: simple.
- Contras: riesgo de filtracion en historial/logs/referrers; debe expirar muy rapido.

B. Unity recibe sesion mediante `postMessage`.
- Pros: evita token en URL; permite handshake controlado.
- Contras: requiere wrapper React/iframe o ventana controlada y validacion estricta de origen.

C. Unity obtiene un token de intercambio desde un endpoint.
- Pros: mas seguro y auditable; backend controla scopes y expiracion.
- Contras: requiere flujo adicional y almacenamiento temporal.

D. Unity vive en el mismo dominio o en un subdominio.
- Mismo dominio simplifica cookies/CORS.
- Subdominio/CDN mejora separacion de assets, pero exige CORS, CSP y headers correctos para wasm/brotli.

No se implementa ninguna opcion en esta auditoria.

# 9. Manejo de API

Revisiones:

| Tema | Estado actual |
| --- | --- |
| `VITE_API_URL` | No existe. |
| Dev/staging/produccion | No hay configuracion por ambiente. |
| Wrapper comun de fetch | Solo `getHeaders()` y fetch directo en login. |
| Parseo de respuestas | `response.json()` directo en login. |
| Manejo de errores | Solo error generico en login. |
| Timeouts | No existen. |
| Reintentos | No existen. |
| `AbortController` | No existe. |
| Loading states | Parciales en Auth (`isAuthLoading`) y reproductor (`isSdkReady`); no generalizados. |
| Empty states | Hay algunos: catalogo vacio, pelicula no encontrada, video no disponible, quiz no encontrado. |
| 401 | No existe tratamiento. |
| 409/422 | No existe tratamiento. |
| Subida/consumo archivos | Consumo local de assets y Cloudinary; no hay upload. |
| URLs CDN | Cloudinary hardcodeado y scripts desde `unpkg.com`; assets locales importados. |

Cambios minimos antes de integrar:

1. Reemplazar `API_URL` fijo por `import.meta.env.VITE_API_URL`.
2. Convertir `USE_MOCKS` en flag de ambiente o removerlo para integracion.
3. Crear `apiClient` comun con headers, JSON, errores y 401.
4. Agregar servicios por dominio: auth, catalog, movies, quizzes, progress, wallet, missions, unity, analytics.
5. Definir estrategia de errores visuales para formularios y pantallas.
6. Excluir builds Unity generados de lint o ajustar `eslint.config.js`.

# 10. Preguntas para el equipo backend

## Criticas para comenzar

1. Cual sera la base URL de desarrollo, staging y produccion?
2. Tendremos OpenAPI/Swagger desde el primer sprint de integracion?
3. Como sera el login: access token en respuesta, cookie httpOnly, o access token + refresh token?
4. Cual sera la duracion del JWT y como se refresca?
5. Existe endpoint `/auth/me` para validar sesion al recargar?
6. El modo invitado tendra token anonimo o solo sera local?
7. El backend evaluara quizzes y otorgara Ditas en una sola operacion idempotente?
8. Como validaran que una pelicula fue realmente terminada antes de desbloquear quiz?
9. Donde viviran videos e imagenes: CDN, Cloudinary, storage propio o assets locales?
10. Como debe autenticarse Unity WebGL y que origen/dominio tendra?

## Necesarias durante la primera integracion

1. Cuales son los codigos de error para username duplicado, credenciales invalidas y validacion de formulario?
2. Las preguntas secretas las define backend o frontend?
3. El catalogo vendra agrupado por secciones o frontend debe agrupar peliculas?
4. Que campos trae una pelicula en listado vs detalle?
5. Como se representa `watched`, `liked`, `quizUnlocked` y `rewardClaimed`?
6. Que eventos de metricas son obligatorios?
7. Como se manejaran likes para invitados?
8. Cual es el contrato de wallet y movimientos de Ditas?
9. Como se modelan misiones y recompensas?
10. Como se versionan assets de Unity y que headers necesita el servidor para `.wasm`, `.br` o `.unityweb`?

## Pueden resolverse despues

1. Habra paginacion avanzada o busqueda en catalogo?
2. Habra historial publico de movimientos de Ditas?
3. Habra administracion dinamica de tienda/inventario desde CMS?
4. Habra localizacion/multilenguaje?
5. Que metricas se enviaran en batch y cuales en tiempo real?

# 11. Informacion que frontend debe entregar a backend

- Rutas actuales: `/`, `/registro`, `/recuperar-password`, `/home`, `/catalogo`, `/preview/:movieId`, `/watch/:movieId`, `/quiz/:movieId`, `/progreso`, `/design-system`.
- Ejemplos JSON de mocks incluidos en seccion 5.
- Flujos funcionales: auth, invitado, catalogo, preview, watch, quiz, progreso, Unity.
- Eventos esperados: login, guest_login, register, password_recovery_started, catalog_viewed, movie_previewed, playback_started, playback_completed, quiz_opened, quiz_answered, quiz_completed, reward_granted, like_toggled, mission_completed, unity_opened.
- Estados visuales: loading de auth/reproductor, empty catalog, not found de pelicula, video no disponible, quiz no encontrado, quiz locked/unlocked, resultado.
- Reglas de validacion actuales: campos requeridos por formulario, opciones fijas de edad/sexo/estado/pregunta secreta; no hay validacion robusta en cliente.
- Reglas de negocio actuales: quiz solo se habilita tras `watched`; recompensa visual de 30 Ditas por quiz; progreso/misiones hardcodeados.
- Dominios previstos: pendiente; frontend actualmente usa `/unity-local/...`, `https://api.snef.mx` hardcodeado y Cloudinary/unpkg.
- Necesidades Unity: usuario, token, Ditas, progreso, avatar, inventario, metricas.
- Archivos convenientes para compartir: `src/services/api.js`, `src/context/AuthContext.jsx`, `src/App.jsx`, `src/data/sponsors/*`, `src/utils/catalog.js`, `src/utils/movieProgress.js`, `src/pages/Quiz/QuizPage.jsx`, `src/pages/Watch/WatchPage.jsx`, `src/components/ui/Navbar.jsx`, este documento.

# 12. Informacion que backend debe entregar a frontend

- OpenAPI/Swagger actualizado.
- Base URL por ambiente.
- Metodos y rutas definitivas.
- Headers requeridos: `Authorization`, `Content-Type`, idempotency key, correlation/request id si aplica.
- Contratos request/response.
- Codigos de error y formato estandar de error.
- Duracion del JWT.
- Estrategia de refresh.
- Politica CORS por dominio.
- URLs de archivos, CDN, expiracion de URLs firmadas.
- Reglas de paginacion, filtros y ordenamiento.
- Reglas de idempotencia para completados, recompensas, compras y submissions.
- Datos iniciales/seeds de sponsors, peliculas, quizzes, misiones, tienda.
- Coleccion Postman o Bruno.
- Estrategia de Unity: dominio, token, scopes, expiracion, headers wasm/brotli.

# 13. Plan de integracion recomendado

| Fase | Dependencias | Criterio de terminado | Riesgos | Archivos frontend involucrados |
| --- | --- | --- | --- | --- |
| 1. Contratos y ambientes | OpenAPI, `VITE_API_URL`, errores | `apiClient` apunta a dev/staging/prod y maneja errores base | Contratos cambiantes | `src/services/api.js`, `vite.config.js`, `.env.example` futuro |
| 2. Autenticacion | Endpoints auth/me/refresh | Login real, registro real, recovery real, rutas protegidas | Token/localStorage/XSS, expiracion | `AuthContext.jsx`, `Login.jsx`, `Register.jsx`, `RecoverPassword.jsx`, `App.jsx` |
| 3. Catalogo | API de secciones/peliculas/assets | Home y Catalog consumen backend | Diferencias de estructura y assets | `Home.jsx`, `Catalog.jsx`, `utils/catalog.js`, `src/data/sponsors/*` |
| 4. Video y progreso | Playback API, complete idempotente | Watch inicia sesion, reporta complete y desbloquea quiz | Fallback simulado, fraude, CDN | `WatchPage.jsx`, `WatchPlayer.jsx`, `movieProgress.js` |
| 5. Quizzes | API quiz/submission/result | Quiz no expone respuestas y resultado viene del backend | Recompensas duplicadas | `QuizPage.jsx`, componentes quiz |
| 6. Ditas | Wallet API | Navbar muestra balance real; rewards actualizan wallet | Concurrencia y doble gasto | `Navbar.jsx`, `QuizResultScreen.jsx` |
| 7. Misiones | Missions/progress API | Progreso y misiones reflejan backend | Reglas ambiguas | `Progress.jsx` |
| 8. Metricas | Taxonomia/event endpoint | Eventos principales enviados | Volumen, privacidad, duplicados | Servicio nuevo, paginas principales |
| 9. Unity | Estrategia token/dominio/API | Unity recibe sesion y sincroniza datos | CORS, token leakage, assets ignorados | `Navbar.jsx`, `public/unity-local/*`, backend Unity session |
| 10. Pruebas y despliegue | Ambientes, fixtures, CI | Build y lint pasan; smoke tests auth/catalog/quiz | Unity generado en lint, assets pesados | `eslint.config.js`, `package.json`, config deploy |

# 14. Resumen para la reunion

## Resumen de maximo una pagina

El frontend de SNEF 2026 esta **parcialmente preparado** para comenzar la integracion con backend. La experiencia visual y los flujos principales ya existen: login, registro, recuperacion, home, catalogo, preview, reproductor, quiz, progreso, Navbar con Ditas y entrada a Unity. Tambien existe un primer `src/services/api.js` con header Bearer y un `AuthContext` que guarda sesion.

La limitacion principal es que casi toda la logica de negocio sigue local: `USE_MOCKS = true`, catalogo generado desde `src/data/sponsors`, video Cloudinary unico, quiz con respuestas correctas expuestas, progreso en `localStorage`, misiones hardcodeadas, likes sin persistencia y Ditas solo como numero dentro de `user`. Unity existe como build estatico, pero no comparte sesion, JWT, progreso, avatar, inventario ni wallet con React.

Build pasa. Lint falla porque revisa archivos generados de Unity en `public/` y `public-local/`, ademas de problemas en `AuthContext.jsx` y un prop no usado en `RecoverPassword.jsx`.

Antes de integrar, los cambios minimos son: definir `VITE_API_URL`, crear un cliente HTTP comun, reemplazar mocks por servicios por dominio, proteger rutas, usar datos reales de formularios, mover evaluacion de quizzes/recompensas al backend, acordar idempotencia y definir el mecanismo de sesion para Unity.

## Diez preguntas imprescindibles

1. Cual sera la base URL por ambiente?
2. Nos entregaran OpenAPI/Swagger antes de conectar pantallas?
3. Como se manejara JWT, refresh y expiracion?
4. Existe `/auth/me` para validar sesion?
5. Como funcionara el modo invitado?
6. Como se validara que una pelicula fue terminada?
7. El backend evaluara quizzes y otorgara Ditas de forma idempotente?
8. Cual sera el contrato de wallet/movimientos?
9. Como se autenticara Unity?
10. Donde viviran videos, imagenes y builds Unity?

## Cinco riesgos principales

1. Quiz expone `isCorrect` en frontend y no puede usarse asi en produccion.
2. Recompensas y progreso dependen de `localStorage`, manipulable por usuario.
3. JWT en `localStorage` sin refresh, expiracion ni 401 centralizado.
4. Unity no tiene puente de sesion/API y sus assets estan afectados por `.gitignore`.
5. Lint falla por archivos Unity generados y algunos errores reales del codigo React.

## Cinco decisiones que necesitamos obtener manana

1. Estrategia de autenticacion web: storage/cookies, refresh, `/auth/me`.
2. Estrategia de invitado: permisos, persistencia y token anonimo.
3. Contratos de catalogo, pelicula, playback, quiz, wallet y progreso.
4. Reglas de idempotencia para complete, quiz submit, rewards y compras.
5. Estrategia Unity: URL token temporal, `postMessage`, exchange endpoint, mismo dominio o subdominio.

## Explicacion sencilla del estado

El frontend ya tiene la maqueta funcional y los puntos naturales donde conectar backend, pero todavia funciona principalmente como demo local. Esta listo para sentarse a definir contratos y empezar por autenticacion/catalogo, no para conectar todo sin ajustes.

## Frase exacta para la reunion

"El frontend de SNEF 2026 esta parcialmente preparado: las pantallas y flujos ya existen, pero la mayoria de datos criticos siguen en mocks o localStorage; para integrar bien necesitamos cerrar contratos, autenticacion, reglas de idempotencia y el puente de Unity antes de conectar recompensas, progreso y Ditas."

