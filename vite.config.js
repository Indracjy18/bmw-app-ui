// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      treeshake: {
        moduleSideEffects: (id) => {
          // Tandai 'jspdf-autotable' sebagai modul dengan efek samping
          if (id.includes("jspdf-autotable")) {
            return true;
          }
          // Untuk modul lain, biarkan Rollup melakukan tree-shaking secara normal
          return false;
        },
      },
    },
  },
  optimizeDeps: {
    // Ini membantu memastikan Vite melakukan pre-bundling yang benar
    // untuk dependensi ini selama pengembangan
    include: ["jspdf", "jspdf-autotable"],
  },
});
