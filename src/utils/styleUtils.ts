import { StyleResult } from '@/types/quiz';

// Tipagem base para todos os estilos
export type StyleCategory =
  | 'Natural'
  | 'Clássico'
  | 'Contemporâneo'
  | 'Elegante'
  | 'Romântico'
  | 'Sexy'
  | 'Dramático'
  | 'Criativo';

// Cores principais por estilo (para temas e destaque visual)
export const getStyleColor = (category: StyleCategory): string => {
  const colorMap: Record<StyleCategory, string> = {
    'Natural': '#8F7A6A',
    'Contemporâneo': '#B89B7A',
    'Clássico': '#432818',
    'Elegante': '#AA6B5D',
    'Romântico': '#D4A5A5',
    'Sexy': '#9E2B2B',
    'Dramático': '#2B2B2B',
    'Criativo': '#F0A500'
  };

  return colorMap[category] || '#B89B7A';
};

// Configurações completas do estilo (com imagem + guia + descrição)
export const getStyleConfig = (category: StyleCategory) => {
  const configMap: Record<StyleCategory, {
    name: string;
    description: string;
    image: string;
    guideImage: string;
  }> = {
    Natural: {
      name: 'Natural',
      description: 'Seu estilo é caracterizado pela simplicidade e conforto.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
      guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp'
    },
    Contemporâneo: {
      name: 'Contemporâneo',
      description: 'Você combina modernidade com praticidade.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
      guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp'
    },
    Clássico: {
      name: 'Clássico',
      description: 'Seu estilo é atemporal e elegante.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp',
      guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp'
    },
    Elegante: {
      name: 'Elegante',
      description: 'Você valoriza sofisticação e refinamento.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
      guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp'
    },
    Romântico: {
      name: 'Romântico',
      description: 'Seu estilo é delicado e feminino.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp',
      guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp'
    },
    Sexy: {
      name: 'Sexy',
      description: 'Você valoriza a sensualidade e confiança.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp',
      guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp'
    },
    Dramático: {
      name: 'Dramático',
      description: 'Seu estilo é marcante e impactante.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp',
      guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp'
    },
    Criativo: {
      name: 'Criativo',
      description: 'Você expressa originalidade e experimentação.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp',
      guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp'
    }
  };

  return configMap[category] || {
    name: category,
    description: 'Seu estilo único e pessoal.',
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp'
  };
};

// Fallback visual com cor de fundo e estilo de texto
export const getFallbackStyle = (styleCategory: string): React.CSSProperties => {
  const backgroundColor = getStyleColor(styleCategory as StyleCategory);

  return {
    backgroundColor,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '10px'
  };
};

// Estilo padrão de fallback para inicialização
export const getDefaultStyle = (): StyleResult => {
  return {
    category: 'Natural',
    score: 100,
    percentage: 100
  };
};
