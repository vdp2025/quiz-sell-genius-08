
import React from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { Button } from '../ui/button';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '../ui/use-toast';
import QuizResult from '../QuizResult';
import { useQuizResultConfig } from '@/hooks/useQuizResultConfig';

const ResultEditor = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { config, updateConfig, saveConfig } = useQuizResultConfig(primaryStyle?.category || 'Natural');
  const [isPreviewMode, setIsPreviewMode] = React.useState(false);
  
  const handleSave = async () => {
    try {
      await saveConfig();
      toast({
        title: "Alterações salvas",
        description: "As alterações na página de resultados foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  if (!primaryStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#432818] mb-4">
            Nenhum resultado encontrado
          </p>
          <Link to="/" className="text-[#B89B7A] hover:underline">
            Voltar para o início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7]">
      {/* Editor Toolbar */}
      <div className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/resultado">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-playfair text-[#432818]">
            Editor da Página de Resultados
          </h1>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            {isPreviewMode ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Modo Edição
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </>
            )}
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-[#B89B7A] hover:bg-[#A38A69]"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <QuizResult 
          primaryStyle={primaryStyle} 
          secondaryStyles={secondaryStyles}
          isEditing={!isPreviewMode}
          onUpdate={updateConfig}
          config={config}
        />
      </div>
    </div>
  );
};

export default ResultEditor;
