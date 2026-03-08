import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    envPrefix: ["VITE_", "API_"],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              console.log(
                "Proxying request to:",
                proxyReq.getHeader("host") + proxyReq.path
              );
            });
          },
        },
      },
    },
  };
});