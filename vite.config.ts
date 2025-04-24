
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && {
      name: 'inject-gptengineer-script',
      transformIndexHtml(html: string) {
        return html.replace(
          '</body>',
          `<script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script></body>`
        );
      }
    },
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
