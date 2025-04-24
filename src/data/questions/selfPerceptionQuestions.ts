
import { QuizQuestion } from '../../types/quiz';

export const selfPerceptionQuestions: QuizQuestion[] = [
  {
    id: 'strategic-1',
    title: 'Como você se vê hoje?\nQuando você se olha no espelho, como se sente com sua imagem pessoal atualmente?',
    type: 'text',
    multiSelect: 1,
    orderIndex: 0,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195432/woman-mirror-reflection_webp.webp',
    options: [
      {
        id: 'strategic-1-1',
        text: 'Me sinto desconectada da mulher que sou hoje',
        points: 0
      },
      {
        id: 'strategic-1-2',
        text: 'Tenho dúvidas sobre o que realmente me valoriza',
        points: 0
      },
      {
        id: 'strategic-1-3',
        text: 'Às vezes acerto, às vezes erro',
        points: 0
      },
      {
        id: 'strategic-1-4',
        text: 'Me sinto segura, mas sei que posso evoluir',
        points: 0
      }
    ]
  },
  {
    id: 'strategic-2',
    title: 'O que mais te desafia na hora de se vestir?',
    type: 'text',
    multiSelect: 1,
    orderIndex: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195436/wardrobe-organization_webp.webp',
    options: [
      {
        id: 'strategic-2-1',
        text: 'Tenho peças, mas não sei como combiná-las',
        points: 0
      },
      {
        id: 'strategic-2-2',
        text: 'Compro por impulso e me arrependo depois',
        points: 0
      },
      {
        id: 'strategic-2-3',
        text: 'Minha imagem não reflete quem eu sou',
        points: 0
      },
      {
        id: 'strategic-2-4',
        text: 'Perco tempo e acabo usando sempre os mesmos looks',
        points: 0
      }
    ]
  }
];
