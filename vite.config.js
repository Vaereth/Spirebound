import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use `command` (build vs serve) rather than NODE_ENV, which is undefined
// while vite.config is evaluated during `vite build`. This guarantees the
// correct base path on GitHub Pages (project site served from /Spirebound/).
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Spirebound/' : '/',
}))
