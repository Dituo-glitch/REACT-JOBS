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
- `/` Home (3 empleos recientes)
- `/jobs` Browse Jobs
- `/jobs/:id` Detalle (editar / borrar)
- `/add-job` Añadir empleo
- `/edit-job/:id` Editar empleo
