
// src/data/questions/purchaseIntentQuestions.ts
import { QuizQuestion } from '@/types/quiz';

export const purchaseIntentQuestions: QuizQuestion[] = [
  {
    id: 'strategic-intent-1',
    title: 'O que mais te motivaria a investir em consultoria de imagem?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&h=600',
    options: [
      {
        id: 'intent-1-a',
        text: 'Ter uma imagem mais alinhada com meus objetivos profissionais',
        styleCategory: 'Elegante'
      },
      {
        id: 'intent-1-b',
        text: 'Economizar tempo e dinheiro ao comprar roupas',
        styleCategory: 'Natural'
      },
      {
        id: 'intent-1-c',
        text: 'Sentir mais confiança e autenticidade no dia a dia',
        styleCategory: 'Contemporâneo'
      },
      {
        id: 'intent-1-d',
        text: 'Desenvolver um estilo único e memorável',
        styleCategory: 'Criativo'
      }
    ]
  }
];
