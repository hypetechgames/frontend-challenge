import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

process.env = loadEnv('mock', process.cwd())

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.VITE_APP_PORT,
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  plugins: [react()],
})
