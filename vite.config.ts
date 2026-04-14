import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/assets': {
        target: 'http://1e14c3489fcb.vps.myjino.ru:5000',
        changeOrigin: true,
      },
      '/api/v1': {
        target: 'http://1e14c3489fcb.vps.myjino.ru:5000',
        changeOrigin: true,
      },
    },
  },
})
