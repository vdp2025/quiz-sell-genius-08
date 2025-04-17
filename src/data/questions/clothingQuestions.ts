
import { QuizQuestion } from '../../types/quiz';

export const clothingQuestions: QuizQuestion[] = [
  {
    id: '1',
    title: 'QUAL O SEU TIPO DE ROUPA FAVORITA?',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: '1a',
        text: 'Looks confortáveis, soltos ao corpo, práticos para usar e para cuidar.',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: '1b',
        text: 'Roupas discretas, com caimento clássico e que passam despercebidas.',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: '1c',
        text: 'Roupas confortáveis mas com um toque de estilo.',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: '1d',
        text: 'Peças com toques refinados, caimento perfeito, atual, mas sem modismos.',
        styleCategory: 'Elegante',
        points: 1
      },
      {
        id: '1e',
        text: 'Roupas delicadas de cores suaves, fluídas no corpo.',
        styleCategory: 'Romântico',
        points: 1
      },
      {
        id: '1f',
        text: 'Roupas que marquem meu corpo, decotes, fendas.',
        styleCategory: 'Sexy',
        points: 1
      },
      {
        id: '1g',
        text: 'Peças estruturadas, assimétricas, modernas.',
        styleCategory: 'Dramático',
        points: 1
      },
      {
        id: '1h',
        text: 'Formas e peças marcantes, em um mix no look.',
        styleCategory: 'Criativo',
        points: 1
      }
    ]
  },
  {
    id: '3',
    title: 'QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?',
    type: 'both',
    multiSelect: 3,
    options: [
      {
        id: '3a',
        text: 'Visual leve, despojado e natural.',
        imageUrl: '/lovable-uploads/24f7dc2c-ab37-41ba-a154-786b0626ae04.png',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: '3b',
        text: 'Visual clássico e tradicional.',
        imageUrl: '/lovable-uploads/0fb54364-9c71-4373-b6e7-500e6f9a2732.png',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: '3c',
        text: 'Visual casual com toque atual.',
        imageUrl: '/lovable-uploads/22d18ed7-b1fc-4fb4-9538-f0ab93fe5c75.png',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: '3d',
        text: 'Visual refinado e imponente.',
        imageUrl: '/lovable-uploads/e779494d-0c8d-408d-b034-1964a3b76469.png',
        styleCategory: 'Elegante',
        points: 1
      },
      {
        id: '3e',
        text: 'Visual romântico, feminino e delicado.',
        imageUrl: '/lovable-uploads/94638e1c-0180-4cfd-80be-26db97a1e58f.png',
        styleCategory: 'Romântico',
        points: 1
      },
      {
        id: '3f',
        text: 'Visual sensual, com saia justa e decote.',
        imageUrl: '/lovable-uploads/919b184d-940d-4a4f-b53c-36792cbd6114.png',
        styleCategory: 'Sexy',
        points: 1
      },
      {
        id: '3g',
        text: 'Visual marcante e urbano (jeans + jaqueta).',
        imageUrl: '/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png',
        styleCategory: 'Dramático',
        points: 1
      },
      {
        id: '3h',
        text: 'Visual criativo, colorido e ousado.',
        imageUrl: '/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png',
        styleCategory: 'Criativo',
        points: 1
      }
    ]
  }
];
