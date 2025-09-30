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
      // Base path: '/' for Netlify/Cloudflare, '/HHGnumner/' for GitHub Pages
      base: '/',
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        // Настройки для SPA
        rollupOptions: {
          output: {
            manualChunks: undefined,
          }
        }
      }
    };
});
