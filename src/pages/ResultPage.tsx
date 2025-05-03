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
                  <span className="text-[#aa6b5d] font-medium">{primaryStyle.percentage}%</span>
                </div>
                <Progress value={primaryStyle.percentage} className="h-2 bg-[#F3E8E6]" indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]" />
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
                <img src={`${image}?q=auto:best&f=auto&w=238`} alt={`Estilo ${category}`} className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
              </div>
            </div>

            <div className="mt-8 max-w-[540px] mx-auto relative">
              <img src={`${guideImage}?q=auto:best&f=auto&w=540`} alt={`Guia de Estilo ${category}`} className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transform rotate-12">Exclusivo</div>
            </div>

            {/* Texto posicionado corretamente após a imagem do guia */}
            <div className="text-center mt-10 px-4">
              <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
                Vista-se de Você — na Prática
              </h2>
              <p className="text-[#432818] mb-6 max-w-xl mx-auto">
                Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção. O Guia da Gisele Galvão foi criado para mulheres como você — que querem se vestir com autenticidade e transformar sua imagem em ferramenta de poder.
              </p>
            </div>

            <AnimatedWrapper animation="fade" show={true} duration={400} delay={500}>
              <BeforeAfterTransformation />
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade" show={true} duration={400} delay={600}>
              <MotivationSection />
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade" show={true} duration={400} delay={700}>
              <BonusSection />
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade" show={true} duration={400} delay={800}>
              <Testimonials />
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade" show={true} duration={400} delay={900}>
              <GuaranteeSection />
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade" show={true} duration={400} delay={1000}>
              <MentorSection />
            </AnimatedWrapper>

            <AnimatedWrapper animation="fade" show={true} duration={400} delay={1100}>
              $1

<AnimatedWrapper animation="fade" show={true} duration={400} delay={1200}>
  <div className="text-center mt-10">
    <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
      O que você recebe hoje
    </h2>
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20 card-elegant mb-8 max-w-md mx-auto">
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
          <span>Guia Principal</span>
          <span className="font-medium">R$ 67,00</span>
        </div>
        <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
          <span>Bônus - Peças-chave</span>
          <span className="font-medium">R$ 79,00</span>
        </div>
        <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
          <span>Bônus - Visagismo Facial</span>
          <span className="font-medium">R$ 29,00</span>
        </div>
        <div className="flex justify-between items-center p-2 pt-3 font-bold">
          <span>Valor Total</span>
          <div className="relative">
            <span>R$ 175,00</span>
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#ff5a5a] transform -translate-y-1/2 -rotate-3"></div>
          </div>
        </div>
      </div>
      <div className="text-center p-4 bg-[#f9f4ef] rounded-lg">
        <p className="text-sm text-[#aa6b5d] uppercase font-medium">Hoje por apenas</p>
        <p className="text-4xl font-bold gold-text">R$ 39,00</p>
        <p className="text-sm text-[#432818] mt-1">ou 4x de R$ 10,86</p>
      </div>
    </div>

    <Button onClick={handleCTAClick} className="text-white py-5 px-8 rounded-md shadow-md transition-colors btn-cta-green mb-2" style={{
      background: "linear-gradient(to right, #4CAF50, #45a049)",
      boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)",
      fontSize: "1rem"
    }} onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)}>
      <span className="flex items-center justify-center gap-2">
        <ShoppingCart className={`w-4 h-4 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
        <span>Garantir Meu Guia + Bônus Especiais</span>
      </span>
    </Button>

    <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
      <Lock className="w-3 h-3" />
      <span>Pagamento 100% seguro</span>
    </p>
  </div>
</AnimatedWrapper>
          </AnimatedWrapper>
        </Card>
        <BuildInfo />
      </div>
    </div>
  );
};

export default ResultPage;
