
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';
import { Separator } from '@/components/ui/separator';

interface PricingBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const PricingBlockEditor: React.FC<PricingBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  const handleUpdate = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  const handleInstallmentsUpdate = (field: string, value: any) => {
    onUpdate({
      ...content,
      installments: {
        ...content.installments,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-medium">Preços</Label>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="regularPrice">Preço Original</Label>
            <Input
              id="regularPrice"
              value={content.regularPrice || ''}
              onChange={(e) => handleUpdate('regularPrice', e.target.value)}
              placeholder="175,00"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salePrice">Preço Promocional</Label>
            <Input
              id="salePrice"
              value={content.salePrice || ''}
              onChange={(e) => handleUpdate('salePrice', e.target.value)}
              placeholder="39,00"
            />
          </div>
        </div>
      </div>

      <Separator />
      
      <div className="space-y-4">
        <Label className="text-base font-medium">Parcelamento</Label>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="installments-number">Número de Parcelas</Label>
            <Input
              id="installments-number"
              type="number"
              value={content.installments?.number || ''}
              onChange={(e) => handleInstallmentsUpdate('number', Number(e.target.value))}
              placeholder="12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="installments-value">Valor da Parcela</Label>
            <Input
              id="installments-value"
              value={content.installments?.value || ''}
              onChange={(e) => handleInstallmentsUpdate('value', e.target.value)}
              placeholder="3,99"
            />
          </div>
        </div>
      </div>

      <Separator />
      
      <div className="space-y-4">
        <Label className="text-base font-medium">Chamada para Ação</Label>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="buttonText">Texto do Botão</Label>
            <Input
              id="buttonText"
              value={content.buttonText || ''}
              onChange={(e) => handleUpdate('buttonText', e.target.value)}
              placeholder="Quero Transformar Meu Estilo"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ctaUrl">Link do Botão</Label>
            <Input
              id="ctaUrl"
              value={content.ctaUrl || ''}
              onChange={(e) => handleUpdate('ctaUrl', e.target.value)}
              placeholder="https://pay.hotmart.com/..."
            />
          </div>
        </div>
      </div>

      <Separator />
      
      <div className="space-y-4">
        <Label className="text-base font-medium">Elementos de Conversão</Label>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="urgencyText">Texto de Urgência</Label>
            <Input
              id="urgencyText"
              value={content.urgencyText || ''}
              onChange={(e) => handleUpdate('urgencyText', e.target.value)}
              placeholder="Oferta por tempo limitado!"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paymentMethods">Formas de Pagamento</Label>
            <Input
              id="paymentMethods"
              value={content.paymentMethods || ''}
              onChange={(e) => handleUpdate('paymentMethods', e.target.value)}
              placeholder="Aceitamos PIX, cartão de crédito e boleto"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="guaranteeText">Texto da Garantia</Label>
            <Textarea
              id="guaranteeText"
              value={content.guaranteeText || ''}
              onChange={(e) => handleUpdate('guaranteeText', e.target.value)}
              placeholder="Garantia incondicional de 7 dias"
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingBlockEditor;
