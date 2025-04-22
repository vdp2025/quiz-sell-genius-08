import React, { useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle, Shield } from 'lucide-react';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!primaryStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-playfair text-[#1B1411] mb-4">
            Resultados não encontrados
          </h1>
          <p className="text-[#8F7A6A] mb-6">
            Parece que você ainda não completou o quiz.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-[#C7A97C] hover:bg-[#A08361] text-white rounded-md transition-colors"
          >
            Fazer o Quiz
          </a>
        </div>
      </div>
    );
  }

  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

  return (
    <div
      className="min-h-screen bg-[#fffaf7]"
      style={{
        backgroundColor: globalStyles.backgroundColor || '#fffaf7',
        color: globalStyles.textColor || '#1B1411',
        fontFamily: globalStyles.fontFamily || 'inherit',
      }}
    >
      <Header
        primaryStyle={primaryStyle}
        logoHeight={globalStyles.logoHeight}
        logo={globalStyles.logo}
        logoAlt={globalStyles.logoAlt}
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="p-6 mb-10 bg-white shadow-lg border border-[#C7A97C]/30 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-playfair text-[#C7A97C] mb-3">
                ✨ Seu Estilo é: {category}
              </h2>
              <p className="text-base text-[#1B1411] leading-relaxed">
                {description}
              </p>
              <div className="bg-[#fffaf7] rounded-xl p-4 shadow border border-[#C7A97C]/20">
                <h3 className="text-lg font-semibold text-[#1B1411] mb-2">
                  Estilos Complementares
                </h3>
                <SecondaryStylesSection secondaryStyles={secondaryStyles} />
              </div>
            </div>
            <div className="order-first md:order-last">
              <img
                src={image}
                alt={`Estilo ${category}`}
                className="w-full h-auto rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="mt-8">
            <img
              src={guideImage}
              alt={`Guia de Estilo ${category}`}
              className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Card>

        <Card className="p-6 mb-10 bg-white shadow-lg border border-[#C7A97C]/30 rounded-2xl">
          <div className="text-center space-y-4 mb-6">
            <h2 className="text-3xl font-playfair text-[#C7A97C]">
              📘 Guia de Estilo + Bônus Exclusivos
            </h2>
            <p className="text-base text-[#1B1411]">
              Transforme seu autoconhecimento em imagem com intenção, confiança e estratégia.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <h3 className="text-xl font-semibold text-[#1B1411] mb-4">
                Você vai aprender:
              </h3>
              <ul className="space-y-3">
                {[
                  '✔️ Como montar looks com intenção (e não no improviso)',
                  '✔️ Usar suas cores, modelagens e tecidos a seu favor',
                  '✔️ Alinhar sua imagem com seus valores e metas',
                  '✔️ Criar um guarda-roupa funcional e estratégico',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#C7A97C] mt-0.5 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp"
                alt="Mockup Guia de Estilo"
                className="w-full h-auto rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#fffaf7] p-4 rounded-xl shadow">
              <h4 className="font-medium text-[#1B1411] mb-2">
                🎁 Peças-chave do Guarda-Roupa de Sucesso
              </h4>
              <p className="text-sm text-[#1B1411]/80 mb-4">
                Guia visual com os itens estratégicos para montar looks com autenticidade e praticidade.
              </p>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"
                alt="Peças-chave"
                className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="bg-[#fffaf7] p-4 rounded-xl shadow">
              <h4 className="font-medium text-[#1B1411] mb-2">
                🎁 Mini Guia de Visagismo Facial
              </h4>
              <p className="text-sm text-[#1B1411]/80 mb-4">
                Como alinhar seu rosto, cabelo e maquiagem com sua identidade visual.
              </p>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp"
                alt="Visagismo Facial"
                className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mb-6">
            <div className="text-center md:text-right">
              <p className="text-sm text-[#1B1411]/60 mb-1">Valor Total</p>
              <p className="text-xl line-through text-[#1B1411]/60">R$ 175,00</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#C7A97C] mb-1">Oferta especial</p>
              <p className="text-3xl font-bold text-[#C7A97C]">R$ 39,00</p>
            </div>
          </div>
          <Button
            onClick={() =>
              (window.location.href =
                'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912')
            }
            className="w-full max-w-xl mx-auto text-white py-6 text-lg rounded-xl bg-[#C7A97C] hover:bg-[#A08361] hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Quero meu Guia + Bônus por R$39,00
          </Button>
        </Card>

        <Card className="p-6 mb-10 bg-white shadow-lg border border-[#C7A97C]/30 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/4 flex justify-center">
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp"
                alt="Garantia de 7 dias"
                className="w-32 h-32 object-contain"
              />
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-medium text-[#C7A97C] mb-2">
                🛡️ Garantia de 7 dias
              </h3>
              <p className="text-[#1B1411] mb-4">
                Você tem uma semana para acessar, aplicar e sentir. Se não fizer sentido pra você, devolvemos 100% do valor. Sem perguntas. Sem burocracia.
              </p>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-[#C7A97C] mr-2" />
                <span className="text-[#1B1411] font-medium">
                  Satisfação garantida ou seu dinheiro de volta
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultPage;
