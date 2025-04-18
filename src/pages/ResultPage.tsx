
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
import { testimonials } from '@/data/testimonials';

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const { primaryStyle, secondaryStyles } = useQuiz();

  // Define the styleDescription based on primary style
  const getStyleDescription = (style: string) => {
    switch(style) {
      case 'Natural':
        return "O estilo Natural preza pelo conforto e praticidade. São peças soltas ao corpo, tecidos naturais como algodão, linho, couro e camurça. A paleta de cores é neutra, com tons terrosos e naturais. As estampas são discretas, com inspirações da natureza, étnicas ou geométricas simples.";
      case 'Clássico':
        return "O estilo Clássico é atemporal e elegante. A modelagem é tradicional, com caimento impecável. Os tecidos são nobres e de alta qualidade. A paleta de cores é sóbria, como marinho, cinza, caramelo e preto. Estampas discretas como listras, xadrez e poás pequenos são características.";
      case 'Contemporâneo':
        return "O estilo Contemporâneo é atual e elegante. São peças que unem conforto e estilo, com modelagem que valoriza o corpo sem marcar. Os tecidos são de qualidade, como lã fria, seda e algodão. A paleta de cores é neutra como preto, branco, cinza e marinho, com toques de cores da estação.";
      case 'Elegante':
        return "O estilo Elegante é sofisticado e refinado. A modelagem é impecável, com caimento perfeito. Os tecidos são nobres como seda, lã fria, cetim e cashmere. A paleta de cores é sofisticada, como branco, preto, bordô, vinho, marinho e dourado. As estampas são discretas e sofisticadas.";
      case 'Romântico':
        return "O estilo Romântico é delicado e feminino. A modelagem é fluida, com silhueta suave. Os tecidos são leves como musseline, seda, chiffon e renda. A paleta de cores é suave, com tons pastel, rosa, lilás e nude. As estampas são florais, pequenas e delicadas.";
      case 'Sexy':
        return "O estilo Sexy é sensual e ousado. A modelagem marca o corpo e valoriza as curvas. Os tecidos são justos e brilhantes como cetim, lycra, couro e renda. A paleta de cores é intensa como preto, vermelho, bordô e dourado. As estampas podem ser de animal print.";
      case 'Dramático':
        return "O estilo Dramático é marcante e moderno. A modelagem é estruturada, com cortes assimétricos e angulares. Os tecidos são encorpados e tecnológicos. A paleta de cores é contrastante, com preto, branco, cinza e cores intensas. As estampas são geométricas, abstratas ou gráficas.";
      case 'Criativo':
        return "O estilo Criativo é original e autêntico. A modelagem é diversificada, com peças únicas e diferentes. Os tecidos são variados e com texturas. A paleta de cores é colorida e mixada. As estampas são marcantes, étnicas, coloridas ou abstratas.";
      default:
        return "Seu estilo pessoal é único e reflete sua personalidade e preferências individuais. Com as orientações deste guia, você poderá criar looks que expressam quem você é de forma autêntica.";
    }
  };

  // Get the description for the primary style
  const styleDescription = primaryStyle ? getStyleDescription(primaryStyle.category) : "";

  // Define the benefits
  const benefits = [
    { text: "Economizar tempo e dinheiro ao comprar roupas que realmente combinam com você" },
    { text: "Ter mais confiança ao se vestir todos os dias" },
    { text: "Montar looks que expressam quem você realmente é" },
    { text: "Descobrir as peças-chave que valorizam seu tipo de corpo" },
    { text: "Aprender a criar combinações versáteis e autênticas" },
    { text: "Eliminar a frustração de ter um armário cheio e 'nada para vestir'" }
  ];

  // Define the bonuses
  const bonuses = [
    {
      title: "Guia de Peças-Chave",
      description: "Um guia completo com as peças essenciais para seu estilo",
      image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp",
      order: 1
    },
    {
      title: "Paleta de Cores Personalizada",
      description: "Descubra as cores que mais harmonizam com seu estilo e tom de pele",
      image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911674/Espanhol_Portugu%C3%AAs_1_-_Copia_zuhznw.webp",
      order: 2
    },
    {
      title: "Mini-curso de Combinações",
      description: "Aprenda a criar looks incríveis com as roupas que você já tem",
      image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp",
      order: 3
    }
  ];

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
        testimonials={testimonials.map(t => ({
          text: t.text,
          author: t.name,
          image: t.image
        }))}
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
