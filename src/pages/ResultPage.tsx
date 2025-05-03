import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Lock } from 'lucide-react';
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
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const { category } = primaryStyle;
    const { image, guideImage } = styleConfig[category];

    const styleImg = new Image();
    styleImg.src = `${image}?q=auto:best&f=auto&w=340`;
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
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };

  const CTAButton = (
    <Button
      onClick={handleCTAClick}
      className="text-white py-5 px-8 rounded-md shadow-md transition-transform duration-300 hover:scale-105 animate-pulse btn-cta-green mb-2"
      style={{
        background: "linear-gradient(to right, #4CAF50, #45a049)",
        boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)",
        fontSize: "1rem"
      }}
      onMouseEnter={() => setIsButtonHovered(true)}
      onMouseLeave={() => setIsButtonHovered(false)}
    >
      <span className="flex items-center justify-center gap-2">
        <ShoppingCart className={`w-4 h-4 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
        <span>Garantir Meu Guia + Bônus Especiais</span>
      </span>
    </Button>
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: globalStyles.backgroundColor || '#fffaf7',
        color: globalStyles.textColor || '#432818',
        fontFamily: globalStyles.fontFamily || 'inherit'
      }}
    >
      <Header
        primaryStyle={primaryStyle}
        logoHeight={globalStyles.logoHeight}
        logo={globalStyles.logo}
        logoAlt={globalStyles.logoAlt}
        userName={user?.userName}
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant">
          {/* Blocos anteriores mantidos */}
          <AnimatedWrapper animation="fade" show={true} duration={400} delay={1000}>
            <MentorSection />
          </AnimatedWrapper>

          <div className="text-center mt-10">
            {CTAButton}
            <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Pagamento 100% seguro</span>
            </p>
          </div>
        </Card>
        <BuildInfo />
      </div>
    </div>
  );
};

export default ResultPage;
