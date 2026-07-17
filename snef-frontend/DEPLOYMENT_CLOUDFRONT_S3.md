# Deployment CloudFront + S3

El frontend SNEF 2026 es una SPA de Vite. El comando de build genera una carpeta `dist` con `index.html`, CSS, JS y assets versionados.

## Build

```bash
npm ci
npm run build
```

El resultado queda en:

```text
dist/
```

## S3

- Subir el contenido de `dist` al bucket configurado para el frontend.
- No subir `node_modules`, `.env`, caches ni builds locales no requeridos.
- Servir `index.html` como documento principal.
- Definir cache corto o controlado para `index.html`.
- Definir cache largo para assets con hash en `dist/assets`.

## CloudFront

- CloudFront debe servir el bucket S3 del frontend.
- Las rutas de React requieren fallback/rewrite a `index.html`.
- Configurar respuesta para que rutas como `/home`, `/catalogo` y `/preview/:movieId` no devuelvan 403/404 de S3.
- Invalidar cache despues de cada deploy, minimo `index.html`; si hay cambios grandes, invalidar `/*`.

## Variables y assets

Variables previstas:

```bash
VITE_API_URL=
VITE_USE_MOCKS=true
VITE_ASSETS_BASE_URL=
VITE_S3_ASSETS_BASE_URL=
VITE_UNITY_BUILD_URL=
VITE_CLOUDFRONT_URL=
```

- `VITE_ASSETS_BASE_URL` o `VITE_S3_ASSETS_BASE_URL` pueden apuntar a assets definitivos en S3/CloudFront.
- No incluir secretos en variables `VITE_*`; Vite las embebe en el bundle.
- Confirmar por ambiente si `VITE_USE_MOCKS` queda `true` o `false`.

## Unity WebGL

Hay builds locales de Unity detectados en:

- `public/unity-local/`
- `public-local/unity/`

Estos directorios estan ignorados por Git y ESLint. Por tamano y naturaleza generada, se recomienda servir Unity desde S3/CloudFront en lugar de versionarlo en Git.

Si Unity WebGL se sirve desde S3/CloudFront:

- Revisar headers y MIME types para `.wasm`, `.br`, `.gz`, `.data`, `.js` y `.unityweb`.
- Definir `Content-Encoding` correcto para archivos precomprimidos `.br` o `.gz`.
- Definir CORS para que React pueda cargar Unity desde el dominio final.
- Definir politica de cache para builds versionados.
- Decidir si Unity vive en el mismo CloudFront del frontend o en otra distribucion/subdominio.
- Configurar `VITE_UNITY_BUILD_URL` con la URL base del build final.

## Checklist devops

- Bucket S3 creado.
- CloudFront distribution creada.
- Fallback SPA a `index.html` configurado.
- CORS definido para API/assets/Unity.
- Politicas de cache definidas.
- MIME types de Unity validados.
- Variables por ambiente documentadas.
- Pipeline ejecuta `npm ci`, `npm run lint` y `npm run build`.
- Cache invalidada tras deploy.
