
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { Block } from '@/types/editor';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialsBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const TestimonialsBlockEditor: React.FC<TestimonialsBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  const testimonials = content.testimonials || [
    {
      name: 'Mariana Silva',
      text: 'O guia de estilo mudou completamente minha relação com as roupas. Agora eu sei exatamente o que combina comigo!',
      style: 'Natural'
    }
  ];

  const handleTitleChange = (title: string) => {
    onUpdate({ title });
  };

  const handleTestimonialChange = (index: number, field: string, value: string) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = {
      ...newTestimonials[index],
      [field]: value
    };
    onUpdate({ testimonials: newTestimonials });
  };

  const handleAddTestimonial = () => {
    onUpdate({
      testimonials: [
        ...testimonials,
        {
          name: 'Nova Cliente',
          text: 'Adicione um depoimento aqui...',
          style: 'Natural'
        }
      ]
    });
  };

  const handleRemoveTestimonial = (index: number) => {
    const newTestimonials = [...testimonials];
    newTestimonials.splice(index, 1);
    onUpdate({ testimonials: newTestimonials });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título da Seção</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="O que Dizem As Alunas"
        />
      </div>
      
      <div className="space-y-4">
        <Label>Depoimentos</Label>
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-0 overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Depoimento {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveTestimonial(index)}
                  className="h-8 w-8 text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`name-${index}`} className="text-xs">Nome</Label>
                  <Input
                    id={`name-${index}`}
                    value={testimonial.name}
                    onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                    placeholder="Nome do cliente"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`style-${index}`} className="text-xs">Estilo</Label>
                  <Input
                    id={`style-${index}`}
                    value={testimonial.style}
                    onChange={(e) => handleTestimonialChange(index, 'style', e.target.value)}
                    placeholder="Estilo do cliente"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`text-${index}`} className="text-xs">Depoimento</Label>
                  <Textarea
                    id={`text-${index}`}
                    value={testimonial.text}
                    onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)}
                    placeholder="Texto do depoimento"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddTestimonial}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Depoimento
        </Button>
      </div>
    </div>
  );
};

export default TestimonialsBlockEditor;
