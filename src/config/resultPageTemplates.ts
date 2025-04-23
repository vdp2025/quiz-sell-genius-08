import React, { useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { Card } from '@/components/ui/card';
import { defaultResultTemplate } from '@/config/defaultResultTemplate';
import { getStyleConfig } from '@/utils/style-utils';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';

// Template structure for the result page
export const defaultResultTemplate = {
  header: {
    type: 'header',
    content: {
      title: 'Olá, seu Estilo Predominante é:',
      subtitle: 'Conheça mais sobre seu estilo',
      showLogo: true,
    }
  },
  mainContent: {
    type: 'mainContent',
    content: {
      description: 'Você tem um estilo único que reflete sua personalidade e preferências. Aqui você encontra informações detalhadas sobre seu estilo predominante e como aproveitá-lo ao máximo.',
      showPrimaryStyle: true,
      showSecondaryStyles: true,
      mainImage: '',
      tabletImage: '',
    }
  },
  offer: {
    type: 'offer',
    content: {
      title: 'Aprimore seu estilo com nossos serviços',
      description: 'Oferecemos consultoria personalizada para ajudar você a expressar seu estilo de forma autêntica e confiante.',
      price: 'R$ 197,00',
      showPrice: true,
      ctaText: 'Quero Transformar Meu Estilo',
      ctaLink: '#oferta',
    }
  }
};

export const ResultPageTemplate: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();

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

  const { category } = primaryStyle;
  const style = getStyleConfig(category);

  // Monta o template com imagens dinâmicas
  const template = {
    ...defaultResultTemplate,
    mainContent: {
      ...defaultResultTemplate.mainContent,
      content: {
        ...defaultResultTemplate.mainContent.content,
        mainImage: style.image,
        tabletImage: style.guideImage,
      },
    },
  };

  const { header, mainContent } = template;

  return (
    <div
      className="min-h-screen bg-[#fffaf7]"
      style={{
        backgroundColor: globalStyles.backgroundColor || '#fffaf7',
        color: globalStyles.textColor || '#432818',
        fontFamily: globalStyles.fontFamily || 'inherit',
      }}
    >
      <Header
        primaryStyle={primaryStyle}
        logoHeight={globalStyles.logoHeight}
        logo={globalStyles.logo}
        logoAlt={globalStyles.logoAlt}
        title={header.content.title}
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
                {header.content.subtitle}
              </h2>
              <p className="text-[#432818] leading-relaxed">
                {mainContent.content.description}
              </p>

              {mainContent.content.showSecondaryStyles && (
                <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                  <h3 className="text-lg font-medium text-[#432818] mb-2">
                    Seus Estilos Complementares
                  </h3>
                  <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                </div>
              )}
            </div>

            <div className="order-first md:order-last space-y-4">
              <img
                src={mainContent.content.mainImage}
                alt={`Visual do Estilo ${category}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <img
                src={mainContent.content.tabletImage}
                alt={`Guia do Estilo ${category}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultPageTemplate;
