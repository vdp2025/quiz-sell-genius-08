
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import BuildInfo from './components/BuildInfo';
import VisualEditorPlaceholder from './components/editor/VisualEditorPlaceholder';

// Application configuration
const config = {
  maintenance: false // Set to true to enable maintenance mode
};

const App = () => {
  if (config.maintenance) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf7] p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-playfair text-[#aa6b5d] mb-4">Em Manutenção</h1>
          <p className="text-[#432818] mb-6">
            Estamos realizando melhorias no sistema. Por favor, retorne em breve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Router>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={
            <div className="min-h-screen flex items-center justify-center bg-[#fffaf7] p-4">
              <div className="text-center max-w-md">
                <h1 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
                  Bem-vindo ao Quiz de Estilo
                </h1>
                <p className="text-[#432818] mb-6">
                  Descubra seu estilo pessoal com nosso quiz especializado.
                </p>
                <a 
                  href="/resultado" 
                  className="inline-block bg-[#B89B7A] hover:bg-[#A38A69] text-white px-6 py-3 rounded-md transition-colors"
                >
                  Ver Exemplo de Resultado
                </a>
              </div>
            </div>
          } />
          
          <Route path="/resultado" element={
            <div className="min-h-screen bg-[#fffaf7] p-4">
              <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-playfair text-[#aa6b5d] text-center mb-6">
                  Seu Resultado: Estilo Elegante
                </h1>
                <p className="text-[#432818] text-center mb-8">
                  Este é um exemplo de página de resultado. O conteúdo completo será exibido quando o quiz estiver pronto.
                </p>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20 mb-10">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
                      Conheça sua Mentora: Gisele Galvão
                    </h2>
                    <p className="text-[#432818]">
                      Consultora de Imagem Estratégica, Personal Branding e Coloração Pessoal
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <a 
                    href="/" 
                    className="inline-block bg-[#B89B7A] hover:bg-[#A38A69] text-white px-6 py-3 rounded-md transition-colors"
                  >
                    Voltar para Início
                  </a>
                </div>
              </div>
            </div>
          } />
          
          {/* Placeholder for the future visual editor */}
          <Route path="/admin/editor" element={<VisualEditorPlaceholder />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <Toaster />
        <BuildInfo />
      </Router>
    </div>
  );
};

export default App;
