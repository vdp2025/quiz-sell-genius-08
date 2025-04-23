
import { QuizQuestion } from '../../types/quiz';

export const selfPerceptionQuestions: QuizQuestion[] = [
  {
    id: 'strategic-1',
    title: 'Como você se vê hoje?\nQuando você se olha no espelho, como se sente com sua imagem pessoal atualmente?',
    type: 'both',
    multiSelect: 1,
    options: [
      {
        id: 'strategic-1-1',
        text: 'Me sinto desconectada da mulher que sou hoje',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195432/woman-mirror-reflection_webp.webp'
      },
      {
        id: 'strategic-1-2',
        text: 'Tenho dúvidas sobre o que realmente me valoriza',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195433/woman-thinking-clothes_webp.webp'
      },
      {
        id: 'strategic-1-3',
        text: 'Às vezes acerto, às vezes erro',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195434/woman-deciding-outfit_webp.webp'
      },
      {
        id: 'strategic-1-4',
        text: 'Me sinto segura, mas sei que posso evoluir',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195435/confident-woman-smile_webp.webp'
      }
    ]
  },
  {
    id: 'strategic-2',
    title: 'O que mais te desafia na hora de se vestir?',
    type: 'both',
    multiSelect: 1,
    options: [
      {
        id: 'strategic-2-1',
        text: 'Tenho peças, mas não sei como combiná-las',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195436/wardrobe-organization_webp.webp'
      },
      {
        id: 'strategic-2-2',
        text: 'Compro por impulso e me arrependo depois',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195437/impulsive-shopping_webp.webp'
      },
      {
        id: 'strategic-2-3',
        text: 'Minha imagem não reflete quem eu sou',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195438/identity-reflection_webp.webp'
      },
      {
        id: 'strategic-2-4',
        text: 'Perco tempo e acabo usando sempre os mesmos looks',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195439/time-management-dressing_webp.webp'
      }
    ]
  }
];
