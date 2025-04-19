
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import { TemplateList } from '@/components/editor/templates/TemplateList';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const EditorPage = () => {
  const [showTemplates, setShowTemplates] = useState(false);
  const { style } = useParams<{ style?: string }>();
  const navigate = useNavigate();
  
  const styleCategories = [
    "Natural", "Clássico", "Contemporâneo", "Elegante", 
    "Romântico", "Sexy", "Dramático", "Criativo"
  ];
  
  // Por padrão, se não houver um estilo na URL, redireciona para o editor Natural
  useEffect(() => {
    if (!style && window.location.pathname === '/editor') {
      navigate('/editor/Natural');
    } else if (style && !styleCategories.includes(style)) {
      toast({
        title: "Estilo inválido",
        description: `O estilo "${style}" não existe. Redirecionando para o estilo Natural.`,
        variant: "destructive"
      });
      navigate('/editor/Natural');
    }
  }, [style, navigate]);
  
  if (!style) {
    return null; // Evita renderização antes do redirecionamento
  }
  
  const styleCategory = style as "Natural" | "Clássico" | "Contemporâneo" | "Elegante" | "Romântico" | "Sexy" | "Dramático" | "Criativo";
  
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
        </div>
      ) : (
        <div className="h-full">
          <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center">
            <h1 className="text-xl font-medium mr-auto">Editor de Página - Estilo {styleCategory}</h1>
            <div className="flex gap-2">
              {styleCategories.map(cat => (
                <Link key={cat} to={`/editor/${cat}`}>
                  <Button
                    variant={cat === styleCategory ? "default" : "outline"}
                    size="sm"
                    className={cat === styleCategory ? "bg-[#B89B7A] hover:bg-[#A38A69]" : ""}
                  >
                    {cat}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          
          <ResultPageVisualEditor 
            selectedStyle={selectedStyle}
            onShowTemplates={() => setShowTemplates(true)}
          />
        </div>
      )}
    </div>
  );
};

export default EditorPage;
