import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/ai': {
        target: 'https://api.replicate.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ai/, ''),
      }
    },
  },
})
