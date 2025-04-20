
import React, { useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { styleConfig } from '@/config/styleConfig';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { EditorButton } from '@/components/ui/EditorButton';
import { ShoppingCart, Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  // Cores personalizadas para a página
  const primaryColor = '#aa6b5d';
  const secondaryColor = '#3a3a3a';
  const backgroundColor = '#fffaf7';
  const accentColor = '#ffefec';

  return (
    <div className="min-h-screen" style={{
      backgroundColor: backgroundColor,
      color: secondaryColor,
      fontFamily: "'Playfair Display', serif"
    }}>
      {/* Editor Button */}
      <EditorButton />
      
      {/* Header Section */}
      <header className="pt-12 pb-8 text-center">
        <img 
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745110519/logo_novo_ot2hpd.png" 
          alt="Logo Gisele Galvão" 
          className="mx-auto h-16 md:h-20 mb-6"
        />
        
        <h1 className="text-3xl md:text-5xl font-playfair text-[#aa6b5d] mb-3">
          VOCÊ DESCOBRIU SEU ESTILO
        </h1>
        <p className="text-xl font-playfair text-[#3a3a3a] mb-6 max-w-2xl mx-auto px-4">
          Agora é hora de aplicar com clareza — e se vestir de você
        </p>
        
        <div className="inline-block bg-[#ffefec] px-6 py-3 rounded-md text-[#aa6b5d] font-medium">
          Seu estilo predominante é <span className="font-bold">{primaryStyle.category}</span>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Primary Style Description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-playfair text-[#aa6b5d]">Estilo {primaryStyle.category}</h2>
              <p className="text-[#3a3a3a] leading-relaxed">
                {styleConfig[primaryStyle.category].description || 
                  "Este estilo reflete sua personalidade e preferências. Com ele, você pode expressar quem realmente é através das suas escolhas de moda."}
              </p>
              
              <div className="space-y-1.5 mt-6">
                <h3 className="text-sm font-medium text-[#aa6b5d]">
                  Estilos Complementares
                </h3>
                {secondaryStyles.slice(0, 2).map((style) => (
                  <div key={style.category} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="text-sm text-[#3a3a3a]">{style.category}</h4>
                        <span className="text-xs font-medium text-[#8F7A6A]">{style.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-[#aa6b5d] h-1.5 rounded-full" 
                          style={{ width: `${style.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-first md:order-last">
              <img 
                src={styleConfig[primaryStyle.category].image || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg"} 
                alt={`Estilo ${primaryStyle.category}`} 
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        
        {/* Hero Section */}
        <div className="mb-16 space-y-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
              alt="Guia Completo de Estilo"
              className="w-full rounded-lg shadow-lg transform transition hover:scale-105 duration-300"
            />
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"
              alt="Gisele Galvão"
              className="w-full rounded-lg shadow-lg transform transition hover:scale-105 duration-300"
            />
          </div>
        </div>
        
        {/* Offer Section */}
        <div className="bg-[#ffefec] rounded-lg p-6 md:p-10 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-playfair text-[#aa6b5d] mb-6">
              Guia de Estilo e Imagem + Bônus Exclusivos
            </h2>
            
            <p className="text-lg text-[#3a3a3a] max-w-3xl mx-auto mb-8">
              Você descobriu seu estilo {primaryStyle.category}. Mas o verdadeiro poder dessa descoberta está em saber como aplicar no seu dia a dia!
            </p>
            
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"
              alt="Todos os produtos e bônus mockup"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-10"
            />
          </div>
          
          {/* Pricing Section */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-10">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-6">
              <div className="text-center md:text-right">
                <p className="text-sm text-[#3a3a3a]/60 mb-1">Valor Total</p>
                <p className="text-xl line-through text-[#3a3a3a]/60">R$ 175,00</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#aa6b5d] mb-1">Oferta especial</p>
                <p className="text-4xl font-bold text-[#aa6b5d]">R$ 39,00</p>
              </div>
            </div>

            <Button 
              className="w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-7 rounded-md text-lg transition-colors duration-300 flex items-center justify-center gap-2"
              onClick={() => window.location.href = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"}
            >
              <ShoppingCart className="w-5 h-5" />
              Quero meu Guia + Bônus por R$39,00
            </Button>
          </div>
          
          {/* Benefits Section */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-10">
            <h3 className="text-2xl font-playfair text-[#aa6b5d] mb-6 text-center">
              O que você vai aprender:
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  "Aplicar seus estilos com autenticidade",
                  "Montar looks práticos para o dia a dia, trabalho e eventos",
                  "Usar cores e modelagens que valorizam quem você é",
                  "Parar de errar nas compras e economizar tempo"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-1 bg-[#aa6b5d] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-[#3a3a3a]">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-playfair text-[#aa6b5d] mb-2">
                  Bônus Exclusivos:
                </h3>
                {[
                  "Visagismo Facial Estratégico: descubra cortes, acessórios e formatos que valorizam seu rosto",
                  "Peças-Chave do Guarda-Roupa: construa um armário funcional com o que você já tem"
                ].map((bonus, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-1 bg-[#aa6b5d] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-[#3a3a3a]">{bonus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Product Images */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"
              alt="Mockup celular peças-chave por dentro"
              className="w-full rounded-lg shadow-md transform transition hover:scale-105 duration-300"
            />
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg"
              alt="Foto Gisele Galvão"
              className="w-full rounded-lg shadow-md transform transition hover:scale-105 duration-300"
            />
          </div>
          
          {/* Testimonials Section */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-10">
            <h3 className="text-2xl font-playfair text-[#aa6b5d] mb-8 text-center">
              O que as alunas estão dizendo
            </h3>
            
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Maria Silva",
                  text: "O guia mudou minha relação com a moda. Agora sei exatamente o que combina comigo!",
                  image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745110868/pexels-photo-1036623_q6nygb.jpg"
                },
                {
                  name: "Ana Oliveira",
                  text: "Nunca tinha me sentido tão segura com minhas escolhas de roupas. Valeu muito a pena!",
                  image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745110869/pexels-photo-1587009_jkc6rj.jpg"
                },
                {
                  name: "Juliana Costa",
                  text: "O conhecimento sobre visagismo facial foi transformador. Recomendo demais!",
                  image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745110871/pexels-photo-1542085_mvigzu.jpg"
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="p-6 bg-[#ffefec] shadow-sm hover:shadow-md transition-shadow rounded-lg">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    
                    <div className="space-y-2">
                      <p className="text-[#3a3a3a] italic">&quot;{testimonial.text}&quot;</p>
                      <h4 className="font-semibold text-[#aa6b5d]">{testimonial.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Guarantee Section */}
          <div className="bg-white rounded-lg border-2 border-dashed border-[#aa6b5d] p-6 md:p-8 mb-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <Shield className="w-12 h-12 text-[#aa6b5d]" />
              </div>
              <h3 className="text-2xl font-playfair text-[#aa6b5d]">
                Garantia de 7 Dias
              </h3>
              <p className="text-[#3a3a3a] max-w-xl mx-auto">
                Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, 
                devolvemos seu dinheiro integralmente, sem burocracia.
              </p>
            </div>
          </div>
          
          <div className="bg-[#aa6b5d] rounded-lg p-4 text-center text-white font-semibold">
            <p>✨ Oferta exclusiva por tempo limitado. Depois desta página, o valor pode voltar ao original!</p>
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center mb-16">
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
            Transforme seu estilo agora mesmo!
          </h2>
          <p className="text-[#3a3a3a] mb-6 max-w-2xl mx-auto">
            Não perca mais tempo com dúvidas sobre o que vestir. Aprenda a expressar quem você é através da moda.
          </p>
          <Button 
            className="bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-6 px-8 rounded-md text-lg transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
            onClick={() => window.location.href = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"}
          >
            <ShoppingCart className="w-5 h-5" />
            Quero meu Guia + Bônus por R$39,00
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#3a3a3a] text-white py-8 text-center">
        <img 
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745110519/logo_novo_ot2hpd.png" 
          alt="Logo Gisele Galvão" 
          className="mx-auto h-12 mb-4 invert"
        />
        <p className="text-sm opacity-80">© {new Date().getFullYear()} Gisele Galvão • Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default ResultPage;
