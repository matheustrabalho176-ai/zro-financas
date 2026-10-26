// O wrapper do Lovable usa Cloudflare como destino padrão. No Vercel, force o
// preset próprio da plataforma para gerar funções SSR compatíveis e evitar 404.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = Boolean(process.env.VERCEL) || Boolean(process.env.VERCEL_URL);

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: isVercel ? { preset: "vercel" } : true,
});
