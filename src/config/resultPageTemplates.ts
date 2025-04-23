
// Template structure for the result page
export const defaultResultTemplate = {
  header: {
    type: 'header',
    content: {
      title: 'Olá, seu Estilo Predominante é:',
      subtitle: 'Conheça mais sobre seu estilo',
      showLogo: true,
    }
  },
  mainContent: {
    type: 'mainContent',
    content: {
      description: 'Você tem um estilo único que reflete sua personalidade e preferências. Aqui você encontra informações detalhadas sobre seu estilo predominante e como aproveitá-lo ao máximo.',
      showPrimaryStyle: true,
      showSecondaryStyles: true,
      mainImage: '',
      tabletImage: '',
    }
  },
  offer: {
    type: 'offer',
    content: {
      title: 'Aprimore seu estilo com nossos serviços',
      description: 'Oferecemos consultoria personalizada para ajudar você a expressar seu estilo de forma autêntica e confiante.',
      price: 'R$ 197,00',
      showPrice: true,
      ctaText: 'Quero Transformar Meu Estilo',
      ctaLink: '#oferta',
    }
  }
};
