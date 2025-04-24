
import { Block } from '@/types/editor';

export const getDefaultContentForType = (type: Block['type']): any => {
  switch (type) {
    case 'header':
      return {
        title: 'Seu Resultado de Estilo',
        subtitle: 'Descubra como expressar sua autenticidade',
        alignment: 'center'
      };
      
    case 'styleResult':
      return {
        description: '',
        customImage: ''
      };
      
    case 'text':
      return {
        content: 'Adicione aqui o conteúdo do seu texto. Este bloco permite formatação rica.',
        alignment: 'left'
      };
      
    case 'image':
      return {
        url: '',
        alt: 'Imagem ilustrativa',
        caption: '',
        width: 'full'
      };
      
    case 'benefits':
      return {
        title: 'O que você vai receber',
        items: [
          'Análise detalhada do seu estilo pessoal',
          'Paleta de cores personalizada',
          'Guia de peças essenciais para o seu guarda-roupa',
          'Dicas de tecidos e modelagens ideais'
        ]
      };
      
    case 'testimonial':
      return {
        items: [
          {
            name: 'Maria Silva',
            text: 'Este guia mudou completamente a forma como me visto! Agora entendo meu estilo e minhas escolhas fazem muito mais sentido.',
            role: 'Cliente'
          }
        ]
      };
      
    case 'pricing':
      return {
        regularPrice: '175,00',
        salePrice: '39,00',
        installments: '1x de R$ 39,00',
        ctaText: 'Quero meu Guia de Estilo',
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10'
      };
      
    case 'guarantee':
      return {
        days: 7,
        text: 'Se você não ficar completamente satisfeita com o seu Guia de Estilo Personalizado, basta solicitar o reembolso em até 7 dias após a compra.'
      };
      
    case 'divider':
      return {
        style: 'solid',
        color: '#E5E7EB',
        spacing: 'medium'
      };
      
    default:
      return {};
  }
};
