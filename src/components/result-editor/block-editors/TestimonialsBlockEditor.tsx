
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Block } from '@/types/editor';
import { ImageUploader } from '@/components/editor/ImageUploader';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash } from 'lucide-react';

interface TestimonialsBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const TestimonialsBlockEditor: React.FC<TestimonialsBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  const testimonials = content.testimonials || [];

  const handleTestimonialUpdate = (index: number, field: string, value: string) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value
    };
    onUpdate({ testimonials: updatedTestimonials });
  };

  const addTestimonial = () => {
    const newTestimonial = {
      text: '',
      author: '',
      position: ''
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
        <div className="space-y-4">
          <Label>Título da Seção</Label>
          <Input
            value={content.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="O que estão dizendo"
          />
        </div>

        <div className="space-y-4">
          <Label>Imagem Principal</Label>
          <ImageUploader
            currentImageUrl={content.image || ''}
            onImageChange={(url) => onUpdate({ image: url })}
            imageAlt="Imagem de depoimentos"
            onAltChange={(alt) => onUpdate({ imageAlt: alt })}
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
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Texto</Label>
                <RichTextEditor
                  initialValue={testimonial.text}
                  onChange={(value) => handleTestimonialUpdate(index, 'text', value)}
                  placeholder="Digite o depoimento..."
                />
              </div>

              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  value={testimonial.author}
                  onChange={(e) => handleTestimonialUpdate(index, 'author', e.target.value)}
                  placeholder="Nome do cliente"
                />
              </div>

              <div className="space-y-2">
                <Label>Cargo/Posição</Label>
                <Input
                  value={testimonial.position}
                  onChange={(e) => handleTestimonialUpdate(index, 'position', e.target.value)}
                  placeholder="Ex: Empresária"
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
