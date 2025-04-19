
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '@/components/result-editor/ComponentsSidebar';
import { EditorPreview } from '@/components/result-editor/EditorPreview';
import { PropertiesPanel } from '@/components/result-editor/PropertiesPanel';
import EditorToolbar from '@/components/result-editor/EditorToolbar';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { JsonEditorPanel } from '@/components/result-editor/JsonEditorPanel';
import { GlobalStylesEditor } from '@/components/result-editor/GlobalStylesEditor';

export const EditorPage = () => {
  const { style } = useParams<{ style?: string }>();
  const navigate = useNavigate();
  const [isJsonEditorOpen, setIsJsonEditorOpen] = useState(false);
  
  const styleCategories = [
    "Natural", "Clássico", "Contemporâneo", "Elegante", 
    "Romântico", "Sexy", "Dramático", "Criativo"
  ];
  
  useEffect(() => {
    const savedResult = localStorage.getItem('quizResult');
    let userPrimaryStyle = null;
    
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        if (parsedResult.primaryStyle && parsedResult.primaryStyle.category) {
          userPrimaryStyle = parsedResult.primaryStyle.category;
        }
      } catch (error) {
        console.error('Erro ao analisar o resultado do quiz:', error);
      }
    }
    
    if (!style && window.location.pathname === '/editor') {
      if (userPrimaryStyle && styleCategories.includes(userPrimaryStyle)) {
        navigate(`/editor/${userPrimaryStyle}`);
      } else {
        navigate('/editor/Natural');
      }
    } else if (style && !styleCategories.includes(style)) {
      toast({
        title: "Estilo inválido",
        description: `O estilo "${style}" não existe. Redirecionando para ${userPrimaryStyle || 'Natural'}.`,
        variant: "destructive"
      });
      
      navigate(`/editor/${userPrimaryStyle || 'Natural'}`);
    }
  }, [style, navigate, styleCategories]);
  
  if (!style) {
    return null;
  }
  
  const styleCategory = style as "Natural" | "Clássico" | "Contemporâneo" | "Elegante" | "Romântico" | "Sexy" | "Dramático" | "Criativo";
  
  const selectedStyle = {
    category: styleCategory,
    score: 100,
    percentage: 100
  };
  
  const {
    resultPageConfig,
    loading,
    blocks,
    selectedBlockId,
    isPreviewing,
    isGlobalStylesOpen,
    actions
  } = useResultPageEditor(styleCategory);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-[#1A1818]/70">Carregando configurações...</p>
      </div>
    );
  }

  const handleJsonUpdate = (newConfig: any) => {
    if (newConfig) {
      Object.keys(newConfig).forEach(key => {
        actions.updateSection(key, newConfig[key]);
      });
    }
  };

  return (
    <div className="h-screen flex flex-col">
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
    
      <EditorToolbar 
        onSave={actions.handleSave}
        isPreviewMode={isPreviewing}
        onPreviewToggle={actions.togglePreview}
        onReset={actions.handleReset}
        onEditGlobalStyles={actions.toggleGlobalStyles}
        resultPageConfig={resultPageConfig}
        onUpdateConfig={handleJsonUpdate}
        onToggleJsonEditor={() => setIsJsonEditorOpen(true)}
      />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentsSidebar onComponentSelect={actions.handleAddBlock} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={55}>
          <EditorPreview
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={actions.setSelectedBlockId}
            isPreviewing={isPreviewing}
            primaryStyle={selectedStyle}
            onReorderBlocks={actions.handleReorderBlocks}
            styleType={styleCategory}
            onDeleteBlock={actions.handleDeleteBlock}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={25}>
          <PropertiesPanel
            selectedBlockId={selectedBlockId}
            blocks={blocks}
            onClose={() => actions.setSelectedBlockId(null)}
            onUpdate={actions.handleUpdateBlock}
            onDelete={actions.handleDeleteBlock}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      
      {isGlobalStylesOpen && (
        <GlobalStylesEditor
          globalStyles={resultPageConfig.globalStyles || {}}
          onSave={(styles) => {
            actions.updateSection('globalStyles', styles);
            actions.toggleGlobalStyles();
          }}
          onCancel={actions.toggleGlobalStyles}
        />
      )}
      
      <JsonEditorPanel
        isOpen={isJsonEditorOpen}
        onClose={() => setIsJsonEditorOpen(false)}
        config={resultPageConfig}
        onUpdate={handleJsonUpdate}
      />
    </div>
  );
};

export default EditorPage;
