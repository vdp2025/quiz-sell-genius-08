<<<<<<< HEAD
﻿
=======
>>>>>>> 1536c934da19267d874eb3db76aa0734c71d7cd9
import React, { useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
<<<<<<< HEAD
import { Progress } from '@/components/ui/progress';
=======
import { EditorButton } from '@/components/ui/EditorButton';
>>>>>>> 4d31a4e3180b07eda5f6207bf7f618722a91b0e6
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
<<<<<<< HEAD
import ErrorState from '@/components/result/ErrorState';
import MotivationSection from '@/components/result/MotivationSection';
import MentorSection from '@/components/result/MentorSection';
import GuaranteeSection from '@/components/result/GuaranteeSection';
import ProductShowcase from '@/components/quiz-result/sales/ProductShowcase';
import BenefitList from '@/components/quiz-result/sales/BenefitList';
import Testimonials from '@/components/quiz-result/sales/Testimonials';
=======
>>>>>>> 4d31a4e3180b07eda5f6207bf7f618722a91b0e6

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles, quizResult } = useQuiz();
  const { globalStyles } = useGlobalStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("ResultPage mounted. Quiz result:", quizResult);
  }, [quizResult]);

<<<<<<< HEAD
  if (!primaryStyle) {
<<<<<<< HEAD
=======
  if (!quizResult) {
    console.log("No quiz result found, showing error state");
>>>>>>> 1536c934da19267d874eb3db76aa0734c71d7cd9
    return <ErrorState />;
=======
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
>>>>>>> 4d31a4e3180b07eda5f6207bf7f618722a91b0e6
  }

  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category] || {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp",
    guideImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp",
    description: "Descrição não disponível para este estilo."
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
<<<<<<< HEAD
=======
      <EditorButton />

>>>>>>> 4d31a4e3180b07eda5f6207bf7f618722a91b0e6
      <Header
        primaryStyle={primaryStyle}
        logoHeight={globalStyles.logoHeight}
        logo={globalStyles.logo}
        logoAlt={globalStyles.logoAlt}
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Estilo Principal */}
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
<<<<<<< HEAD
          <AnimatedWrapper show={true}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
                Seu Estilo Ã© {category}
              </h2>
              
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">Porcentagem de compatibilidade</span>
                  <span className="text-[#aa6b5d] font-medium">{primaryStyle.percentage}%</span>
                </div>
                <Progress 
                  value={primaryStyle.percentage} 
                  className="h-2 bg-[#F3E8E6]"
                  indicatorClassName="bg-[#B89B7A]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-[#432818] leading-relaxed">{description}</p>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                  <h3 className="text-lg font-medium text-[#432818] mb-2">
                    Seus Estilos Complementares
                  </h3>
                  <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                </div>
              </div>
              <div>
                <img
                  src={image}
                  alt={`Estilo ${category}`}
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="mt-8">
              <img
                src={guideImage}
                alt={`Guia de Estilo ${category}`}
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </AnimatedWrapper>
        </Card>

        <MotivationSection />

        {/* Oferta + BÃ´nus */}
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3">
              O Guia de Estilo e Imagem + BÃ´nus Exclusivos
=======
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
                Seu Estilo é {category}
              </h2>
              <p className="text-[#432818] leading-relaxed">{description}</p>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                <h3 className="text-lg font-medium text-[#432818] mb-2">
                  Seus Estilos Complementares
                </h3>
                <SecondaryStylesSection secondaryStyles={secondaryStyles} />
              </div>
            </div>
            <div>
              <img
                src={image}
                alt={`Estilo ${category}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
          <div className="mt-8">
            <img
              src={guideImage}
              alt={`Guia ${category}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </Card>

        {/* Motivação */}
        <div className="text-center mb-10 space-y-4">
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
                  Mas é na ação que a verdadeira transformação acontece.
                  É quando você aplica o que aprendeu… que o espelho começa a
                  contar uma nova história.
                </em>
              </p>
              <p className="text-[#432818] mt-4 leading-relaxed">
                <strong>
                  Não é sobre mudar quem você é.<br />
                  É sobre finalmente Vestir-se de Você.
                </strong>
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-[#432818] leading-relaxed">
                E pra isso, eu preparei o caminho completo.<br />
                Simples. Prático. Estratégico.
              </p>
              <p className="text-[#432818] mt-4 leading-relaxed">
                <strong>
                  Pra você transformar estilo em presença.<br />
                  E imagem em poder.
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* Oferta + Bônus */}
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3">
              O Guia de Estilo e Imagem + Bônus Exclusivos
>>>>>>> 4d31a4e3180b07eda5f6207bf7f618722a91b0e6
            </h2>
            <p className="text-[#432818]">
              Criado para mulheres que querem muito mais do que "saber seu
              estilo".<br />
<<<<<<< HEAD
              Esse guia Ã© pra quem estÃ¡ pronta pra viver seu estilo na prÃ¡tica
              â€” com consciÃªncia, direÃ§Ã£o e autenticidade.
            </p>
          </div>

          <ProductShowcase />

          <div className="bg-[#fff7f3] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-medium text-[#aa6b5d] mb-4 text-center">
              E ainda recebe 2 bÃ´nus poderosos:
=======
              Esse guia é pra quem está pronta pra viver seu estilo na prática
              — com consciência, direção e autenticidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <h3 className="text-xl font-medium text-[#432818] mb-4">
                Você vai aprender:
              </h3>
              <ul className="space-y-3">
                {[
                  'Como montar looks com intenção (e não no improviso)',
                  'Como usar suas cores, modelagens e tecidos a seu favor',
                  'Como alinhar sua imagem com seus valores e objetivos',
                  'Como parar de comprar por impulso e montar um guarda-roupa funcional',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#aa6b5d] mt-0.5 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp"
                alt="Guia de Estilo - 3 Revistas"
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          </div>

          <div className="bg-[#fff7f3] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-medium text-[#aa6b5d] mb-4 text-center">
              E ainda recebe 2 bônus poderosos:
>>>>>>> 4d31a4e3180b07eda5f6207bf7f618722a91b0e6
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#432818] mb-2">
                  PeÃ§as-chave do Guarda-Roupa de Sucesso
                </h4>
                <p className="text-sm text-[#432818]/80 mb-4">
                  Itens essenciais que descomplicam a rotina e valorizam o seu
                  estilo pessoal.
                </p>
                <img
<<<<<<< HEAD
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp"
                  alt="PeÃ§as-chave do Guarda-Roupa"
=======
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"
                  alt="Peças-chave do Guarda-Roupa"
>>>>>>> 4d31a4e3180b07eda5f6207bf7f618722a91b0e6
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#432818] mb-2">
                  Mini Guia de Visagismo Facial
                </h4>
                <p className="text-sm text-[#432818]/80 mb-4">
                  Para alinhar seu rosto, cabelo e maquiagem com a sua
                  identidade visual.
                </p>
                <img
<<<<<<< HEAD
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp"
=======
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp"
>>>>>>> 4d31a4e3180b07eda5f6207bf7f618722a91b0e6
                  alt="Mini Guia de Visagismo Facial"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"
<<<<<<< HEAD
              alt="Todos os produtos e bÃ´nus"
=======
              alt="Todos os produtos e bônus"
>>>>>>> 4d31a4e3180b07eda5f6207bf7f618722a91b0e6
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="bg-[#fff7f3] p-6 rounded-lg text-center">
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
<<<<<<< HEAD
              className="w-full max-w-xl mx-auto text-white py-6 text-lg rounded-md bg-brand-gold hover:bg-[#A38A69] transition-colors"
=======
              className="w-full max-w-xl mx-auto text-white py-6 text-lg rounded-md bg-brand-gold"
>>>>>>> 4d31a4e3180b07eda5f6207bf7f618722a91b0e6
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Quero meu Guia + BÃ´nus por R$39,00
            </Button>
            <p className="text-sm text-[#aa6b5d] mt-4">
              â³ Oferta vÃ¡lida apenas nesta pÃ¡gina
            </p>
          </div>
        </Card>

<<<<<<< HEAD
        <Testimonials />
        <MentorSection />
        <GuaranteeSection />
=======
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-6 text-center">
            💬 Depoimentos de mulheres que já viveram essa transformação:
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text:
                  'Antes, a roupa me vestia. Hoje, eu me visto de propósito. A consultoria me  
                  fez dar vida à mulher que sempre existiu em mim.',
                name: 'Mariangela',
                role: 'Engenheira',
              },
              {
                text:
                  'Aprendi a me valorizar e a dar valor para a imagem que transmito. As pessoas  
                  começaram a me olhar diferente — porque eu estava diferente.',
                name: 'Patrícia Paranhos',
                role: 'Advogada',
              },
              {
                text:
                  'A Gisele me ensinou a entender o que comunico com as roupas. Hoje compro com  
                  consciência, estilo e propósito.',
                name: 'Sônia Spier',
                role: 'Terapeuta',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-[#fff7f3] p-4 rounded-lg">
                <p className="italic text-[#432818] mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-8 bg-[#aa6b5d]"></div>
                  <div>
                    <p className="font-medium text-[#432818]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[#432818]/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <img
              src="https://res.cloudinary.com/dzt2fe3ij/image/upload/v1745104587/Captura_de_tela_2025-03-31_034319_peuoc8.webp"
              alt="Antes e Depois"
              className="w-full h-auto rounded-lg mt-6"
            />
          </div>
        </Card>

        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-6 text-center">
            Sobre sua mentora
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-medium text-[#432818] mb-2">
                Gisele Galvão
              </h3>
              <p className="text-[#432818] mb-4">
                Consultora de Imagem e Estilo, Personal Branding, Estrategista de  
                Marca pessoal e Especialista em coloração pessoal com Certificação  
                internacional.
              </p>
              <p className="text-[#432818] mb-4">
                Advogada de formação. Mãe da Victória, esposa do Fabrício.
              </p>
              <p className="text-[#432818]">
                Apaixonada pela vida, pelos detalhes, viagens e tudo que me  
                proporcione crescer como ser humano. Colérica, virginiana, paciente,  
                pacificadora e muito empata.
              </p>
            </div>
            <div className="space-y-6">
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp"
                alt="Gisele Galvão"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/4 flex justify-center">
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp"
                alt="Garantia de 7 dias"
                className="w-32 h-32 object-contain"
              />
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-medium text-[#aa6b5d] mb-2">
                🛡️ Garantia de 7 dias
              </h3>
              <p className="text-[#432818] mb-4">
                Você tem uma semana para acessar o conteúdo completo, testar e  
                aplicar. Se não fizer sentido pra você, devolvemos 100% do seu  
                investimento. Sem burocracia.
              </p>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-[#aa6b5d] mr-2" />
                <span className="text-[#432818] font-medium">
                  Satisfação garantida ou seu dinheiro de volta
                </span>
              </div>
            </div>
          </div>
        </Card>
>>>>>>> 4d31a4e3180b07eda5f6207bf7f618722a91b0e6
      </div>
    </div>
  );
};

export default ResultPage;
