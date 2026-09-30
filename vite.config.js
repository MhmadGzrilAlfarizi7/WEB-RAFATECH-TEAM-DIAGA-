import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        belajar: resolve(__dirname, 'pages/belajar.html'),
        'pemandu-ai': resolve(__dirname, 'pages/pemandu-ai.html'),
        batik: resolve(__dirname, 'pages/batik.html'),
        'sentra-kreatif': resolve(__dirname, 'pages/sentra-kreatif.html'),
        tentang: resolve(__dirname, 'pages/tentang.html'),
        '404': resolve(__dirname, 'pages/404.html'),
      },
    },
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});