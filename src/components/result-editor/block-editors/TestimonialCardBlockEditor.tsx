
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';
import { useColorPicker } from '@/hooks/useColorPicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TestimonialCardBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const TestimonialCardBlockEditor: React.FC<TestimonialCardBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  const { ColorPicker } = useColorPicker();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={content.name || "Maria Silva"}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Nome da pessoa"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">Cargo/Função</Label>
        <Input
          id="role"
          value={content.role || "Cliente"}
          onChange={(e) => onUpdate({ role: e.target.value })}
          placeholder="Cargo ou função (opcional)"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="avatarUrl">URL da Imagem</Label>
        <Input
          id="avatarUrl"
          value={content.avatarUrl || ""}
          onChange={(e) => onUpdate({ avatarUrl: e.target.value })}
          placeholder="https://exemplo.com/imagem.jpg"
        />
        {content.avatarUrl && (
          <div className="mt-2 p-2 bg-gray-50 rounded">
            <img 
              src={content.avatarUrl} 
              alt="Avatar" 
              className="h-20 w-20 object-cover rounded-full mx-auto"
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="testimonialText">Depoimento</Label>
        <Textarea
          id="testimonialText"
          value={content.testimonialText || ""}
          onChange={(e) => onUpdate({ testimonialText: e.target.value })}
          placeholder="Texto do depoimento"
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="rating">Avaliação</Label>
        <Select
          value={String(content.rating || 5)}
          onValueChange={(value) => onUpdate({ rating: Number(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Escolha uma avaliação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 estrela</SelectItem>
            <SelectItem value="2">2 estrelas</SelectItem>
            <SelectItem value="3">3 estrelas</SelectItem>
            <SelectItem value="4">4 estrelas</SelectItem>
            <SelectItem value="5">5 estrelas</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Cor de fundo</Label>
        <ColorPicker
          color={content.style?.backgroundColor || "#FFF8F0"}
          onChange={(color) => onUpdate({ 
            style: { 
              ...content.style,
              backgroundColor: color 
            } 
          })}
        />
      </div>
    </div>
  );
};

export default TestimonialCardBlockEditor;
