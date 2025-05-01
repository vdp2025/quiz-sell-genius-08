
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuizComponentData } from '@/types/quizBuilder';
import { X, Settings, Type, Layout, PaintBucket } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageUploadField from './ImageUploadField';
import QuestionPropertiesEditor from './QuestionPropertiesEditor';
import StylePropertiesEditor from './StylePropertiesEditor';
import { Separator } from '@/components/ui/separator';

interface PropertyPanelProps {
  selectedComponentId: string | null;
  components: QuizComponentData[];
  onUpdate: (id: string, data: Partial<QuizComponentData['data']>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedComponentId,
  components,
  onUpdate,
  onDelete,
  onClose,
}) => {
  if (!selectedComponentId) {
    return (
      <div className="h-full bg-white flex flex-col justify-center items-center p-6 text-center">
        <Settings className="h-12 w-12 text-[#B89B7A]/20 mb-3" />
        <h3 className="text-lg font-medium text-[#432818] mb-2">Painel de Propriedades</h3>
        <p className="text-[#8F7A6A]">
          Selecione um componente para editar suas propriedades
        </p>
      </div>
    );
  }

  const component = components.find(c => c.id === selectedComponentId);

  if (!component) {
    return (
      <div className="h-full bg-white flex flex-col justify-center items-center p-6 text-center">
        <p className="text-[#8F7A6A]">
          Componente não encontrado
        </p>
      </div>
    );
  }

  const getComponentTypeLabel = () => {
    switch(component.type) {
      case 'stageCover':
        return 'Capa';
      case 'stageQuestion':
        return 'Pergunta';
      case 'stageResult':
        return 'Resultado';
      case 'text':
        return 'Texto';
      case 'image':
        return 'Imagem';
      default:
        return component.type;
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-medium text-[#432818] flex items-center">
          <Type className="h-4 w-4 mr-2" />
          {getComponentTypeLabel()}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4 text-[#8F7A6A]" />
        </Button>
      </div>

      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="content" className="flex-1">
              <Type className="h-4 w-4 mr-1.5" /> Conteúdo
            </TabsTrigger>
            <TabsTrigger value="style" className="flex-1">
              <PaintBucket className="h-4 w-4 mr-1.5" /> Estilo
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex-1">
              <Layout className="h-4 w-4 mr-1.5" /> Layout
            </TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1">
          <TabsContent value="content" className="p-4">
            {component.type === 'stageCover' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={component.data.title || ''}
                    onChange={(e) => onUpdate(component.id, { title: e.target.value })}
                    placeholder="Título do quiz"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Subtítulo</Label>
                  <Textarea
                    value={component.data.subtitle || ''}
                    onChange={(e) => onUpdate(component.id, { subtitle: e.target.value })}
                    placeholder="Descrição do quiz"
                    className="resize-none"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Texto do botão</Label>
                  <Input
                    value={component.data.buttonText || ''}
                    onChange={(e) => onUpdate(component.id, { buttonText: e.target.value })}
                    placeholder="Iniciar quiz"
                  />
                </div>
                
                <Separator />
                
                <ImageUploadField
                  label="Imagem da capa"
                  value={component.data.imageUrl || ''}
                  onChange={(url) => onUpdate(component.id, { imageUrl: url })}
                  previewSize="medium"
                />
              </div>
            )}
            
            {component.type === 'stageQuestion' && (
              <QuestionPropertiesEditor
                data={component.data}
                onUpdate={(data) => onUpdate(component.id, data)}
              />
            )}
            
            {component.type === 'stageResult' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Título do resultado</Label>
                  <Input
                    value={component.data.title || ''}
                    onChange={(e) => onUpdate(component.id, { title: e.target.value })}
                    placeholder="Seu Resultado"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Título do estilo principal</Label>
                  <Input
                    value={component.data.primaryStyleTitle || ''}
                    onChange={(e) => onUpdate(component.id, { primaryStyleTitle: e.target.value })}
                    placeholder="Seu Estilo Predominante"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Título dos estilos secundários</Label>
                  <Input
                    value={component.data.secondaryStylesTitle || ''}
                    onChange={(e) => onUpdate(component.id, { secondaryStylesTitle: e.target.value })}
                    placeholder="Estilos Complementares"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Texto do botão</Label>
                  <Input
                    value={component.data.callToActionText || ''}
                    onChange={(e) => onUpdate(component.id, { callToActionText: e.target.value })}
                    placeholder="Ver Recomendações"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="showPercentages">Mostrar porcentagens</Label>
                  <input
                    id="showPercentages"
                    type="checkbox"
                    checked={component.data.showPercentages || false}
                    onChange={(e) => onUpdate(component.id, { showPercentages: e.target.checked })}
                    className="toggle"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="showDescriptions">Mostrar descrições</Label>
                  <input
                    id="showDescriptions"
                    type="checkbox"
                    checked={component.data.showDescriptions || false}
                    onChange={(e) => onUpdate(component.id, { showDescriptions: e.target.checked })}
                    className="toggle"
                  />
                </div>
              </div>
            )}
            
            {component.type === 'text' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={component.data.title || ''}
                    onChange={(e) => onUpdate(component.id, { title: e.target.value })}
                    placeholder="Título (opcional)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Texto</Label>
                  <Textarea
                    value={component.data.text || ''}
                    onChange={(e) => onUpdate(component.id, { text: e.target.value })}
                    placeholder="Conteúdo do texto"
                    className="min-h-[150px]"
                    rows={6}
                  />
                </div>
              </div>
            )}
            
            {component.type === 'image' && (
              <div className="space-y-6">
                <ImageUploadField
                  label="Imagem"
                  value={component.data.imageUrl || ''}
                  onChange={(url) => onUpdate(component.id, { imageUrl: url })}
                  previewSize="large"
                />
                
                <div className="space-y-2">
                  <Label>Texto alternativo (alt)</Label>
                  <Input
                    value={component.data.alt || ''}
                    onChange={(e) => onUpdate(component.id, { alt: e.target.value })}
                    placeholder="Descrição da imagem para acessibilidade"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Legenda/Título</Label>
                  <Input
                    value={component.data.title || ''}
                    onChange={(e) => onUpdate(component.id, { title: e.target.value })}
                    placeholder="Legenda (opcional)"
                  />
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="style" className="p-4">
            <StylePropertiesEditor 
              style={component.data}
              onUpdate={(updates) => onUpdate(component.id, updates)}
            />
          </TabsContent>
          
          <TabsContent value="layout" className="p-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Em breve</Label>
                <p className="text-sm text-gray-500">
                  As opções avançadas de layout estarão disponíveis em breve
                </p>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
      
      <div className="p-4 border-t border-[#B89B7A]/20">
        <Button 
          variant="destructive" 
          onClick={() => onDelete(selectedComponentId)} 
          className="w-full"
        >
          Excluir Componente
        </Button>
      </div>
    </div>
  );
};
