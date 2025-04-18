
import React, { useState, useEffect } from 'react';
import { StyleResult } from '@/types/quiz';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import SectionEditor from './SectionEditor';
import StyleSelector from './StyleSelector';
import PreviewPanel from './PreviewPanel';
import { useResultPageConfig } from '@/hooks/useResultPageConfig';

const ResultPageEditor: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<StyleResult>({
    category: 'Natural',
    score: 0,
    percentage: 100
  });

  const { 
    resultPageConfig, 
    updateSection, 
    resetConfig, 
    saveConfig,
    loading
  } = useResultPageConfig(selectedStyle.category);

  useEffect(() => {
    // When style changes, load the appropriate configuration
    resetConfig(selectedStyle.category);
  }, [selectedStyle.category, resetConfig]);

  const handleSaveChanges = async () => {
    const success = await saveConfig();
    if (success) {
      toast({
        title: 'Alterações salvas',
        description: 'As configurações da página de resultados foram salvas com sucesso.'
      });
    } else {
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar as configurações.',
        variant: 'destructive'
      });
    }
  };

  const handleStyleChange = (style: StyleResult) => {
    setSelectedStyle(style);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-[#1A1818]/70">Carregando configurações...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#FAF9F7]">
      <div className="flex-shrink-0 border-b bg-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-playfair text-[#432818]">Editor da Página de Resultados</h1>
        <Button className="bg-[#B89B7A] hover:bg-[#A38A69]" onClick={handleSaveChanges}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Left sidebar - Style selection and configuration */}
          <div className="w-1/3 border-r overflow-auto p-4 bg-white">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Estilo Selecionado</CardTitle>
              </CardHeader>
              <CardContent>
                <StyleSelector selectedStyle={selectedStyle} onStyleChange={handleStyleChange} />
              </CardContent>
            </Card>

            <Tabs defaultValue="header">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="header">Cabeçalho</TabsTrigger>
                <TabsTrigger value="content">Conteúdo</TabsTrigger>
                <TabsTrigger value="offer">Oferta</TabsTrigger>
              </TabsList>

              <TabsContent value="header" className="space-y-4">
                <SectionEditor 
                  section={resultPageConfig.header} 
                  onUpdate={(updatedSection) => updateSection('header', updatedSection)}
                  sectionName="Cabeçalho"
                />
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <SectionEditor 
                  section={resultPageConfig.mainContent} 
                  onUpdate={(updatedSection) => updateSection('mainContent', updatedSection)}
                  sectionName="Conteúdo Principal"
                />
                
                <SectionEditor 
                  section={resultPageConfig.secondaryStyles} 
                  onUpdate={(updatedSection) => updateSection('secondaryStyles', updatedSection)}
                  sectionName="Estilos Secundários"
                />
              </TabsContent>

              <TabsContent value="offer" className="space-y-4">
                <SectionEditor 
                  section={resultPageConfig.offer.hero} 
                  onUpdate={(updatedSection) => updateSection('offer.hero', updatedSection)}
                  sectionName="Cabeçalho da Oferta"
                />
                
                <SectionEditor 
                  section={resultPageConfig.offer.products} 
                  onUpdate={(updatedSection) => updateSection('offer.products', updatedSection)}
                  sectionName="Produtos"
                />
                
                <SectionEditor 
                  section={resultPageConfig.offer.pricing} 
                  onUpdate={(updatedSection) => updateSection('offer.pricing', updatedSection)}
                  sectionName="Preço e CTA"
                />
                
                <SectionEditor 
                  section={resultPageConfig.offer.benefits} 
                  onUpdate={(updatedSection) => updateSection('offer.benefits', updatedSection)}
                  sectionName="Benefícios"
                />
                
                <SectionEditor 
                  section={resultPageConfig.offer.testimonials} 
                  onUpdate={(updatedSection) => updateSection('offer.testimonials', updatedSection)}
                  sectionName="Depoimentos"
                />
                
                <SectionEditor 
                  section={resultPageConfig.offer.guarantee} 
                  onUpdate={(updatedSection) => updateSection('offer.guarantee', updatedSection)}
                  sectionName="Garantia"
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right side - Preview */}
          <div className="flex-1 overflow-auto">
            <PreviewPanel 
              resultPageConfig={resultPageConfig}
              selectedStyle={selectedStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPageEditor;
