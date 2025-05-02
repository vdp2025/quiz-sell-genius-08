
// src/data/questions/selfPerceptionQuestions.ts
import { QuizQuestion } from '@/types/quiz';

export const selfPerceptionQuestions: QuizQuestion[] = [
  {
    id: 'strategic-self-1',
    title: 'Como você se sente em relação ao seu estilo pessoal atualmente?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&h=600',
    options: [
      {
        id: 'self-1-a',
        text: 'Insatisfeita e sem saber como me vestir para expressar quem sou',
        styleCategory: 'Natural'
      },
      {
        id: 'self-1-b',
        text: 'Em transição, buscando mais clareza sobre meu estilo',
        styleCategory: 'Contemporâneo'
      },
      {
        id: 'self-1-c',
        text: 'Confortável, mas quero evoluir e elevar minha imagem',
        styleCategory: 'Elegante'
      },
      {
        id: 'self-1-d',
        text: 'Confiante, apenas buscando refinamento e novas inspirações',
        styleCategory: 'Clássico'
      }
    ]
  }
];
