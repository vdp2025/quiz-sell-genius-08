
import React, { useState } from 'react';
import { QuizTemplate } from '@/types/quizTemplate';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import EditableComponent from '@/components/result-editor/EditableComponent';
import QuizResult from '@/components/QuizResult';
import { StyleResult } from '@/types/quiz';
import { ResultPageConfig } from '@/types/resultPageConfig';

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
  
  const handleConfigUpdate = (sectionKey: string, data: any) => {
    if (!template.resultPageSettings) {
      // Create a proper ResultPageConfig structure
      template.resultPageSettings = {
        styleType: mockPrimaryStyle.category,
        header: {
          visible: true,
          content: {},
          style: {}
        },
        mainContent: {
          visible: true,
          content: {},
          style: {}
        },
        secondaryStyles: {
          visible: true,
          content: {},
          style: {}
        },
        offer: {
          hero: {
            visible: true,
            content: {},
            style: {}
          },
          benefits: {
            visible: true,
            content: {},
            style: {}
          },
          products: {
            visible: true,
            content: {},
            style: {}
          },
          pricing: {
            visible: true,
            content: {},
            style: {}
          },
          testimonials: {
            visible: true,
            content: {},
            style: {}
          },
          guarantee: {
            visible: true,
            content: {},
            style: {}
          }
        },
        blocks: []
      };
    }
    
    // Atualizar a configuração específica com base na chave da seção
    const updatedSettings = { ...template.resultPageSettings } as ResultPageConfig;
    
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
      // Para outras seções, atualizar a propriedade específica
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
    
    onResultSettingsUpdate(updatedSettings);
  };
  
  // Se estamos no modo de visualização completa, mostrar apenas o resultado
  if (isPreviewing) {
    return (
      <ScrollArea className="h-full">
        <QuizResult 
          primaryStyle={mockPrimaryStyle} 
          secondaryStyles={mockSecondaryStyles} 
          config={template.resultPageSettings as ResultPageConfig}
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
                config: template.resultPageSettings || {
                  styleType: mockPrimaryStyle.category,
                  header: { visible: true, content: {}, style: {} },
                  mainContent: { visible: true, content: {}, style: {} },
                  secondaryStyles: { visible: true, content: {}, style: {} },
                  offer: {
                    hero: { visible: true, content: {}, style: {} },
                    benefits: { visible: true, content: {}, style: {} },
                    products: { visible: true, content: {}, style: {} },
                    pricing: { visible: true, content: {}, style: {} },
                    testimonials: { visible: true, content: {}, style: {} },
                    guarantee: { visible: true, content: {}, style: {} }
                  },
                  blocks: []
                }
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
                  config={template.resultPageSettings as ResultPageConfig}
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
