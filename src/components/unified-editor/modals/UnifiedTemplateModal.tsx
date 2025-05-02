
import React from 'react';
import { Button } from '@/components/ui/button';
import { EditorTab } from '../UnifiedVisualEditor';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface UnifiedTemplateModalProps {
  activeTab: EditorTab;
  onClose: () => void;
  onApplyTemplate: (template: any) => void;
}

// Sample templates for each editor type
const getTemplatesForTab = (tab: EditorTab) => {
  switch (tab) {
    case 'quiz':
      return [
        {
          id: 'quiz-template-1',
          name: 'Quiz de Estilo Básico',
          description: 'Um quiz simples para descobrir o estilo pessoal',
          thumbnail: '/assets/templates/quiz-basic.jpg',
          template: {
            stages: [
              { id: 'stage-1', title: 'Introdução', type: 'cover', order: 0 },
              { id: 'stage-2', title: 'Pergunta 1', type: 'question', order: 1 },
              { id: 'stage-3', title: 'Resultado', type: 'result', order: 2 }
            ],
            components: []
          }
        },
        {
          id: 'quiz-template-2',
          name: 'Quiz de Estilo Completo',
          description: 'Quiz detalhado com perguntas sobre estilo pessoal',
          thumbnail: '/assets/templates/quiz-full.jpg',
          template: {
            stages: [
              { id: 'stage-1', title: 'Introdução', type: 'cover', order: 0 },
              { id: 'stage-2', title: 'Cores', type: 'question', order: 1 },
              { id: 'stage-3', title: 'Formas', type: 'question', order: 2 },
              { id: 'stage-4', title: 'Texturas', type: 'question', order: 3 },
              { id: 'stage-5', title: 'Resultado', type: 'result', order: 4 }
            ],
            components: []
          }
        }
      ];
    case 'result':
      return [
        {
          id: 'result-template-1',
          name: 'Página de Resultado Simples',
          description: 'Layout simples para exibir o resultado do estilo',
          thumbnail: '/assets/templates/result-simple.jpg',
          template: {
            globalStyles: {
              backgroundColor: "#F9F5F1",
              textColor: "#432818",
              fontFamily: "Playfair Display, serif"
            },
            blocks: [
              {
                id: "headline-1",
                type: "headline",
                content: { 
                  title: "Seu Estilo",
                  subtitle: "Conheça sua paleta de cores e estilo pessoal",
                  style: { textAlign: "center", paddingTop: "2rem" }
                },
                order: 0
              },
              {
                id: "style-result-1",
                type: "style-result",
                content: {},
                order: 1
              }
            ]
          }
        },
        {
          id: 'result-template-2',
          name: 'Página de Resultado Completa',
          description: 'Layout completo com estilo principal e secundários',
          thumbnail: '/assets/templates/result-full.jpg',
          template: {
            globalStyles: {
              backgroundColor: "#F9F5F1",
              textColor: "#432818",
              fontFamily: "Playfair Display, serif"
            },
            blocks: [
              {
                id: "headline-1",
                type: "headline",
                content: { 
                  title: "Seu Estilo Principal",
                  subtitle: "Aqui está o estilo que melhor representa você",
                  style: { textAlign: "center", paddingTop: "2rem" }
                },
                order: 0
              },
              {
                id: "style-result-1",
                type: "style-result",
                content: {},
                order: 1
              },
              {
                id: "headline-2",
                type: "headline",
                content: { 
                  title: "Seus Estilos Secundários",
                  subtitle: "Estes estilos complementam seu estilo principal",
                  style: { textAlign: "center", paddingTop: "2rem" }
                },
                order: 2
              },
              {
                id: "secondary-styles-1",
                type: "secondary-styles",
                content: {},
                order: 3
              }
            ]
          }
        }
      ];
    case 'sales':
      return [
        {
          id: 'sales-template-1',
          name: 'Página de Vendas Básica',
          description: 'Layout simples para oferta de consultoria',
          thumbnail: '/assets/templates/sales-basic.jpg',
          template: {
            blocks: [
              {
                id: "headline-1",
                type: "headline",
                content: { 
                  title: "Transforme seu Estilo Pessoal",
                  subtitle: "Consultoria especializada para realçar sua beleza natural",
                  style: { textAlign: "center", paddingTop: "2rem" }
                },
                order: 0
              },
              {
                id: "benefits-1",
                type: "benefits",
                content: {
                  title: "O que você vai receber",
                  benefits: [
                    "Análise completa do seu estilo pessoal",
                    "Paleta de cores personalizada",
                    "Recomendações de peças-chave para seu guarda-roupa",
                    "Dicas para valorizar seus pontos fortes"
                  ]
                },
                order: 1
              }
            ]
          }
        },
        {
          id: 'sales-template-2',
          name: 'Página de Vendas Completa',
          description: 'Layout completo com benefícios, depoimentos e CTA',
          thumbnail: '/assets/templates/sales-full.jpg',
          template: {
            blocks: []
          }
        }
      ];
    default:
      return [];
  }
};

export const UnifiedTemplateModal: React.FC<UnifiedTemplateModalProps> = ({
  activeTab,
  onClose,
  onApplyTemplate
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  
  const templates = getTemplatesForTab(activeTab);

  const handleApplyTemplate = () => {
    if (!selectedTemplate) return;
    
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return;
    
    setIsApplying(true);
    
    try {
      onApplyTemplate(template.template);
      setTimeout(() => {
        setIsApplying(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Erro ao aplicar template:', err);
      setIsApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-medium mb-4">
          Templates para {activeTab === 'quiz' ? 'Quiz' : activeTab === 'result' ? 'Página de Resultado' : 'Página de Vendas'}
        </h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-md p-4 cursor-pointer transition-all ${
                selectedTemplate === template.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="h-32 bg-gray-200 mb-3 rounded flex items-center justify-center">
                {template.thumbnail ? (
                  <img 
                    src={template.thumbnail} 
                    alt={template.name} 
                    className="h-full w-full object-cover rounded" 
                  />
                ) : (
                  <span className="text-gray-500">Sem imagem</span>
                )}
              </div>
              <h3 className="font-medium text-gray-800">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end space-x-3 border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleApplyTemplate} 
            disabled={!selectedTemplate || isApplying}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isApplying ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Aplicando...
              </>
            ) : (
              'Aplicar Template'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
