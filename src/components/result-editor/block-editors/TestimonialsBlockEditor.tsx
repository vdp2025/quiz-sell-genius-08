
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Block } from '@/types/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Testimonial } from '@/types/testimonials';

interface TestimonialsBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const TestimonialsBlockEditor: React.FC<TestimonialsBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content || {};
  const testimonials = content.testimonials || [];

  const handleTestimonialUpdate = (index: number, field: string, value: string) => {
    const updatedTestimonials = [...testimonials];
    
    if (!updatedTestimonials[index]) {
      updatedTestimonials[index] = { id: `testimonial-${Date.now()}`, text: '', name: '', image: '', location: '' };
    }
    
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value
    };
    
    onUpdate({ testimonials: updatedTestimonials });
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: `testimonial-${Date.now()}`,
      text: '',
      name: '',
      image: '',
      location: ''
    };
    onUpdate({ testimonials: [...testimonials, newTestimonial] });
  };

  const removeTestimonial = (index: number) => {
    const updatedTestimonials = testimonials.filter((_, i) => i !== index);
    onUpdate({ testimonials: updatedTestimonials });
  };

  return (
    <ScrollArea className="h-[calc(100vh-220px)] pr-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Título da Seção</Label>
          <Input
            value={content.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="O que estão dizendo"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Depoimentos</Label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addTestimonial}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>

          {testimonials.map((testimonial, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center">
                <Label>Depoimento {index + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTestimonial(index)}
                  className="text-red-500 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Texto</Label>
                <Textarea
                  value={testimonial.text || ''}
                  onChange={(e) => handleTestimonialUpdate(index, 'text', e.target.value)}
                  placeholder="Digite o depoimento..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  value={testimonial.name || testimonial.author || ''}
                  onChange={(e) => handleTestimonialUpdate(index, 'name', e.target.value)}
                  placeholder="Nome do cliente"
                />
              </div>

              <div className="space-y-2">
                <Label>Cargo/Posição</Label>
                <Input
                  value={testimonial.location || testimonial.position || ''}
                  onChange={(e) => handleTestimonialUpdate(index, 'location', e.target.value)}
                  placeholder="Ex: Empresária"
                />
              </div>

              <div className="space-y-2">
                <Label>URL da Imagem</Label>
                <Input
                  value={testimonial.image || ''}
                  onChange={(e) => handleTestimonialUpdate(index, 'image', e.target.value)}
                  placeholder="URL da imagem do cliente"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default TestimonialsBlockEditor;
