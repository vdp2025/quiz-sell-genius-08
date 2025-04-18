import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuiz } from '@/hooks/useQuiz';
import { Header } from '@/components/result/Header';
import { HeroSection } from '@/components/result/HeroSection';
import { StyleResultSection } from '@/components/result/StyleResult';
import { BenefitsSection } from '@/components/result/BenefitsSection';
import { TestimonialsSection } from '@/components/result/TestimonialsSection';
import { PricingSection } from '@/components/result/PricingSection';
import { BonusCarousel } from '@/components/result/BonusCarousel';

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const { primaryStyle, secondaryStyles } = useQuiz();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!primaryStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-playfair text-[#432818] mb-4">
            Resultados não encontrados
          </h1>
          <p className="text-[#8F7A6A] mb-6">
            Parece que você ainda não completou o quiz.
          </p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-[#B89B7A] hover:bg-[#8F7A6A] text-white rounded-md transition-colors"
          >
            Fazer o Quiz
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header primaryStyle={primaryStyle} />
      
      <HeroSection 
        title="Transforme seu Guarda-Roupa com Autoconhecimento"
        subtitle="Descubra como se vestir de acordo com sua personalidade e estilo único"
        image="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp"
        cta={{
          text: "Quero Transformar Meu Estilo",
          url: "#pricing"
        }}
      />

      <StyleResultSection 
        primaryStyle={primaryStyle}
        description={styleDescription}
        image="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp"
      />

      <BenefitsSection 
        title="O que você vai conquistar?"
        benefits={benefits}
      />

      <BonusCarousel bonuses={bonuses} />

      <TestimonialsSection 
        title="O que nossas clientes dizem"
        testimonials={testimonials}
      />

      <PricingSection 
        regularPrice={197}
        salePrice={39}
        installments={{
          number: 12,
          value: 3.25
        }}
        ctaText="Quero Transformar Meu Estilo"
        ctaUrl="https://pay.hotmart.com/..."
        guaranteeText="Garantia de 7 dias ou seu dinheiro de volta"
      />
    </div>
  );
};

export default ResultPage;
