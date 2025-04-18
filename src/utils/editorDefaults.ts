
import { EditorBlock, EditableContent } from '@/types/editor';

export const defaultConfig = {
  blocks: [],
  theme: {
    primaryColor: '#B89B7A',
    secondaryColor: '#8F7A6A',
    backgroundColor: '#fffaf7',
    textColor: '#432818',
    fontFamily: 'Playfair Display'
  }
};

export const getDefaultContentForType = (type: EditorBlock['type']): EditableContent => {
  switch (type) {
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Adicione um subtítulo aqui',
        textColor: '#432818',
        alignment: 'center'
      };
    case 'image':
      return {
        imageUrl: '',
        imageAlt: 'Descrição da imagem',
      };
    case 'benefits':
      return {
        title: 'Benefícios',
        items: ['Benefício 1', 'Benefício 2', 'Benefício 3'],
      };
    case 'testimonials':
      return {
        title: 'O que nossos clientes dizem',
      };
    case 'text':
      return {
        text: 'Adicione seu texto aqui',
        textColor: '#432818',
      };
    case 'pricing':
      return {
        regularPrice: '175,00',
        salePrice: '39,00',
        buttonText: 'Quero Comprar Agora',
        checkoutUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10'
      };
    case 'guarantee':
      return {
        title: 'Garantia',
        text: 'Satisfação garantida ou seu dinheiro de volta',
      };
    case 'cta':
      return {
        title: 'Comece Agora',
        buttonText: 'Clique aqui',
        url: '#'
      };
    default:
      return {
        text: 'Adicione seu conteúdo aqui',
      };
  }
};
