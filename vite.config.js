import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const projectDir = fileURLToPath(new URL('.', import.meta.url))
const nmDir = new URL('./node_modules/', import.meta.url)
const nmFallback = '/tmp/1fi-install/node_modules'

export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
  },
  optimizeDeps: {
    entries: ['index.html'],
  },
  server: {
    fs: {
      allow: [projectDir, nmFallback],
    },
  },
})
