
import React, { useState } from 'react';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import QuizResult from '../QuizResult';
import EditableComponent from './EditableComponent';
import { useQuizResultConfig } from '@/hooks/useQuizResultConfig';

interface ResultPageEditorWithControlsProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

export const ResultPageEditorWithControls: React.FC<ResultPageEditorWithControlsProps> = ({
  primaryStyle,
  secondaryStyles
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { config, updateConfig, saveConfig } = useQuizResultConfig(primaryStyle.category);
  
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

  const handleConfigUpdate = (sectionKey: string, data: any) => {
    updateConfig(sectionKey, data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra de ferramentas do editor */}
      <div className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/resultado">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-playfair text-[#432818]">Editor da Página de Resultados</h1>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            {isPreviewMode ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Editar
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </>
            )}
          </Button>
          
          <Button 
            className="bg-[#B89B7A] hover:bg-[#A38A69]" 
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>
      
      {/* Conteúdo da página */}
      <div className="flex-1">
        {isPreviewMode ? (
          // Modo de visualização: mostra a página exatamente como o usuário verá
          <QuizResult 
            primaryStyle={primaryStyle} 
            secondaryStyles={secondaryStyles} 
          />
        ) : (
          // Modo de edição: envolve cada seção com controles de edição
          <EditableComponent
            components={{
              primaryStyle,
              secondaryStyles,
              config
            }}
            onUpdate={handleConfigUpdate}
          />
        )}
      </div>
    </div>
  );
};
