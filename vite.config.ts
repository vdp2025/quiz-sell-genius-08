import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import compression from "vite-plugin-compression";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Adiciona compressão gzip para arquivos estáticos
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Também adiciona compressão brotli para melhor performance
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Otimiza o tamanho do bundle e melhora carregamento
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tooltip',
            'clsx',
            'tailwind-merge'
          ],
          'analytics': [
            './src/services/pixelManager.ts',
            './src/utils/analytics.ts'
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Desativa sourcemap em produção para reduzir tamanho
    sourcemap: mode === 'development',
    // Minifica o código
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
  },
  // Otimiza a importação de imagens
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
}));
