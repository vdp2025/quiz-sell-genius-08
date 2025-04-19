
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import { TemplateList } from '@/components/editor/templates/TemplateList';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export const EditorPage = () => {
  const [showTemplates, setShowTemplates] = useState(false);
  const { style } = useParams<{ style?: string }>();
  
  const styleCategory = (style as "Natural" | "Clássico" | "Contemporâneo" | "Elegante" | "Romântico" | "Sexy" | "Dramático" | "Criativo") || 'Natural';
  
  const selectedStyle = {
    category: styleCategory,
    score: 100,
    percentage: 100
  };
  
  return (
    <div className="h-screen">
      {showTemplates ? (
        <div className="p-8 max-w-4xl mx-auto">
          <Button
            onClick={() => setShowTemplates(false)}
            variant="outline"
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar ao Editor
          </Button>
          <h2 className="text-2xl font-playfair text-[#432818] mb-6">Modelos de Página</h2>
          <TemplateList />
          
          <div className="mt-8 text-center">
            <Link to="/templates">
              <Button className="bg-[#B89B7A] hover:bg-[#A38A69]">
                Ver Todos os Modelos Disponíveis
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <ResultPageVisualEditor 
          selectedStyle={selectedStyle}
          onShowTemplates={() => setShowTemplates(true)}
        />
      )}
    </div>
  );
};

export default EditorPage;
