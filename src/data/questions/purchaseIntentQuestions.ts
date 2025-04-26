
import { QuizQuestion } from '../../types/quiz';

export const purchaseIntentQuestions: QuizQuestion[] = [
  {
    id: 'strategic-5',
    title: 'Pense no quanto você já gastou com roupas que não usa ou que não representam quem você é...\nVocê acredita que ter acesso a um material estratégico, direto ao ponto, que te ensina a aplicar seu estilo com clareza, faria diferença?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195448/discovery-journey_webp.webp',
    options: [
      {
        id: 'strategic-5-1',
        text: 'Sim! Se existisse algo assim, eu quero'
      },
      {
        id: 'strategic-5-2',
        text: 'Sim, mas teria que ser no momento certo'
      },
      {
        id: 'strategic-5-3',
        text: 'Tenho dúvidas se funcionaria pra mim'
      },
      {
        id: 'strategic-5-4',
        text: 'Não, prefiro continuar como estou'
      }
    ]
  },
  {
    id: 'strategic-6',
    title: 'Se esse conteúdo completo custasse R$ 97,00 — incluindo Guia de Estilo, bônus especiais e um passo a passo prático para transformar sua imagem pessoal — você consideraria um bom investimento?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195452/transformation-value_webp.webp',
    options: [
      {
        id: 'strategic-6-1',
        text: 'Sim! Por esse resultado, vale muito'
      },
      {
        id: 'strategic-6-2',
        text: 'Sim, mas só se eu tiver certeza de que funciona pra mim'
      },
      {
        id: 'strategic-6-3',
        text: 'Talvez — depende do que está incluso'
      },
      {
        id: 'strategic-6-4',
        text: 'Não, ainda não estou pronta para investir'
      }
    ]
  }
];
