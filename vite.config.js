import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const proxyTarget =
    env.VITE_API_URL || "https://api-jardim-encantado.onrender.com";

  const buildProxyTarget = (target) => ({
    target,
    changeOrigin: true,
    configure: (proxy) => {
      proxy.on("proxyReq", (proxyReq) => {
        console.log(
          "Proxying request to:",
          proxyReq.getHeader("host") + proxyReq.path,
        );
      });

      proxy.on("error", (err, req) => {
        console.error("Proxy error:", err);
        req.destroy(err);
      });

      proxy.on("proxyRes", (proxyRes, req) => {
        console.log(
          "Received response from:",
          proxyRes.req.getHeader("host") + proxyRes.req.path,
          "Status:",
          proxyRes.statusCode,
        );
      });
    },
  });

  return {
    plugins: [react()],
    envPrefix: ["VITE_", "API_"],
    server: {
      proxy: {
        "/api": buildProxyTarget(proxyTarget),
        "/teachers": buildProxyTarget(proxyTarget),
        "/teacher-subjects": buildProxyTarget(proxyTarget),
        "/subjects": buildProxyTarget(proxyTarget),
        "/guardians": buildProxyTarget(proxyTarget),
        "/schedules": buildProxyTarget(proxyTarget), 
      },
    },
  };
});
