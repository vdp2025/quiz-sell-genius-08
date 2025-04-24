
import { QuizQuestion } from '../../types/quiz';

export const desiredOutcomesQuestions: QuizQuestion[] = [
  {
    id: 'strategic-7',
    title: 'Qual desses resultados você mais gostaria de alcançar com os Guias de Estilo e Imagem?',
    type: 'text',
    multiSelect: 1,
    orderIndex: 6,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195456/effortless-styling_webp.webp',
    options: [
      {
        id: 'strategic-7-1',
        text: 'Montar looks com mais facilidade e confiança',
        points: 0
      },
      {
        id: 'strategic-7-2',
        text: 'Usar o que já tenho e me sentir estilosa',
        points: 0
      },
      {
        id: 'strategic-7-3',
        text: 'Comprar com mais consciência e sem culpa',
        points: 0
      },
      {
        id: 'strategic-7-4',
        text: 'Ser admirada pela imagem que transmito',
        points: 0
      },
      {
        id: 'strategic-7-5',
        text: 'Resgatar peças esquecidas e criar novos looks com estilo',
        points: 0
      }
    ]
  }
];
