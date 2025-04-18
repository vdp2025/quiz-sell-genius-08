
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Clock, Lock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface PricingSectionProps {
  price?: string;
  regularPrice?: string;
  ctaText?: string;
  ctaUrl?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  price = "39,00",
  regularPrice = "175,00",
  ctaText = "Transformar Meu Estilo Agora",
  ctaUrl = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = () => {
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => {
      window.location.href = ctaUrl;
      setIsLoading(false);
    }, 500);
  };

  return (
    <Card className="p-8 border-[#aa6b5d] border-2 bg-white relative overflow-hidden">
      {/* Urgency Banner */}
      <div className="absolute top-0 left-0 w-full bg-[#aa6b5d] text-white px-4 py-2 flex items-center justify-center gap-2">
        <Clock className="w-4 h-4" />
        <p className="text-sm font-medium">Oferta especial por tempo limitado!</p>
      </div>
      
      <div className="space-y-6 mt-8">
        {/* Price Display */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div>
            <p className="text-sm text-[#3a3a3a]/60 mb-1">De</p>
            <p className="text-2xl line-through text-[#3a3a3a]/60">R$ {regularPrice}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-[#aa6b5d] mb-1">Por apenas</p>
            <div className="flex items-baseline gap-1 justify-center">
              <span className="text-sm">R$</span>
              <p className="text-5xl font-bold text-[#aa6b5d]">{price.split(',')[0]}</p>
              <span className="text-lg">,{price.split(',')[1] || '00'}</span>
            </div>
            <p className="text-xs text-[#3a3a3a]/60 mt-1">Pagamento único</p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-[#3a3a3a]/70">
          <Lock className="w-4 h-4" />
          <p className="text-sm">Pagamento 100% seguro</p>
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-8 rounded-md text-xl transition-colors duration-300"
          onClick={handlePurchase}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processando...</span>
            </div>
          ) : (
            <>
              <ShoppingCart className="w-6 h-6 mr-2" />
              {ctaText}
            </>
          )}
        </Button>

        {/* Payment Methods */}
        <p className="text-center text-sm text-[#3a3a3a]/70">
          Aceitamos PIX, cartão de crédito e boleto
        </p>
      </div>
    </Card>
  );
};

export default PricingSection;
