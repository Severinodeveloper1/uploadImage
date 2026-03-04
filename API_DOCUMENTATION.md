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

## Endpoints disponibles

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

### Listar archivos de un bucket

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

### PHP (cURL)
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

### Python (requests)
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

### Node.js (axios)
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
