
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
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useAuth } from '@/context/AuthContext';

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
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
    criticalImages.forEach(src => new Image().src = src);

    const { category } = primaryStyle;
    // Check if styleConfig exists for this category before accessing it
    if (styleConfig[category]) {
      const { image, guideImage } = styleConfig[category];
      if (image) {
        const styleImg = new Image();
        styleImg.src = `${image}?q=auto:best&f=auto&w=340`;
        styleImg.onload = () => setImagesLoaded(prev => ({ ...prev, style: true }));
      } else {
        setImagesLoaded(prev => ({ ...prev, style: true }));
      }

      if (guideImage) {
        const guideImg = new Image();
        guideImg.src = `${guideImage}?q=auto:best&f=auto&w=540`;
        guideImg.onload = () => setImagesLoaded(prev => ({ ...prev, guide: true }));
      } else {
        setImagesLoaded(prev => ({ ...prev, guide: true }));
      }
    } else {
      // Set images as loaded if there's no style config
      setImagesLoaded({ style: true, guide: true });
    }
  }, [primaryStyle, globalStyles.logo]);

  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);

  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;

  const { category } = primaryStyle;
  // Make sure we have valid styleConfig data
  const styleData = styleConfig[category] || {};
  const { image, guideImage, description } = styleData;
  const userName = globalStyles.userName || (user ? user.userName : undefined);

  const handleCTAClick = () => {
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: globalStyles.backgroundColor || '#fffaf7',
      color: globalStyles.textColor || '#432818',
      fontFamily: globalStyles.fontFamily || 'inherit'
    }}>
      <Header primaryStyle={primaryStyle} logoHeight={globalStyles.logoHeight} logo={globalStyles.logo} logoAlt={globalStyles.logoAlt} userName={userName} />

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant">
          <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
            <div className="text-center mb-8">
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">Seu estilo predominante</span>
                  <span className="text-[#aa6b5d] font-medium">{primaryStyle.percentage}%</span>
                </div>
                <Progress value={primaryStyle.percentage} className="h-2 bg-[#F3E8E6]" indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-[#432818] leading-relaxed">{description || "Descrição não disponível para este estilo."}</p>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10 glass-panel">
                  <h3 className="text-lg font-medium text-[#432818] mb-2">Estilos que Também Influenciam Você</h3>
                  {secondaryStyles && secondaryStyles.length > 0 ? (
                    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                  ) : (
                    <p className="text-[#8F7A6A]">Nenhum estilo secundário detectado.</p>
                  )}
                </div>
              </div>
              <div className="max-w-[238px] mx-auto relative">
                <AspectRatio ratio={3/4} className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                  <img 
                    src={image ? `${image}?q=auto:best&f=auto&w=238` : "https://via.placeholder.com/238x317?text=Imagem+não+disponível"} 
                    alt={`Estilo ${category}`} 
                    className="w-full h-full object-cover" 
                    loading="eager" 
                    fetchPriority="high" 
                    width="238" 
                    height="317"
                    srcSet={image ? `${image}?q=auto:best&f=auto&w=238 1x, ${image}?q=auto:best&f=auto&w=476 2x` : ""}
                    sizes="(max-width: 768px) 100vw, 238px"
                  />
                </AspectRatio>
              </div>
            </div>

            {guideImage && (
              <div className="mt-8 max-w-[540px] mx-auto relative">
                <AspectRatio ratio={4/5} className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                  <img 
                    src={`${guideImage}?q=auto:best&f=auto&w=540`} 
                    alt={`Guia de Estilo ${category}`} 
                    loading="lazy" 
                    className="w-full h-full object-cover" 
                    width="540" 
                    height="304"
                    srcSet={`${guideImage}?q=auto:best&f=auto&w=540 1x, ${guideImage}?q=auto:best&f=auto&w=1080 2x`}
                    sizes="(max-width: 768px) 100vw, 540px"
                  />
                </AspectRatio>
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transform rotate-12">
                  Exclusivo
                </div>
              </div>
            )}
          </AnimatedWrapper>
        </Card>

        <BeforeAfterTransformation />
        <MotivationSection />
        <BonusSection />
        <Testimonials />

        <div className="text-center p-4 bg-[#f9f4ef] rounded-lg relative flex flex-col items-center">
          <p className="text-sm text-[#aa6b5d] uppercase font-medium">Hoje por apenas</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-1">
            <p className="text-4xl font-bold gold-text">R$ 39,00</p>
            <img 
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920951/Espanhol_Portugu%C3%AAs_8_lgjv2t.png" 
              srcSet="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920951/Espanhol_Portugu%C3%AAs_8_lgjv2t.png 1x, https://res.cloudinary.com/dqljyf76t/image/upload/q_auto,f_auto,w_128/v1744920951/Espanhol_Portugu%C3%AAs_8_lgjv2t.png 2x" sizes="(max-width: 768px) 100vw, 64px" 
              alt="Selo de garantia" 
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain sm:order-1 order-2 mt-2 sm:mt-0" 
              width="64" 
              height="64"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-[#3a3a3a]/60 mt-1">Pagamento único ou em até <strong>4x de R$ 10,86</strong><br className="block sm:hidden" /> no cartão</p>
        </div>

        <Button onClick={handleCTAClick} className="text-white py-5 px-8 lg:py-6 lg:px-12 rounded-md shadow-md transition-colors btn-3d mt-6" style={{
          background: "linear-gradient(to right, #4CAF50, #45a049)",
          boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)",
          fontSize: "1rem"
        }} onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)}>
          <span className="flex items-center justify-center gap-2">
            <ShoppingCart className={`w-4 h-4 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
            <span>Garantir Meu Guia + Bônus Especiais</span>
          </span>
        </Button>

        <SecurePurchaseElement />
        <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          <span>Oferta exclusiva nesta página</span>
        </p>

        <GuaranteeSection />
        <MentorSection />
      </div>

      <BuildInfo />
    </div>
  );
};

export default ResultPage;
