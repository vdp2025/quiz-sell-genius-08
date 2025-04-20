
import { SectionConfig } from '@/types/resultPageConfig';

export const getDefaultHeaderConfig = (): SectionConfig => {
  return {
    visible: true,
    content: {
      title: 'Seu Resultado Exclusivo',
      subtitle: 'Descubra seu estilo pessoal e como aproveitá-lo ao máximo'
    },
    style: {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      padding: '40px 20px',
      textAlign: 'center'
    }
  };
};
