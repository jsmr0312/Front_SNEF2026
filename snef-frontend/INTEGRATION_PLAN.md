# Integration Plan

Orden sugerido para integrar el frontend con backend/devops sin romper la experiencia visual actual.

## 1. Ambientes y variables

- Confirmar ambientes: local, staging y produccion.
- Definir `VITE_API_URL`, `VITE_USE_MOCKS`, `VITE_ASSETS_BASE_URL`, `VITE_S3_ASSETS_BASE_URL`, `VITE_UNITY_BUILD_URL` y `VITE_CLOUDFRONT_URL`.
- Acordar CORS por dominio.

## 2. Autenticacion

- Integrar login.
- Definir usuario invitado.
- Definir persistencia de sesion, expiracion y refresh.
- Reemplazar usuario mock de `src/services/api.js`.

## 3. Catalogo

- Reemplazar `src/data/sponsors/` por API.
- Mantener normalizacion en `src/utils/catalog.js` o adaptarla al contrato final.
- Confirmar tiers, categorias, orden y disponibilidad.

## 4. Detalle de pelicula

- Integrar `/preview/:movieId`.
- Confirmar imagenes responsive, sponsor, synopsis, links sociales y CTA.

## 5. Playback/video

- Integrar `/watch/:movieId`.
- Definir proveedor final, URLs firmadas o manifest, eventos y restricciones.
- Enviar evento de pelicula vista al backend.

## 6. Progreso

- Sustituir `localStorage` por API.
- Sincronizar peliculas vistas, timestamps y porcentaje.
- Manejar usuario invitado.

## 7. Quiz

- Mover respuestas correctas al backend.
- Definir validacion por pregunta o por envio final.
- Integrar resultado y recompensa.

## 8. Ditas/wallet

- Integrar saldo, movimientos y reglas de recompensa.
- Definir idempotencia para recompensas.

## 9. Misiones

- Integrar lista de misiones, progreso, reclamo y estado.
- Reemplazar hardcode de `src/pages/Progress/Progress.jsx`.

## 10. Likes

- Integrar favoritos/likes por pelicula.
- Definir conteos y estado por usuario.

## 11. Metricas

- Definir eventos minimos: login, catalogo, preview, play, ended, quiz answer, quiz complete, mission claim, Unity events.
- Confirmar proveedor de analitica/observabilidad.

## 12. Unity

- Definir hosting del build.
- Integrar `VITE_UNITY_BUILD_URL`.
- Resolver sesion compartida, progreso y eventos.
- Validar MIME types, CORS y cache.

## 13. Assets desde S3

- Migrar assets definitivos a S3/CloudFront.
- Usar `VITE_ASSETS_BASE_URL` o `VITE_S3_ASSETS_BASE_URL`.
- Definir naming/versionado y cache.

## 14. Deploy CloudFront

- Pipeline con `npm ci`, `npm run lint`, `npm run build`.
- Publicar `dist`.
- Configurar fallback a `index.html`.
- Invalidar cache despues de deploy.
