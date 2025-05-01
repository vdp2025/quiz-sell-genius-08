
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface MotivationProps {
  isEditable?: boolean;
  onUpdate?: (content: any) => void;
  content?: {
    title?: string;
    description?: string;
  };
}

const MotivationSection: React.FC<MotivationProps> = ({ 
  isEditable = false,
  onUpdate,
  content = {} 
}) => {
  const handleUpdate = (field: string, value: string) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        [field]: value
      });
    }
  };

  return (
    <Card className="bg-[#F9F5F1] p-6 rounded-lg mb-10 text-center">
      <div className="max-w-3xl mx-auto">
        {isEditable ? (
          <Input
            value={content.title || "Transforme seu guarda-roupa e sua relação com a moda"}
            onChange={(e) => handleUpdate('title', e.target.value)}
            className="text-center text-2xl mb-4 font-playfair text-[#432818]"
          />
        ) : (
          <h2 className="text-2xl mb-4 font-playfair text-[#432818]">
            {content.title || "Transforme seu guarda-roupa e sua relação com a moda"}
          </h2>
        )}
        
        {isEditable ? (
          <Textarea
            value={content.description || "Descubra como criar looks que realmente combinam com você, acabar com as compras por impulso e finalmente ter um guarda-roupa que faz sentido para seu corpo, estilo e rotina."}
            onChange={(e) => handleUpdate('description', e.target.value)}
            className="text-[#432818]/80 leading-relaxed"
            rows={4}
          />
        ) : (
          <p className="text-[#432818]/80 leading-relaxed">
            {content.description || "Descubra como criar looks que realmente combinam com você, acabar com as compras por impulso e finalmente ter um guarda-roupa que faz sentido para seu corpo, estilo e rotina."}
          </p>
        )}
      </div>
    </Card>
  );
};

export default MotivationSection;
