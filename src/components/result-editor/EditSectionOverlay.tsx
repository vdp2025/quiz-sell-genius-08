
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X, Check } from 'lucide-react';

interface EditSectionOverlayProps {
  section: string;
  data: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const EditSectionOverlay: React.FC<EditSectionOverlayProps> = ({
  section,
  data = {},
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState(data || {});
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSave = () => {
    onSave(formData);
  };
  
  // Renderiza campos específicos baseados na seção sendo editada
  const renderFields = () => {
    switch (section) {
      case 'header':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Título do Cabeçalho</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Olá, seu Estilo Predominante é:"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtítulo (opcional)</Label>
              <Input
                id="subtitle"
                value={formData.subtitle || ''}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                placeholder="Subtítulo"
              />
            </div>
          </>
        );
        
      case 'primaryStyle':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição do Estilo</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descrição do estilo predominante."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customImage">URL de Imagem Personalizada (opcional)</Label>
              <Input
                id="customImage"
                value={formData.customImage || ''}
                onChange={(e) => handleInputChange('customImage', e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
          </>
        );
        
      case 'offer':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Título da Oferta</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="VOCÊ DESCOBRIU SEU ESTILO"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtítulo da Oferta</Label>
              <Input
                id="subtitle"
                value={formData.subtitle || ''}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                placeholder="Agora é hora de aplicar com clareza — e se vestir de você"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                value={formData.price || ''}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="39,00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regularPrice">Preço Regular</Label>
              <Input
                id="regularPrice"
                value={formData.regularPrice || ''}
                onChange={(e) => handleInputChange('regularPrice', e.target.value)}
                placeholder="175,00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaText">Texto do Botão</Label>
              <Input
                id="ctaText"
                value={formData.ctaText || ''}
                onChange={(e) => handleInputChange('ctaText', e.target.value)}
                placeholder="Quero meu Guia + Bônus"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaUrl">URL do Botão</Label>
              <Input
                id="ctaUrl"
                value={formData.ctaUrl || ''}
                onChange={(e) => handleInputChange('ctaUrl', e.target.value)}
                placeholder="https://pay.hotmart.com/..."
              />
            </div>
          </>
        );
        
      default:
        return (
          <p className="text-center text-gray-500">
            Sem opções de edição disponíveis para esta seção.
          </p>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-playfair text-[#432818]">
            Editar {getSectionTitle(section)}
          </h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-6">
          {renderFields()}
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button className="bg-[#B89B7A] hover:bg-[#A38A69]" onClick={handleSave}>
              <Check className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Função auxiliar para obter o título amigável da seção
function getSectionTitle(section: string): string {
  switch (section) {
    case 'header': return 'Cabeçalho';
    case 'primaryStyle': return 'Estilo Primário';
    case 'secondaryStyles': return 'Estilos Secundários';
    case 'offer': return 'Oferta';
    default: return section;
  }
}
