// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  build: {
    rollupOptions: {
      treeshake: {
        moduleSideEffects: (id) => {
          // Tandai 'jspdf-autotable' sebagai modul dengan efek samping
          if (id.includes("jspdf-autotable")) {
            return true;
          }

          return false;
        },
      },
    },
  },
  optimizeDeps: {
    include: ["jspdf", "jspdf-autotable"],
  },
});
