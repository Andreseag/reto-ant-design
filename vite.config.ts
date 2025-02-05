import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      PUBLIC_KEY: JSON.stringify(process.env.PUBLIC_KEY),
      PRIVATE_KEY: JSON.stringify(process.env.PRIVATE_KEY),
    },
  },
});
