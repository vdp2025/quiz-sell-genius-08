
import { QuizQuestion } from '../../types/quiz';

export const stylePreferencesQuestions: QuizQuestion[] = [
  {
    id: '5',
    title: 'QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?',
    type: 'both',
    multiSelect: 3,
    orderIndex: 4,
    options: [
      {
        id: '5a',
        text: 'Estampas clean, com poucas informações.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/20_oh44vh.webp',
        styleCategory: 'Natural',
        styleCode: 'N',
        styleTypeId: 'natural',
        points: 1
      },
      {
        id: '5b',
        text: 'Estampas clássicas e atemporais.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735368/21_o7wkte.webp',
        styleCategory: 'Clássico',
        styleCode: 'C',
        styleTypeId: 'classico',
        points: 1
      },
      {
        id: '5c',
        text: 'Atemporais, mas que tenham uma pegada de atual e moderna.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735369/22_siebw2.webp',
        styleCategory: 'Contemporâneo',
        styleCode: 'CT',
        styleTypeId: 'contemporaneo',
        points: 1
      },
      {
        id: '5d',
        text: 'Estampas clássicas e atemporais, mas sofisticadas.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/23_bdfxrh.webp',
        styleCategory: 'Elegante',
        styleCode: 'E',
        styleTypeId: 'elegante',
        points: 1
      },
      {
        id: '5e',
        text: 'Estampas florais e/ou delicadas como bolinhas, borboletas e corações.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/24_nptszu.webp',
        styleCategory: 'Romântico',
        styleCode: 'R',
        styleTypeId: 'romantico',
        points: 1
      },
      {
        id: '5f',
        text: 'Estampas de animal print, como onça, zebra e cobra.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/25_motk6b.webp',
        styleCategory: 'Sexy',
        styleCode: 'S',
        styleTypeId: 'sexy',
        points: 1
      },
      {
        id: '5g',
        text: 'Estampas geométricas, abstratas e exageradas como grandes poás.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/26_dptanw.webp',
        styleCategory: 'Dramático',
        styleCode: 'D',
        styleTypeId: 'dramatico',
        points: 1
      },
      {
        id: '5h',
        text: 'Estampas diferentes do usual, como africanas, xadrez grandes.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/27_wxmklx.webp',
        styleCategory: 'Criativo',
        styleCode: 'CR',
        styleTypeId: 'criativo',
        points: 1
      }
    ]
  },
  {
    id: '10',
    title: 'VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...',
    type: 'text',
    multiSelect: 3,
    orderIndex: 9,
    options: [
      {
        id: '10a',
        text: 'São fáceis de cuidar.',
        styleCategory: 'Natural',
        styleCode: 'N',
        styleTypeId: 'natural',
        points: 1
      },
      {
        id: '10b',
        text: 'São de excelente qualidade.',
        styleCategory: 'Clássico',
        styleCode: 'C',
        styleTypeId: 'classico',
        points: 1
      },
      {
        id: '10c',
        text: 'São fáceis de cuidar e modernos.',
        styleCategory: 'Contemporâneo',
        styleCode: 'CT',
        styleTypeId: 'contemporaneo',
        points: 1
      },
      {
        id: '10d',
        text: 'São sofisticados.',
        styleCategory: 'Elegante',
        styleCode: 'E',
        styleTypeId: 'elegante',
        points: 1
      },
      {
        id: '10e',
        text: 'São delicados.',
        styleCategory: 'Romântico',
        styleCode: 'R',
        styleTypeId: 'romantico',
        points: 1
      },
      {
        id: '10f',
        text: 'São perfeitos ao meu corpo.',
        styleCategory: 'Sexy',
        styleCode: 'S',
        styleTypeId: 'sexy',
        points: 1
      },
      {
        id: '10g',
        text: 'São diferentes, e trazem um efeito para minha roupa.',
        styleCategory: 'Dramático',
        styleCode: 'D',
        styleTypeId: 'dramatico',
        points: 1
      },
      {
        id: '10h',
        text: 'São exclusivos, criam identidade no look.',
        styleCategory: 'Criativo',
        styleCode: 'CR',
        styleTypeId: 'criativo',
        points: 1
      }
    ]
  }
];
