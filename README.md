# React Jobs

App de empleos con React, Vite, Tailwind y json-server.

## Cómo correrla
```
npm install
npm run server   # API en http://localhost:3000
npm run dev      # web en http://localhost:5173
```
Si tu API usa otra URL, copia `.env.example` a `.env` y cambia `VITE_API_URL`.

## Páginas
- `/` Inicio (últimos 3 empleos)
- `/jobs` Todos los empleos
- `/jobs/add` Añadir empleo
- `/jobs/:id` Detalle (editar / borrar)
- `/jobs/edit/:id` Editar empleo
