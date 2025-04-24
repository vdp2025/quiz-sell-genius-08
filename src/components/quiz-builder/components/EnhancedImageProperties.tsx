import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EnhancedImagePropertiesProps {
  data: any;
  onUpdate: (data: any) => void;
}

const EnhancedImageProperties: React.FC<EnhancedImagePropertiesProps> = ({ data, onUpdate }) => (
  <div className='space-y-4'>
    <div className='space-y-2'>
      <Label>URL da Imagem</Label>
      <Input
        value={data.imageUrl || ''}
        onChange={(e) => onUpdate({ ...data, imageUrl: e.target.value })}
      />
    </div>
    <div className='space-y-2'>
      <Label>Texto Alternativo</Label>
      <Input
        value={data.alt || ''}
        onChange={(e) => onUpdate({ ...data, alt: e.target.value })}
      />
    </div>
    <div className='space-y-2'>
      <Label>Legenda</Label>
      <Input
        value={data.caption || ''}
        onChange={(e) => onUpdate({ ...data, caption: e.target.value })}
      />
    </div>
  </div>
);

export default EnhancedImageProperties;
