import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  /** Pre-bundle lucide-react so the dev server does not serve stale optimize chunks (504 Outdated Optimize Dep). */
  optimizeDeps: {
    include: ["lucide-react"],
  },
  server: {
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "https://api.legalnotion.in",
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
