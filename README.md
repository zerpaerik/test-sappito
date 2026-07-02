# Toyota Créditos — Mini-portal de solicitudes de crédito

Pequeña aplicación para gestionar solicitudes de crédito vehicular: un **listado** con
búsqueda, filtros y estados, y un **formulario de creación** con validación y cálculo en
vivo del monto a financiar. Incluye además una **pantalla de detalle** y una **API propia**.

> 🔗 **Demo:** _(pega aquí el enlace de Vercel si despliegas la app)_

---

## ✨ Funcionalidades

- **Listado de solicitudes** (tarjetas responsive) con cliente, vehículo, precio de venta,
  monto a financiar y estado (badge con color según estado).
  - Búsqueda por cliente **en vivo** (insensible a mayúsculas y acentos).
  - Filtro por estado (Todas / Borrador / En revisión / Aprobada / Rechazada).
  - Contador de resultados.
  - Estados de **carga** (skeleton), **vacío**, **sin resultados** y **error** con reintento.
- **Crear solicitud** con validación por campo y mensajes claros:
  - `Monto a financiar = Precio de venta − Inicial`, calculado **en vivo**.
  - No permite enviar si hay errores; al crear, la solicitud (estado `Borrador`) aparece en
    el listado y se muestra un **toast** de éxito.
- **Detalle** de la solicitud con el desglose completo.
- **Modo oscuro** con interruptor (persistente y sin parpadeo al cargar).
- **API propia** con Route Handlers (`GET`/`POST /api/solicitudes`).

---

## 🛠️ Stack y por qué

| Herramienta | Uso | Por qué |
|---|---|---|
| **Next.js 16 (App Router)** | Framework | Requisito del proyecto; frontend y API (Route Handlers) en un mismo lugar. |
| **TypeScript** | Tipado | Menos errores en tiempo de ejecución y mejor autocompletado. |
| **Tailwind CSS v4** | Estilos | Rápido y consistente; buen soporte responsive y de modo oscuro. |
| **react-hook-form** | Formulario | Manejo eficiente (pocos re-renders) e integración limpia con la validación. |
| **zod** (+ `@hookform/resolvers`) | Validación | Esquema declarativo y **compartido entre cliente y servidor**. |
| **lucide-react** | Íconos | Íconos SVG ligeros y coherentes. |
| **Vitest** | Pruebas | Rápido, API familiar y buena integración con TypeScript. |

---

## 🚀 Cómo correr el proyecto

Requisitos: **Node.js 20 o superior**.

```bash
# 1. Instalar dependencias
npm install

# 2. Entorno de desarrollo (http://localhost:3000)
npm run dev

# 3. Build de producción y ejecución
npm run build
npm start

# 4. Pruebas
npm test
```

---

## 📁 Estructura

```
data/
  solicitudes.json              # dataset semilla
src/
  app/
    layout.tsx                  # layout raíz (header, tema, toasts)
    page.tsx                    # Pantalla A · listado
    nueva/page.tsx              # Pantalla B · crear
    solicitud/[id]/page.tsx     # Pantalla C · detalle
    api/solicitudes/
      route.ts                  # GET (lista) y POST (crear)
      [id]/route.ts             # GET (detalle)
  components/                   # Header, EstadoBadge, SolicitudCard, Filtros,
                                # SolicitudForm, estados, ThemeToggle, ui/
  hooks/                        # useSolicitudes, useSolicitud
  lib/
    types.ts                    # modelo de dominio (Solicitud, Estado)
    schema.ts                   # validación con zod (cliente + servidor)
    store.ts                    # persistencia en memoria (sembrada del JSON)
    api.ts                      # cliente fetch de la API
    format.ts                   # formato de moneda
```

---

## 🔌 API

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/solicitudes` | Devuelve todas las solicitudes. |
| `POST` | `/api/solicitudes` | Crea una solicitud (valida con zod, estado inicial `Borrador`). |
| `GET` | `/api/solicitudes/:id` | Devuelve una solicitud por id. |

La persistencia es **en memoria** en el servidor, sembrada desde `data/solicitudes.json`.

---

## 🧠 Decisiones que tomé

- **Backend propio (opcional) en vez de solo estado en cliente.** Aunque la prueba permitía
  guardar en memoria/`localStorage`, expuse una API con Route Handlers para acercarme a una
  app real: el listado y el detalle consumen la API y el formulario crea con `POST`.
- **Un solo esquema de validación (`zod`) compartido** por el formulario y el endpoint `POST`.
  Así las reglas viven en un único lugar y no se duplican.
- **Estados asíncronos encapsulados en hooks** (`useSolicitudes`, `useSolicitud`) para separar
  la carga de datos de la UI.
- **Componentes de estado dedicados** (carga con skeleton, vacío, sin resultados y error) en
  lugar de mensajes sueltos, porque es lo que separa una demo de una app.
- **Server vs client components:** el listado, el formulario y el detalle son interactivos, así
  que son client components; la API corre en el servidor.
- **Modo oscuro por clase** con preferencia guardada en `localStorage` y un pequeño script que
  fija el tema antes del primer render para evitar el parpadeo.
- Los montos se escriben como texto y **zod los coerciona a número** al validar.

---

## ⏭️ Qué haría con más tiempo

- **Persistencia real** (Prisma + SQLite/Postgres). Hoy es en memoria: se reinicia con el
  servidor y, en un despliegue serverless, cada instancia tendría su propia copia.
- **Más pruebas**: componentes con Testing Library y el flujo completo del formulario.
- **Paginación y ordenamiento** por columna, y `debounce` en la búsqueda si el dataset crece.
- **Accesibilidad**: manejo de foco y anuncios ARIA en los toasts.
- **CI** (lint + test + build) con GitHub Actions.

> **Limitación conocida:** por la persistencia en memoria, en un despliegue serverless las
> solicitudes creadas pueden no verse entre instancias o tras un reinicio. Es intencional para
> el alcance de esta prueba.

---

## ✅ Pruebas

```bash
npm test
```

Cubren la validación del formulario (`zod`) y el cálculo del monto a financiar.
