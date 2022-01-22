import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import path from "path";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (mode === "production") {
    dotenv.config({ path: ".env.production.local" });
    return {
      define: {
        "process.env.VITE_APP_API_URL": `"${process.env.VITE_APP_API_URL}"`,
      },
      plugins: [vue(), Pages()],
      resolve: {
        alias: { "@/": `${path.resolve(__dirname, "src")}/` },
      },
    };
  } else {
    dotenv.config({ path: ".env.local" });
    return {
      define: {
        "process.env.VITE_APP_API_URL": `"${process.env.VITE_APP_API_URL}"`,
      },
      plugins: [vue(), Pages()],
      resolve: {
        alias: { "@/": `${path.resolve(__dirname, "src")}/` },
      },
    };
  }
});
