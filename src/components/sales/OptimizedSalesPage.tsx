
import React, { useState, useEffect } from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, CheckCircle, Star, Heart, Shield, Clock } from 'lucide-react';
import Logo from '@/components/ui/logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { OfferContent } from '@/types/resultPageConfig';
import { trackSaleConversion } from '@/utils/analytics';

interface OptimizedSalesPageProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  config?: OfferContent;
}

const OptimizedSalesPage: React.FC<OptimizedSalesPageProps> = ({ 
  primaryStyle, 
  secondaryStyles,
  config = {}
}) => {
  const [userName, setUserName] = useState<string>('Visitante');
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  // Get user name from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Countdown timer for urgency
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Defaults with fallbacks
  const title = config?.title || `DESCUBRA O PODER DO SEU ESTILO ${primaryStyle.category.toUpperCase()}`;
  const subtitle = config?.subtitle || `${userName}, transforme sua imagem e sua confiança com nosso guia personalizado`;
  const regularPrice = config?.regularPrice || "175,00";
  const salePrice = config?.price || "39,00";
  const ctaText = config?.ctaText || `QUERO TRANSFORMAR MEU ESTILO ${primaryStyle.category.toUpperCase()} AGORA`;
  const ctaUrl = config?.ctaUrl || "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912";
  
  const handleBuyClick = () => {
    trackSaleConversion(parseFloat(salePrice.replace(',', '.')));
    window.location.href = ctaUrl;
  };

  return (
    <ScrollArea className="h-[calc(100vh-80px)]">
      <div className="bg-[#fffaf7] min-h-screen">
        {/* Header with Logo */}
        <header className="bg-white py-4 sticky top-0 z-10 border-b border-[#aa6b5d]/10 shadow-sm">
          <div className="container mx-auto flex justify-between items-center px-4">
            <Logo className="h-12 md:h-16" />
            <Button 
              className="bg-[#aa6b5d] hover:bg-[#8f574a] text-white px-4 py-2"
              onClick={handleBuyClick}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Comprar Agora
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Hero Section with Pain Points */}
          <section className="mb-12">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-playfair text-[#aa6b5d] mb-3">
                {title}
              </h1>
              <p className="text-xl text-[#432818]">
                {subtitle}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-[#aa6b5d]/10">
              <h2 className="text-2xl font-semibold text-[#432818] mb-4">Você se identifica com alguma dessas dificuldades?</h2>
              
              <div className="space-y-3">
                {[
                  "Tem um guarda-roupa cheio de roupas, mas sente que não tem o que vestir",
                  "Desperdiça dinheiro comprando peças que nunca usa",
                  "Não sabe quais cores e modelagens valorizam seu tipo físico",
                  "Sente que suas roupas não expressam quem você realmente é",
                  "Perde tempo todos os dias decidindo o que vestir"
                ].map((pain, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#aa6b5d]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#aa6b5d]" />
                    </div>
                    <p className="text-[#3a3a3a]">{pain}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp"
                  alt="Resultado do Quiz Visagismo"
                  className="rounded-lg shadow-lg w-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-playfair text-[#aa6b5d]">
                  Seu Estilo Predominante é <span className="font-bold">{primaryStyle.category}</span>
                </h2>
                <p className="text-[#432818]">
                  {getStyleDescription(primaryStyle.category)}
                </p>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-[#aa6b5d] flex items-center justify-center text-white font-bold text-xl">
                      {primaryStyle.percentage}%
                    </div>
                    <div>
                      <h3 className="font-medium">Compatibilidade com seu perfil</h3>
                      <p className="text-sm text-[#432818]/70">Resultado baseado nas suas respostas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Offer Card with Animation */}
          <Card className="p-6 md:p-8 border-[#aa6b5d]/20 mb-10 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-6 text-center">
              Guia de Estilo {primaryStyle.category} + Bônus Exclusivos
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <img
                  src={config?.allProductsImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"}
                  alt="Mockup do Guia de Estilo"
                  className="rounded-lg shadow-md w-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">
                  O que você vai receber:
                </h3>
                <ul className="space-y-3 mb-6">
                  {[
                    "Guia completo do seu estilo predominante",
                    "Paleta de cores personalizada para seu tom de pele",
                    "Lista de peças essenciais para seu estilo",
                    "Combinações certeiras para qualquer ocasião",
                    "Acesso vitalício a atualizações"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#aa6b5d] mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                  <div className="text-center">
                    <p className="text-sm text-[#3a3a3a]/60 mb-1">Valor original</p>
                    <p className="text-lg line-through text-[#3a3a3a]/70">
                      R$ {regularPrice}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-[#aa6b5d] mb-1">Por apenas</p>
                    <p className="text-3xl font-bold text-[#aa6b5d]">
                      R$ {salePrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Timer for Urgency */}
            <div className="bg-[#fff7f3] p-4 rounded-lg mb-6 border border-[#aa6b5d]/10">
              <div className="flex items-center justify-center gap-2">
                <Clock className="text-[#aa6b5d] w-5 h-5" />
                <p className="text-[#aa6b5d] font-medium">
                  Oferta especial expira em: 
                  <span className="ml-1 font-bold">
                    {timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
                  </span>
                </p>
              </div>
            </div>

            <Button 
              onClick={handleBuyClick}
              className="w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-6 rounded-md text-lg transition-all duration-300 hover:scale-105 hover:shadow-md animate-pulse"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {ctaText}
            </Button>

            {/* Payment Methods */}
            <div className="mt-4 text-center">
              <p className="text-sm text-[#3a3a3a]/70 mb-2">Formas de pagamento</p>
              <div className="flex justify-center gap-3 items-center">
                <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745574786/visa_qz7jio.png" alt="Visa" className="h-6" />
                <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745574787/mastercard_fjfjlx.png" alt="Mastercard" className="h-6" />
                <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745574787/pix_cbqztd.png" alt="PIX" className="h-6" />
              </div>
            </div>
          </Card>

          {/* Numbered Benefits Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-6 text-center">
              Como o Estilo {primaryStyle.category} Vai Transformar Sua Vida
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Star className="w-10 h-10 text-[#aa6b5d]" />,
                  title: "Confiança Instantânea",
                  description: "Sinta-se segura e poderosa com roupas que realmente combinam com você"
                },
                {
                  icon: <Heart className="w-10 h-10 text-[#aa6b5d]" />,
                  title: "Autenticidade",
                  description: "Expresse sua verdadeira personalidade através do seu estilo único"
                },
                {
                  icon: <CheckCircle className="w-10 h-10 text-[#aa6b5d]" />,
                  title: "Praticidade Diária",
                  description: "Economize tempo todas as manhãs sabendo exatamente o que vestir"
                }
              ].map((benefit, index) => (
                <Card key={index} className="p-6 border-[#aa6b5d]/20 hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 bg-[#aa6b5d]/10 p-3 rounded-full">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                    <p className="text-[#3a3a3a]">{benefit.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Mid-page CTA */}
          <div className="my-10 text-center">
            <Button 
              onClick={handleBuyClick}
              className="bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-6 px-8 rounded-md text-lg transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Quero Meu Guia Personalizado
            </Button>
          </div>

          {/* Bonus Showcase */}
          <section className="mb-12">
            <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-6 text-center">
              + Bônus Exclusivos (Por Tempo Limitado)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-4 border-[#aa6b5d]/20 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"
                  alt="Guia de Maquiagem"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-medium mb-2">Guia de Maquiagem para seu tipo</h3>
                <p className="text-sm text-[#3a3a3a]/80">
                  Descubra as cores e técnicas de maquiagem que mais valorizam seu rosto
                </p>
              </Card>
              <Card className="p-4 border-[#aa6b5d]/20 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911566/Design_sem_nome_13_gkpty3.webp"
                  alt="Cartela de Cores Digital"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-medium mb-2">Cartela de Cores Digital</h3>
                <p className="text-sm text-[#3a3a3a]/80">
                  Tenha sempre à mão as cores que mais combinam com seu tom de pele
                </p>
              </Card>
            </div>
          </section>

          {/* Testimonials with Real Photos */}
          <section className="mb-12">
            <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-6 text-center">
              O Que Nossas Clientes Estão Dizendo
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Mariana Silva",
                  photo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745574871/depoimento-1_e3qp1e.jpg",
                  text: "O guia mudou completamente minha relação com as roupas. Agora sei exatamente o que combina comigo e meu guarda-roupa nunca fez tanto sentido!",
                  style: "Natural"
                },
                {
                  name: "Juliana Mendes",
                  photo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745574871/depoimento-2_hdrklc.jpg",
                  text: "Sempre tive dificuldade para me vestir, mas depois de descobrir meu estilo predominante, recebo elogios todos os dias. Valeu cada centavo!",
                  style: "Elegante"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-6 border-[#aa6b5d]/20">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-[#3a3a3a]/60">Estilo {testimonial.style}</p>
                    </div>
                  </div>
                  <p className="italic text-[#3a3a3a]">"{testimonial.text}"</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Enhanced Guarantee Section */}
          <section className="mb-12">
            <Card className="p-6 border-[#aa6b5d]/20 bg-[#fff7f3]">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-[#aa6b5d]">
                    <div className="text-center">
                      <Shield className="w-12 h-12 mx-auto text-[#aa6b5d]" />
                      <span className="block font-bold text-xl text-[#aa6b5d]">7 Dias</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
                    Garantia de Satisfação Total
                  </h2>
                  <p className="mb-2 text-[#432818]">
                    Se você não ficar completamente satisfeita com o seu Guia de Estilo Personalizado, 
                    basta solicitar o reembolso em até 7 dias após a compra.
                  </p>
                  <p className="text-[#432818] font-medium">
                    Sem perguntas, sem complicações. Sua satisfação é nossa prioridade!
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-6 text-center">
              Perguntas Frequentes
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "Como vou receber meu guia após a compra?",
                  answer: "Imediatamente após a confirmação do pagamento, você receberá um e-mail com as instruções de acesso à sua área de membros, onde poderá baixar todos os materiais."
                },
                {
                  question: "O guia é realmente personalizado para o meu estilo?",
                  answer: "Sim! O guia é totalmente adaptado ao seu estilo predominante identificado no quiz, com dicas específicas para valorizar suas características únicas e explorar todo o potencial do estilo " + primaryStyle.category + "."
                },
                {
                  question: "Posso acessar em qualquer dispositivo?",
                  answer: "Sim, o guia está em formato PDF que pode ser acessado em qualquer dispositivo (computador, tablet ou celular) e você pode até imprimi-lo se preferir."
                },
                {
                  question: "Por quanto tempo terei acesso aos materiais?",
                  answer: "O acesso é vitalício! Uma vez que você adquire o guia, ele é seu para sempre, incluindo futuras atualizações."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#aa6b5d]/10">
                  <AccordionTrigger className="text-left font-medium py-4 hover:text-[#aa6b5d] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="py-3">
                    <p className="text-[#3a3a3a]">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Final CTA Section */}
          <section className="text-center mb-16 py-8 bg-[#fff7f3] rounded-lg">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
              Transforme Seu Estilo {primaryStyle.category} Agora!
            </h2>
            <p className="mb-8 max-w-2xl mx-auto text-[#432818]">
              Não perca mais tempo com roupas que não combinam com você. Descubra como 
              expressar sua verdadeira essência através do seu estilo pessoal.
            </p>
            <Button 
              onClick={handleBuyClick}
              className="bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-6 px-8 rounded-md text-lg transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              <Star className="w-5 h-5 mr-2" />
              {ctaText}
            </Button>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#432818] text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-4">© 2025 Todos os direitos reservados</p>
            <div className="flex justify-center gap-4">
              <a href="#" className="text-white hover:text-[#B89B7A]">Termos de Uso</a>
              <a href="#" className="text-white hover:text-[#B89B7A]">Política de Privacidade</a>
            </div>
          </div>
        </footer>
      </div>
    </ScrollArea>
  );
};

// Helper function to get style descriptions
const getStyleDescription = (styleType: string): string => {
  switch (styleType) {
    case 'Natural':
      return 'Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia. Com nosso guia, você aprenderá a criar um visual despojado sem perder a elegância.';
    case 'Clássico':
      return 'Você aprecia roupas atemporais e elegantes. Seu estilo é refinado e tradicional, com peças de qualidade que nunca saem de moda. Nosso guia vai ensinar como montar um guarda-roupa clássico e versátil.';
    case 'Contemporâneo':
      return 'Você gosta de estar atualizado e seguir as tendências. Seu estilo é moderno e versátil, combinando o clássico com o atual. Descubra como incorporar novidades da moda sem perder sua identidade.';
    case 'Elegante':
      return 'Você valoriza a sofisticação e o requinte. Seu estilo é polido e imponente, com peças de alta qualidade e acabamento impecável. Aprenda a criar looks elegantes para qualquer ocasião.';
    case 'Romântico':
      return 'Você aprecia detalhes delicados e femininos. Seu estilo é suave e gracioso, com elementos como rendas, babados e estampas florais. Nosso guia vai mostrar como expressar sua feminilidade sem excessos.';
    case 'Sexy':
      return 'Você gosta de valorizar suas curvas. Seu estilo é sensual e marcante, com peças que destacam seu corpo e sua confiança. Aprenda a criar um visual poderoso e sofisticado sem ser vulgar.';
    case 'Dramático':
      return 'Você busca impactar e chamar atenção. Seu estilo é arrojado e marcante, com peças estruturadas e de design diferenciado. Descubra como criar looks impactantes para o dia a dia.';
    case 'Criativo':
      return 'Você adora expressar sua individualidade. Seu estilo é único e original, combinando cores, texturas e elementos de forma não convencional. Nosso guia vai potencializar sua criatividade na moda.';
    default:
      return 'Seu estilo pessoal reflete sua personalidade e preferências únicas. Com nosso guia personalizado, você aprenderá a expressar quem você realmente é através das suas escolhas de moda.';
  }
};

export default OptimizedSalesPage;
