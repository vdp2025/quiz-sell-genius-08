
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Block } from '@/types/editor';
import { Plus, Trash } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface FeatureComparisonBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const FeatureComparisonBlockEditor: React.FC<FeatureComparisonBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  const features = content.features || [
    { name: "Análise de Estilo", included: true, premium: true },
    { name: "Consultoria Básica", included: true, premium: true },
    { name: "Guia de Cores", included: false, premium: true },
    { name: "Orientação de Tecidos", included: false, premium: true }
  ];

  const handleAddFeature = () => {
    const newFeatures = [...features, { name: "Novo Recurso", included: false, premium: true }];
    onUpdate({ features: newFeatures });
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    onUpdate({ features: newFeatures });
  };

  const handleFeatureChange = (index: number, field: keyof typeof features[0], value: any) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    onUpdate({ features: newFeatures });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={content.title || "Comparação de Recursos"}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Título da comparação"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="basicPlanName">Nome do Plano Básico</Label>
          <Input
            id="basicPlanName"
            value={content.basicPlanName || "Plano Básico"}
            onChange={(e) => onUpdate({ basicPlanName: e.target.value })}
            placeholder="Nome do plano básico"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="premiumPlanName">Nome do Plano Premium</Label>
          <Input
            id="premiumPlanName"
            value={content.premiumPlanName || "Plano Premium"}
            onChange={(e) => onUpdate({ premiumPlanName: e.target.value })}
            placeholder="Nome do plano premium"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <Label>Recursos</Label>
        <div className="space-y-3 mt-2">
          {features.map((feature, index) => (
            <div key={index} className="border p-3 rounded-md">
              <div className="flex items-center justify-between">
                <Input
                  value={feature.name}
                  onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
                  placeholder="Nome do recurso"
                  className="mb-2"
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveFeature(index)}
                  className="h-8 w-8 text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={feature.included} 
                    onCheckedChange={(checked) => handleFeatureChange(index, 'included', checked)} 
                  />
                  <Label className="cursor-pointer">Incluído no Básico</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={feature.premium} 
                    onCheckedChange={(checked) => handleFeatureChange(index, 'premium', checked)} 
                  />
                  <Label className="cursor-pointer">Incluído no Premium</Label>
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleAddFeature}
          >
            <Plus className="h-4 w-4 mr-2" /> Adicionar Recurso
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparisonBlockEditor;
