
import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, CheckCircle, Clock } from 'lucide-react';
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

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const [imagesLoaded, setImagesLoaded] = useState({ style: false, guide: false });
  const isLowPerformance = useIsLowPerformanceDevice();
  const { isLoading, completeLoading } = useLoadingState({ 
    minDuration: isLowPerformance ? 600 : 1000,
    disableTransitions: isLowPerformance
  });

  // New state for button animation
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);
    const { category } = primaryStyle;
    const { image, guideImage } = styleConfig[category];
    const styleImg = new Image();
    styleImg.src = `${image}?q=100&f=auto`;
    styleImg.onload = () => setImagesLoaded(prev => ({ ...prev, style: true }));
    const guideImg = new Image();
    guideImg.src = `${guideImage}?q=100&f=auto`;
    guideImg.onload = () => setImagesLoaded(prev => ({ ...prev, guide: true }));
    if (globalStyles.logo) {
      const logoImg = new Image();
      logoImg.src = globalStyles.logo;
    }
  }, [primaryStyle, globalStyles.logo]);

  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);

  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;

  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

  const handleCTAClick = () => {
    // Track checkout initiation
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
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
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <Header primaryStyle={primaryStyle} logoHeight={globalStyles.logoHeight} logo={globalStyles.logo} logoAlt={globalStyles.logoAlt} />

      {/* Urgency Bar */}
      <div className="bg-[#432818] text-white py-2 px-4 text-center">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 animate-pulse" />
          <p className="text-sm font-medium">Oferta especial por tempo limitado - Aproveite enquanto está disponível!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant">
          <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
            <div className="text-center mb-8">
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">Seu Estilo em Destaque</span>
                  <span className="text-[#aa6b5d] font-medium">{primaryStyle.percentage}%</span>
                </div>
                <Progress value={primaryStyle.percentage} className="h-2 bg-[#F3E8E6]" indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={400}>
                  <p className="text-[#432818] leading-relaxed">{description}</p>
                </AnimatedWrapper>
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={600}>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10 glass-panel">
                    <h3 className="text-lg font-medium text-[#432818] mb-2">Estilos que Também Influenciam Você</h3>
                    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                  </div>
                </AnimatedWrapper>
                <Button 
                  onClick={handleCTAClick} 
                  className="w-full mt-4 text-white py-4"
                  style={{
                    background: "linear-gradient(to right, #aa6b5d, #B89B7A)"
                  }}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
                    Descobrir Meu Guia Completo
                  </span>
                </Button>
              </div>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'scale'} show={true} duration={500} delay={500}>
                <div className="max-w-[340px] mx-auto relative">
                  <img 
                    src={`${image}?q=100&f=auto`} 
                    alt={`Estilo ${category}`} 
                    className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
                  />
                  {/* Elegant decorative corner */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#B89B7A]"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#B89B7A]"></div>
                </div>
              </AnimatedWrapper>
            </div>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={800}>
              <div className="mt-8 max-w-[540px] mx-auto relative">
                <img 
                  src={`${guideImage}?q=100&f=auto`} 
                  alt={`Guia de Estilo ${category}`} 
                  loading="lazy" 
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
                />
                {/* Elegant badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transform rotate-12">
                  Exclusivo
                </div>
              </div>
            </AnimatedWrapper>
          </AnimatedWrapper>
        </Card>

        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={900}>
          <MotivationSection />
        </AnimatedWrapper>

        {/* Before/After Transformation Section */}
        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={950}>
          <BeforeAfterTransformation />
        </AnimatedWrapper>

        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={1000}>
          <div className="text-center my-6">
            <Button 
              onClick={handleCTAClick} 
              className="text-white py-4 px-6 rounded-md btn-pulse"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              style={{
                background: "linear-gradient(to right, #4CAF50, #45a049)",
                boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)"
              }}
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
                Quero meu Guia de Estilo Agora - R$39,00
              </span>
            </Button>

            <p className="text-sm text-[#aa6b5d] mt-3">
              ⏳ Oferta exclusiva por tempo limitado
            </p>
          </div>
        </AnimatedWrapper>

        {/* Bonus Section */}
        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={1050}>
          <BonusSection />
        </AnimatedWrapper>

        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={1100}>
          <Testimonials />
        </AnimatedWrapper>

        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={1150}>
          <MentorSection />
          <GuaranteeSection />
        </AnimatedWrapper>

        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={1200}>
          <div className="text-center mt-10">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
              Vista-se de Você — na Prática
            </h2>
            <div className="elegant-divider"></div>
            <p className="text-[#432818] mb-6 max-w-xl mx-auto">
              Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção. 
              O Guia da Gisele Galvão foi criado para mulheres como você — que querem se vestir 
              com autenticidade e transformar sua imagem em ferramenta de poder.
            </p>

            <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-6 rounded-lg mb-6 border border-[#B89B7A]/10 glass-panel">
              <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">O Guia de Estilo e Imagem + Bônus Exclusivos</h3>
              <ul className="space-y-3 text-left max-w-xl mx-auto text-[#432818]">
                {[
                  "Looks com intenção e identidade",
                  "Cores, modelagens e tecidos a seu favor",
                  "Imagem alinhada aos seus objetivos",
                  "Guarda-roupa funcional, sem compras por impulso"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center text-white mr-2 mt-0.5">
                      <CheckCircle className="h-3 w-3" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Value Stack Section (Dynamic Pricing Table) */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20 card-elegant mb-8 max-w-md mx-auto">
              <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">O Que Você Recebe Hoje</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                  <span>Guia Principal</span>
                  <span className="font-medium">R$ 97,00</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                  <span>Bônus - Peças-chave</span>
                  <span className="font-medium">R$ 49,00</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                  <span>Bônus - Visagismo Facial</span>
                  <span className="font-medium">R$ 29,00</span>
                </div>
                <div className="flex justify-between items-center p-2 pt-3 font-bold">
                  <span>Valor Total</span>
                  <div className="relative">
                    <span>R$ 175,00</span>
                    <div className="absolute -top-2 left-0 right-0 border-t-2 border-[#ff5a5a] transform -rotate-[8deg]"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-[#f9f4ef] rounded-lg">
                <p className="text-sm text-[#aa6b5d] uppercase font-medium">Hoje por apenas</p>
                <p className="text-4xl font-bold gold-text">R$ 39,00</p>
                <p className="text-xs text-[#3a3a3a]/60 mt-1">Pagamento único</p>
              </div>
            </div>

            <Button 
              onClick={handleCTAClick} 
              className="text-white py-5 px-8 rounded-md text-lg shadow-md transition-colors btn-3d"
              style={{
                background: "linear-gradient(to right, #4CAF50, #45a049)",
                boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)"
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
                Garantir Meu Guia + Bônus Especiais
              </span>
            </Button>

            <p className="text-sm text-[#aa6b5d] mt-3">
              ⏳ Oferta exclusiva nesta página. Se sair, ela desaparece.
            </p>
          </div>
        </AnimatedWrapper>
      </div>

      <BuildInfo />
    </div>
  );
};

export default ResultPage;
