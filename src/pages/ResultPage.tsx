import React, { useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle, Shield } from 'lucide-react';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
export const ResultPage = () => {
  const {
    primaryStyle,
    secondaryStyles
  } = useQuiz();
  const {
    globalStyles
  } = useGlobalStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!primaryStyle) {
    return <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-playfair text-[#432818] mb-4">
            Resultados não encontrados
          </h1>
          <p className="text-[#8F7A6A] mb-6">
            Parece que você ainda não completou o quiz.
          </p>
          <a href="/" className="inline-block px-6 py-3 bg-[#B89B7A] hover:bg-[#8F7A6A] text-white rounded-md transition-colors">
            Fazer o Quiz
          </a>
        </div>
      </div>;
  }
   const getStyleCoverImage = styleType => {
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
  return <div className="min-h-screen bg-[#fffaf7]" style={{
    backgroundColor: globalStyles.backgroundColor || '#fffaf7',
    color: globalStyles.textColor || '#432818',
    fontFamily: globalStyles.fontFamily || 'inherit'
  }}>
      <EditorButton />
      
      <Header primaryStyle={primaryStyle} logoHeight={globalStyles.logoHeight} logo={globalStyles.logo} logoAlt={globalStyles.logoAlt} />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
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
              <img src={getStyleCoverImage(primaryStyle.category)} alt={`Estilo ${primaryStyle.category}`} className="w-full h-auto rounded-lg shadow-md" />
            </div>
          </div>
          
          <div className="mt-8">
            <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp" alt="Guia de Estilo e Imagem" className="w-full h-auto rounded-lg" />
          </div>
        </Card>

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
                <em>Mas é na ação que a verdadeira transformação acontece.
                É quando você aplica o que aprendeu… que o espelho começa a contar uma nova história.</em>
              </p>
              <p className="text-[#432818] mt-4 leading-relaxed">
                <strong>Não é sobre mudar quem você é.<br />
                É sobre finalmente Vestir-se de Você.</strong>
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-[#432818] leading-relaxed">
                E pra isso, eu preparei o caminho completo.<br />
                Simples. Prático. Estratégico.
              </p>
              <p className="text-[#432818] mt-4 leading-relaxed">
                <strong>Pra você transformar estilo em presença.<br />
                E imagem em poder.</strong>
              </p>
            </div>
          </div>
        </div>

        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3">O Guia de Estilo e Imagem + Bônus Exclusivos</h2>
            <p className="text-[#432818]">
              Criado para mulheres que querem muito mais do que "saber seu estilo".<br />
              Esse guia é pra quem está pronta pra viver seu estilo na prática — com consciência, direção e autenticidade.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <h3 className="text-xl font-medium text-[#432818] mb-4">Você vai aprender:</h3>
              <ul className="space-y-3">
                {['Como montar looks com intenção (e não no improviso)', 'Como usar suas cores, modelagens e tecidos a seu favor', 'Como alinhar sua imagem com seus valores e objetivos', 'Como parar de comprar por impulso e montar um guarda-roupa funcional'].map((item, index) => <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#aa6b5d] mt-0.5 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>)}
              </ul>
            </div>
            <div>
              <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp" alt="Guia de Estilo - 3 Revistas" className="w-full h-auto rounded-lg shadow-sm" />
            </div>
          </div>
          
          <div className="bg-[#fff7f3] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-medium text-[#aa6b5d] mb-4 text-center">E ainda recebe 2 bônus poderosos:</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#432818] mb-2">
                  Peças-chave do Guarda-Roupa de Sucesso
                </h4>
                <p className="text-sm text-[#432818]/80 mb-4">
                  Itens essenciais que descomplicam a rotina e valorizam o seu estilo pessoal.
                </p>
                <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp" alt="Peças-chave do Guarda-Roupa" className="w-full h-auto rounded-lg" />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#432818] mb-2">
                  Mini Guia de Visagismo Facial
                </h4>
                <p className="text-sm text-[#432818]/80 mb-4">
                  Para alinhar seu rosto, cabelo e maquiagem com a sua identidade visual.
                </p>
                <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp" alt="Mini Guia de Visagismo Facial" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp" alt="Todos os produtos e bônus" className="w-full h-auto rounded-lg" />
          </div>
          
          <div className="bg-[#fff7f3] p-6 rounded-lg text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mb-6">
              <div className="text-center md:text-right">
                <p className="text-sm text-[#432818]/60 mb-1">Valor Total</p>
                <p className="text-xl line-through text-[#432818]/60">R$ 175,00</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#aa6b5d] mb-1">Oferta especial</p>
                <p className="text-3xl font-bold text-[#aa6b5d]">R$ 39,00</p>
              </div>
            </div>
            
            <Button onClick={() => window.location.href = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"} className="w-full max-w-xl mx-auto text-white py-6 text-lg rounded-md bg-brand-gold">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Quero meu Guia + Bônus por R$39,00
            </Button>
            
            <p className="text-sm text-[#aa6b5d] mt-4">
              ⏳ Oferta válida apenas nesta página
            </p>
          </div>
        </Card>
        
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-6 text-center">
            💬 Depoimentos de mulheres que já viveram essa transformação:
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
          }].map((testimonial, index) => <div key={index} className="bg-[#fff7f3] p-4 rounded-lg">
                <p className="italic text-[#432818] mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-8 bg-[#aa6b5d]"></div>
                  <div>
                    <p className="font-medium text-[#432818]">{testimonial.name}</p>
                    <p className="text-sm text-[#432818]/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>)}
          </div>
          
          <div className="mt-8 text-center">
            <img src="https://res.cloudinary.com/dzt2fe3ij/image/upload/v1745104587/Captura_de_tela_2025-03-31_034319_peuoc8.webp" alt="Antes e Depois" className="w-full h-auto rounded-lg mt-6" />
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
                Consultora de Imagem e Estilo, Personal Branding, Estrategista de Marca pessoal e Especialista em coloração pessoal com Certificação internacional.
              </p>
              <p className="text-[#432818] mb-4">
                Advogada de formação. Mãe da Victória, esposa do Fabrício.
              </p>
              <p className="text-[#432818]">
                Apaixonada pela vida, pelos detalhes, viagens e tudo que me proporcione crescer como ser humano. Colérica, virginiana, paciente, pacificadora e muito empata.
              </p>
            </div>
            <div className="space-y-6">
              <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp" alt="Gisele Galvão" className="w-full h-auto rounded-lg shadow-md" />  
            </div>
          </div>
        </Card>
        
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/4 flex justify-center">
              <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp" alt="Garantia de 7 dias" className="w-32 h-32 object-contain" />
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-medium text-[#aa6b5d] mb-2">
                🛡️ Garantia de 7 dias
              </h3>
              <p className="text-[#432818] mb-4">
                Você tem uma semana para acessar o conteúdo completo, testar e aplicar.
                Se não fizer sentido pra você, devolvemos 100% do seu investimento. Sem burocracia.
              </p>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-[#aa6b5d] mr-2" />
                <span className="text-[#432818] font-medium">Satisfação garantida ou seu dinheiro de volta</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 mb-10 bg-[#fff7f3] shadow-md border border-[#B89B7A]/20">
          <div className="text-center space-y-4 mb-6">
            <h2 className="text-2xl font-playfair text-[#aa6b5d]">
              ⏳ Oferta válida apenas nesta página
            </h2>
            <p className="text-[#432818]">
              Essa condição especial com os dois bônus é exclusiva para quem acabou de fazer o teste de estilo.
              Se sair da página, ela pode não estar mais disponível.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mb-6">
            <div className="text-center md:text-right">
              <p className="text-sm text-[#432818]/60 mb-1">Valor Total</p>
              <p className="text-xl line-through text-[#432818]/60">R$ 175,00</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#aa6b5d] mb-1">Oferta especial</p>
              <p className="text-3xl font-bold text-[#aa6b5d]">R$ 39,00</p>
            </div>
          </div>
          
          <Button onClick={() => window.location.href = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"} className="w-full max-w-xl text-white py-6 text-lg rounded-md px-0 mx-[124px] bg-brand-gold">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Quero meu Guia + Bônus por R$39,00
          </Button>
        </Card>
      </div>
    </div>;
};
export default ResultPage;