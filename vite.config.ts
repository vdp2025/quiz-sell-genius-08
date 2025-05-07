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
        // Configuração de chunks aprimorada para evitar problemas de carregamento
        manualChunks: (id) => {
          // Colocar a HomePage no chunk principal para evitar o erro de carregamento
          if (id.includes('/pages/HomePage.tsx')) {
            return 'main';
          }
          
          // Resto dos chunks agrupados por categoria
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          
          if (id.includes('@radix-ui') || 
              id.includes('node_modules/clsx') || 
              id.includes('node_modules/tailwind-merge')) {
            return 'ui';
          }
          
          if (id.includes('/services/pixelManager') || 
              id.includes('/utils/analytics')) {
            return 'analytics';
          }
          
          // Agrupar componentes da página principal junto para evitar múltiplas requisições
          if (id.includes('/components/QuizIntro') || 
              id.includes('/components/QuizPage')) {
            return 'home-components';
          }
        },
        // Garantir que os nomes dos chunks sejam estáveis entre builds
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          return `assets/${name}-[hash].js`;
        },
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
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
  // Otimiza a importação de imagens e pré-carrega dependências críticas
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      './src/pages/HomePage',
      './src/components/QuizIntro',
      './src/components/QuizPage'
    ]
  }
}));
