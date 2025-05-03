import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Lock, CheckCircle, ArrowDown } from 'lucide-react';
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

  const { category, percentage } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

  const handleCTAClick = () => {
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
      <Header
        primaryStyle={primaryStyle}
        logoHeight={globalStyles.logoHeight}
        logo={globalStyles.logo}
        logoAlt={globalStyles.logoAlt}
        userName={user?.userName}
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant">
          <AnimatedWrapper animation="fade" show={true} duration={400} delay={200}>
            <div className="text-center mb-8">
              <span className="text-sm text-[#8F7A6A]">Seu estilo predominante</span>
              <span className="block text-[#aa6b5d] font-medium text-lg">{percentage}%</span>
              <Progress value={percentage} className="h-2 mt-2 bg-[#F3E8E6]" indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <img src={`${image}?q=auto:best&f=auto&w=238`} alt="Estilo" className="rounded-lg shadow-md w-full" />
              <p className="text-[#432818] leading-relaxed">{description}</p>
            </div>

            <div className="mt-8 max-w-[540px] mx-auto">
              <img src={`${guideImage}?q=auto:best&f=auto&w=540`} alt="Guia de Estilo" className="rounded-lg shadow-md w-full" />
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper animation="fade" show={true} duration={400} delay={300}>
            <SecondaryStylesSection secondaryStyles={secondaryStyles} />
          </AnimatedWrapper>

          <AnimatedWrapper animation="fade" show={true} duration={400} delay={400}>
            <BeforeAfterTransformation />
          </AnimatedWrapper>
          <AnimatedWrapper animation="fade" show={true} duration={400} delay={450}>
            <MotivationSection />
          </AnimatedWrapper>
          <AnimatedWrapper animation="fade" show={true} duration={400} delay={500}>
            <BonusSection />
          </AnimatedWrapper>
          <AnimatedWrapper animation="fade" show={true} duration={400} delay={550}>
            <Testimonials />
          </AnimatedWrapper>
          <AnimatedWrapper animation="fade" show={true} duration={400} delay={600}>
            <GuaranteeSection />
          </AnimatedWrapper>
          <AnimatedWrapper animation="fade" show={true} duration={400} delay={650}>
            <MentorSection />
          </AnimatedWrapper>

          <AnimatedWrapper animation="fade" show={true} duration={400} delay={700}>
            <div className="text-center my-10">
              <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
                Vista-se de Você — na Prática
              </h2>
              <p className="text-[#432818] mb-6 max-w-xl mx-auto">
                Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção. O Guia da Gisele Galvão foi criado para mulheres como você — que querem se vestir com autenticidade e transformar sua imagem em ferramenta de poder.
              </p>
              <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-6 rounded-lg mb-6 border border-[#B89B7A]/10">
                <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">O Guia de Estilo e Imagem + Bônus Exclusivos</h3>
                <ul className="space-y-3 text-left max-w-xl mx-auto text-[#432818]">
                  {["Looks com intenção e identidade", "Cores, modelagens e tecidos a seu favor", "Imagem alinhada aos seus objetivos", "Guarda-roupa funcional, sem compras por impulso"].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center text-white mr-2 mt-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20 mb-8 max-w-md mx-auto">
                <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">O Que Você Recebe Hoje</h3>
                <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp" alt="Oferta Visual" className="mx-auto mb-4 rounded-lg shadow-sm w-full h-auto" />
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
              <Button onClick={handleCTAClick} className="text-white py-5 px-8 rounded-md shadow-md transition-transform duration-500 ease-in-out hover:scale-105 btn-cta-green mb-2" style={{ background: "linear-gradient(to right, #4CAF50, #45a049)", boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)", fontSize: "1rem" }} onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)}>
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
            </div>
          </AnimatedWrapper>
        </Card>
        <BuildInfo />
      </div>
    </div>
  );
};

export default ResultPage;
