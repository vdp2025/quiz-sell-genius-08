
import React, { useState } from 'react';
import { StyleResult } from '@/types/quiz';
import { useResultPageConfig } from '@/hooks/useResultPageConfig';
import { toast } from '@/components/ui/use-toast';
import EditorToolbar from './EditorToolbar';
import { EditableSectionsList } from './sections/EditableSectionsList';
import { EditorPanels } from './panels/EditorPanels';

interface ResultPageEditorProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const ResultPageEditor: React.FC<ResultPageEditorProps> = ({
  primaryStyle,
  secondaryStyles
}) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editingStyles, setEditingStyles] = useState(false);
  const [globalStylesOpen, setGlobalStylesOpen] = useState(false);

  const { 
    resultPageConfig, 
    updateSection,
    resetConfig,
    saveConfig,
    loading 
  } = useResultPageConfig(primaryStyle.category);

  const handleSave = async () => {
    try {
      await saveConfig();
      toast({
        title: 'Configurações salvas',
        description: 'As alterações foram salvas com sucesso',
      });
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar as alterações',
        variant: 'destructive'
      });
    }
  };

  const handleReset = () => {
    resetConfig(primaryStyle.category);
    toast({
      title: 'Configurações redefinidas',
      description: 'As configurações foram redefinidas para os valores padrão',
    });
  };

  const toggleSection = (sectionPath: string) => {
    const pathParts = sectionPath.split('.');
    const sectionName = pathParts[pathParts.length - 1];
    
    let currentSection = { ...resultPageConfig };
    pathParts.forEach((part, index) => {
      if (index < pathParts.length - 1) {
        currentSection = currentSection[part];
      }
    });
    
    const section = currentSection[sectionName];
    updateSection(sectionPath, { ...section, visible: !section.visible });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <EditorToolbar 
        onPreviewToggle={() => setPreviewMode(!previewMode)}
        isPreviewMode={previewMode}
        onSave={handleSave}
        onReset={handleReset}
        onEditGlobalStyles={() => setGlobalStylesOpen(true)}
        resultPageConfig={resultPageConfig}
        onUpdateConfig={(newConfig) => {
          if (newConfig) {
            Object.keys(newConfig).forEach(key => {
              updateSection(key, newConfig[key]);
            });
          }
        }}
      />
      
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <EditableSectionsList
          resultPageConfig={resultPageConfig}
          previewMode={previewMode}
          toggleSection={toggleSection}
          setEditingSection={setEditingSection}
          setEditingStyles={setEditingStyles}
          primaryStyle={primaryStyle}
          secondaryStyles={secondaryStyles}
        />
      </div>
      
      <EditorPanels
        editingSection={editingSection}
        editingStyles={editingStyles}
        resultPageConfig={resultPageConfig}
        globalStylesOpen={globalStylesOpen}
        updateSection={updateSection}
        setEditingSection={setEditingSection}
        setEditingStyles={setEditingStyles}
        setGlobalStylesOpen={setGlobalStylesOpen}
      />
    </div>
  );
};

export default ResultPageEditor;

