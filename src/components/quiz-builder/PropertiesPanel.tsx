
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Trash } from 'lucide-react';
import { QuizComponentData } from '@/types/quizBuilder';

interface PropertiesPanelProps {
  component: QuizComponentData | null;
  onClose: () => void;
  onUpdate: (data: Partial<QuizComponentData>) => void;
  onDelete: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  component,
  onClose,
  onUpdate,
  onDelete
}) => {
  if (!component) {
    return (
      <div className="h-full border-l bg-white flex flex-col justify-center items-center text-[#8F7A6A] text-center p-4">
        <p className="mb-2">Selecione um componente para editar suas propriedades</p>
        <p className="text-sm">Clique em um componente no painel de visualização ou adicione um novo a partir do menu lateral.</p>
      </div>
    );
  }

  const getComponentTitle = () => {
    switch (component.type) {
      case 'header': return 'Cabeçalho';
      case 'section': return 'Seção';
      case 'columns': return 'Colunas';
      case 'headline': return 'Título';
      case 'text': return 'Texto';
      case 'image': return 'Imagem';
      case 'multipleChoice': return 'Múltipla Escolha';
      case 'singleChoice': return 'Escolha Única';
      case 'scale': return 'Escala';
      case 'openEnded': return 'Resposta Aberta';
      case 'date': return 'Data';
      case 'benefitsList': return 'Lista de Benefícios';
      case 'faq': return 'Perguntas Frequentes';
      case 'quizResult': return 'Resultado do Quiz';
      default: return 'Componente';
    }
  };

  return (
    <div className="h-full border-l bg-white flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-medium text-[#432818]">{getComponentTitle()}</h2>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onDelete}
            className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="style">Estilo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              {component.type === 'headline' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input 
                      id="title" 
                      value={component.data.title || ''} 
                      onChange={(e) => onUpdate({ data: { ...component.data, title: e.target.value } })}
                      placeholder="Insira o título"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtítulo</Label>
                    <Input 
                      id="subtitle" 
                      value={component.data.subtitle || ''} 
                      onChange={(e) => onUpdate({ data: { ...component.data, subtitle: e.target.value } })}
                      placeholder="Insira o subtítulo"
                    />
                  </div>
                </>
              )}
              
              {component.type === 'text' && (
                <div className="space-y-2">
                  <Label htmlFor="text">Texto</Label>
                  <Textarea 
                    id="text" 
                    value={component.data.text || ''} 
                    onChange={(e) => onUpdate({ data: { ...component.data, text: e.target.value } })}
                    placeholder="Insira o texto"
                    className="min-h-[200px]"
                  />
                </div>
              )}
              
              {component.type === 'image' && (
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL da Imagem</Label>
                  <Input 
                    id="imageUrl" 
                    value={component.data.imageUrl || ''} 
                    onChange={(e) => onUpdate({ data: { ...component.data, imageUrl: e.target.value } })}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              )}
              
              {/* Adicione mais condicionais para os outros tipos de componentes */}
            </TabsContent>
            
            <TabsContent value="style" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="padding">Espaçamento</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input 
                    id="paddingY" 
                    value={component.style?.paddingY || ''} 
                    onChange={(e) => onUpdate({ style: { ...component.style, paddingY: e.target.value } })}
                    placeholder="Vertical (px)"
                  />
                  <Input 
                    id="paddingX" 
                    value={component.style?.paddingX || ''} 
                    onChange={(e) => onUpdate({ style: { ...component.style, paddingX: e.target.value } })}
                    placeholder="Horizontal (px)"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="backgroundColor" 
                    type="color"
                    value={component.style?.backgroundColor || '#ffffff'} 
                    onChange={(e) => onUpdate({ style: { ...component.style, backgroundColor: e.target.value } })}
                    className="w-12 h-8 p-1"
                  />
                  <Input 
                    value={component.style?.backgroundColor || ''} 
                    onChange={(e) => onUpdate({ style: { ...component.style, backgroundColor: e.target.value } })}
                    placeholder="#ffffff ou rgba(255,255,255,1)"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="textColor">Cor do Texto</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="textColor" 
                    type="color"
                    value={component.style?.textColor || '#000000'} 
                    onChange={(e) => onUpdate({ style: { ...component.style, textColor: e.target.value } })}
                    className="w-12 h-8 p-1"
                  />
                  <Input 
                    value={component.style?.textColor || ''} 
                    onChange={(e) => onUpdate({ style: { ...component.style, textColor: e.target.value } })}
                    placeholder="#000000 ou rgba(0,0,0,1)"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="borderRadius">Borda Arredondada</Label>
                <Input 
                  id="borderRadius" 
                  type="number"
                  value={component.style?.borderRadius || 0} 
                  onChange={(e) => onUpdate({ style: { ...component.style, borderRadius: Number(e.target.value) } })}
                  placeholder="0"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};
