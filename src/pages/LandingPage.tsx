
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  ShoppingCart,
  CheckCircle,
  Heart,
  Award,
  Star
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { toast } = useToast();

  const handleBuyNow = () => {
    toast({
      title: "Redirecionando para o checkout",
      description: "Você será redirecionado para a página de pagamento.",
    });
    // Replace with actual checkout URL
    window.location.href = "https://pay.hotmart.com/seu-produto";
  };

  return (
    <div className="min-h-screen bg-[#fffaf7]">
      {/* Header */}
      <header className="bg-white py-4 px-4 border-b border-[#B89B7A]/20 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img 
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg" 
            alt="Logo Gisele Galvão" 
            className="h-16" 
          />
          <Button 
            onClick={handleBuyNow}
            className="bg-[#aa6b5d] hover:bg-[#8f574a]"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Quero Comprar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-playfair text-[#aa6b5d] mb-6">
              Descubra Seu Estilo Único e Transforme Seu Guarda-Roupa
            </h1>
            <p className="text-lg mb-8 text-[#432818]">
              Aprenda a se vestir com confiança e autenticidade através de uma análise personalizada do seu estilo.
            </p>
            <Button 
              onClick={handleBuyNow}
              size="lg"
              className="bg-[#aa6b5d] hover:bg-[#8f574a]"
            >
              Começar Agora
            </Button>
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp"
              alt="Consultoria de Estilo"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-playfair text-[#aa6b5d] text-center mb-12">
            O Que Você Vai Descobrir
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8 text-[#aa6b5d]" />,
                title: "Seu Estilo Único",
                description: "Descubra sua verdadeira essência e como expressá-la através das roupas"
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-[#aa6b5d]" />,
                title: "Guarda-Roupa Ideal",
                description: "Aprenda a montar um guarda-roupa versátil e que combina com você"
              },
              {
                icon: <Star className="w-8 h-8 text-[#aa6b5d]" />,
                title: "Mais Confiança",
                description: "Sinta-se segura e poderosa com looks que valorizam sua personalidade"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-playfair text-[#432818] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[#8F7A6A]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#FAF9F7]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-playfair text-[#aa6b5d] text-center mb-12">
            O Que Dizem As Alunas
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                text: "A consultoria da Gisele mudou completamente minha relação com as roupas. Agora me sinto muito mais segura ao me vestir!",
                name: "Maria Silva",
                role: "Empresária"
              },
              {
                text: "Finalmente entendi meu estilo e como montar looks que combinam comigo. Foi um verdadeiro divisor de águas!",
                name: "Ana Santos",
                role: "Advogada"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-[#432818] mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-[#aa6b5d]/20 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-[#aa6b5d]" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-[#432818]">{testimonial.name}</p>
                    <p className="text-sm text-[#8F7A6A]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair text-[#aa6b5d] mb-6">
            Transforme Seu Estilo Hoje
          </h2>
          <p className="text-[#432818] mb-8 max-w-2xl mx-auto">
            Não perca mais tempo com roupas que não combinam com você. 
            Descubra seu estilo único e aprenda a se vestir com confiança.
          </p>
          <Button 
            onClick={handleBuyNow}
            size="lg"
            className="bg-[#aa6b5d] hover:bg-[#8f574a]"
          >
            <Award className="w-5 h-5 mr-2" />
            Quero Descobrir Meu Estilo
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#432818] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4">© 2025 Gisele Galvão. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-white hover:text-[#B89B7A]">Termos de Uso</a>
            <a href="#" className="text-white hover:text-[#B89B7A]">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
