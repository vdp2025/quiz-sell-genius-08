import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { EditorTab } from '@/types/editor';
import { useToast } from '@/components/ui/use-toast';
import { StyleResult } from '@/types/quiz';
import { QuizPreviewTemplate } from './QuizPreviewTemplate';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QuizStage, QuizComponentData, QuizComponentType } from '@/types/quizBuilder';
import { ExportButton } from './ExportButton';

interface UnifiedEditorProps {
  primaryStyle?: StyleResult;
}

// Templates de demonstração para importação
const DEMO_TEMPLATES = {
  quiz: {
    title: 'Quiz de Estilo Pessoal',
    stages: [
      {
        id: 'welcome',
        title: 'Bem-vindo ao Quiz',
        order: 0,
        type: 'cover' as const,
      },
      {
        id: 'q1',
        title: 'Escolha de Imagem',
        order: 1,
        type: 'question' as const,
      },
      {
        id: 'q2',
        title: 'Preferências',
        order: 2,
        type: 'question' as const,
      },
      {
        id: 'result',
        title: 'Resultado',
        order: 3,
        type: 'result' as const,
      }
    ] as QuizStage[],
    components: [
      {
        id: 'welcome-header',
        type: 'header' as QuizComponentType,
        order: 0,
        stageId: 'welcome',
        data: {
          title: 'Descubra seu Estilo Pessoal',
          subtitle: 'Responda algumas perguntas rápidas para descobrir seu estilo predominante'
        }
      },
      {
        id: 'q1-image',
        type: 'image' as QuizComponentType,
        order: 0,
        stageId: 'q1',
        data: {
          question: 'Qual dessas imagens mais combina com seu estilo?',
          displayType: 'image',
          multiSelect: 1
        }
      },
      {
        id: 'q2-text',
        type: 'singleChoice' as QuizComponentType,
        order: 0,
        stageId: 'q2',
        data: {
          question: 'Como você prefere se vestir no dia a dia?',
          options: ['Confortável e casual', 'Elegante e sofisticado', 'Moderno e arrojado'],
          multiSelect: 1
        }
      }
    ] as QuizComponentData[]
  },
  result: {
    title: 'Página de Resultado',
    blocks: [
      {
        id: 'style-result',
        type: 'style-result',
        order: 0,
        content: {
          title: 'Seu Estilo Predominante é',
          subtitle: 'Aqui está a análise do seu estilo pessoal'
        }
      },
      {
        id: 'secondary-styles',
        type: 'secondary-styles',
        order: 1,
        content: {
          title: 'Seus Estilos Secundários',
          description: 'Você também tem influência desses estilos'
        }
      },
      {
        id: 'text-block',
        type: 'text',
        order: 2,
        content: {
          text: '<p>Com base nas suas respostas, elaboramos um guia personalizado para ajudar você a valorizar suas características predominantes!</p>',
          alignment: 'center'
        }
      }
    ]
  },
  sales: {
    title: 'Página de Vendas',
    blocks: [
      {
        id: 'hero',
        type: 'hero-section',
        order: 0,
        content: {
          title: 'Guia Completo do Seu Estilo Pessoal',
          subtitle: 'Transforme seu visual com as recomendações perfeitas para você',
          heroImage: '/previews/ebook-cover.png'
        }
      },
      {
        id: 'benefits',
        type: 'benefits',
        order: 1,
        content: {
          title: 'O que você vai receber',
          items: [
            'Análise completa do seu tipo de corpo',
            'Guia de cores que valorizam seu tom de pele',
            'Recomendações de peças essenciais',
            'Dicas de combinações para diferentes ocasiões'
          ],
          useIcons: true
        }
      },
      {
        id: 'pricing',
        type: 'pricing',
        order: 2,
        content: {
          regularPrice: 'R$ 197',
          salePrice: 'R$ 97',
          buttonText: 'Quero meu guia personalizado',
          urgencyText: 'Oferta por tempo limitado'
        }
      }
    ]
  }
};

export const UnifiedEditor: React.FC<UnifiedEditorProps> = ({ primaryStyle }) => {
  const [activeTab, setActiveTab] = useState<EditorTab>('quiz');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const { toast } = useToast();
  const { 
    components, 
    stages,
    activeStageId,
    initializeStages,
    initializeComponents,
    setActiveStage,
    saveCurrentState,
    addComponent,
    updateComponent,
    deleteComponent,
    updateStage
  } = useQuizBuilder();

  const activeStage = stages.find(s => s.id === activeStageId);
  const stageComponents = activeStage 
    ? components.filter(c => c.stageId === activeStageId) 
    : [];
  const selectedComponent = selectedComponentId 
    ? components.find(c => c.id === selectedComponentId)
    : null;

  const handleTabChange = (value: string) => {
    setActiveTab(value as EditorTab);
  };

  const handleSave = () => {
    if (activeTab === 'quiz') {
      saveCurrentState();
    }
    
    toast({
      title: "Alterações salvas",
      description: `As alterações no editor de ${getTabName(activeTab)} foram salvas com sucesso.`,
    });
  };

  const handlePreviewToggle = () => {
    setIsPreviewing(!isPreviewing);
  };

  const handleImportTemplate = (templateType: EditorTab) => {
    switch (templateType) {
      case 'quiz':
        initializeStages(DEMO_TEMPLATES.quiz.stages);
        initializeComponents(DEMO_TEMPLATES.quiz.components);
        if (DEMO_TEMPLATES.quiz.stages.length > 0) {
          setActiveStage(DEMO_TEMPLATES.quiz.stages[0].id);
        }
        break;
      case 'result':
        // Aqui implementaríamos a importação do template de resultado
        toast({
          title: "Template importado",
          description: "Página de resultados importada para edição.",
        });
        break;
      case 'sales':
        // Aqui implementaríamos a importação do template de vendas
        toast({
          title: "Template importado",
          description: "Página de vendas importada para edição.",
        });
        break;
    }
    
    setActiveTab(templateType);
    setIsImportModalOpen(false);
    
    toast({
      title: "Template importado",
      description: `Template de ${getTabName(templateType)} importado com sucesso.`,
    });
  };

  const getTabName = (tab: EditorTab): string => {
    switch (tab) {
      case 'quiz': return 'Quiz';
      case 'result': return 'Resultado';
      case 'sales': return 'Vendas';
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#FAF9F7]">
      <div className="bg-white border-b border-[#B89B7A]/20 px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-[#432818]">Editor Unificado</h1>
        <div className="flex gap-2">
          <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
            <DialogTrigger asChild>
              <button className="px-3 py-1 bg-gray-200 text-[#432818] rounded-md">
                Importar
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Importar Modelos para Teste</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col space-y-4">
                  <Button 
                    onClick={() => handleImportTemplate('quiz')}
                    className="bg-[#D2B586] hover:bg-[#BB9C6D]"
                  >
                    Importar Quiz de Estilo Pessoal
                  </Button>
                  <Button 
                    onClick={() => handleImportTemplate('result')}
                    className="bg-[#9b87f5] hover:bg-[#7E69AB]"
                  >
                    Importar Página de Resultado
                  </Button>
                  <Button 
                    onClick={() => handleImportTemplate('sales')}
                    className="bg-[#6A8F53] hover:bg-[#576E48]"
                  >
                    Importar Página de Vendas
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportModalOpen(false)}>
                  Cancelar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <button 
            onClick={handlePreviewToggle}
            className={`px-3 py-1 rounded-md ${isPreviewing 
              ? 'bg-[#D2B586] text-white' 
              : 'bg-gray-200 text-[#432818]'}`}
          >
            {isPreviewing ? 'Editar' : 'Visualizar'}
          </button>
          <button 
            onClick={handleSave}
            className="px-3 py-1 bg-[#9b87f5] text-white rounded-md"
          >
            Salvar
          </button>
          <ExportButton />
        </div>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div className="bg-white border-b border-[#B89B7A]/20 px-6 py-1">
          <TabsList>
            <TabsTrigger value="quiz" className="text-[#432818]">
              Editor de Quiz
            </TabsTrigger>
            <TabsTrigger value="result" className="text-[#432818]">
              Página de Resultado
            </TabsTrigger>
            <TabsTrigger value="sales" className="text-[#432818]">
              Página de Vendas
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="quiz" className="h-full m-0">
            {isPreviewing ? (
              activeStage && (
                <div className="p-4 flex justify-center items-start overflow-auto h-full">
                  <QuizPreviewTemplate stage={activeStage} components={stageComponents} />
                </div>
              )
            ) : (
              <ResizablePanelGroup direction="horizontal" className="h-full">
                {/* Painel esquerdo - Componentes */}
                <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                  <div className="h-full border-r border-[#B89B7A]/20 bg-white overflow-y-auto">
                    <div className="p-4 border-b">
                      <h3 className="font-medium text-[#432818]">Componentes</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500">Lista de componentes disponíveis</p>
                      <div className="mt-4 space-y-2">
                        {['header', 'text', 'image', 'singleChoice', 'multipleChoice'].map((type) => (
                          <div 
                            key={type}
                            className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              if (activeStageId) {
                                const newComponentId = addComponent(type as QuizComponentType, activeStageId);
                                toast({
                                  title: "Componente adicionado",
                                  description: `Novo componente do tipo ${type} adicionado à etapa.`
                                });
                              } else {
                                toast({
                                  title: "Selecione uma etapa",
                                  description: "Por favor, selecione uma etapa antes de adicionar componentes.",
                                  variant: "destructive"
                                });
                              }
                            }}
                          >
                            {type}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Painel central - Editor de quiz */}
                <ResizablePanel defaultSize={55}>
                  <div className="h-full bg-gray-100 overflow-auto p-4 flex flex-col">
                    <div className="mb-4 bg-white rounded-lg shadow-sm p-3">
                      <h3 className="text-sm font-medium mb-2">Etapas do Quiz</h3>
                      <div className="flex flex-wrap gap-2">
                        {stages.map((stage) => (
                          <div 
                            key={stage.id}
                            onClick={() => setActiveStage(stage.id)}
                            className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                              activeStageId === stage.id 
                                ? 'bg-[#D2B586] text-white' 
                                : 'bg-gray-200 text-[#432818] hover:bg-gray-300'
                            }`}
                          >
                            {stage.title || `Etapa ${stage.order + 1}`}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {activeStage ? (
                      <div className="bg-white rounded-lg shadow-md p-4 w-full flex-1">
                        <h2 className="text-xl font-semibold mb-4">
                          {activeStage.title || `Etapa ${activeStage.order + 1}`}
                        </h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex justify-center items-center min-h-[300px]">
                          {stageComponents.length > 0 ? (
                            <div className="w-full">
                              {stageComponents.map((component) => (
                                <div 
                                  key={component.id} 
                                  className={`mb-4 p-3 border ${selectedComponentId === component.id ? 'border-[#D2B586] bg-[#FDF8F3]' : 'border-gray-200'} rounded group relative cursor-pointer`}
                                  onClick={() => setSelectedComponentId(component.id)}
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="font-medium">Tipo: {component.type}</p>
                                      {component.data.title && <p className="text-lg">{component.data.title}</p>}
                                      {component.data.question && <p>{component.data.question}</p>}
                                    </div>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteComponent(component.id);
                                        if (selectedComponentId === component.id) {
                                          setSelectedComponentId(null);
                                        }
                                        toast({
                                          title: "Componente removido",
                                          description: "O componente foi removido com sucesso."
                                        });
                                      }}
                                      className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
                                    >
                                      Remover
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500">Nenhum componente adicionado a esta etapa</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Selecione uma etapa para editar</p>
                      </div>
                    )}
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Painel direito - Propriedades */}
                <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
                  <div className="h-full border-l border-[#B89B7A]/20 bg-white overflow-y-auto">
                    <div className="p-4 border-b">
                      <h3 className="font-medium text-[#432818]">Propriedades</h3>
                    </div>
                    <div className="p-4">
                      {activeStageId ? (
                        <>
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Propriedades da Etapa</h4>
                            <div className="space-y-2">
                              <div>
                                <label className="text-xs text-gray-500">Título</label>
                                <input 
                                  type="text" 
                                  className="w-full border border-gray-300 rounded-md px-2 py-1"
                                  value={activeStage?.title || ''}
                                  onChange={(e) => activeStage && updateStage(activeStage.id, { title: e.target.value })}
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-500">Tipo</label>
                                <input 
                                  type="text" 
                                  className="w-full border border-gray-300 rounded-md px-2 py-1 bg-gray-50"
                                  value={activeStage?.type || ''}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          
                          {selectedComponent ? (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Propriedades do Componente</h4>
                              <div className="space-y-3">
                                {selectedComponent.type === 'header' && (
                                  <>
                                    <div>
                                      <label className="text-xs text-gray-500">Título</label>
                                      <input 
                                        type="text" 
                                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                                        value={selectedComponent.data.title || ''}
                                        onChange={(e) => updateComponent(selectedComponent.id, { 
                                          data: { ...selectedComponent.data, title: e.target.value } 
                                        })}
                                      />
                                    </div>
                                    <div>
                                      <label className="text-xs text-gray-500">Subtítulo</label>
                                      <input 
                                        type="text" 
                                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                                        value={selectedComponent.data.subtitle || ''}
                                        onChange={(e) => updateComponent(selectedComponent.id, { 
                                          data: { ...selectedComponent.data, subtitle: e.target.value } 
                                        })}
                                      />
                                    </div>
                                  </>
                                )}
                                
                                {selectedComponent.type === 'text' && (
                                  <div>
                                    <label className="text-xs text-gray-500">Texto</label>
                                    <textarea 
                                      className="w-full border border-gray-300 rounded-md px-2 py-1 min-h-[100px]"
                                      value={selectedComponent.data.text || ''}
                                      onChange={(e) => updateComponent(selectedComponent.id, { 
                                        data: { ...selectedComponent.data, text: e.target.value } 
                                      })}
                                    />
                                  </div>
                                )}
                                
                                {selectedComponent.type === 'image' && (
                                  <>
                                    <div>
                                      <label className="text-xs text-gray-500">URL da Imagem</label>
                                      <input 
                                        type="text" 
                                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                                        value={selectedComponent.data.imageUrl || ''}
                                        onChange={(e) => updateComponent(selectedComponent.id, { 
                                          data: { ...selectedComponent.data, imageUrl: e.target.value } 
                                        })}
                                      />
                                    </div>
                                    <div>
                                      <label className="text-xs text-gray-500">Texto Alternativo</label>
                                      <input 
                                        type="text" 
                                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                                        value={selectedComponent.data.alt || ''}
                                        onChange={(e) => updateComponent(selectedComponent.id, { 
                                          data: { ...selectedComponent.data, alt: e.target.value } 
                                        })}
                                      />
                                    </div>
                                  </>
                                )}
                                
                                {(selectedComponent.type === 'singleChoice' || selectedComponent.type === 'multipleChoice') && (
                                  <>
                                    <div>
                                      <label className="text-xs text-gray-500">Pergunta</label>
                                      <input 
                                        type="text" 
                                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                                        value={selectedComponent.data.question || ''}
                                        onChange={(e) => updateComponent(selectedComponent.id, { 
                                          data: { ...selectedComponent.data, question: e.target.value } 
                                        })}
                                      />
                                    </div>
                                    <div>
                                      <label className="text-xs text-gray-500">Opções</label>
                                      {selectedComponent.data.options?.map((option, index) => (
                                        <div key={index} className="flex mt-1">
                                          <input 
                                            type="text" 
                                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                                            value={option}
                                            onChange={(e) => {
                                              const newOptions = [...(selectedComponent.data.options || [])];
                                              newOptions[index] = e.target.value;
                                              updateComponent(selectedComponent.id, { 
                                                data: { ...selectedComponent.data, options: newOptions } 
                                              });
                                            }}
                                          />
                                          <button 
                                            onClick={() => {
                                              const newOptions = [...(selectedComponent.data.options || [])];
                                              newOptions.splice(index, 1);
                                              updateComponent(selectedComponent.id, { 
                                                data: { ...selectedComponent.data, options: newOptions } 
                                              });
                                            }}
                                            className="ml-1 text-red-500 hover:bg-red-50 p-1 rounded"
                                          >
                                            X
                                          </button>
                                        </div>
                                      ))}
                                      <button 
                                        onClick={() => {
                                          const newOptions = [...(selectedComponent.data.options || []), ''];
                                          updateComponent(selectedComponent.id, { 
                                            data: { ...selectedComponent.data, options: newOptions } 
                                          });
                                        }}
                                        className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                                      >
                                        + Adicionar opção
                                      </button>
                                    </div>
                                  </>
                                )}
                                
                                <div className="pt-2 border-t">
                                  <button 
                                    onClick={() => setSelectedComponentId(null)}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                  >
                                    Fechar propriedades
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">Selecione um componente para editar suas propriedades</p>
                          )}
                        </>
                      ) : (
                        <p>Selecione uma etapa para começar</p>
                      )}
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            )}
          </TabsContent>
          
          <TabsContent value="result" className="h-full m-0">
            <div className="h-full bg-gray-100 overflow-auto p-4">
              <div className="bg-white rounded-lg shadow-md max-w-3xl mx-auto p-6">
                <h2 className="text-xl font-semibold mb-4">Editor de Resultados</h2>
                
                <div className="space-y-6">
                  {DEMO_TEMPLATES.result.blocks.map((block) => (
                    <div key={block.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{block.type}</h3>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Ordem: {block.order}</span>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded">
                        {block.content.title && <p className="font-medium">{block.content.title}</p>}
                        {block.content.subtitle && <p className="text-sm text-gray-600">{block.content.subtitle}</p>}
                        {block.content.text && <div className="mt-2 text-sm" dangerouslySetInnerHTML={{ __html: block.content.text }} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="h-full m-0">
            <div className="h-full bg-gray-100 overflow-auto p-4">
              <div className="bg-white rounded-lg shadow-md max-w-3xl mx-auto p-6">
                <h2 className="text-xl font-semibold mb-4">Editor de Página de Vendas</h2>
                
                <div className="space-y-6">
                  {DEMO_TEMPLATES.sales.blocks.map((block) => (
                    <div key={block.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{block.type}</h3>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Ordem: {block.order}</span>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded">
                        {block.content.title && <p className="font-medium">{block.content.title}</p>}
                        {block.content.subtitle && <p className="text-sm text-gray-600">{block.content.subtitle}</p>}
                        
                        {block.type === 'benefits' && block.content.items && (
                          <ul className="mt-2 space-y-1 list-disc list-inside">
                            {block.content.items.map((item, i) => (
                              <li key={i} className="text-sm">{item}</li>
                            ))}
                          </ul>
                        )}
                        
                        {block.type === 'pricing' && (
                          <div className="mt-2 text-center">
                            <p className="text-sm line-through">{block.content.regularPrice}</p>
                            <p className="text-lg font-bold text-green-600">{block.content.salePrice}</p>
                            <button className="mt-2 bg-[#D2B586] text-white px-4 py-2 rounded-md w-full">
                              {block.content.buttonText}
                            </button>
                            <p className="text-xs text-red-500 mt-1">{block.content.urgencyText}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default UnifiedEditor; 