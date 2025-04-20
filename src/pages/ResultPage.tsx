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

const ResultPage = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!primaryStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-playfair text-[#432818] mb-4">Resultados não encontrados</h1>
          <p className="text-[#8F7A6A] mb-6">Parece que você ainda não completou o quiz.</p>
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

  const getStyleCoverImage = (styleType) => {
    const styleImages = {
      Natural: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
      Clássico: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
      Contemporâneo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
      Elegante: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
      Romântico: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
      Sexy: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
      Dramático: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
      Criativo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp',
    };
    return styleImages[styleType] || styleImages['Natural'];
  };

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
        {/* BLOCO: ESTILO E DESCRIÇÃO */}
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
                Seu Estilo é {primaryStyle.category}
              </h2>
              <p className="text-[#432818] leading-relaxed">
                {styleConfig[primaryStyle.category].description}
              </p>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                <h3 className="text-lg font-medium text-[#432818] mb-2">Seus Estilos Complementares</h3>
                <SecondaryStylesSection secondaryStyles={secondaryStyles} />
              </div>
            </div>
            <div className="order-first md:order-last">
              <img
                src={getStyleCoverImage(primaryStyle.category)}
                alt={`Estilo ${primaryStyle.category}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </Card>

        {/* BLOCO: CONSCIÊNCIA E TRANSFORMAÇÃO */}
        <div className="space-y-6 mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d]">
            Você já descobriu seu Estilo e isso é muito poderoso.
          </h2>
          <p className="text-lg text-[#432818]">
            Conhecimento é clareza.<br />
            E clareza muda o jeito que você se vê, se escolhe, se posiciona.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-[#432818] leading-relaxed">
                <em>
                  Mas é na ação que a verdadeira transformação acontece. É quando você aplica o que aprendeu… que o
                  espelho começa a contar uma nova história.
                </em>
              </p>
              <p className="text-[#432818] mt-4 leading-relaxed">
                <strong>
                  Não é sobre mudar quem você é.<br />É sobre finalmente Vestir-se de Você.
                </strong>
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-[#432818] leading-relaxed">
                E pra isso, eu preparei o caminho completo.<br />Simples. Prático. Estratégico.
              </p>
              <p className="text-[#432818] mt-4 leading-relaxed">
                <strong>
                  Pra você transformar estilo em presença.<br />E imagem em poder.
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* DEMAIS BLOCOS CONTINUAM ABAIXO... */}
        {/* Inclua os blocos de: Oferta, Bônus, Depoimentos, Mentora e Garantia conforme necessário */}
      </div>
    </div>
  );
};

export default ResultPage;
