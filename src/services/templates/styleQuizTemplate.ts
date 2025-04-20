
import { QuizQuestion } from '@/types/quiz';
import { generateId } from '@/utils/idGenerator';

// Helper function to create question IDs
const createQuestionId = (category: string, index: number) => `${category}_${index}`;

// Helper function to create option IDs
const createOptionId = (questionId: string, index: number) => `${questionId}_option_${index}`;

// Create the style quiz template
export const styleQuizTemplate: QuizQuestion[] = [
  {
    id: createQuestionId('clothingQuestions', 1),
    title: 'QUAL O SEU TIPO DE ROUPA FAVORITA?',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: createOptionId(createQuestionId('clothingQuestions', 1), 0),
        text: 'Looks confortáveis, soltos ao corpo, práticos para usar e para cuidar.',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 1), 1),
        text: 'Roupas discretas, com caimento clássico e que passam despercebidas.',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 1), 2),
        text: 'Roupas confortáveis mas com um toque de estilo.',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 1), 3),
        text: 'Peças com toques refinados, caimento perfeito, atual, mas sem modismos.',
        styleCategory: 'Elegante',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 1), 4),
        text: 'Roupas delicadas de cores suaves, fluídas no corpo.',
        styleCategory: 'Romântico',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 1), 5),
        text: 'Roupas que marquem meu corpo, decotes, fendas.',
        styleCategory: 'Sexy',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 1), 6),
        text: 'Peças estruturadas, assimétricas, modernas.',
        styleCategory: 'Dramático',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 1), 7),
        text: 'Formas e peças marcantes, em um mix no look.',
        styleCategory: 'Criativo',
        points: 1
      }
    ]
  },
  {
    id: createQuestionId('personalityQuestions', 1),
    title: 'RESUMA A SUA PERSONALIDADE:',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: createOptionId(createQuestionId('personalityQuestions', 1), 0),
        text: 'Informal, espontânea, alegre, essencialista.',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 1), 1),
        text: 'Conservadora, séria, organizada.',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 1), 2),
        text: 'Informada, ativa, prática.',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 1), 3),
        text: 'Exigente, sofisticada, seletiva.',
        styleCategory: 'Elegante',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 1), 4),
        text: 'Feminina, meiga, delicada, sensível.',
        styleCategory: 'Romântico',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 1), 5),
        text: 'Glamorosa, vaidosa, sensual.',
        styleCategory: 'Sexy',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 1), 6),
        text: 'Sou cosmopolita, moderna e audaciosa.',
        styleCategory: 'Dramático',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 1), 7),
        text: 'Exótica, aventureira, livre.',
        styleCategory: 'Criativo',
        points: 1
      }
    ]
  },
  {
    id: createQuestionId('clothingQuestions', 2),
    title: 'QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?',
    type: 'both',
    multiSelect: 3,
    options: [
      {
        id: createOptionId(createQuestionId('clothingQuestions', 2), 0),
        text: 'Visual leve, despojado e natural.',
        imageUrl: '/lovable-uploads/24f7dc2c-ab37-41ba-a154-786b0626ae04.png',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 2), 1),
        text: 'Visual clássico e tradicional.',
        imageUrl: '/lovable-uploads/0fb54364-9c71-4373-b6e7-500e6f9a2732.png',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 2), 2),
        text: 'Visual casual com toque atual.',
        imageUrl: '/lovable-uploads/22d18ed7-b1fc-4fb4-9538-f0ab93fe5c75.png',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 2), 3),
        text: 'Visual refinado e imponente.',
        imageUrl: '/lovable-uploads/e779494d-0c8d-408d-b034-1964a3b76469.png',
        styleCategory: 'Elegante',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 2), 4),
        text: 'Visual romântico, feminino e delicado.',
        imageUrl: '/lovable-uploads/94638e1c-0180-4cfd-80be-26db97a1e58f.png',
        styleCategory: 'Romântico',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 2), 5),
        text: 'Visual sensual, com saia justa e decote.',
        imageUrl: '/lovable-uploads/919b184d-940d-4a4f-b53c-36792cbd6114.png',
        styleCategory: 'Sexy',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 2), 6),
        text: 'Visual marcante e urbano (jeans + jaqueta).',
        imageUrl: '/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png',
        styleCategory: 'Dramático',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('clothingQuestions', 2), 7),
        text: 'Visual criativo, colorido e ousado.',
        imageUrl: '/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png',
        styleCategory: 'Criativo',
        points: 1
      }
    ]
  },
  {
    id: createQuestionId('personalityQuestions', 2),
    title: 'QUAIS DETALHES VOCÊ GOSTA?',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: createOptionId(createQuestionId('personalityQuestions', 2), 0),
        text: 'Poucos detalhes, básico e prático.',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 2), 1),
        text: 'Bem discretos e sutis, clean e clássico.',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 2), 2),
        text: 'Básico, mas com um toque de estilo.',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 2), 3),
        text: 'Detalhes refinados, chic e que deem status.',
        styleCategory: 'Elegante',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 2), 4),
        text: 'Detalhes delicados, laços, babados.',
        styleCategory: 'Romântico',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 2), 5),
        text: 'Roupas que valorizem meu corpo: couro, zíper, fendas.',
        styleCategory: 'Sexy',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 2), 6),
        text: 'Detalhes marcantes, firmeza e peso.',
        styleCategory: 'Dramático',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('personalityQuestions', 2), 7),
        text: 'Detalhes diferentes do convencional, produções ousadas.',
        styleCategory: 'Criativo',
        points: 1
      }
    ]
  },
  {
    id: createQuestionId('stylePreferencesQuestions', 1),
    title: 'QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: createOptionId(createQuestionId('stylePreferencesQuestions', 1), 0),
        text: 'Estampas clean, com poucas informações.',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('stylePreferencesQuestions', 1), 1),
        text: 'Estampas clássicas e atemporais.',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('stylePreferencesQuestions', 1), 2),
        text: 'Atemporais, mas que tenham uma pegada de atual e moderna.',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('stylePreferencesQuestions', 1), 3),
        text: 'Estampas clássicas e atemporais, mas sofisticadas.',
        styleCategory: 'Elegante',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('stylePreferencesQuestions', 1), 4),
        text: 'Estampas florais e/ou delicadas como bolinhas, borboletas e corações.',
        styleCategory: 'Romântico',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('stylePreferencesQuestions', 1), 5),
        text: 'Estampas de animal print, como onça, zebra e cobra.',
        styleCategory: 'Sexy',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('stylePreferencesQuestions', 1), 6),
        text: 'Estampas geométricas, abstratas e exageradas como grandes poás.',
        styleCategory: 'Dramático',
        points: 1
      },
      {
        id: createOptionId(createQuestionId('stylePreferencesQuestions', 1), 7),
        text: 'Estampas diferentes do usual, como africanas, xadrez grandes.',
        styleCategory: 'Criativo',
        points: 1
      }
    ]
  }
  // You can add more questions, but for brevity I'm limiting to these 5
];
