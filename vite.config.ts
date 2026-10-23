import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      svelte(),
    electron({
      main: {
        entry: 'electron/main.ts',
        vite: {
          build: {
            outDir: 'dist-electron',
            emptyOutDir: false,
          },
        },
      },
      preload: {
        input: 'electron/preload.ts',
        vite: {
          build: {
            outDir: 'dist-electron',
            emptyOutDir: false,
          },
        },
      },
    })],
  build:{
    outDir: 'dist',
  },
})
