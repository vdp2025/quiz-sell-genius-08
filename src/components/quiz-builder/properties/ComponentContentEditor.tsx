
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { XCircle, PlusCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ImageUploadField } from './fields/ImageUploadField';
import { OptionListField } from './fields/OptionListField';

interface ComponentContentEditorProps {
  component: QuizComponentData;
  onUpdate: (updates: Partial<QuizComponentData>) => void;
  onDelete: () => void;
}

const ComponentContentEditor: React.FC<ComponentContentEditorProps> = ({
  component,
  onUpdate,
  onDelete
}) => {
  const updateData = (updates: Record<string, any>) => {
    onUpdate({
      data: { ...component.data, ...updates }
    });
  };
  
  const renderHeaderFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white">Título</Label>
        <Input 
          value={component.data.title || ''} 
          onChange={(e) => updateData({ title: e.target.value })}
          placeholder="Título principal"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-white">Subtítulo</Label>
        <Input 
          value={component.data.subtitle || ''} 
          onChange={(e) => updateData({ subtitle: e.target.value })}
          placeholder="Subtítulo opcional"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-white">Texto do Botão</Label>
        <Input 
          value={component.data.buttonText || ''} 
          onChange={(e) => updateData({ buttonText: e.target.value })}
          placeholder="Iniciar Quiz"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
    </div>
  );
  
  const renderTextFields = () => (
    <div className="space-y-4">
      {component.type === 'headline' && (
        <div className="space-y-2">
          <Label className="text-white">Título</Label>
          <Input 
            value={component.data.title || ''} 
            onChange={(e) => updateData({ title: e.target.value })}
            placeholder="Título da seção"
            className="bg-[#262939] border-[#333333] text-white"
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label className="text-white">Texto</Label>
        <Textarea 
          value={component.data.text || ''} 
          onChange={(e) => updateData({ text: e.target.value })}
          placeholder="Digite seu texto aqui"
          className="min-h-[150px] bg-[#262939] border-[#333333] text-white"
        />
      </div>
    </div>
  );
  
  const renderImageFields = () => (
    <div className="space-y-4">
      <ImageUploadField
        label="Imagem"
        imageUrl={component.data.imageUrl}
        onImageChange={(url) => updateData({ imageUrl: url })}
      />
      
      <div className="space-y-2">
        <Label className="text-white">Texto Alternativo</Label>
        <Input 
          value={component.data.alt || ''} 
          onChange={(e) => updateData({ alt: e.target.value })}
          placeholder="Descrição da imagem"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-white">Legenda</Label>
        <Input 
          value={component.data.caption || ''} 
          onChange={(e) => updateData({ caption: e.target.value })}
          placeholder="Legenda opcional"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
    </div>
  );
  
  const renderChoiceFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white">Pergunta</Label>
        <Input 
          value={component.data.question || ''} 
          onChange={(e) => updateData({ question: e.target.value })}
          placeholder="Digite a pergunta"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
      
      <OptionListField
        options={component.data.options || []}
        optionImages={component.data.optionImages || []}
        displayType={component.data.displayType || 'text'}
        onUpdate={(updates) => updateData(updates)}
      />
      
      {component.type === 'multipleChoice' && (
        <div className="space-y-2">
          <Label className="text-white">Número de Seleções</Label>
          <Input 
            type="number"
            min="1"
            max="10"
            value={component.data.multiSelect || 3} 
            onChange={(e) => updateData({ multiSelect: parseInt(e.target.value) || 3 })}
            className="bg-[#262939] border-[#333333] text-white"
          />
        </div>
      )}
    </div>
  );
  
  const renderQuizResultFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white">Título Principal</Label>
        <Input 
          value={component.data.title || ''} 
          onChange={(e) => updateData({ title: e.target.value })}
          placeholder="Seu Resultado de Estilo Pessoal"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-white">Subtítulo</Label>
        <Textarea 
          value={component.data.subtitle || ''} 
          onChange={(e) => updateData({ subtitle: e.target.value })}
          placeholder="Descrição do resultado"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-white">Título do Estilo Principal</Label>
        <Input 
          value={component.data.primaryStyleTitle || ''} 
          onChange={(e) => updateData({ primaryStyleTitle: e.target.value })}
          placeholder="Seu Estilo Principal"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-white">Título dos Estilos Secundários</Label>
        <Input 
          value={component.data.secondaryStylesTitle || ''} 
          onChange={(e) => updateData({ secondaryStylesTitle: e.target.value })}
          placeholder="Seus Estilos Secundários"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
    </div>
  );
  
  const renderBenefitsListFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white">Título Principal</Label>
        <Input 
          value={component.data.title || ''} 
          onChange={(e) => updateData({ title: e.target.value })}
          placeholder="Benefícios do Seu Estilo"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-white">Subtítulo</Label>
        <Input 
          value={component.data.subtitle || ''} 
          onChange={(e) => updateData({ subtitle: e.target.value })}
          placeholder="Descrição dos benefícios"
          className="bg-[#262939] border-[#333333] text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-white">Benefícios</Label>
        <Card className="bg-[#1d212e] border-[#333333] p-2">
          {(component.data.benefits || []).map((benefit, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input 
                value={benefit} 
                onChange={(e) => {
                  const newBenefits = [...(component.data.benefits || [])];
                  newBenefits[index] = e.target.value;
                  updateData({ benefits: newBenefits });
                }}
                placeholder={`Benefício ${index + 1}`}
                className="bg-[#262939] border-[#333333] text-white"
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  const newBenefits = [...(component.data.benefits || [])];
                  newBenefits.splice(index, 1);
                  updateData({ benefits: newBenefits });
                }}
                className="text-gray-400 hover:text-white hover:bg-[#333333]"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => {
              const newBenefits = [...(component.data.benefits || []), ''];
              updateData({ benefits: newBenefits });
            }}
            variant="ghost"
            size="sm"
            className="w-full mt-2 text-gray-400 hover:text-white hover:bg-[#333333]"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Benefício
          </Button>
        </Card>
      </div>
    </div>
  );
  
  // Render fields based on component type
  const renderFields = () => {
    switch (component.type) {
      case 'header':
        return renderHeaderFields();
      case 'headline':
      case 'text':
        return renderTextFields();
      case 'image':
        return renderImageFields();
      case 'multipleChoice':
      case 'singleChoice':
        return renderChoiceFields();
      case 'quizResult':
        return renderQuizResultFields();
      case 'benefitsList':
        return renderBenefitsListFields();
      default:
        return (
          <div className="text-gray-400">
            Editor não disponível para este tipo de componente
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      {renderFields()}
      
      <div className="pt-4 border-t border-[#333333]">
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={onDelete}
        >
          <XCircle className="w-4 h-4 mr-2" />
          Excluir Componente
        </Button>
      </div>
    </div>
  );
};

export default ComponentContentEditor;
