import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      formats: ["es"],
      entry: "./src/lib.tsx",
      name: "Zeebe Modeler",
      fileName: "zeebe-modeler",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  }
})
