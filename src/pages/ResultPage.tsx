// quiz-sell-genius/src/pages/ResultPage.tsx
import React, { useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { EditorButton } from '@/components/ui/EditorButton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle, Shield } from 'lucide-react';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';

const getStyleCoverImage = (styleType: string): string => {
  const styleImages: Record<string, string> = {
    'Natural':
      'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
    'Clássico':
      'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
    'Contemporâneo':
      'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
    'Elegante':
      'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
    'Romântico':
      'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
    'Sexy':
      'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
    'Dramático':
      'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
    'Criativo':
      'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp',
  };
  return styleImages[styleType] || styleImages['Natural'];
};

export const ResultPage: React.FC = () => {
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

  return (
    <div
      className="min-h-screen bg-[#fffaf7]"
      style={{
        backgroundColor: globalStyles.backgroundColor || '#fffaf7',
        color: globalStyles.textColor || '#432818',
        fontFamily: globalStyles.fontFamily || 'inherit',
      }}
    >
      <EditorButton />

      <Header
        primaryStyle={primaryStyle}
        logoHeight={globalStyles.logoHeight}
        logo={globalStyles.logo}
        logoAlt={globalStyles.logoAlt}
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Resultado principal */}
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Descrição e complementares */}
            <div className="space-y-4">
              <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
                Seu Estilo é {primaryStyle.category}
              </h2>
              <p className="text-[#432818] leading-relaxed">
                {styleConfig[primaryStyle.category].description}
              </p>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                <h3 className="text-lg font-medium text-[#432818] mb-2">
                  Seus Estilos Complementares
                </h3>
                <SecondaryStylesSection secondaryStyles={secondaryStyles} />
              </div>
            </div>

            {/* Imagem representativa */}
            <div className="order-first md:order-last">
              <img
                src={styleConfig[primaryStyle.category].image}
                alt={`Estilo ${primaryStyle.category}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Guia de Estilo (segundo link) */}
          <div className="mt-8">
            <img
              src={getStyleCoverImage(primaryStyle.category)}
              alt={`Guia de Estilo ${primaryStyle.category}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </Card>

        {/* Call to Action + Oferta */}
        <Card className="p-6 mb-10 bg-[#fff7f3] shadow-md border border-[#B89B7A]/20">
          <div className="text-center space-y-4 mb-6">
            <h2 className="text-2xl font-playfair text-[#aa6b5d]">
              ⏳ Oferta válida apenas nesta página
            </h2>
            <p className="text-[#432818]">
              Essa condição especial com os dois bônus é exclusiva para quem
              acabou de fazer o teste de estilo. Se sair da página, ela pode não
              estar mais disponível.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mb-6">
            <div className="text-center md:text-right">
              <p className="text-sm text-[#432818]/60 mb-1">Valor Total</p>
              <p className="text-xl line-through text-[#432818]/60">
                R$ 175,00
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#aa6b5d] mb-1">Oferta especial</p>
              <p className="text-3xl font-bold text-[#aa6b5d]">R$ 39,00</p>
            </div>
          </div>

          <Button
            onClick={() =>
              (window.location.href =
                'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912')
            }
            className="w-full max-w-xl mx-auto text-white py-6 text-lg rounded-md bg-brand-gold"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Quero meu Guia + Bônus por R$39,00
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ResultPage;