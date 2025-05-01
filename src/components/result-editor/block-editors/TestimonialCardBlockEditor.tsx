
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';
import { Slider } from '@/components/ui/slider';

interface TestimonialCardBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const TestimonialCardBlockEditor: React.FC<TestimonialCardBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Cliente</Label>
        <Input
          id="name"
          value={content.name || "Maria Silva"}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Nome do cliente"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">Cargo/Informação</Label>
        <Input
          id="role"
          value={content.role || ""}
          onChange={(e) => onUpdate({ role: e.target.value })}
          placeholder="Ex: Cliente desde 2022"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="avatarUrl">URL da Foto</Label>
        <Input
          id="avatarUrl"
          value={content.avatarUrl || ""}
          onChange={(e) => onUpdate({ avatarUrl: e.target.value })}
          placeholder="URL da imagem de perfil"
        />
        {content.avatarUrl && (
          <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border-2 border-[#B89B7A]/30">
            <img 
              src={content.avatarUrl} 
              alt="Avatar Preview" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="testimonialText">Depoimento</Label>
        <Textarea
          id="testimonialText"
          value={content.testimonialText || "Este guia de estilo mudou completamente a forma como me visto. Agora tenho confiança para escolher roupas que realmente combinam com minha personalidade."}
          onChange={(e) => onUpdate({ testimonialText: e.target.value })}
          placeholder="Texto do depoimento"
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Avaliação ({content.rating || 5} estrelas)</Label>
        <Slider
          defaultValue={[content.rating || 5]}
          max={5}
          step={1}
          min={1}
          onValueChange={(value) => onUpdate({ rating: value[0] })}
        />
        <div className="flex justify-center text-xl text-amber-500">
          {Array.from({length: content.rating || 5}, (_, i) => (
            <span key={i}>★</span>
          ))}
          {Array.from({length: 5 - (content.rating || 5)}, (_, i) => (
            <span key={i}>☆</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCardBlockEditor;
