
import React, { useState, useEffect } from 'react';
import { QuizTemplate } from '@/types/quizTemplate';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import EditableComponent from '@/components/result-editor/EditableComponent';
import QuizResult from '@/components/QuizResult';
import { StyleResult } from '@/types/quiz';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { createDefaultConfig } from '@/utils/resultPageDefaults';

interface ResultPageEditorWithPreviewProps {
  template: QuizTemplate;
  onResultSettingsUpdate: (settings: any) => void;
  isPreviewing: boolean;
}

export const ResultPageEditorWithPreview: React.FC<ResultPageEditorWithPreviewProps> = ({
  template,
  onResultSettingsUpdate,
  isPreviewing
}) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  
  // Criar dados simulados para visualização da página de resultado
  const mockPrimaryStyle: StyleResult = {
    category: 'Elegante',
    score: 12,
    percentage: 40
  };
  
  const mockSecondaryStyles: StyleResult[] = [
    {
      category: 'Romântico',
      score: 9,
      percentage: 30
    },
    {
      category: 'Clássico',
      score: 6,
      percentage: 20
    },
    {
      category: 'Contemporâneo',
      score: 3,
      percentage: 10
    }
  ];

  // Convert template.resultPageSettings to ResultPageConfig if needed
  const [resultPageConfig, setResultPageConfig] = useState<ResultPageConfig>(
    template.resultPageSettings && 
    'header' in template.resultPageSettings ? 
    template.resultPageSettings as ResultPageConfig : 
    createDefaultConfig(mockPrimaryStyle.category)
  );

  // Initialize resultPageConfig when component mounts or template changes
  useEffect(() => {
    if (template.resultPageSettings) {
      // Check if the resultPageSettings already has the required structure
      if ('header' in template.resultPageSettings && 
          'mainContent' in template.resultPageSettings && 
          'offer' in template.resultPageSettings) {
        setResultPageConfig(template.resultPageSettings as ResultPageConfig);
      } else {
        // Convert from old format to new format
        const defaultConfig = createDefaultConfig(mockPrimaryStyle.category);
        
        // Try to map old properties to new structure
        if (template.resultPageSettings.headerConfig) {
          defaultConfig.header.content = {
            ...defaultConfig.header.content,
            ...template.resultPageSettings.headerConfig
          };
        }
        
        if (template.resultPageSettings.mainContentConfig) {
          defaultConfig.mainContent.content = {
            ...defaultConfig.mainContent.content,
            ...template.resultPageSettings.mainContentConfig
          };
        }
        
        if (template.resultPageSettings.offerConfig) {
          defaultConfig.offer.hero.content = {
            ...defaultConfig.offer.hero.content,
            ...template.resultPageSettings.offerConfig
          };
        }
        
        // Preserve blocks if they exist
        if (template.resultPageSettings.blocks) {
          defaultConfig.blocks = template.resultPageSettings.blocks;
        }
        
        setResultPageConfig(defaultConfig);
        
        // Update the parent with the new structure
        onResultSettingsUpdate(defaultConfig);
      }
    } else {
      // Create a new default config if none exists
      const defaultConfig = createDefaultConfig(mockPrimaryStyle.category);
      setResultPageConfig(defaultConfig);
      onResultSettingsUpdate(defaultConfig);
    }
  }, [template.resultPageSettings, mockPrimaryStyle.category, onResultSettingsUpdate]);
  
  const handleConfigUpdate = (sectionKey: string, data: any) => {
    // Update the configuration specific to the section key
    const updatedSettings = { ...resultPageConfig };
    
    if (sectionKey === 'header.content') {
      if (updatedSettings.header) {
        updatedSettings.header.content = { ...updatedSettings.header.content, ...data };
      }
    } else if (sectionKey === 'mainContent.content') {
      if (updatedSettings.mainContent) {
        updatedSettings.mainContent.content = { ...updatedSettings.mainContent.content, ...data };
      }
    } else if (sectionKey === 'offer.hero.content') {
      if (updatedSettings.offer?.hero) {
        updatedSettings.offer.hero.content = { ...updatedSettings.offer.hero.content, ...data };
      }
    } else {
      // For other sections, update the specific property
      const parts = sectionKey.split('.');
      let current: any = updatedSettings;
      
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      
      current[parts[parts.length - 1]] = data;
    }
    
    setResultPageConfig(updatedSettings);
    onResultSettingsUpdate(updatedSettings);
  };
  
  // Se estamos no modo de visualização completa, mostrar apenas o resultado
  if (isPreviewing) {
    return (
      <ScrollArea className="h-full">
        <QuizResult 
          primaryStyle={mockPrimaryStyle} 
          secondaryStyles={mockSecondaryStyles} 
          config={resultPageConfig}
        />
      </ScrollArea>
    );
  }
  
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={60} minSize={40}>
        <ScrollArea className="h-full">
          <div className="p-6">
            <EditableComponent
              components={{
                primaryStyle: mockPrimaryStyle,
                secondaryStyles: mockSecondaryStyles,
                config: resultPageConfig
              }}
              onUpdate={handleConfigUpdate}
            />
          </div>
        </ScrollArea>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={40} minSize={30}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-medium">Pré-visualização</h3>
            <p className="text-sm text-muted-foreground">
              Veja como a página de resultados ficará para o usuário.
            </p>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <QuizResult 
                  primaryStyle={mockPrimaryStyle}
                  secondaryStyles={mockSecondaryStyles}
                  config={resultPageConfig}
                  previewMode={true}
                />
              </div>
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
