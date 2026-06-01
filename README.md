# 🛒 MercApp — Catálogo de Productos

**Tarea #1 — Unidad 4: Despliegue y publicación de aplicaciones**  
Universidad Politécnica Salesiana · Aplicaciones Web

| Campo | Detalle |
|-------|---------|
| **Estudiante** | Jonathan Macias |
| **Materia** | Aplicaciones Web |
| **Unidad** | 4 — Despliegue y publicación |

---

## 🔗 URLs Públicas

| Servicio | URL |
|----------|-----|
| 🌐 **Frontend (Netlify)** | https://legendary-dolphin-57251e.netlify.app |
| ⚙️ **API (Railway)** | https://mercappv2-production.up.railway.app |
| 🩺 **Health check** | https://mercappv2-production.up.railway.app/health |
| 📄 **Micrositio (GitHub Pages)** | https://JonathanCMSS.github.io/MercAppv2 |
| 📦 **Repositorio GitHub** | https://github.com/JonathanCMSS/MercAppv2 |

---

## 📋 Funcionalidades implementadas

| # | Tarea | Estado |
|---|-------|--------|
| 1 | Repositorio normalizado: README, `.env.example`, `.gitignore` | ✅ |
| 2 | Cluster M0 en MongoDB Atlas (región São Paulo) | ✅ |
| 3 | Usuario de BD con rol readWrite + IP allowlist + TLS | ✅ |
| 4 | Conexión validada con MongoDB Compass (inserción/consulta) | ✅ |
| 5 | Backend parametrizado: `MONGODB_URI`, `PORT`, endpoint `/health` | ✅ |
| 6 | API desplegada en Railway con Railpack y variables de entorno | ✅ |
| 7 | CRUD verificado en producción (productos y categorías) | ✅ |
| 8 | Frontend con `VITE_API_URL`, `npm run build` y `preview` OK | ✅ |
| 9 | SPA desplegada en Netlify con `netlify.toml` (SPA fallback) | ✅ |
| 10 | CORS restringido al dominio Netlify, preflight OPTIONS resuelto | ✅ |
| 11 | Micrositio en `/docs` con arquitectura, endpoints y enlaces | ✅ |
| 12 | Evidencias: capturas CRUD, URLs públicas, ZIP entregado | ✅ |

---

## 🗂️ Estructura del proyecto

```
MercAppv2/
├── backend/                  # API REST con Express + MongoDB
│   ├── models/
│   │   ├── Product.js
│   │   └── Category.js
│   ├── routes/
│   │   ├── products.js       # CRUD /api/products
│   │   └── categories.js     # GET /api/categories
│   ├── seed/seed.js          # Poblado inicial (12 productos, 5 categorías)
│   ├── app.js                # Entry point: CORS dinámico + /health
│   ├── .env.example          # Variables requeridas (sin credenciales)
│   └── package.json
│
├── frontend/                 # SPA Vue 3 + Vite
│   ├── src/
│   │   ├── services/api.js   # Usa VITE_API_URL para apuntar a Railway
│   │   ├── stores/cart.js
│   │   ├── router/index.js
│   │   └── views/...
│   ├── .env.example          # VITE_API_URL
│   ├── netlify.toml          # Build command + SPA redirect
│   └── vite.config.js
│
├── docs/                     # Micrositio GitHub Pages
│   └── index.html
│
├── netlify.toml              # Configuración raíz para Netlify
└── README.md
```

---

## 🚀 Ejecución local

### Requisitos
- Node.js ≥ 18
- MongoDB local `localhost:27017` o cadena Atlas

### Backend
```bash
cd backend
cp .env.example .env        # Editar MONGODB_URI si usas Atlas
npm install
npm run seed                # Poblar BD (12 productos, 5 categorías)
npm run dev                 # → http://localhost:3001
```

### Frontend
```bash
cd frontend
cp .env.example .env        # VITE_API_URL=http://localhost:3001
npm install
npm run dev                 # → http://localhost:5173
```

---

## 🔌 Endpoints del API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Health check (servidor + BD) |
| GET | `/api/products` | Listar productos (`?search=&categoryId=`) |
| GET | `/api/products/:id` | Obtener producto |
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/:id` | Reemplazar producto |
| PATCH | `/api/products/:id` | Actualización parcial |
| DELETE | `/api/products/:id` | Eliminar producto |
| GET | `/api/categories` | Listar categorías |

---

## 🔑 Variables de entorno

### Backend (`backend/.env`)
```env
PORT=3001
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/mercapp
FRONTEND_URL=https://legendary-dolphin-57251e.netlify.app
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=https://mercappv2-production.up.railway.app
```

> ⚠️ Nunca subir `.env` al repositorio. Usar `.env.example` como plantilla.

---

## 🛣️ Rutas del frontend

| Ruta | Vista |
|------|-------|
| `/` | HomeView — Catálogo con buscador y filtro |
| `/product/new` | ProductFormView — Nuevo producto |
| `/product/:id` | ProductDetailView |
| `/product/:id/edit` | ProductFormView — Editar |
| `/cart` | CartView |
| `/about` | AboutView |
| `/*` | NotFoundView — 404 |

---

## ✅ Checklist final de despliegue

- [x] `.env` no versionado, `.env.example` presente en backend y frontend
- [x] CORS restringido al dominio Netlify (no `"*"`)
- [x] `/health` responde `200 OK` con estado de BD
- [x] MongoDB Atlas: TLS activo, allowlist configurada, usuario con rol específico
- [x] `npm run build` genera `dist/` sin errores
- [x] `netlify.toml` con redirect `/* → /index.html` para SPA
- [x] GitHub Pages activo en `/docs` con HTTPS
- [x] Todas las URLs accesibles públicamente bajo HTTPS