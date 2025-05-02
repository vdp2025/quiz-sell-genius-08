
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Clock, Lock } from 'lucide-react';
import SecurePurchaseElement from '@/components/result/SecurePurchaseElement';

interface PricingSectionProps {
  price?: string;
  regularPrice?: string;
  ctaText?: string;
  ctaUrl?: string;
  guaranteeImg?: string;
  installments?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  price = "39,00",
  regularPrice = "175,00",
  ctaText = "Transformar Meu Estilo Agora",
  ctaUrl = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
  guaranteeImg = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920951/Espanhol_Portugu%C3%AAs_8_lgjv2t.png",
  installments = "10,86"
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [guaranteeImgError, setGuaranteeImgError] = useState(false);

  const handlePurchase = () => {
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => {
      window.location.href = ctaUrl;
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Guarantee Seal - Large and Above Price */}
      <div className="flex justify-center mb-4">
        {!guaranteeImgError ? (
          <img 
            src={guaranteeImg} 
            alt="Selo de garantia" 
            className="w-40 h-40 object-contain transition-transform hover:scale-105"
            onError={() => {
              console.error("Failed to load guarantee image");
              setGuaranteeImgError(true);
            }}
            loading="eager"
            fetchPriority="high"
          />
        ) : (
          <div className="w-40 h-40 rounded-full bg-[#aa6b5d]/10 flex items-center justify-center">
            <div className="text-center">
              <p className="font-bold text-[#aa6b5d]">GARANTIA</p>
              <p className="text-3xl font-bold text-[#aa6b5d]">7 DIAS</p>
            </div>
          </div>
        )}
      </div>

      {/* Price Display - Strategic and Visible */}
      <div className="bg-[#fff7f3] p-6 rounded-lg border border-[#B89B7A]/20 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-8 mb-6">
          <div className="relative mb-4 md:mb-0">
            <p className="text-sm text-[#3a3a3a]/60 mb-1">De</p>
            <p className="text-2xl line-through text-[#3a3a3a]/60">R$ {regularPrice}</p>
            <div className="absolute -right-3 -top-1 -left-1 -bottom-1 border-2 border-[#ff5a5a] transform rotate-[-8deg] rounded-sm"></div>
          </div>

          <div className="text-center relative">
            <p className="text-sm text-[#aa6b5d] mb-1">Por apenas</p>
            <div className="flex items-baseline justify-center">
              <span className="text-sm">R$</span>
              <p className="text-5xl font-bold text-[#aa6b5d]">{price.split(',')[0]}</p>
              <span className="text-xl">,{price.split(',')[1] || '00'}</span>
              <div className="absolute -top-2 -right-4 rotate-12 text-xs bg-[#aa6b5d] text-white px-2 py-0.5 rounded-full">HOJE</div>
            </div>
            <p className="text-sm text-[#3a3a3a]/70 mt-1 font-medium">ou 4x de R$ {installments}</p>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full text-white py-6 rounded-md text-base font-medium transition-all duration-300 shadow-lg"
          onClick={handlePurchase}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={isLoading}
          style={{
            background: "linear-gradient(to right, #4CAF50, #45a049)",
            boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)"
          }}
        >
          <span className="flex items-center gap-2">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <ShoppingCart className={`w-5 h-5 mr-2 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                {ctaText}
              </>
            )}
          </span>
        </Button>

        {/* Elegant shadow beneath button */}
        <div className="h-2 bg-gradient-to-r from-transparent via-[#45a049]/30 to-transparent rounded-full mt-2 mx-auto w-3/4"></div>
      </div>

      {/* Security Badge */}
      <SecurePurchaseElement />

      {/* Limited Time Offer */}
      <p className="text-center text-sm flex items-center justify-center gap-1 text-[#aa6b5d]">
        <Clock className="w-3 h-3" />
        <span>Oferta por tempo limitado</span>
      </p>

      {/* Payment Methods */}
      <p className="text-center text-sm text-[#3a3a3a]/70">
        Aceitamos PIX, cartão de crédito e boleto
      </p>
    </div>
  );
};

export default PricingSection;
