import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const srcDir = new URL('./src', import.meta.url).pathname;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': srcDir,
    },
  },
});
