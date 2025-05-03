
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

const DEFAULT_DURATION = 400;
const DEFAULT_DELAY = 950;
const CHECKOUT_URL = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';

const DecorativeBackgroundCircle = ({ position }: { position: 'top-right' | 'bottom-left' }) => {
  const className =
    position === 'top-right'
      ? 'absolute top-0 right-0 w-1/3 h-1/3 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2'
      : 'absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2';

  return <div className={className} />;
};

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
  const isLowPerformance = useIsLowPerformanceDevice();
  const { isLoading, completeLoading } = useLoadingState({
    minDuration: isLowPerformance ? 400 : 800,
    disableTransitions: isLowPerformance
  });

  const [imagesLoaded, setImagesLoaded] = useState({ style: false, guide: false });
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);

    const preloadImages = [
      globalStyles.logo || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const { category } = primaryStyle;
    const config = styleConfig[category];
    if (!config) return;

    const { image, guideImage } = config;

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
  const config = styleConfig[category];
  if (!config) return <ErrorState />;

  const { image, guideImage, description } = config;

  const handleCTAClick = () => {
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    window.location.href = CHECKOUT_URL;
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: globalStyles.backgroundColor || '#fffaf7',
        color: globalStyles.textColor || '#432818',
        fontFamily: globalStyles.fontFamily || 'inherit'
      }}
    >
      <DecorativeBackgroundCircle position="top-right" />
      <DecorativeBackgroundCircle position="bottom-left" />

      <Header
        primaryStyle={primaryStyle}
        logoHeight={globalStyles.logoHeight}
        logo={globalStyles.logo}
        logoAlt={globalStyles.logoAlt}
        userName={user?.userName}
      />

      {/* Conteúdo omitido por brevidade */}
      <BuildInfo />
    </div>
  );
};

export default ResultPage;
