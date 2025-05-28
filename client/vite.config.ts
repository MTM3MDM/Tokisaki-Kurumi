import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Tokisaki-Kurumi/', // GitHub 저장소 이름으로 설정
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}) 