
import { Section } from '@/types/resultPageConfig';

export const createHeaderConfig = (): Section => {
  return {
    visible: true,
    content: {
      title: "Resultado do Quiz Visagismo",
      subtitle: "Descubra como as melhores cores e estilos podem transformar sua imagem",
      logo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911692/logo-visagismo_zuilys.webp",
    },
    style: {
      borderRadius: 'medium',
      paddingY: '16',
      paddingX: '16',
      backgroundColor: '#ffffff',
      textColor: '#432818',
    }
  };
};
