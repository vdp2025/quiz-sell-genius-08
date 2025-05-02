
import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig, getStyleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, CheckCircle, ArrowDown, Lock } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import ErrorState from '@/components/result/ErrorState';
import MotivationSection from '@/components/result/MotivationSection';
import MentorSection from '@/components/result/MentorSection';
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
import Testimonials from '@/components/quiz-result/sales/Testimonials';
import GuaranteeSection from '@/components/result/GuaranteeSection';

const ResultPage: React.FC = () => {
  // Use default values in case of missing data
  const { primaryStyle = null, secondaryStyles = [] } = useQuiz();
  const { globalStyles = {} } = useGlobalStyles();
  const { user = null } = useAuth();
  const [imagesLoaded, setImagesLoaded] = useState({ style: false, guide: false });
  const isLowPerformance = useIsLowPerformanceDevice();
  const { isLoading, completeLoading } = useLoadingState({
    minDuration: isLowPerformance ? 400 : 800,
    disableTransitions: isLowPerformance
  });

  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    if (!primaryStyle) {
      console.warn("Primary style not available");
      return;
    }

    window.scrollTo(0, 0);
    const criticalImages = [globalStyles.logo || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'];
    criticalImages.forEach(src => new Image().src = src);

    const { category = 'default' } = primaryStyle;
    // Get style configuration with proper typing
    const styleData = getStyleConfig(category);
    
    if (styleData.image) {
      const styleImg = new Image();
      styleImg.src = `${styleData.image}?q=auto:best&f=auto&w=480`;
      styleImg.onload = () => setImagesLoaded(prev => ({ ...prev, style: true }));
      styleImg.onerror = () => {
        console.error("Failed to load style image");
        setImagesLoaded(prev => ({ ...prev, style: true }));
      };
    } else {
      setImagesLoaded(prev => ({ ...prev, style: true }));
    }

    if (styleData.guideImage) {
      const guideImg = new Image();
      guideImg.src = `${styleData.guideImage}?q=auto:best&f=auto&w=640`;
      guideImg.onload = () => setImagesLoaded(prev => ({ ...prev, guide: true }));
      guideImg.onerror = () => {
        console.error("Failed to load guide image");
        setImagesLoaded(prev => ({ ...prev, guide: true }));
      };
    } else {
      setImagesLoaded(prev => ({ ...prev, guide: true }));
    }
  }, [primaryStyle, globalStyles.logo]);

  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);

  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;

  const { category = 'default' } = primaryStyle;
  // Make sure we have valid styleConfig data with proper typing
  const styleData = getStyleConfig(category);
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
      <Header 
        primaryStyle={primaryStyle} 
        logoHeight={globalStyles.logoHeight} 
        logo={globalStyles.logo} 
        logoAlt={globalStyles.logoAlt} 
        userName={userName} 
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant">
          <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
            <div className="text-center mb-8">
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">Seu estilo predominante</span>
                  <span className="text-[#aa6b5d] font-medium">{primaryStyle.percentage || 0}%</span>
                </div>
                <Progress 
                  value={primaryStyle.percentage || 0} 
                  className="h-2 bg-[#F3E8E6]" 
                  indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]" 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-[#432818] leading-relaxed">{description}</p>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10 glass-panel">
                  <h3 className="text-lg font-medium text-[#432818] mb-2">Estilos que Também Influenciam Você</h3>
                  {secondaryStyles && secondaryStyles.length > 0 ? (
                    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                  ) : (
                    <p className="text-[#8F7A6A]">Nenhum estilo secundário detectado.</p>
                  )}
                </div>
              </div>
              <div className="max-w-full mx-auto relative">
                <AspectRatio ratio={3/4} className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                  <img 
                    src={image ? `${image}?q=auto:best&f=auto&w=400` : "https://via.placeholder.com/400x533?text=Imagem+não+disponível"} 
                    alt={`Estilo ${category}`} 
                    className="w-full h-full object-cover" 
                    loading="eager" 
                    fetchPriority="high" 
                    width="400" 
                    height="533"
                    srcSet={image ? `${image}?q=auto:best&f=auto&w=400 1x, ${image}?q=auto:best&f=auto&w=800 2x` : ""}
                    sizes="(max-width: 768px) 100vw, 400px"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/400x533?text=Imagem+não+disponível";
                    }}
                  />
                </AspectRatio>
              </div>
            </div>

            {/* Larger Guide Image Display */}
            {guideImage && (
              <div className="mt-12 mx-auto relative">
                <h3 className="text-xl font-medium text-center text-[#432818] mb-4">Seu Guia de Estilo</h3>
                <AspectRatio ratio={4/5} className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 max-w-2xl mx-auto">
                  <img 
                    src={`${guideImage}?q=auto:best&f=auto&w=800`} 
                    alt={`Guia de Estilo ${category}`} 
                    loading="lazy" 
                    className="w-full h-full object-cover" 
                    width="800" 
                    height="1000"
                    srcSet={`${guideImage}?q=auto:best&f=auto&w=800 1x, ${guideImage}?q=auto:best&f=auto&w=1200 2x`}
                    sizes="(max-width: 768px) 100vw, 800px"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/800x1000?text=Guia+de+Estilo+não+disponível";
                    }}
                  />
                </AspectRatio>
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transform rotate-12">
                  Exclusivo
                </div>
              </div>
            )}
          </AnimatedWrapper>
        </Card>

        {/* Product Showcase Section */}
        <BeforeAfterTransformation />
        <MotivationSection />
        <BonusSection />
        <Testimonials />

        {/* Pricing Section without guarantee image */}
        <div className="text-center p-6 bg-[#f9f4ef] rounded-lg relative flex flex-col items-center mt-10 mb-6">
          <p className="text-sm text-[#aa6b5d] uppercase font-medium">Hoje por apenas</p>
          <div className="flex flex-col items-center justify-center gap-2 mt-1">
            <p className="text-4xl font-bold gold-text">R$ 39,00</p>
            <p className="text-xs text-[#3a3a3a]/60 mt-1">Pagamento único ou em até <strong>4x de R$ 10,86</strong><br className="block sm:hidden" /> no cartão</p>
          </div>
        </div>

        <Button 
          onClick={handleCTAClick} 
          className="text-white py-5 px-8 lg:py-6 lg:px-12 rounded-md shadow-md transition-colors btn-3d mt-6 w-full md:w-auto md:mx-auto md:block" 
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

        <SecurePurchaseElement />
        <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          <span>Oferta exclusiva nesta página</span>
        </p>

        <MentorSection />
        
        {/* Guarantee Section moved to the end */}
        <GuaranteeSection />
      </div>

      <BuildInfo />
    </div>
  );
};

export default ResultPage;
