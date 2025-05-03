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

const ctaVariants = [
  "Sim, quero meu Guia agora!",
  "Quero transformar meu estilo hoje",
  "Garantir meu acesso com bônus"
];

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
  const [ctaIndex, setCtaIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCtaIndex((prev) => (prev + 1) % ctaVariants.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;

  const { category, percentage } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

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
      <Header primaryStyle={primaryStyle} logoHeight={globalStyles.logoHeight} logo={globalStyles.logo} logoAlt={globalStyles.logoAlt} userName={user?.userName} />

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant">
          <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
            <div className="text-center mb-8">
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">Seu estilo predominante</span>
                  <span className="text-[#aa6b5d] font-medium">{percentage}%</span>
                </div>
                <Progress value={percentage} className="h-2 bg-[#F3E8E6]" indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-[#432818] leading-relaxed">{description}</p>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10 glass-panel">
                  <h3 className="text-lg font-medium text-[#432818] mb-2">Estilos que Também Influenciam Você</h3>
                  <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                </div>
              </div>
              <div className="max-w-[238px] mx-auto relative">
                <img src={`${image}?q=auto:best&f=auto&w=238`} alt={`Visual do estilo ${category}`} className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" loading="eager" fetchPriority="high" width="238" height="auto" />
              </div>
            </div>
            <div className="mt-8 max-w-[540px] mx-auto relative">
              <img src={`${guideImage}?q=auto:best&f=auto&w=540`} alt={`Mockup do Guia de Estilo para o estilo ${category}`} loading="lazy" className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" width="540" height="auto" />
            </div>
          </AnimatedWrapper>
        </Card>

        <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp" alt="Mockup do Guia de Estilo com bônus visuais e imagem da mentora Gisele Galvão" className="w-full h-auto rounded-lg mb-6" />

        <Button onClick={handleCTAClick} className="text-white py-5 px-8 rounded-md shadow-md transition-transform duration-500 ease-in-out hover:scale-105 btn-cta-green mb-2" style={{ background: "linear-gradient(to right, #4CAF50, #45a049)", boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)", fontSize: "1rem" }} onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)}>
          <span className="flex items-center justify-center gap-2">
            <ShoppingCart className={`w-4 h-4 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
            <span>{ctaVariants[ctaIndex]}</span>
          </span>
        </Button>
        <SecurePurchaseElement />
        <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          <span>Oferta exclusiva nesta página</span>
        </p>

        <AnimatedWrapper animation="fade" show={true} duration={400} delay={390}>
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-[#aa6b5d]">Veja na prática como o estilo transforma</h3>
            <p className="text-sm text-[#432818]">Esses são exemplos reais de como uma imagem bem aplicada pode revelar o seu melhor.</p>
          </div>
        </AnimatedWrapper>

        <BeforeAfterTransformation />
        <Testimonials />
        <MotivationSection />
        <BonusSection />
        <MentorSection />
        <GuaranteeSection />
      </div>

      <BuildInfo />
    </div>
  );
};

export default ResultPage;
