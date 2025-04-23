
import { QuizQuestion } from '../../types/quiz';

export const purchaseIntentQuestions: QuizQuestion[] = [
  {
    id: 'strategic-5',
    title: 'Pense no quanto você já gastou com roupas que não usa ou que não representam quem você é...\nVocê acredita que ter acesso a um material estratégico, direto ao ponto, que te ensina a aplicar seu estilo com clareza, faria diferença?',
    type: 'both',
    multiSelect: 1,
    options: [
      {
        id: 'strategic-5-1',
        text: 'Sim! Se existisse algo assim, eu quero',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195448/discovery-journey_webp.webp'
      },
      {
        id: 'strategic-5-2',
        text: 'Sim, mas teria que ser no momento certo',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195449/right-timing_webp.webp'
      },
      {
        id: 'strategic-5-3',
        text: 'Tenho dúvidas se funcionaria pra mim',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195450/questioning-path_webp.webp'
      },
      {
        id: 'strategic-5-4',
        text: 'Não, prefiro continuar como estou',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195451/comfort-zone_webp.webp'
      }
    ]
  },
  {
    id: 'strategic-6',
    title: 'Se esse conteúdo completo custasse R$ 97,00 — incluindo Guia de Estilo, bônus especiais e um passo a passo prático para transformar sua imagem pessoal — você consideraria um bom investimento?',
    type: 'both',
    multiSelect: 1,
    options: [
      {
        id: 'strategic-6-1',
        text: 'Sim! Por esse resultado, vale muito',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195452/transformation-value_webp.webp'
      },
      {
        id: 'strategic-6-2',
        text: 'Sim, mas só se eu tiver certeza de que funciona pra mim',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195453/seeking-certainty_webp.webp'
      },
      {
        id: 'strategic-6-3',
        text: 'Talvez — depende do que está incluso',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195454/considering-options_webp.webp'
      },
      {
        id: 'strategic-6-4',
        text: 'Não, ainda não estou pronta para investir',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195455/future-potential_webp.webp'
      }
    ]
  }
];
