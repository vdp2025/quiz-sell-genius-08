
import React, { useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { Button } from '@/components/ui/button';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import { ShoppingCart } from 'lucide-react';

// Cores da paleta definida no quiz
const palette = {
  neutral: '#8E9196',
  primary: '#B89B7A',
  secondary: '#432818',
  tertiary: '#AA6B5D',
  dark: '#1A1F2C',
  light: '#F7F5FF',
  gold: '#B89B7A',
};

// Imagens de cada estilo pessoal e do guia correspondente
const estiloImages: Record<string, string> = {
  'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
  'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp',
  'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
  'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
  'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp',
  'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp',
  'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp',
  'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp',
};
const guiaImages: Record<string, string> = {
  'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
  'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
  'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
  'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
  'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
  'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
  'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
  'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp'
};

// Descrição para cada estilo
const styleDescriptions: Record<string, string> = {
  'Natural': 'Seu estilo é descontraído, confortável e prático. Você gosta de roupas soltas, materiais naturais e visuais sem esforço.',
  'Clássico': 'Você prefere elegância atemporal, peças com excelente acabamento e looks discretos.',
  'Contemporâneo': 'Você mistura praticidade com toques modernos e atuais, aliando conforto e tendências.',
  'Elegante': 'Seu visual é sofisticado, refinado e poderoso. Valoriza qualidade e caimento perfeito.',
  'Romântico': 'Prefere leveza e feminilidade, rendas, babados e estampas delicadas.',
  'Sexy': 'Valoriza sensualidade, looks justos, decotes, fendas e materiais com brilho.',
  'Dramático': 'Gosta de looks impactantes, marcantes, estruturados, assimétricos e urbanos.',
  'Criativo': 'Originalidade é seu ponto forte. Mistura cores, texturas e estilos sem medo de ousar.',
};

const ResultPage = () => {
  const {
    primaryStyle,
    secondaryStyles
  } = useQuiz();

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
          <a href="/" className="inline-block px-6 py-3 bg-[#B89B7A] hover:bg-[#AA6B5D] text-white rounded-md transition-colors">
            Fazer o Quiz
          </a>
        </div>
      </div>;
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF9F7] flex flex-col items-center py-2 px-2">
      {/* Header do resultado */}
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-md border border-[#eceaec] mt-8 mb-10 p-0 overflow-hidden">
        {/* Imagem do estilo + infos do Predominante */}
        <div className="flex flex-col md:flex-row md:items-stretch w-full relative">
          {/* Imagem estilo */}
          <div className="md:w-1/2 flex">
            <img 
              src={estiloImages[primaryStyle.category]} 
              alt={primaryStyle.category}
              className="object-cover w-full h-64 md:h-full rounded-t-xl md:rounded-t-none md:rounded-l-xl"
            />
          </div>
          {/* Infos */}
          <div className="md:w-1/2 flex flex-col justify-center p-6 bg-[#FAF9F7]">
            <h2 className="text-2xl font-bold font-playfair mb-2 text-[#432818]">{primaryStyle.category}</h2>
            <div className="flex items-center mb-3" title="Estilo Predominante">
              <span className="block text-[#AA6B5D] text-lg font-bold mr-1">
                {primaryStyle.percentage}%
              </span>
              <div className="flex-1 ml-3">
                {/* Barrinha percentual */}
                <div className="relative w-full h-3 bg-[#E5E2DE] rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-3 rounded-full transition-all bg-[#B89B7A]"
                    style={{
                      width: `${primaryStyle.percentage}%`
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 text-[#432818] text-base">
              {styleDescriptions[primaryStyle.category]}
            </div>
            {secondaryStyles && secondaryStyles.length > 0 && (
              <div className="mt-5">
                <SecondaryStylesSection secondaryStyles={secondaryStyles} />
              </div>
            )}
          </div>
        </div>
        {/* Guia ilustrado do estilo, logo abaixo da primeira section */}
        <div className="w-full bg-[#F7F5FF]/30 flex flex-col items-center justify-center p-5">
          <img 
            src={guiaImages[primaryStyle.category]}
            alt={`Guia estilo ${primaryStyle.category}`}
            className="max-w-xs w-full rounded-lg shadow-sm border border-[#eceaec] bg-[#fff]"
            style={{ maxHeight: 170, objectFit: 'cover' }}
          />
          <span className="block mt-3 text-xs text-[#AA6B5D] font-semibold uppercase tracking-wide">Guia completo do seu estilo</span>
        </div>
      </div>
      {/* Botão oferta com visual do quiz + destaque */}
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-md border border-[#eceaec] p-8 flex flex-col items-center mb-8">
        <h3 className="text-lg font-medium font-playfair text-[#AA6B5D] mb-1 text-center">Oferta exclusiva</h3>
        <div className="text-2xl font-bold text-[#432818] text-center mb-6">Guia Digital + Bônus de Estilo</div>

        <Button 
          onClick={() => window.location.href = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"}
          className="w-full max-w-xs bg-[#B89B7A] hover:bg-[#AA6B5D] text-white py-5 text-lg rounded-full shadow-lg flex items-center justify-center mb-2"
        >
          <ShoppingCart className="w-6 h-6 mr-2" /> Quero meu Guia por <span className="ml-1 font-semibold">R$ 39,00</span>
        </Button>
        <p className="text-sm text-[#8E9196] mt-1 text-center">Oferta válida somente nesta página</p>
      </div>
    </div>
  );
};

export default ResultPage;
