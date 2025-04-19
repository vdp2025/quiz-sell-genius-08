
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { ImageUploader } from '@/components/editor/ImageUploader';

interface TestimonialsBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const TestimonialsBlockEditor: React.FC<TestimonialsBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  const testimonials = content.testimonials || [];

  const handleAddTestimonial = () => {
    const newTestimonials = [
      ...testimonials,
      {
        text: 'Novo depoimento',
        name: 'Nome da pessoa',
        location: 'Cidade',
        image: ''
      }
    ];
    onUpdate({ testimonials: newTestimonials });
  };

  const handleUpdateTestimonial = (index: number, field: string, value: string) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = {
      ...newTestimonials[index],
      [field]: value
    };
    onUpdate({ testimonials: newTestimonials });
  };

  const handleRemoveTestimonial = (index: number) => {
    const newTestimonials = [...testimonials];
    newTestimonials.splice(index, 1);
    onUpdate({ testimonials: newTestimonials });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="O que nossas clientes dizem"
        />
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <Label>Depoimentos</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddTestimonial}
          >
            <Plus className="w-4 h-4 mr-2" /> Adicionar
          </Button>
        </div>
        
        {testimonials.map((testimonial: any, index: number) => (
          <div key={index} className="border p-4 mb-4 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Depoimento {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveTestimonial(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor={`text-${index}`}>Texto do depoimento</Label>
                <Textarea
                  id={`text-${index}`}
                  value={testimonial.text || ''}
                  onChange={(e) => handleUpdateTestimonial(index, 'text', e.target.value)}
                  placeholder="Digite o depoimento aqui..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`name-${index}`}>Nome</Label>
                <Input
                  id={`name-${index}`}
                  value={testimonial.name || ''}
                  onChange={(e) => handleUpdateTestimonial(index, 'name', e.target.value)}
                  placeholder="Nome da pessoa"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`location-${index}`}>Localização</Label>
                <Input
                  id={`location-${index}`}
                  value={testimonial.location || ''}
                  onChange={(e) => handleUpdateTestimonial(index, 'location', e.target.value)}
                  placeholder="Cidade, Estado"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Foto (opcional)</Label>
                <ImageUploader
                  currentImageUrl={testimonial.image || ''}
                  onImageChange={(url) => handleUpdateTestimonial(index, 'image', url)}
                  imageAlt={`Foto de ${testimonial.name || 'cliente'}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsBlockEditor;
