
import React from 'react';
import { 
  Trash, 
  Layout, 
  Image, 
  Type, 
  PanelLeft, 
  CheckCircle,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { StyleOptions } from '@/types/styleTypes';

interface PropertiesPanelProps {
  component: QuizComponentData | null;
  stage: QuizStage | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<QuizComponentData>) => void;
  onUpdateStage: (id: string, updates: Partial<QuizStage>) => void;
  onDelete: (id: string) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  component,
  stage,
  onClose,
  onUpdate,
  onUpdateStage,
  onDelete
}) => {
  const [activeTab, setActiveTab] = React.useState('content');

  if (!component && !stage) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b bg-[#FAF9F7]">
          <h3 className="font-medium text-[#432818]">Propriedades</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="text-gray-500">
            <PanelLeft className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Selecione um componente ou etapa para editar suas propriedades</p>
          </div>
        </div>
      </div>
    );
  }

  const handleComponentUpdate = (key: string, value: any) => {
    if (component) {
      onUpdate(component.id, { data: { ...component.data, [key]: value } });
    }
  };

  const handleComponentStyleUpdate = (key: string, value: any) => {
    if (component) {
      onUpdate(component.id, { style: { ...component.style, [key]: value } });
    }
  };

  const handleStageUpdate = (key: string, value: any) => {
    if (stage) {
      onUpdateStage(stage.id, { [key]: value });
    }
  };

  const renderStageProperties = () => {
    if (!stage) return null;

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="stage-title">Título da Etapa</Label>
          <Input
            id="stage-title"
            value={stage.title}
            onChange={(e) => handleStageUpdate('title', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="stage-type">Tipo da Etapa</Label>
          <Select
            value={stage.type}
            onValueChange={(value) => handleStageUpdate('type', value)}
          >
            <SelectTrigger id="stage-type" className="mt-1">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cover">Capa</SelectItem>
              <SelectItem value="question">Pergunta</SelectItem>
              <SelectItem value="result">Resultado</SelectItem>
              <SelectItem value="strategic">Estratégica</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(stage.id)}
            className="w-full"
          >
            <Trash className="h-4 w-4 mr-2" />
            Excluir Etapa
          </Button>
        </div>
      </div>
    );
  };

  const renderHeaderProperties = () => {
    if (!component || component.type !== 'header') return null;

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="header-title">Título</Label>
          <Input
            id="header-title"
            value={component.data.title || ''}
            onChange={(e) => handleComponentUpdate('title', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="header-subtitle">Subtítulo</Label>
          <Textarea
            id="header-subtitle"
            value={component.data.subtitle || ''}
            onChange={(e) => handleComponentUpdate('subtitle', e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>
      </div>
    );
  };

  const renderTextProperties = () => {
    if (!component || component.type !== 'text') return null;

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="text-content">Conteúdo de Texto</Label>
          <Textarea
            id="text-content"
            value={component.data.text || ''}
            onChange={(e) => handleComponentUpdate('text', e.target.value)}
            className="mt-1"
            rows={6}
          />
        </div>
      </div>
    );
  };

  const renderImageProperties = () => {
    if (!component || component.type !== 'image') return null;

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="image-url">URL da Imagem</Label>
          <Input
            id="image-url"
            value={component.data.imageUrl || ''}
            onChange={(e) => handleComponentUpdate('imageUrl', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="image-alt">Texto Alternativo</Label>
          <Input
            id="image-alt"
            value={component.data.alt || ''}
            onChange={(e) => handleComponentUpdate('alt', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="image-caption">Legenda</Label>
          <Input
            id="image-caption"
            value={component.data.caption || ''}
            onChange={(e) => handleComponentUpdate('caption', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    );
  };

  const renderMultipleChoiceProperties = () => {
    if (!component || component.type !== 'multipleChoice') return null;

    const options = component.data.options || [];
    const optionImages = component.data.optionImages || Array(options.length).fill('');
    const optionStyleCategories = component.data.optionStyleCategories || Array(options.length).fill('');

    const updateOption = (index: number, value: string) => {
      const newOptions = [...options];
      newOptions[index] = value;
      handleComponentUpdate('options', newOptions);
    };

    const updateOptionImage = (index: number, value: string) => {
      const newOptionImages = [...optionImages];
      newOptionImages[index] = value;
      handleComponentUpdate('optionImages', newOptionImages);
    };

    const updateOptionStyleCategory = (index: number, value: string) => {
      const newOptionStyleCategories = [...optionStyleCategories];
      newOptionStyleCategories[index] = value;
      handleComponentUpdate('optionStyleCategories', newOptionStyleCategories);
    };

    const addOption = () => {
      handleComponentUpdate('options', [...options, 'Nova opção']);
      handleComponentUpdate('optionImages', [...optionImages, '']);
      handleComponentUpdate('optionStyleCategories', [...optionStyleCategories, 'Natural']);
    };

    const removeOption = (index: number) => {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      handleComponentUpdate('options', newOptions);

      const newOptionImages = [...optionImages];
      newOptionImages.splice(index, 1);
      handleComponentUpdate('optionImages', newOptionImages);

      const newOptionStyleCategories = [...optionStyleCategories];
      newOptionStyleCategories.splice(index, 1);
      handleComponentUpdate('optionStyleCategories', newOptionStyleCategories);
    };

    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="question-text">Pergunta</Label>
          <Textarea
            id="question-text"
            value={component.data.question || ''}
            onChange={(e) => handleComponentUpdate('question', e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="display-type">Tipo de Exibição</Label>
          <Select
            value={component.data.displayType || 'text'}
            onValueChange={(value) => handleComponentUpdate('displayType', value)}
          >
            <SelectTrigger id="display-type">
              <SelectValue placeholder="Tipo de exibição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Apenas Texto</SelectItem>
              <SelectItem value="image">Apenas Imagem</SelectItem>
              <SelectItem value="both">Texto e Imagem</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="multi-select">Número de Seleções</Label>
          <div className="flex items-center gap-2">
            <Select
              value={String(component.data.multiSelect || 1)}
              onValueChange={(value) => handleComponentUpdate('multiSelect', parseInt(value))}
            >
              <SelectTrigger id="multi-select">
                <SelectValue placeholder="Seleções" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Seleção</SelectItem>
                <SelectItem value="2">2 Seleções</SelectItem>
                <SelectItem value="3">3 Seleções</SelectItem>
                <SelectItem value="4">4 Seleções</SelectItem>
                <SelectItem value="5">5 Seleções</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {component.data.displayType !== 'text' && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="image-size">Tamanho da Imagem</Label>
            <Select
              value={component.data.imageSize || 'medium'}
              onValueChange={(value) => handleComponentUpdate('imageSize', value)}
            >
              <SelectTrigger id="image-size">
                <SelectValue placeholder="Tamanho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequeno</SelectItem>
                <SelectItem value="medium">Médio</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="layout-columns">Layout das Opções</Label>
          <Select
            value={String(component.data.layout?.columns || 1)}
            onValueChange={(value) => handleComponentUpdate('layout', { 
              ...component.data.layout, 
              columns: parseInt(value) as 1 | 2 | 3 | 4 
            })}
          >
            <SelectTrigger id="layout-columns">
              <SelectValue placeholder="Colunas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Coluna</SelectItem>
              <SelectItem value="2">2 Colunas</SelectItem>
              <SelectItem value="3">3 Colunas</SelectItem>
              <SelectItem value="4">4 Colunas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Opções</h4>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addOption}
              className="text-xs"
            >
              Adicionar Opção
            </Button>
          </div>

          <div className="space-y-6">
            {options.map((option, index) => (
              <div key={index} className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`option-${index}`} className="text-sm font-medium">Opção {index + 1}</Label>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeOption(index)}
                    className="h-6 w-6 p-0 text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  id={`option-${index}`}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                />

                {(component.data.displayType === 'image' || component.data.displayType === 'both') && (
                  <div>
                    <Label htmlFor={`option-image-${index}`} className="text-xs">URL da Imagem</Label>
                    <Input
                      id={`option-image-${index}`}
                      value={optionImages[index] || ''}
                      onChange={(e) => updateOptionImage(index, e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor={`option-category-${index}`} className="text-xs">Categoria de Estilo</Label>
                  <Select
                    value={optionStyleCategories[index] || 'Natural'}
                    onValueChange={(value) => updateOptionStyleCategory(index, value)}
                  >
                    <SelectTrigger id={`option-category-${index}`} className="mt-1">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Natural">Natural</SelectItem>
                      <SelectItem value="Clássico">Clássico</SelectItem>
                      <SelectItem value="Contemporâneo">Contemporâneo</SelectItem>
                      <SelectItem value="Elegante">Elegante</SelectItem>
                      <SelectItem value="Romântico">Romântico</SelectItem>
                      <SelectItem value="Sexy">Sexy</SelectItem>
                      <SelectItem value="Dramático">Dramático</SelectItem>
                      <SelectItem value="Criativo">Criativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderStageCoverProperties = () => {
    if (!component || component.type !== 'stageCover') return null;

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="cover-headline">Título Principal</Label>
          <Input
            id="cover-headline"
            value={component.data.headline || ''}
            onChange={(e) => handleComponentUpdate('headline', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="cover-subheadline">Subtítulo</Label>
          <Textarea
            id="cover-subheadline"
            value={component.data.subheadline || ''}
            onChange={(e) => handleComponentUpdate('subheadline', e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="cover-button">Texto do Botão</Label>
          <Input
            id="cover-button"
            value={component.data.buttonText || 'Começar'}
            onChange={(e) => handleComponentUpdate('buttonText', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    );
  };

  const renderStageQuestionProperties = () => {
    if (!component || component.type !== 'stageQuestion') return null;

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="question-stage-title">Título da Etapa</Label>
          <Input
            id="question-stage-title"
            value={component.data.stageTitle || ''}
            onChange={(e) => handleComponentUpdate('stageTitle', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="question-number">Número da Questão</Label>
          <Input
            id="question-number"
            type="number"
            value={component.data.stageNumber || 1}
            onChange={(e) => handleComponentUpdate('stageNumber', parseInt(e.target.value))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="progress-text">Texto de Progresso</Label>
          <Input
            id="progress-text"
            value={component.data.progressText || 'Questão {current} de {total}'}
            onChange={(e) => handleComponentUpdate('progressText', e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Use {'{current}'} para o número atual e {'{total}'} para o total.
          </p>
        </div>
      </div>
    );
  };

  const renderStageResultProperties = () => {
    if (!component || component.type !== 'stageResult') return null;

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="result-headline">Título do Resultado</Label>
          <Input
            id="result-headline"
            value={component.data.headline || ''}
            onChange={(e) => handleComponentUpdate('headline', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="result-subheadline">Subtítulo do Resultado</Label>
          <Textarea
            id="result-subheadline"
            value={component.data.subheadline || ''}
            onChange={(e) => handleComponentUpdate('subheadline', e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>
      </div>
    );
  };

  const renderQuizResultProperties = () => {
    if (!component || component.type !== 'quizResult') return null;

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="quiz-result-title">Título do Resultado</Label>
          <Input
            id="quiz-result-title"
            value={component.data.title || ''}
            onChange={(e) => handleComponentUpdate('title', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="quiz-result-description">Descrição</Label>
          <Textarea
            id="quiz-result-description"
            value={component.data.description || ''}
            onChange={(e) => handleComponentUpdate('description', e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="show-secondary-styles"
            checked={component.data.showSecondaryStyles || false}
            onCheckedChange={(checked) => handleComponentUpdate('showSecondaryStyles', checked)}
          />
          <Label htmlFor="show-secondary-styles">Mostrar estilos secundários</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="show-offer"
            checked={component.data.showOffer || false}
            onCheckedChange={(checked) => handleComponentUpdate('showOffer', checked)}
          />
          <Label htmlFor="show-offer">Mostrar oferta</Label>
        </div>
      </div>
    );
  };

  const renderStylesTab = () => {
    if (!component) return null;

    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="background-color">Cor de Fundo</Label>
          <div className="flex gap-2 mt-1">
            <div 
              className="w-10 h-10 rounded border"
              style={{ backgroundColor: component.style?.backgroundColor || 'transparent' }}
            />
            <Input
              id="background-color"
              type="text"
              value={component.style?.backgroundColor || ''}
              onChange={(e) => handleComponentStyleUpdate('backgroundColor', e.target.value)}
              className="flex-1"
              placeholder="#FFFFFF or transparent"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="text-color">Cor do Texto</Label>
          <div className="flex gap-2 mt-1">
            <div 
              className="w-10 h-10 rounded border"
              style={{ backgroundColor: component.style?.textColor || 'inherit' }}
            />
            <Input
              id="text-color"
              type="text"
              value={component.style?.textColor || ''}
              onChange={(e) => handleComponentStyleUpdate('textColor', e.target.value)}
              className="flex-1"
              placeholder="#000000 or inherit"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="border-radius">Borda Arredondada</Label>
          <div className="flex items-center gap-3 mt-1">
            <Slider
              id="border-radius"
              defaultValue={[parseInt(component.style?.borderRadius || '0')]}
              max={20}
              step={1}
              onValueChange={(value) => handleComponentStyleUpdate('borderRadius', String(value[0]))}
              className="flex-1"
            />
            <span className="w-12 text-right">{component.style?.borderRadius || '0'}px</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="padding-y">Espaçamento Vertical</Label>
            <div className="flex items-center gap-3 mt-1">
              <Slider
                id="padding-y"
                defaultValue={[parseInt(component.style?.paddingY || '16')]}
                max={64}
                step={4}
                onValueChange={(value) => handleComponentStyleUpdate('paddingY', String(value[0]))}
                className="flex-1"
              />
              <span className="w-12 text-right">{component.style?.paddingY || '16'}px</span>
            </div>
          </div>

          <div>
            <Label htmlFor="padding-x">Espaçamento Horizontal</Label>
            <div className="flex items-center gap-3 mt-1">
              <Slider
                id="padding-x"
                defaultValue={[parseInt(component.style?.paddingX || '16')]}
                max={64}
                step={4}
                onValueChange={(value) => handleComponentStyleUpdate('paddingX', String(value[0]))}
                className="flex-1"
              />
              <span className="w-12 text-right">{component.style?.paddingX || '16'}px</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b bg-[#FAF9F7] flex items-center justify-between">
        <h3 className="font-medium text-[#432818]">
          {component 
            ? `Componente: ${component.type}`
            : `Etapa: ${stage?.title || 'Sem título'}`
          }
        </h3>
        {component && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            &times;
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {component ? (
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">
                <Type className="h-4 w-4 mr-2" />
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="style">
                <Layout className="h-4 w-4 mr-2" />
                Estilo
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="mt-4">
              {component.type === 'header' && renderHeaderProperties()}
              {component.type === 'text' && renderTextProperties()}
              {component.type === 'image' && renderImageProperties()}
              {component.type === 'multipleChoice' && renderMultipleChoiceProperties()}
              {component.type === 'stageCover' && renderStageCoverProperties()}
              {component.type === 'stageQuestion' && renderStageQuestionProperties()}
              {component.type === 'stageResult' && renderStageResultProperties()}
              {component.type === 'quizResult' && renderQuizResultProperties()}
            </TabsContent>
            <TabsContent value="style" className="mt-4">
              {renderStylesTab()}
            </TabsContent>
          </Tabs>
        ) : (
          renderStageProperties()
        )}
      </div>

      {component && (
        <div className="p-4 border-t bg-[#FAF9F7]">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(component.id)}
            className="w-full"
          >
            <Trash className="h-4 w-4 mr-2" />
            Excluir Componente
          </Button>
        </div>
      )}
    </div>
  );
};

export { PropertiesPanel };
