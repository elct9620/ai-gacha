import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'edge-runtime',
  },
  server: {
    proxy: {
      '/ai': {
        target: 'https://api.replicate.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ai/, ''),
      }
    },
  },
})
