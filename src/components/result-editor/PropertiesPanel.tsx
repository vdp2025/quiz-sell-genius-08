
import React from 'react';
import { Block, BlockType } from '@/types/editor';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PropertiesPanelProps {
  selectedBlockId: string | null;
  blocks: Block[];
  onClose: () => void;
  onUpdate: (id: string, content: any) => void;
  onDelete: (id: string) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlockId,
  blocks,
  onClose,
  onUpdate,
  onDelete
}) => {
  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="h-full flex flex-col p-4">
        <Card>
          <CardHeader>
            <CardTitle>Propriedades</CardTitle>
            <CardDescription>
              Selecione um bloco para editar suas propriedades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Clique em um bloco na área de visualização para editar suas propriedades.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderEditorForBlockType = () => {
    switch (selectedBlock.type) {
      case 'headline':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={selectedBlock.content.title || ''}
                onChange={e => onUpdate(selectedBlock.id, { title: e.target.value })}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="subtitle">Subtítulo</Label>
              <Input
                id="subtitle"
                value={selectedBlock.content.subtitle || ''}
                onChange={e => onUpdate(selectedBlock.id, { subtitle: e.target.value })}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="alignment">Alinhamento</Label>
              <select
                id="alignment"
                className="w-full border rounded-md p-2"
                value={selectedBlock.content.alignment || 'left'}
                onChange={e => onUpdate(selectedBlock.id, { alignment: e.target.value })}
              >
                <option value="left">Esquerda</option>
                <option value="center">Centro</option>
                <option value="right">Direita</option>
              </select>
            </div>
          </>
        );
      case 'text':
        return (
          <div className="space-y-2">
            <Label htmlFor="text">Conteúdo de Texto</Label>
            <Textarea
              id="text"
              value={selectedBlock.content.text || ''}
              onChange={e => onUpdate(selectedBlock.id, { text: e.target.value })}
              rows={8}
            />
          </div>
        );
      case 'cta':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={selectedBlock.content.title || ''}
                onChange={e => onUpdate(selectedBlock.id, { title: e.target.value })}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="text">Descrição</Label>
              <Textarea
                id="text"
                value={selectedBlock.content.text || ''}
                onChange={e => onUpdate(selectedBlock.id, { text: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="buttonText">Texto do Botão</Label>
              <Input
                id="buttonText"
                value={selectedBlock.content.buttonText || ''}
                onChange={e => onUpdate(selectedBlock.id, { buttonText: e.target.value })}
              />
            </div>
          </>
        );
      case 'style-result':
      case 'secondary-styles':
        return (
          <p className="text-sm text-muted-foreground">
            Este bloco será preenchido automaticamente com os dados do resultado do quiz.
          </p>
        );
      case 'hero-section':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={selectedBlock.content.title || ''}
                onChange={e => onUpdate(selectedBlock.id, { title: e.target.value })}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="text">Texto</Label>
              <Textarea
                id="text"
                value={selectedBlock.content.text || ''}
                onChange={e => onUpdate(selectedBlock.id, { text: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="heroImage">URL da Imagem</Label>
              <Input
                id="heroImage"
                value={selectedBlock.content.heroImage || ''}
                onChange={e => onUpdate(selectedBlock.id, { heroImage: e.target.value })}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="heroImageAlt">Texto Alternativo da Imagem</Label>
              <Input
                id="heroImageAlt"
                value={selectedBlock.content.heroImageAlt || ''}
                onChange={e => onUpdate(selectedBlock.id, { heroImageAlt: e.target.value })}
              />
            </div>
          </>
        );
      case 'products':
        return (
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={selectedBlock.content.title || ''}
              onChange={e => onUpdate(selectedBlock.id, { title: e.target.value })}
            />
            <p className="text-sm text-muted-foreground mt-4">
              Edição avançada de produtos em desenvolvimento.
            </p>
          </div>
        );
      case 'testimonials':
        return (
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={selectedBlock.content.title || ''}
              onChange={e => onUpdate(selectedBlock.id, { title: e.target.value })}
            />
            <p className="text-sm text-muted-foreground mt-4">
              Edição de depoimentos em desenvolvimento.
            </p>
          </div>
        );
      case 'spacer':
        return (
          <div className="space-y-2">
            <Label htmlFor="height">Altura (px)</Label>
            <Input
              id="height"
              type="number"
              value={selectedBlock.content.height || 40}
              onChange={e => onUpdate(selectedBlock.id, { height: e.target.value })}
            />
          </div>
        );
      case 'video':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={selectedBlock.content.title || ''}
                onChange={e => onUpdate(selectedBlock.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="videoUrl">URL do Vídeo</Label>
              <Input
                id="videoUrl"
                value={selectedBlock.content.videoUrl || ''}
                onChange={e => onUpdate(selectedBlock.id, { videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/embed/..."
              />
            </div>
          </>
        );
      case 'two-column':
      case 'icon':
      case 'faq':
      case 'carousel':
      case 'custom-code':
      case 'animation-block':
        return (
          <p className="text-sm text-muted-foreground">
            Editor avançado para este tipo de bloco em desenvolvimento.
          </p>
        );
      default:
        return (
          <p className="text-sm text-muted-foreground">
            Propriedades para este tipo de bloco não estão disponíveis.
          </p>
        );
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Editar {getBlockTypeName(selectedBlock.type)}
            </CardTitle>
            <CardDescription>
              Configure as propriedades deste bloco
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderEditorForBlockType()}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                onDelete(selectedBlock.id);
              }}
            >
              Excluir
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

function getBlockTypeName(type: BlockType): string {
  const typeNames = {
    'header': 'Cabeçalho',
    'headline': 'Título',
    'text': 'Texto',
    'image': 'Imagem',
    'hero-section': 'Seção Hero',
    'benefits': 'Benefícios',
    'testimonials': 'Depoimentos',
    'pricing': 'Preços',
    'guarantee': 'Garantia',
    'cta': 'Chamada para Ação',
    'bonus-carousel': 'Carrossel de Bônus',
    'products': 'Produtos',
    'style-result': 'Resultado de Estilo',
    'secondary-styles': 'Estilos Secundários',
    'spacer': 'Espaçador',
    'video': 'Vídeo',
    'two-column': 'Duas Colunas',
    'icon': 'Ícone',
    'faq': 'Perguntas Frequentes',
    'carousel': 'Carrossel',
    'custom-code': 'Código Personalizado',
    'animation-block': 'Animação'
  };

  return typeNames[type] || type;
}

export default PropertiesPanel;
