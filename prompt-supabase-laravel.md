# PROMPT MAESTRO: Plataforma de Storage tipo Supabase sobre Laravel 12 existente

## Contexto del proyecto base
Tengo un proyecto Laravel 12 ya funcionando con:
- **Laravel Fortify** como autenticación (login, register, 2FA, reset password)
- **Inertia.js v2** con **Vue 3** (TypeScript) como frontend SPA
- **MariaDB 10.6** como base de datos
- Servidor **Windows + IIS + Plesk** (sin Docker, sin SSH root)
- PHP 8.0+

**NO toques ni modifiques nada del sistema de autenticación existente.**
**Agrega todo como módulos nuevos encima del proyecto actual.**

---

## Objetivo
Construir una plataforma de almacenamiento de imágenes/archivos **tipo Supabase Storage** con:
- Panel administrativo visual (SPA con Vue 3 + Inertia)
- API REST con tokens de acceso por proyecto
- Multi-proyecto por usuario
- Buckets con carpetas
- Upload, gestión y URLs públicas de archivos
- Estadísticas de uso

---

## ARQUITECTURA DEL SISTEMA

### Concepto (igual que Supabase):
```
Usuario
  └── Proyectos (1 usuario → N proyectos)
        └── API Keys (1 proyecto → N tokens)
        └── Buckets (1 proyecto → N buckets, como carpetas raíz)
              └── Archivos (1 bucket → N archivos con rutas)
```

---

## BASE DE DATOS — Migraciones a crear

### Tabla: `projects`
```
id, user_id (FK users), name, slug (único), description,
is_active (boolean, default true),
storage_limit_mb (integer, default 1000),
created_at, updated_at
```

### Tabla: `api_tokens`
```
id, project_id (FK projects), name, token (string único hasheado),
token_prefix (primeros 8 chars para mostrar en UI, ej: "sk_live_"),
permissions (JSON: ["read","write","delete"]),
last_used_at (nullable timestamp),
expires_at (nullable timestamp),
is_active (boolean, default true),
created_at, updated_at
```

### Tabla: `buckets`
```
id, project_id (FK projects), name, slug,
is_public (boolean, default true),
allowed_mime_types (JSON nullable, null = todos permitidos),
max_file_size_mb (integer, default 5),
file_count (integer, default 0),
total_size_bytes (bigint, default 0),
created_at, updated_at
```

### Tabla: `storage_files`
```
id, bucket_id (FK buckets), project_id (FK projects),
original_name, filename (único generado), 
path (ruta relativa dentro del bucket, ej: "fotos/perfil/img.jpg"),
folder (carpeta dentro del bucket),
url (URL pública completa),
size_bytes (bigint),
mime_type,
width (nullable integer, para imágenes),
height (nullable integer, para imágenes),
metadata (JSON nullable),
is_public (boolean, default true),
download_count (integer, default 0),
created_at, updated_at
```

---

## MODELOS Laravel

### `Project.php`
- Relaciones: belongsTo User, hasMany ApiToken, hasMany Bucket, hasMany StorageFile
- Accessor: `storage_used_mb` (suma de storage_files)
- Accessor: `storage_percentage` (usado / límite * 100)
- Scope: `forUser($userId)`

### `ApiToken.php`
- Relaciones: belongsTo Project
- Al crear: generar token como `sk_live_` + Str::random(40), guardar hash en DB, devolver token plano UNA SOLA VEZ
- Método: `hasPermission($permission)`
- Método estático: `findByToken($plainToken)` → busca por hash

### `Bucket.php`
- Relaciones: belongsTo Project, hasMany StorageFile
- Método: `getFolders()` → lista carpetas únicas dentro del bucket

### `StorageFile.php`
- Relaciones: belongsTo Bucket, belongsTo Project
- Observer: al eliminar, borrar archivo físico del storage
- Al crear, actualizar contadores en Bucket (file_count, total_size_bytes)

---

## API REST — Rutas (`routes/api.php`)

### Middleware de autenticación por token:
Crear middleware `AuthenticateApiToken` que:
1. Lee header `Authorization: Bearer {token}`
2. Hace hash del token y busca en `api_tokens`
3. Verifica que esté activo y no expirado
4. Verifica que el proyecto esté activo
5. Inyecta `$request->project` y `$request->api_token`
6. Actualiza `last_used_at`

### Endpoints de la API REST:

```
# Buckets
GET    /api/v1/buckets                    → listar buckets del proyecto
POST   /api/v1/buckets                    → crear bucket
GET    /api/v1/buckets/{bucket}           → info del bucket
DELETE /api/v1/buckets/{bucket}           → eliminar bucket (y todos sus archivos)

# Archivos
POST   /api/v1/buckets/{bucket}/upload    → subir archivo (multipart: file, path opcional)
GET    /api/v1/buckets/{bucket}/files     → listar archivos (?folder=, ?page=)
GET    /api/v1/buckets/{bucket}/files/{id} → info de un archivo
DELETE /api/v1/buckets/{bucket}/files/{id} → eliminar archivo
GET    /api/v1/buckets/{bucket}/folders   → listar carpetas del bucket

# Info del proyecto
GET    /api/v1/project                    → info del proyecto (stats, límites)
```

### Formato respuestas API:

**Subir archivo exitoso:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "foto.jpg",
    "path": "fotos/perfil/foto.jpg",
    "url": "https://tudominio.com/storage/project-slug/bucket-slug/fotos/perfil/foto.jpg",
    "size": 204800,
    "mime_type": "image/jpeg",
    "width": 1920,
    "height": 1080,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "El archivo supera el límite de 5MB del bucket"
  }
}
```

**Códigos de error a manejar:**
- `UNAUTHORIZED` → token inválido
- `FORBIDDEN` → sin permiso para esa acción
- `BUCKET_NOT_FOUND`
- `FILE_NOT_FOUND`
- `FILE_TOO_LARGE`
- `MIME_TYPE_NOT_ALLOWED`
- `STORAGE_LIMIT_EXCEEDED`
- `BUCKET_ALREADY_EXISTS`

---

## PANEL ADMINISTRATIVO — Vue 3 + Inertia

### Rutas web (`routes/web.php`) — protegidas con `auth`:
```
GET  /dashboard/projects              → lista de proyectos
POST /dashboard/projects              → crear proyecto
GET  /dashboard/projects/{project}    → vista principal del proyecto (tipo Supabase)
PUT  /dashboard/projects/{project}    → editar proyecto
DELETE /dashboard/projects/{project} → eliminar proyecto

GET  /dashboard/projects/{project}/tokens      → gestión de API tokens
POST /dashboard/projects/{project}/tokens      → crear token
DELETE /dashboard/projects/{project}/tokens/{token} → revocar token

GET  /dashboard/projects/{project}/storage           → storage browser
GET  /dashboard/projects/{project}/storage/{bucket}  → explorador de bucket
```

### Componentes Vue a crear:

#### 1. `ProjectsList.vue` — Dashboard principal
- Grid de tarjetas de proyectos
- Cada tarjeta muestra: nombre, slug, archivos totales, storage usado/límite (barra de progreso)
- Botón crear nuevo proyecto
- Modal de creación: nombre, descripción, límite storage

#### 2. `ProjectDashboard.vue` — Vista del proyecto (igual que Supabase)
Layout con sidebar izquierdo con secciones:
- **Overview**: stats (total archivos, storage usado, tokens activos, buckets)
- **Storage**: explorador de archivos
- **API Keys**: gestión de tokens
- **Settings**: configuración del proyecto

#### 3. `StorageBrowser.vue` — Explorador tipo Supabase Storage
- Lista de buckets como carpetas grandes clickeables
- Al entrar a un bucket: explorador de archivos con:
  - Vista grid (thumbnails para imágenes) / vista lista toggle
  - Breadcrumb de navegación por carpetas
  - Botón "Upload" con drag & drop
  - Botón "New Folder"
  - Click en archivo: panel lateral con preview + info + URL copiable
  - Botón copiar URL pública
  - Botón descargar
  - Botón eliminar
  - Filtro por tipo de archivo
  - Búsqueda por nombre

#### 4. `ApiTokens.vue` — Gestión de tokens
- Tabla de tokens con: nombre, prefix (sk_live_xxxx...), permisos, último uso, expiración, estado
- Botón "Crear nuevo token"
- Modal creación: nombre, permisos (checkboxes: read/write/delete), fecha expiración opcional
- Al crear: mostrar token completo UNA SOLA VEZ con botón copiar y advertencia "Guárdalo ahora, no lo verás de nuevo"
- Botón revocar token (con confirmación)

#### 5. `FileUploader.vue` — Componente reutilizable
- Zona drag & drop
- Progress bar de subida
- Preview de imágenes antes de subir
- Subida múltiple
- Selección de carpeta destino

#### 6. `StorageStats.vue` — Widget de estadísticas
- Gauge circular de storage usado
- Gráfico de barras por bucket
- Conteo de archivos por tipo (imágenes, docs, otros)

---

## CONTROLLERS a crear

### `ProjectController.php` (web)
- index, store, show, update, destroy
- Validar que el slug sea único por usuario
- Al destroy: eliminar todos los archivos físicos del storage

### `ApiTokenController.php` (web)
- index, store, destroy
- Al store: generar token, mostrar UNA VEZ, guardar hash

### `BucketController.php` (web + API)
- CRUD completo
- Validar nombre único por proyecto

### `StorageController.php` (web + API)
- upload: validar mime, tamaño, guardar en `storage/app/public/{project_slug}/{bucket_slug}/{path}`
- index: listar con paginación y filtros
- show: info del archivo
- destroy: eliminar archivo físico + registro DB
- Usar `Storage::disk('public')` siempre

---

## SERVICIO: `StorageService.php`

Centralizar la lógica:
```php
class StorageService {
    public function upload(UploadedFile $file, Bucket $bucket, string $path = ''): StorageFile
    public function delete(StorageFile $file): bool
    public function getPublicUrl(StorageFile $file): string
    public function getImageDimensions(UploadedFile $file): array // [width, height]
    public function updateBucketStats(Bucket $bucket): void
    public function getProjectStorageUsed(Project $project): int // bytes
}
```

---

## DISEÑO UI — Estilo Supabase

El panel debe verse **idéntico en concepto a Supabase**:

**Colores:**
```css
--bg-primary: #1c1c1c;
--bg-secondary: #2a2a2a;  
--bg-surface: #303030;
--accent-green: #3ecf8e;   /* verde Supabase */
--accent-green-hover: #2db87a;
--text-primary: #ededed;
--text-muted: #8c8c8c;
--border: #383838;
```

**Layout:**
- Sidebar fijo izquierdo oscuro (240px) con navegación del proyecto
- Header con nombre del proyecto y breadcrumb
- Área de contenido principal con fondo oscuro
- Tablas con hover states
- Modales con overlay oscuro
- Botones primarios en verde Supabase (#3ecf8e) con texto negro
- Inputs con borde sutil y fondo ligeramente más claro

**Componentes UI a usar:** Reutiliza los componentes que ya existen en el proyecto. Si no hay, créalos siguiendo el estilo Supabase descrito.

---

## ARCHIVO `web.config` para IIS
Generar el web.config correcto para que Laravel funcione en IIS apuntando a `/public/index.php`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Laravel" stopProcessing="true">
          <match url="^(.*)$" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="public/index.php/{R:1}" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".webp" mimeType="image/webp" />
    </staticContent>
  </system.webServer>
</configuration>
```

---

## ORDEN DE GENERACIÓN

Genera los archivos en este orden exacto:

1. Migraciones (4 archivos)
2. Modelos con relaciones y observers (4 archivos)
3. `StorageService.php`
4. Middleware `AuthenticateApiToken.php`
5. Controllers API (BucketController, StorageController)
6. Controllers Web (ProjectController, ApiTokenController)
7. `routes/api.php` (solo las rutas nuevas)
8. `routes/web.php` (solo las rutas nuevas, sin tocar auth)
9. Componentes Vue (6 componentes)
10. `web.config`
11. Instrucciones de instalación

---

## RESTRICCIONES CRÍTICAS

- ❌ NO modificar nada de Fortify, autenticación, usuarios existentes
- ❌ NO usar Docker, artisan serve, ni comandos que requieran SSH
- ❌ NO usar .htaccess (el servidor es IIS, usar web.config)
- ✅ Usar `Storage::disk('public')` para todos los archivos
- ✅ Usar `php artisan storage:link` para URLs públicas
- ✅ Todos los endpoints API devuelven JSON con estructura `{success, data}` o `{success, error}`
- ✅ CORS habilitado para todos los endpoints `/api/v1/*`
- ✅ Paginación en todos los listados (15 items por página)
- ✅ Los tokens se muestran completos UNA SOLA VEZ al crear, luego solo el prefix

---

Genera el código completo de cada archivo sin omitir nada, listo para copiar y pegar.
