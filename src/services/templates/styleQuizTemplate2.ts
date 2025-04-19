
import { QuizQuestion } from '@/types/quiz';
import { generateId } from '@/utils/idGenerator';

// Create a simpler version of the style quiz template for the second option
const styleQuizTemplate2: QuizQuestion[] = [
  {
    id: generateId(),
    title: 'QUAL O SEU TIPO DE ROUPA FAVORITA?',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: generateId(),
        text: 'Looks confortáveis, soltos ao corpo, práticos para usar e para cuidar.',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: generateId(),
        text: 'Roupas discretas, com caimento clássico e que passam despercebidas.',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: generateId(),
        text: 'Roupas confortáveis mas com um toque de estilo.',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: generateId(),
        text: 'Peças com toques refinados, caimento perfeito, atual, mas sem modismos.',
        styleCategory: 'Elegante',
        points: 1
      }
    ]
  },
  {
    id: generateId(),
    title: 'RESUMA A SUA PERSONALIDADE:',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: generateId(),
        text: 'Informal, espontânea, alegre, essencialista.',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: generateId(),
        text: 'Conservadora, séria, organizada.',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: generateId(),
        text: 'Informada, ativa, prática.',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: generateId(),
        text: 'Exigente, sofisticada, seletiva.',
        styleCategory: 'Elegante',
        points: 1
      }
    ]
  }
];

export default styleQuizTemplate2;
