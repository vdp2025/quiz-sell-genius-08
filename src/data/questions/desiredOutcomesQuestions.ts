
// src/data/questions/desiredOutcomesQuestions.ts
import { QuizQuestion } from '@/types/quiz';

export const desiredOutcomesQuestions: QuizQuestion[] = [
  {
    id: 'strategic-outcome-1',
    title: 'Qual resultado seria mais valioso para você neste momento?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&h=600',
    options: [
      {
        id: 'outcome-1-a',
        text: 'Entender exatamente quais peças compõem meu guarda-roupa ideal',
        styleCategory: 'Clássico'
      },
      {
        id: 'outcome-1-b',
        text: 'Saber como me vestir para diferentes ocasiões com confiança',
        styleCategory: 'Elegante'
      },
      {
        id: 'outcome-1-c',
        text: 'Descobrir como expressar minha personalidade através das roupas',
        styleCategory: 'Criativo'
      },
      {
        id: 'outcome-1-d',
        text: 'Simplificar meu guarda-roupa mantendo versatilidade',
        styleCategory: 'Natural'
      }
    ]
  }
];
