import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['pdfjs-dist']
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, './src'),
    }
  }
})
