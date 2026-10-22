import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function apiDevServerPlugin() {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          try {
            const { handleApiRequest } = await import('./src/server/apiHandler.js');
            await handleApiRequest(req, res);
          } catch (err) {
            console.error('[Vite API Middleware Error]', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Internal API Server Error' }));
          }
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiDevServerPlugin()]
});
