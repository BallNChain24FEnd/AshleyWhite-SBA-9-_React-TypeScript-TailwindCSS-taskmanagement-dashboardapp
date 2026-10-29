import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Configure Vite plugins
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

