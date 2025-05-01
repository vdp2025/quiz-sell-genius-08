
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SealCheck } from 'lucide-react';

interface GuaranteeSectionProps {
  isEditable?: boolean;
  onUpdate?: (content: any) => void;
  content?: {
    title?: string;
    description?: string;
    days?: string;
    image?: string;
  };
}

const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ 
  isEditable = false,
  onUpdate,
  content = {} 
}) => {
  const handleUpdate = (field: string, value: any) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        [field]: value
      });
    }
  };

  return (
    <Card className="bg-[#F9F5F1] p-6 rounded-lg mb-10 text-center">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center mb-4">
          <SealCheck className="h-16 w-16 text-[#aa6b5d]" />
        </div>

        {isEditable ? (
          <Input
            value={content.title || "Garantia Total de 7 Dias"}
            onChange={(e) => handleUpdate('title', e.target.value)}
            className="text-center text-2xl mb-4 font-medium text-[#432818]"
          />
        ) : (
          <h2 className="text-2xl mb-4 font-medium text-[#432818]">
            {content.title || "Garantia Total de 7 Dias"}
          </h2>
        )}
        
        {isEditable ? (
          <>
            <Textarea
              value={content.description || "Se você não ficar satisfeita com o material recebido, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia. Você não corre nenhum risco."}
              onChange={(e) => handleUpdate('description', e.target.value)}
              className="text-[#432818]/80 leading-relaxed mb-4"
              rows={4}
            />
            <div className="mb-4">
              <label className="text-sm text-[#432818]/60 mb-1 block">Dias de garantia:</label>
              <Input
                value={content.days || "7"}
                onChange={(e) => handleUpdate('days', e.target.value)}
                className="text-center w-24 mx-auto"
              />
            </div>
          </>
        ) : (
          <p className="text-[#432818]/80 leading-relaxed">
            {content.description || "Se você não ficar satisfeita com o material recebido, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia. Você não corre nenhum risco."}
          </p>
        )}
      </div>
    </Card>
  );
};

export default GuaranteeSection;
