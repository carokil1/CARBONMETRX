import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/static/',

  build: {
    outDir: '../app/static', // adjust if your path is different
    
  },
});