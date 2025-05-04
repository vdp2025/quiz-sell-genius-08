import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, CheckCircle, ArrowDown, Lock } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import ErrorState from '@/components/result/ErrorState';
import MotivationSection from '@/components/result/MotivationSection';
import MentorSection from '@/components/result/MentorSection';
import GuaranteeSection from '@/components/result/GuaranteeSection';
import Testimonials from '@/components/quiz-result/sales/Testimonials';
import BeforeAfterTransformation from '@/components/result/BeforeAfterTransformation';
import BonusSection from '@/components/result/BonusSection';
import { Button } from '@/components/ui/button';
import { useLoadingState } from '@/hooks/useLoadingState';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';
import ResultSkeleton from '@/components/result/ResultSkeleton';
import { trackButtonClick } from '@/utils/analytics';
import BuildInfo from '@/components/BuildInfo';
import SecurePurchaseElement from '@/components/result/SecurePurchaseElement';
import { useAuth } from '@/context/AuthContext';
import { useABTest } from '@/contexts/ABTestContext';

const ResultPageVariantB: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
  const { trackConversion } = useABTest();
  const [imagesLoaded, setImagesLoaded] = useState({ style: false, guide: false });
  const isLowPerformance = useIsLowPerformanceDevice();
  
  const { isLoading, completeLoading } = useLoadingState({
    minDuration: isLowPerformance ? 400 : 800,
    disableTransitions: isLowPerformance
  });

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);

    const criticalImages = [globalStyles.logo || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'];
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const { category } = primaryStyle;
    const { image, guideImage } = styleConfig[category];
    
    const styleImg = new Image();
    styleImg.src = `${image}?q=auto:best&f=auto&w=238`;
    styleImg.onload = () => setImagesLoaded(prev => ({ ...prev, style: true }));
    
    const guideImg = new Image();
    guideImg.src = `${guideImage}?q=auto:best&f=auto&w=540`;
    guideImg.onload = () => setImagesLoaded(prev => ({ ...prev, guide: true }));
  }, [primaryStyle, globalStyles.logo]);

  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);

  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;

  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

  const handleCTAClick = () => {
    trackButtonClick('main_cta', 'Main CTA', 'results_page');
    trackConversion('cta_click', 1);
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: globalStyles.backgroundColor || '#fffaf7',
      color: globalStyles.textColor || '#432818',
      fontFamily: globalStyles.fontFamily || 'inherit'
    }}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f4ef] to-white z-0"></div>
      
      <Header 
        primaryStyle={primaryStyle} 
        logoHeight={globalStyles.logoHeight} 
        logo={globalStyles.logo} 
        logoAlt={globalStyles.logoAlt} 
        userName={user?.userName} 
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        {/* Hero Section - Variante B */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair text-[#aa6b5d] mb-4">
            Seu Estilo é {primaryStyle.category}
          </h1>
          <p className="text-lg text-[#432818] max-w-2xl mx-auto mb-8">
            Descubra como expressar sua verdadeira essência através do seu estilo único
          </p>
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#8F7A6A]">Compatibilidade com seu perfil</span>
              <span className="text-[#aa6b5d] font-medium">{primaryStyle.percentage}%</span>
            </div>
            <Progress 
              value={primaryStyle.percentage} 
              className="h-3 bg-[#F3E8E6]" 
              indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]" 
            />
          </div>
        </div>

        {/* Style Preview - Variante B */}
        <Card className="p-8 mb-12 bg-white shadow-lg border-0 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <h2 className="text-2xl font-medium text-[#aa6b5d]">
                Seu Guia de Estilo Personalizado
              </h2>
              <p className="text-[#432818] leading-relaxed">{description}</p>
              <div className="bg-[#f9f4ef] p-6 rounded-xl">
                <h3 className="text-lg font-medium text-[#432818] mb-4">
                  Influências Complementares
                </h3>
                <SecondaryStylesSection secondaryStyles={secondaryStyles} />
              </div>
              <Button 
                onClick={handleCTAClick} 
                className="w-full py-4 text-white rounded-xl transition-transform hover:scale-105"
                style={{
                  background: "linear-gradient(45deg, #4CAF50, #45a049)",
                  boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)"
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Quero Meu Guia Personalizado
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative max-w-sm mx-auto">
                <img 
                  src={`${image}?q=auto:best&f=auto&w=400`}
                  alt={`Estilo ${category}`}
                  className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  width="400"
                  height="auto"
                />
                <div className="absolute -top-4 -right-4 bg-white text-[#aa6b5d] px-6 py-2 rounded-full shadow-lg font-medium transform rotate-12">
                  Seu Estilo
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Transformation Section */}
        <BeforeAfterTransformation />

        {/* Value Proposition Sections */}
        <div className="space-y-16">
          <MotivationSection />
          <BonusSection />
          <Testimonials />
          <GuaranteeSection />
          <MentorSection />
        </div>

        {/* Final CTA Section */}
        <div className="text-center py-16 bg-[#f9f4ef] rounded-2xl mt-16 mb-8">
          <h2 className="text-3xl font-playfair text-[#aa6b5d] mb-6">
            Transforme Seu Estilo Hoje
          </h2>
          <p className="text-lg text-[#432818] mb-8 max-w-2xl mx-auto">
            Acesso imediato ao seu guia personalizado + bônus exclusivos
          </p>
          <div className="max-w-md mx-auto space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm text-[#aa6b5d] uppercase mb-2">Oferta Especial</p>
              <p className="text-4xl font-bold text-[#4CAF50] mb-1">R$ 39,00</p>
              <p className="text-sm text-[#432818]">ou 4x de R$ 10,86</p>
            </div>
            <Button 
              onClick={handleCTAClick} 
              className="w-full py-6 text-white rounded-xl text-lg transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(45deg, #4CAF50, #45a049)",
                boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)"
              }}
            >
              <ShoppingCart className="w-6 h-6 mr-2" />
              Garantir Meu Guia + Bônus
            </Button>
            <SecurePurchaseElement />
          </div>
        </div>
      </div>

      <BuildInfo />
    </div>
  );
};

export default ResultPageVariantB;