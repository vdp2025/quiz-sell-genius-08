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

export const ResultPage = () => {
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
          <a href="/" className="inline-block px-6 py-3 bg-[#B89B7A] hover:bg-[#8F7A6A] text-white rounded-md transition-colors">
            Fazer o Quiz
          </a>
        </div>
      </div>
    );
  }

  const getStyleCoverImage = (styleType) => {
    const styleImages = {
      'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
      'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
      'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
      'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
      'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
      'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
      'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
      'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp'
    };
    return styleImages[styleType] || styleImages['Natural'];
  };

  return (
    <div
      className="min-h-screen bg-[#fffaf7]"
      style={{
        backgroundColor: globalStyles.backgroundColor || '#fffaf7',
        color: globalStyles.textColor || '#432818',
        fontFamily: globalStyles.fontFamily || 'inherit'
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
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
                Seu Estilo é {primaryStyle.category}
              </h2>
              <p className="text-[#432818] leading-relaxed">
                {styleConfig[primaryStyle.category]?.description}
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
          <div className="mt-8">
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp"
              alt="Guia de Estilo e Imagem"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </Card>

        <Card className="p-6 mb-10 bg-[#fff7f3] shadow-md border border-[#B89B7A]/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-playfair text-[#aa6b5d]">Agora é hora da ação</h2>
            <p className="text-[#432818]">Você deu o primeiro passo ao descobrir seu estilo. Mas é aplicando esse conhecimento que a transformação acontece.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"
              alt="Guia e Bônus"
              className="w-full md:w-1/2 rounded-lg shadow-md"
            />
            <div className="flex-1 space-y-4">
              <ul className="space-y-2">
                {["Looks com intenção, não improviso","Use cores/modelagens a seu favor","Alinhe imagem e objetivos","Evite compras por impulso com estratégia"].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#aa6b5d] mt-1 mr-2" />
                    <span className="text-[#432818]">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <p className="text-sm text-[#432818]/60 line-through">De R$ 175,00</p>
                <p className="text-3xl font-bold text-[#aa6b5d]">Por R$ 39,00</p>
                <Button
                  onClick={() => window.location.href = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"}
                  className="mt-4 bg-[#aa6b5d] hover:bg-[#8f574a] text-white px-8 py-4 text-lg rounded-md"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" /> Quero meu Guia + Bônus
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-6 text-center">
            💬 O que quem já passou por aqui está dizendo:
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              text: "Antes, a roupa me vestia. Hoje, eu me visto de propósito. A consultoria me fez dar vida à mulher que sempre existiu em mim.",
              name: "Mariangela",
              role: "Engenheira"
            }, {
              text: "Aprendi a me valorizar e a dar valor para a imagem que transmito. As pessoas começaram a me olhar diferente — porque eu estava diferente.",
              name: "Patrícia Paranhos",
              role: "Advogada"
            }, {
              text: "A Gisele me ensinou a entender o que comunico com as roupas. Hoje compro com consciência, estilo e propósito.",
              name: "Sônia Spier",
              role: "Terapeuta"
            }].map((testimonial, index) => (
              <div key={index} className="bg-[#fff7f3] p-4 rounded-lg">
                <p className="italic text-[#432818] mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-8 bg-[#aa6b5d]" />
                  <div>
                    <p className="font-medium text-[#432818]">{testimonial.name}</p>
                    <p className="text-sm text-[#432818]/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultPage;
