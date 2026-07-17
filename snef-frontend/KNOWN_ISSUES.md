# Known Issues

Lista honesta de pendientes y riesgos conocidos al momento de entregar el frontend.

## Datos e integracion

- La app usa mocks/datos locales.
- `src/services/api.js` no esta conectado a endpoints reales.
- `VITE_API_URL` definitiva esta pendiente.
- `VITE_USE_MOCKS` esta activado por defecto.
- Registro y recuperacion no estan conectados a backend.
- Login es simulado o parcialmente mock.
- Links sociales de sponsors usan `#`.

## Progreso, quiz y recompensas

- El progreso de peliculas vistas usa `localStorage`.
- El usuario mock/sesion local usa `localStorage`.
- El quiz contiene respuestas correctas en frontend.
- La validacion del quiz ocurre en cliente.
- Ditas no vienen de backend todavia.
- Wallet, movimientos y recompensas no estan integrados.
- Misiones y progreso general estan hardcodeados en `src/pages/Progress/Progress.jsx`.

## Video y Unity

- El reproductor usa un video Cloudinary de prueba desde `src/data/sponsors/movieVideo.js`.
- El evento final de Cloudinary esta pendiente de integracion real en el reproductor.
- Unity no tiene sesion compartida con React.
- Unity no reporta progreso ni metricas al frontend/backend.
- Builds locales de Unity existen en `public/unity-local/` y `public-local/unity/`, pero estan ignorados.
- Unity deberia vivir en S3/CloudFront si se confirma como asset definitivo.

## Assets

- Assets definitivos desde S3 estan pendientes.
- `src/assets/Materiales-sponsors/` contiene assets locales no trackeados actualmente.
- Algunos assets de preview pesan mas de 2 MB; conviene optimizarlos o moverlos a S3/CloudFront segun estrategia final.

## Deploy

- Falta definir dominio final y distribucion CloudFront.
- Falta definir CORS y politicas de cache.
- Falta definir si Unity comparte CloudFront con el frontend o usa distribucion/subdominio separado.
- Fallback SPA a `index.html` debe configurarse en CloudFront/S3.

## Estado de validacion

- `npm ci`: ejecutado correctamente.
- `npm run build`: exitoso.
- `npm run lint`: exitoso.
- Se ignoran builds generados/locales de Unity en ESLint para evitar fallos por codigo generado.
