
// src/data/questions/styleExperienceQuestions.ts
import { QuizQuestion } from '@/types/quiz';

export const styleExperienceQuestions: QuizQuestion[] = [
  {
    id: 'strategic-exp-1',
    title: 'Qual sua maior dificuldade ao montar seus looks?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=600',
    options: [
      {
        id: 'exp-1-a',
        text: 'Não sei combinar peças e acessórios',
        styleCategory: 'Natural'
      },
      {
        id: 'exp-1-b',
        text: 'Quero versatilidade mas acabo sempre com o mesmo visual',
        styleCategory: 'Contemporâneo'
      },
      {
        id: 'exp-1-c',
        text: 'Não consigo criar uma imagem que reflita minha personalidade',
        styleCategory: 'Criativo'
      },
      {
        id: 'exp-1-d',
        text: 'Tenho muitas roupas mas sinto que nada funciona bem',
        styleCategory: 'Clássico'
      }
    ]
  }
];
