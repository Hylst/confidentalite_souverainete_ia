import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Conformité IA, RGPD & Souveraineté',
          short_name: 'Conformité IA',
          description: 'Formation complète sur la conformité IA, le RGPD et l\'IA Act.',
          theme_color: '#0f172a',
          background_color: '#0f172a',
          display: 'standalone',
          icons: [
            {
              src: 'favicon.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'favicon.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    base: '/confidentalite_souverainete_ia/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in Hylst Studio (Coolify) via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
