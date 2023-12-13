import { UserConfig, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    base: mode === "production" ? "/humans-of-seoul-feed-format/" : "",
    plugins: [react()]
  };
  return config;
});
