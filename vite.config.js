// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    watch: {
      // Ignorar cambios en la BD de JSON Server para evitar full-page reload
      ignored: ['**/db.json', '**/jobs.json', '**/data/**'],
    },
  },
});