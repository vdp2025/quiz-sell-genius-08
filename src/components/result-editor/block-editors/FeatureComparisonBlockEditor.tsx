
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Block } from '@/types/editor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash } from 'lucide-react';

interface Feature {
  name: string;
  included: boolean;
  premium: boolean;
}

interface FeatureComparisonBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const FeatureComparisonBlockEditor: React.FC<FeatureComparisonBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  
  // Ensure we have a features array
  const features: Feature[] = content.features || [
    { name: "Análise de Estilo", included: true, premium: true },
    { name: "Consultoria Básica", included: true, premium: true },
    { name: "Guia de Cores", included: false, premium: true },
    { name: "Orientação de Tecidos", included: false, premium: true }
  ];
  
  const handleAddFeature = () => {
    const newFeature = { name: "Novo Recurso", included: false, premium: true };
    onUpdate({ features: [...features, newFeature] });
  };
  
  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    onUpdate({ features: updatedFeatures });
  };
  
  const handleFeatureUpdate = (index: number, field: keyof Feature, value: any) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    onUpdate({ features: updatedFeatures });
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
      
      <div>
        <Label className="mb-2 block">Recursos</Label>
        {features.map((feature, index) => (
          <Card key={index} className="p-3 mb-2">
            <div className="flex justify-between gap-2">
              <Input
                value={feature.name}
                onChange={(e) => handleFeatureUpdate(index, 'name', e.target.value)}
                placeholder="Nome do recurso"
                className="flex-grow"
              />
              <Button 
                variant="destructive" 
                size="icon"
                onClick={() => handleRemoveFeature(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id={`included-${index}`} 
                  checked={feature.included}
                  onCheckedChange={(checked) => handleFeatureUpdate(index, 'included', Boolean(checked))}
                />
                <Label htmlFor={`included-${index}`} className="text-sm">Plano Básico</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id={`premium-${index}`} 
                  checked={feature.premium}
                  onCheckedChange={(checked) => handleFeatureUpdate(index, 'premium', Boolean(checked))}
                />
                <Label htmlFor={`premium-${index}`} className="text-sm">Plano Premium</Label>
              </div>
            </div>
          </Card>
        ))}
        
        <Button variant="outline" className="mt-2 w-full" onClick={handleAddFeature}>
          <Plus className="h-4 w-4 mr-2" /> Adicionar Recurso
        </Button>
      </div>
    </div>
  );
};

export default FeatureComparisonBlockEditor;
