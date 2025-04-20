
import { ResultPageConfig } from '@/types/resultPageConfig';
import { createHeaderConfig } from './config/headerDefaults';
import { getStyleDescription } from './config/styleDescriptions';
import { getStyleImage } from './config/styleImages';
import { createOfferConfig } from './config/offerDefaults';
import { createGlobalStyles } from './config/globalStyles';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType,
    header: createHeaderConfig(),
    mainContent: {
      visible: true,
      content: {
        description: getStyleDescription(styleType),
        mainImage: getStyleImage(styleType),
        tabletImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp"
      },
      style: {
        padding: '20px'
      }
    },
    secondaryStyles: {
      visible: true,
      content: {},
      style: {
        padding: '20px'
      }
    },
    offer: createOfferConfig(),
    globalStyles: createGlobalStyles(),
    blocks: []
  };
};
