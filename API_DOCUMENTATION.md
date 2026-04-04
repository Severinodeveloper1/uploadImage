# API Documentation — Storage Platform

## Autenticación

Todos los endpoints de la API usan autenticación por **Bearer Token**.
El token se genera desde el panel web en **Dashboard → Proyecto → API Keys**.

### Header requerido en cada request:
```
Authorization: Bearer {tu_token_aquí}
```

---

## Generar un token (desde el panel)

1. Ve a tu proyecto → pestaña **API Keys**
2. Haz clic en **New Token**
3. Asigna un nombre descriptivo y marca los permisos necesarios:
   - `read` — consultar archivos, buckets, carpetas
   - `write` — subir archivos, crear buckets
   - `delete` — eliminar archivos y buckets
4. Haz clic en **Generate**
5. **COPIA el token inmediatamente** — solo se muestra una vez

El token tiene el formato:
```
dmstorage_XXXXXXXXXXXXXXXXXXXXXXXXXXXX_32caracteres
```

---

## Resumen de Endpoints

| Método | Endpoint | Permiso | Descripción |
|--------|----------|---------|-------------|
| `GET` | `/project` | read | Info del proyecto |
| `GET` | `/buckets` | read | Listar buckets |
| `POST` | `/buckets` | write | Crear bucket |
| `GET` | `/buckets/{slug}` | read | Info de un bucket |
| `DELETE` | `/buckets/{slug}` | delete | Eliminar bucket |
| `POST` | `/buckets/{slug}/upload` | write | Subir 1 archivo |
| `POST` | `/buckets/{slug}/batch-upload` | write | Subir múltiples (1-20) |
| `GET` | `/buckets/{slug}/files` | read | Listar archivos |
| `GET` | `/buckets/{slug}/files/{id}` | read | Info de un archivo |
| `DELETE` | `/buckets/{slug}/files/{id}` | delete | Eliminar archivo |
| `GET` | `/buckets/{slug}/folders` | read | Listar carpetas |

---

Base URL: `https://tu-dominio.com/api/v1`

### Información del proyecto

```http
GET /api/v1/project
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
  "id": 1,
  "name": "Mi Proyecto",
  "slug": "mi-proyecto-abc123",
  "storage_used_mb": 45.2,
  "storage_limit_mb": 1000,
  "storage_percentage": 4.52,
  "buckets_count": 3,
  "files_count": 120
}
```

---

### Listar buckets

```http
GET /api/v1/buckets
Authorization: Bearer {token}
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Imágenes",
    "slug": "imagenes",
    "is_public": true,
    "file_count": 45,
    "total_size_bytes": 12345678,
    "max_file_size_mb": 5
  }
]
```

---

### Crear bucket

```http
POST /api/v1/buckets
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "avatares",
  "is_public": true,
  "max_file_size_mb": 2,
  "allowed_mime_types": ["image/jpeg", "image/png", "image/webp"]
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `name` | string | ✅ | Nombre del bucket (se convierte a slug automáticamente) |
| `is_public` | boolean | ❌ | `true` = archivos accesibles sin auth (default: `true`) |
| `max_file_size_mb` | integer | ❌ | Tamaño máximo por archivo en MB (default: 5) |
| `allowed_mime_types` | array | ❌ | Lista de MIME types permitidos. Si es null, acepta todo |

---

### Subir archivo

```http
POST /api/v1/buckets/{slug}/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Parámetros form-data:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `file` | File | El archivo a subir |
| `folder` | string | Carpeta destino (opcional). Ej: `thumbnails` o `2024/enero` |

**Ejemplo con cURL:**
```bash
curl -X POST https://tu-dominio.com/api/v1/buckets/imagenes/upload \
  -H "Authorization: Bearer dmstorage_XXXX_XXXX" \
  -F "file=@/ruta/local/foto.jpg" \
  -F "folder=avatares"
```

**Ejemplo con JavaScript (fetch):**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('folder', 'avatares'); // opcional

const response = await fetch('/api/v1/buckets/imagenes/upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer dmstorage_XXXX_XXXX',
  },
  body: formData,
});

const data = await response.json();
console.log(data.url); // URL del archivo subido
```

**Respuesta exitosa (201):**
```json
{
  "id": 42,
  "original_name": "foto.jpg",
  "filename": "550e8400-e29b-41d4-a716-446655440000.jpg",
  "url": "https://tu-dominio.com/storage/mi-proyecto/imagenes/avatares/uuid.jpg",
  "size_bytes": 204800,
  "mime_type": "image/jpeg",
  "width": 800,
  "height": 600,
  "folder": "avatares",
  "is_public": true,
  "created_at": "2025-08-15T12:00:00.000000Z"
}
```

> **Archivos privados:** Si el bucket tiene `is_public: false`, la URL devuelta será
> `https://tu-dominio.com/files/{id}` y requerirá el Bearer token para acceder.

---

### Subir múltiples archivos (Batch)

```http
POST /api/v1/buckets/{slug}/batch-upload
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Parámetros form-data:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `files[]` | File[] | Array de archivos a subir (mín: 1, máx: 20) |
| `folder` | string | Carpeta destino (opcional). Ej: `thumbnails` o `2024/enero` |

**Ejemplo con cURL:**
```bash
curl -X POST https://tu-dominio.com/api/v1/buckets/imagenes/batch-upload \
  -H "Authorization: Bearer dmstorage_XXXX_XXXX" \
  -F "files[]=@foto1.jpg" \
  -F "files[]=@foto2.jpg" \
  -F "files[]=@foto3.png" \
  -F "folder=avatares"
```

**Ejemplo con JavaScript (fetch):**
```javascript
const formData = new FormData();
formData.append('files[]', fileInput.files[0]);
formData.append('files[]', fileInput.files[1]);
formData.append('files[]', fileInput.files[2]);
formData.append('folder', 'avatares'); // opcional

const response = await fetch('/api/v1/buckets/imagenes/batch-upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer dmstorage_XXXX_XXXX',
  },
  body: formData,
});

const data = await response.json();
console.log(data.data.uploaded_count); // Archivos subidos exitosamente
console.log(data.data.errors_count);   // Archivos con error
```

**Respuesta exitosa (Todos subidos - 201):**
```json
{
  "success": true,
  "data": {
    "uploaded": [
      {
        "id": 42,
        "name": "foto1.jpg",
        "path": "avatares/550e8400-e29b-41d4-a716-446655440000.jpg",
        "url": "https://tu-dominio.com/storage/mi-proyecto/imagenes/avatares/uuid1.jpg",
        "size": 204800,
        "mime_type": "image/jpeg",
        "width": 800,
        "height": 600,
        "created_at": "2025-08-15T12:00:00.000000Z"
      }
    ],
    "uploaded_count": 1,
    "errors": [],
    "errors_count": 0
  }
}
```

**Respuesta parcial (Algunos fallaron - 207):**
```json
{
  "success": true,
  "data": {
    "uploaded": [
      {
        "id": 42,
        "name": "foto1.jpg",
        "path": "avatares/uuid1.jpg",
        "url": "https://tu-dominio.com/storage/mi-proyecto/imagenes/avatares/uuid1.jpg",
        "size": 204800,
        "mime_type": "image/jpeg",
        "width": 800,
        "height": 600,
        "created_at": "2025-08-15T12:00:00.000000Z"
      }
    ],
    "uploaded_count": 1,
    "errors": [
      {
        "index": 1,
        "name": "documento.pdf",
        "code": "MIME_TYPE_NOT_ALLOWED",
        "message": "El tipo de archivo application/pdf no está permitido."
      },
      {
        "index": 2,
        "name": "video.mp4",
        "code": "FILE_TOO_LARGE",
        "message": "El archivo supera el límite de 5MB."
      }
    ],
    "errors_count": 2
  }
}
```

**Respuesta error (Ninguno subido - 422):**
```json
{
  "success": false,
  "data": {
    "uploaded": [],
    "uploaded_count": 0,
    "errors": [
      {
        "index": 0,
        "name": "foto1.jpg",
        "code": "STORAGE_LIMIT_EXCEEDED",
        "message": "Límite de almacenamiento del proyecto alcanzado."
      }
    ],
    "errors_count": 1
  }
}
```

**Códigos de estado:**
- `201` — Todos los archivos se subieron exitosamente
- `207` — Multi-status: algunos archivos se subieron, otros fallaron
- `422` — Error: ningún archivo se pudo subir

> **Validaciones por archivo:**
> - Cada archivo se valida individualmente (MIME type, tamaño)
> - Los archivos inválidos se reportan en `errors[]` pero no interrumpen el proceso
> - Si se alcanza el límite de almacenamiento, el batch se detiene (no se intentan más archivos)
> - Máximo 20 archivos por request

---

```http
GET /api/v1/buckets/{slug}/files
Authorization: Bearer {token}
```

**Query params opcionales:**

| Param | Descripción |
|-------|-------------|
| `folder` | Filtrar por carpeta. Ej: `?folder=avatares` |
| `search` | Buscar por nombre. Ej: `?search=foto` |
| `mime` | Filtrar por MIME type. Ej: `?mime=image/jpeg` |
| `page` | Paginación (15 por página) |

**Respuesta:**
```json
{
  "data": [ /* array de archivos */ ],
  "current_page": 1,
  "last_page": 3,
  "total": 42
}
```

---

### Obtener info de un archivo

```http
GET /api/v1/buckets/{slug}/files/{id}
Authorization: Bearer {token}
```

---

### Eliminar archivo

```http
DELETE /api/v1/buckets/{slug}/files/{id}
Authorization: Bearer {token}
```

**Respuesta:** `204 No Content`

---

### Listar carpetas de un bucket

```http
GET /api/v1/buckets/{slug}/folders
Authorization: Bearer {token}
```

**Respuesta:**
```json
["avatares", "documentos", "2024/enero"]
```

---

### Eliminar bucket

```http
DELETE /api/v1/buckets/{slug}
Authorization: Bearer {token}
```

> ⚠️ Esto elimina el bucket **y todos sus archivos** permanentemente.

---

## Permisos del token

Cada token puede tener uno o más permisos:

| Permiso | Qué permite |
|---------|-------------|
| `read` | GET — listar, consultar, descargar |
| `write` | POST — subir archivos, crear buckets |
| `delete` | DELETE — eliminar archivos y buckets |

Si un token intenta una acción sin el permiso correspondiente, la API responde:
```json
{
  "error": "Insufficient permissions"
}
```
con código `403 Forbidden`.

---

## Buenas prácticas

### 1. Manejo de errores

Siempre verifica `success` y el código de estado HTTP:

```javascript
const response = await fetch('/api/v1/buckets/imagenes/batch-upload', {
  // ...
});

if (!response.ok) {
  const error = await response.json();
  console.error(`Error ${response.status}:`, error.error || error);
  return;
}

const { data } = await response.json();
console.log(`Subidos: ${data.uploaded_count}, Errores: ${data.errors_count}`);
```

### 2. Bucket vs Carpeta

- **Bucket**: Contenedor de nivel superior. Útil para separar tipos de contenido (avatares, documentos, etc.)
- **Carpeta**: Estructura dentro de un bucket. Usa para organizar por fecha o proyecto: `2025/marzo`, `usuarios/123`

### 3. Validación previa

Valida MIME types y tamaños **antes** de enviar a la API:

```javascript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

for (const file of filesToUpload) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    alert(`${file.name}: tipo no permitido`);
    continue;
  }
  if (file.size > MAX_FILE_SIZE) {
    alert(`${file.name}: archivo muy grande`);
    continue;
  }
}
```

### 4. Batch vs Upload individual

- **Upload** (`/upload`): Usa para casos esporádicos de un archivo
- **Batch** (`/batch-upload`): Usa para importación masiva, drag-and-drop múltiple, o integración con sistemas

### 5. Rate limiting

No hay límite de rate en la API actual. Para evitar sobrecargas:
- Agrupa requests de batch-upload (máx 20 archivos por request)
- Implementa reintentos con backoff exponencial
- Usa carpetas para organizar uploads grandes

### 6. Seguridad de tokens

- ⚠️ **Nunca** guardes tokens en el frontend (localStorage, sessionStorage)
- Solicita tokens a través de un proxy backend seguro
- Marca tokens con expiración si es posible
- Revoca tokens cuando cambies integraciones

---

## Acceder a archivos privados

Los archivos de buckets privados (`is_public: false`) no son accesibles directamente.
Su URL tiene el formato `/files/{id}` y requiere autenticación:

**Opción 1 — Session web (panel):**
Los usuarios autenticados en el panel pueden ver y descargar archivos privados normalmente.

**Opción 2 — API token en el header:**
```bash
curl https://tu-dominio.com/files/42 \
  -H "Authorization: Bearer dmstorage_XXXX_XXXX"
```

```javascript
const response = await fetch('/files/42', {
  headers: { 'Authorization': 'Bearer dmstorage_XXXX_XXXX' }
});
const blob = await response.blob();
```

---

## Códigos de respuesta

| Código | Significado |
|--------|-------------|  
| `200` | OK |
| `201` | Recurso creado |
| `204` | Eliminado sin contenido |
| `401` | Token inválido, expirado o inactivo |
| `403` | Sin permiso para esta acción |
| `404` | Recurso no encontrado |
| `422` | Error de validación |
| `507` | Almacenamiento insuficiente (límite del proyecto alcanzado) |

---

## Ejemplos por lenguaje

### PHP (Batch Upload con cURL)
```php
$ch = curl_init('https://tu-dominio.com/api/v1/buckets/imagenes/batch-upload');
$files = ['/ruta/foto1.jpg', '/ruta/foto2.jpg', '/ruta/foto3.png'];

$postFields = ['folder' => 'avatares'];
foreach ($files as $i => $filePath) {
    $postFields["files[$i]"] = new CURLFile($filePath, 'image/jpeg', basename($filePath));
}

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer dmstorage_XXXX_XXXX',
    ],
    CURLOPT_POSTFIELDS => $postFields,
]);

$response = json_decode(curl_exec($ch), true);
curl_close($ch);

echo "Archivos subidos: " . $response['data']['uploaded_count'] . "\n";
echo "Errores: " . $response['data']['errors_count'] . "\n";
foreach ($response['data']['uploaded'] as $file) {
    echo "✓ " . $file['name'] . " → " . $file['url'] . "\n";
}
```

### Python (Batch Upload con requests)
```php
$ch = curl_init('https://tu-dominio.com/api/v1/buckets/imagenes/upload');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer dmstorage_XXXX_XXXX',
    ],
    CURLOPT_POSTFIELDS => [
        'file' => new CURLFile('/ruta/foto.jpg', 'image/jpeg', 'foto.jpg'),
        'folder' => 'avatares',
    ],
]);
$response = json_decode(curl_exec($ch), true);
curl_close($ch);
echo $response['url'];
```

### Python (Batch Upload con requests)
```python
import requests

token = "dmstorage_XXXX_XXXX"
headers = {"Authorization": f"Bearer {token}"}
files_list = ['/ruta/foto1.jpg', '/ruta/foto2.jpg', '/ruta/foto3.png']

# Preparar archivos como array con key 'files[]'
files = [('files[]', open(f, 'rb')) for f in files_list]
data = {'folder': 'avatares'}

response = requests.post(
    "https://tu-dominio.com/api/v1/buckets/imagenes/batch-upload",
    headers=headers,
    files=files,
    data=data,
)

result = response.json()
print(f"Subidos: {result['data']['uploaded_count']}")
print(f"Errores: {result['data']['errors_count']}")

for file in result['data']['uploaded']:
    print(f"✓ {file['name']} → {file['url']}")

for error in result['data']['errors']:
    print(f"✗ {error['name']} ({error['code']}): {error['message']}")
```

### Node.js (Batch Upload con axios)
```python
import requests

token = "dmstorage_XXXX_XXXX"
headers = {"Authorization": f"Bearer {token}"}

with open("/ruta/foto.jpg", "rb") as f:
    response = requests.post(
        "https://tu-dominio.com/api/v1/buckets/imagenes/upload",
        headers=headers,
        files={"file": ("foto.jpg", f, "image/jpeg")},
        data={"folder": "avatares"},
    )

print(response.json()["url"])
```

### Node.js (Batch Upload con axios)
```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
const files = ['/ruta/foto1.jpg', '/ruta/foto2.jpg', '/ruta/foto3.png'];

// Agregar cada archivo con key 'files[]'
files.forEach(file => {
  form.append('files[]', fs.createReadStream(file));
});
form.append('folder', 'avatares');

axios.post(
  'https://tu-dominio.com/api/v1/buckets/imagenes/batch-upload',
  form,
  {
    headers: {
      'Authorization': 'Bearer dmstorage_XXXX_XXXX',
      ...form.getHeaders(),
    },
  }
)
.then(({ data }) => {
  console.log(`Subidos: ${data.data.uploaded_count}`);
  console.log(`Errores: ${data.data.errors_count}`);
  
  data.data.uploaded.forEach(file => {
    console.log(`✓ ${file.name} → ${file.url}`);
  });
  
  data.data.errors.forEach(error => {
    console.log(`✗ ${error.name} (${error.code}): ${error.message}`);
  });
})
.catch(error => console.error(error.response.data));
```

### cURL
```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('file', fs.createReadStream('/ruta/foto.jpg'));
form.append('folder', 'avatares');

const { data } = await axios.post(
  'https://tu-dominio.com/api/v1/buckets/imagenes/upload',
  form,
  {
    headers: {
      'Authorization': 'Bearer dmstorage_XXXX_XXXX',
      ...form.getHeaders(),
    },
  }
);

console.log(data.url);
```

### Comparativa: Upload vs Batch Upload

| Aspecto | Upload (single) | Batch Upload |
|--------|-----------------|--------------|
| **Endpoint** | `POST /buckets/{slug}/upload` | `POST /buckets/{slug}/batch-upload` |
| **Archivos** | 1 por request | 1-20 por request |
| **Eficiencia** | Múltiples requests | Overhead reducido |
| **Validación fallida** | Falla todo | Reporta por archivo |
| **Código estado** | 201 / 422 | 201 / 207 / 422 |
| **Caso de uso** | Un archivo ocasional | Carga masiva, importación |
