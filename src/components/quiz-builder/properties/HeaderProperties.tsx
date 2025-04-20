
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface HeaderPropertiesProps {
  data: QuizComponentData['data'];
  onUpdate: (data: any) => void;
}

const HeaderProperties: React.FC<HeaderPropertiesProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={data.title || ''}
          onChange={(e) => onUpdate({ ...data, title: e.target.value })}
          placeholder="Título do Quiz"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtítulo</Label>
        <Textarea
          id="subtitle"
          value={data.subtitle || ''}
          onChange={(e) => onUpdate({ ...data, subtitle: e.target.value })}
          placeholder="Descrição ou instruções do quiz"
          rows={3}
        />
      </div>
    </div>
  );
};

export default HeaderProperties;
