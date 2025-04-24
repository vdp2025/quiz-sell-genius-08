
import { SalesPageConfig, defaultSalesPageConfig } from '@/types/salesPageConfig';
import { StyleResult } from '@/types/quiz';

/**
 * Creates a customized sales page configuration based on the user's quiz style result
 */
export const createSalesPageConfig = (
  styleResult: StyleResult,
  customizations: Partial<SalesPageConfig> = {}
): SalesPageConfig => {
  // Base configuration from defaults
  const baseConfig = { ...defaultSalesPageConfig };
  
  // Customize based on style
  switch(styleResult.category) {
    case 'Natural':
      baseConfig.hero.title = "Descubra a versatilidade do seu estilo Natural";
      baseConfig.style.accentColor = "#8F7A6A";
      break;
      
    case 'Contemporâneo':
      baseConfig.hero.title = "Eleve seu estilo Contemporâneo com essas dicas práticas";
      baseConfig.style.accentColor = "#B89B7A";
      break;
      
    case 'Clássico':
      baseConfig.hero.title = "Valorize a elegância atemporal do seu estilo Clássico";
      baseConfig.style.accentColor = "#432818";
      break;
      
    case 'Elegante':
      baseConfig.hero.title = "Refine ainda mais seu sofisticado estilo Elegante";
      baseConfig.style.accentColor = "#AA6B5D";
      break;
      
    case 'Romântico':
      baseConfig.hero.title = "Realce a delicadeza do seu estilo Romântico";
      baseConfig.style.accentColor = "#D4A5A5";
      break;
      
    case 'Sexy':
      baseConfig.hero.title = "Destaque a confiança do seu estilo Sexy";
      baseConfig.style.accentColor = "#9E2B2B";
      break;
      
    case 'Dramático':
      baseConfig.hero.title = "Amplifique o impacto do seu estilo Dramático";
      baseConfig.style.accentColor = "#2B2B2B";
      break;
      
    case 'Criativo':
      baseConfig.hero.title = "Expresse a originalidade do seu estilo Criativo";
      baseConfig.style.accentColor = "#F0A500";
      break;
      
    default:
      // Use default values for unknown styles
      break;
  }
  
  // Mention style in product title
  baseConfig.product.title = `Guia de Estilo ${styleResult.category} + Bônus Exclusivos`;
  
  // Update subtitle with style percentage
  baseConfig.header.subtitle = `Seu estilo ${styleResult.category} (${styleResult.percentage}%)`;
  
  // Override with any custom configurations provided
  return {
    ...baseConfig,
    ...customizations,
    header: { ...baseConfig.header, ...customizations.header },
    hero: { ...baseConfig.hero, ...customizations.hero },
    product: { ...baseConfig.product, ...customizations.product },
    benefits: { ...baseConfig.benefits, ...customizations.benefits },
    bonus: { ...baseConfig.bonus, ...customizations.bonus },
    testimonials: { ...baseConfig.testimonials, ...customizations.testimonials },
    guarantee: { ...baseConfig.guarantee, ...customizations.guarantee },
    style: { ...baseConfig.style, ...customizations.style }
  };
};

/**
 * Creates a customized sales page configuration for use with multiple styles
 */
export const createMultiStyleSalesPageConfig = (
  primaryStyle: StyleResult,
  secondaryStyles: StyleResult[] = [],
  customizations: Partial<SalesPageConfig> = {}
): SalesPageConfig => {
  const config = createSalesPageConfig(primaryStyle, customizations);
  
  // Incorporate secondary styles into the messaging if they exist
  if (secondaryStyles && secondaryStyles.length > 0) {
    const secondaryStyle = secondaryStyles[0];
    config.hero.subtitle = `Descubra como combinar seu estilo ${primaryStyle.category} com elementos do estilo ${secondaryStyle.category} para criar um visual único e autêntico`;
  }
  
  return config;
};
