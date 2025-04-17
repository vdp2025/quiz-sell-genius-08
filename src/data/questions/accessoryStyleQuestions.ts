
import { QuizQuestion } from '../../types/quiz';

export const accessoryStyleQuestions: QuizQuestion[] = [
  {
    id: '9',
    title: 'QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: '9a',
        text: 'Pequenos e discretos, às vezes nem uso.',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: '9b',
        text: 'Brincos pequenos e discretos. Corrente fininha.',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: '9c',
        text: 'Acessórios que elevem meu look com um toque moderno.',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: '9d',
        text: 'Acessórios sofisticados, joias ou semijoias.',
        styleCategory: 'Elegante',
        points: 1
      },
      {
        id: '9e',
        text: 'Peças delicadas e com um toque feminino.',
        styleCategory: 'Romântico',
        points: 1
      },
      {
        id: '9f',
        text: 'Brincos longos, colares que valorizem minha beleza.',
        styleCategory: 'Sexy',
        points: 1
      },
      {
        id: '9g',
        text: 'Acessórios pesados, que causem um impacto.',
        styleCategory: 'Dramático',
        points: 1
      },
      {
        id: '9h',
        text: 'Acessórios diferentes, grandes e marcantes.',
        styleCategory: 'Criativo',
        points: 1
      }
    ]
  }
];
