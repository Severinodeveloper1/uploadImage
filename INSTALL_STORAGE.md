# Instrucciones de Instalación — Storage Platform

## 1. Ejecutar migraciones

```bash
php artisan migrate
```

Esto creará las tablas: `projects`, `api_tokens`, `buckets`, `storage_files`.

## 2. Crear el symlink de storage

```bash
php artisan storage:link
```

Esto crea un enlace simbólico de `public/storage` → `storage/app/public`.

## 3. Compilar assets del frontend

```bash
npm install
npm run build
```

## 3.1 ejecutar seeder

```bash
php artisan db:seed
```

## 4. Limpiar caché (si es necesario)

```bash
php artisan config:clear
php artisan route:clear
php artisan cache:clear
```

## 5. Verificar CORS para API

Laravel 12 usa el middleware de CORS integrado. Si necesitas configurarlo para la API,
verifica `config/cors.php` y asegúrate de que las rutas `/api/*` estén permitidas.

Si el archivo no existe, puedes publicarlo:
```bash
php artisan config:publish cors
```

Y configurar:
```php
'paths' => ['api/*', 'api/v1/*'],
'allowed_origins' => ['*'],
```

## 6. Verificar web.config (IIS)

El archivo `web.config` ya fue generado en la raíz del proyecto para IIS + Plesk.

---

## Archivos creados

### Migraciones
- `database/migrations/2025_08_15_000001_create_projects_table.php`
- `database/migrations/2025_08_15_000002_create_api_tokens_table.php`
- `database/migrations/2025_08_15_000003_create_buckets_table.php`
- `database/migrations/2025_08_15_000004_create_storage_files_table.php`

### Modelos
- `app/Models/Project.php`
- `app/Models/ApiToken.php`
- `app/Models/Bucket.php`
- `app/Models/StorageFile.php`

### Observer
- `app/Observers/StorageFileObserver.php`

### Service
- `app/Services/StorageService.php`

### Middleware
- `app/Http/Middleware/AuthenticateApiToken.php`

### Controllers API
- `app/Http/Controllers/Api/V1/BucketApiController.php`
- `app/Http/Controllers/Api/V1/StorageApiController.php`

### Controllers Web
- `app/Http/Controllers/ProjectController.php`
- `app/Http/Controllers/ApiTokenController.php`

### Rutas
- `routes/api.php` (nuevo)
- `routes/web.php` (modificado — nuevas rutas agregadas)

### Componentes Vue (pages)
- `resources/js/pages/projects/ProjectsList.vue`
- `resources/js/pages/projects/ProjectDashboard.vue`
- `resources/js/pages/projects/StorageBrowser.vue`
- `resources/js/pages/projects/ApiTokens.vue`

### Componentes Vue (reutilizables)
- `resources/js/components/FileUploader.vue`
- `resources/js/components/StorageStats.vue`

### Configuración
- `web.config`

### Archivos modificados
- `app/Providers/AppServiceProvider.php` — Registro del observer
- `app/Models/User.php` — Relación `projects()`
- `bootstrap/app.php` — Registro de ruta API
- `resources/js/components/AppSidebar.vue` — Enlace "Projects" en el sidebar

---

## Endpoints API

Todos los endpoints requieren el header:
```
Authorization: Bearer {tu_api_token}
```

| Método | URL | Permiso | Descripción |
|--------|-----|---------|-------------|
| GET | `/api/v1/project` | read | Info del proyecto |
| GET | `/api/v1/buckets` | read | Listar buckets |
| POST | `/api/v1/buckets` | write | Crear bucket |
| GET | `/api/v1/buckets/{slug}` | read | Info del bucket |
| DELETE | `/api/v1/buckets/{slug}` | delete | Eliminar bucket |
| POST | `/api/v1/buckets/{slug}/upload` | write | Subir archivo |
| GET | `/api/v1/buckets/{slug}/files` | read | Listar archivos |
| GET | `/api/v1/buckets/{slug}/files/{id}` | read | Info archivo |
| DELETE | `/api/v1/buckets/{slug}/files/{id}` | delete | Eliminar archivo |
| GET | `/api/v1/buckets/{slug}/folders` | read | Listar carpetas |

## Panel Web

| URL | Descripción |
|-----|-------------|
| `/dashboard/projects` | Lista de proyectos |
| `/dashboard/projects/{id}` | Dashboard del proyecto |
| `/dashboard/projects/{id}/tokens` | Gestión de API tokens |
| `/dashboard/projects/{id}/storage` | Explorador de storage |
| `/dashboard/projects/{id}/storage/{bucket}` | Explorador de bucket |
