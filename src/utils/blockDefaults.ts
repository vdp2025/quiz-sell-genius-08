
import { EditableContent } from '@/types/editor';

export const getDefaultContentForType = (type: string): EditableContent => {
  switch (type) {
    case 'header':
      return {
        title: 'Título do Cabeçalho',
        subtitle: 'Subtítulo opcional',
        logo: '',
        logoAlt: 'Logo',
      };
    case 'headline':
      return {
        title: 'Título Chamativo',
        subtitle: 'Subtítulo que explica mais',
        alignment: 'center',
      };
    case 'text':
      return {
        text: 'Digite seu texto aqui. Este é um bloco de texto simples que você pode editar conforme necessário.',
        alignment: 'left',
      };
    case 'image':
      return {
        imageUrl: '',
        imageAlt: 'Descrição da imagem',
        borderRadius: '8px',
      };
    case 'benefits':
      return {
        title: 'Benefícios',
        items: ['Benefício 1', 'Benefício 2', 'Benefício 3'],
        useIcons: true,
      };
    case 'pricing':
      return {
        regularPrice: '197,00',
        salePrice: '97,00',
        buttonText: 'Quero Comprar Agora',
        urgencyText: 'Oferta por tempo limitado!',
      };
    case 'style-result':
      return {
        description: 'Descrição personalizada do estilo predominante.',
        customImage: '',
      };
    default:
      return {};
  }
};
