import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { EditorButton } from '@/components/ui/EditorButton';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import ErrorState from '@/components/result/ErrorState';
import MotivationSection from '@/components/result/MotivationSection';
import MentorSection from '@/components/result/MentorSection';
import ProductShowcase from '@/components/quiz-result/sales/ProductShowcase';
import BenefitList from '@/components/quiz-result/sales/BenefitList';
import Testimonials from '@/components/quiz-result/sales/Testimonials';
import { Button } from '@/components/ui/button';

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();

  if (!primaryStyle) {
    return <ErrorState />;
  }

  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

  return (
    <div
      className="min-h-screen bg-[#fffaf7]"
      style={{
        backgroundColor: globalStyles.backgroundColor || '#fffaf7',
      }}
    >
      <AnimatedWrapper>
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <Card className="p-6 mb-8 shadow-lg">
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-primary mb-2">
                  Seu Estilo Principal: {primaryStyle.name}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <img
                    src={image}
                    alt={`Estilo ${primaryStyle.name}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <img
                    src={guideImage}
                    alt="Guia de Estilo"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-12">
            <SecondaryStylesSection styles={secondaryStyles} />
            <MotivationSection />
            <MentorSection />
            
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <ProductShowcase />
              <BenefitList />
              <Testimonials />
              
              <div className="mt-12 text-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Comprar Agora
                </Button>
              </div>
            </section>
          </div>
        </main>
      </AnimatedWrapper>
    </div>
  );
};

export default ResultPage;