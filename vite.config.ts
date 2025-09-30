import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      // Настройки для GitHub Pages
      base: process.env.NODE_ENV === 'production' ? '/' : '/',
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        // Генерировать SPA fallback для клиентской маршрутизации
        rollupOptions: {
          output: {
            manualChunks: undefined,
          }
        }
      }
    };
});
