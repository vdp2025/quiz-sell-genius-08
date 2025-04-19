
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Clock, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingBlockPreviewProps {
  content: {
    regularPrice?: string;
    salePrice?: string;
    buttonText?: string;
    ctaUrl?: string;
    urgencyText?: string;
    installments?: {
      number: number;
      value: string;
    };
    paymentMethods?: string;
    guaranteeText?: string;
    style?: any;
  };
}

const PricingBlockPreview: React.FC<PricingBlockPreviewProps> = ({ content }) => {
  return (
    <div 
      className={cn(
        "max-w-2xl mx-auto relative overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-[#fff7f3] to-white",
        "border-2 border-[#aa6b5d]"
      )}
      style={content.style}
    >
      {/* Urgency Banner */}
      {content.urgencyText && (
        <div className="bg-[#aa6b5d] text-white px-4 py-2 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          <p className="text-sm font-medium">{content.urgencyText}</p>
        </div>
      )}

      <div className="p-8 space-y-6">
        {/* Price Display */}
        <div className="text-center space-y-2">
          {content.regularPrice && (
            <div className="opacity-75">
              <p className="text-sm text-[#666]">De</p>
              <p className="text-xl line-through text-[#666]">
                R$ {content.regularPrice}
              </p>
            </div>
          )}
          
          {content.salePrice && (
            <div className="animate-fade-in">
              <p className="text-sm text-[#aa6b5d] font-medium">Por apenas</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-sm">R$</span>
                <p className="text-5xl font-bold text-[#aa6b5d]">
                  {content.salePrice.split(',')[0]}
                </p>
                <span className="text-xl">,{content.salePrice.split(',')[1] || '00'}</span>
              </div>
            </div>
          )}

          {content.installments && (
            <p className="text-sm text-[#666]">
              ou {content.installments.number}x de R$ {content.installments.value}
            </p>
          )}
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white p-6 text-lg rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
          onClick={() => content.ctaUrl && window.open(content.ctaUrl, '_blank')}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {content.buttonText || 'Comprar Agora'}
        </Button>

        {/* Payment Methods */}
        {content.paymentMethods && (
          <p className="text-center text-sm text-[#666]">
            {content.paymentMethods}
          </p>
        )}

        {/* Guarantee */}
        {content.guaranteeText && (
          <div className="flex items-center justify-center gap-2 text-[#666]">
            <Shield className="w-4 h-4" />
            <p className="text-sm">{content.guaranteeText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingBlockPreview;
