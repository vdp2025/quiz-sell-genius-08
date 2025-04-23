
import React, { useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle, Shield } from 'lucide-react';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';

// Mapeamento com as duas imagens por estilo
const styleImages: Record<string, { image: string; guideImage: string }> = {
  Natural: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
  },
  Clássico: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
  },
  Contemporâneo: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
  },
  Elegante: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
  },
  Romântico: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
  },
  Sexy: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
  },
  Dramático: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
  },
  Criativo: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp',
  },
};

// Style configuration with descriptions
const styleConfig: Record<string, { description: string; color: string; }> = {
  Natural: {
    description: 'Você valoriza o conforto, a praticidade e a simplicidade. Prefere looks descomplicados, tecidos naturais e cores neutras. Sua beleza está na autenticidade e no visual despretensioso.',
    color: '#D2C5B0',
  },
  Clássico: {
    description: 'Você valoriza a tradição, a elegância atemporal e a discrição. Investe em peças de alta qualidade que permanecem no guarda-roupa por muitas temporadas.',
    color: '#8C9AAF',
  },
  Contemporâneo: {
    description: 'Você combina o melhor dos dois mundos: praticidade com um toque de estilo atual. Busca looks versáteis que funcionam em diferentes contextos, com cortes bem definidos.',
    color: '#B0C5D2',
  },
  Elegante: {
    description: 'Você valoriza a sofisticação, o refinamento e a qualidade. Prefere peças com excelente caimento, tecidos nobres e detalhes bem acabados que elevam seu visual.',
    color: '#C5B0D2',
  },
  Romântico: {
    description: 'Você valoriza a delicadeza, a feminilidade e o charme. Seu guarda-roupa tem peças com detalhes delicados, estampas florais e cores suaves que transmitem sensibilidade.',
    color: '#F4D0DC',
  },
  Sexy: {
    description: 'Você valoriza o poder da sedução e gosta de destacar seus atributos físicos. Prefere peças que valorizam suas curvas, com decotes, transparências e fendas estratégicas.',
    color: '#D2B0B0',
  },
  Dramático: {
    description: 'Você valoriza o impacto visual e a individualidade. Seu guarda-roupa tem peças marcantes, estruturadas e com detalhes arquitetônicos que expressam força e confiança.',
    color: '#303030',
  },
  Criativo: {
    description: 'Você valoriza a originalidade, a expressão pessoal e a liberdade. Seu estilo é único, com combinações inusitadas de cores, estampas e acessórios que refletem sua personalidade.',
    color: '#D2B0C5',
  },
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

  const { category } = primaryStyle;
  const styleImagesData = styleImages[category] || styleImages['Natural'];
  const description = styleConfig[category]?.description || '';

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
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
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

            <div className="order-first md:order-last space-y-4">
              <img
                src={styleImagesData.image}
                alt={`Visual do Estilo ${category}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <img
                src={styleImagesData.guideImage}
                alt={`Guia do Estilo ${category}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </Card>

        {/* AQUI você pode continuar com os cards de oferta, CTA e bônus como já estruturado anteriormente */}
      </div>
    </div>
  );
};

export default ResultPage;
