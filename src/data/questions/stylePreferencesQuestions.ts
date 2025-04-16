
import { QuizQuestion } from '../../types/quiz';

export const stylePreferencesQuestions: QuizQuestion[] = [
  {
    id: '5',
    title: 'QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: '5a',
        text: 'Estampas clean, com poucas informações.',
        styleCategory: 'Natural'
      },
      {
        id: '5b',
        text: 'Estampas clássicas e atemporais.',
        styleCategory: 'Clássico'
      },
      {
        id: '5c',
        text: 'Atemporais, mas que tenham uma pegada de atual e moderna.',
        styleCategory: 'Contemporâneo'
      },
      {
        id: '5d',
        text: 'Estampas clássicas e atemporais, mas sofisticadas.',
        styleCategory: 'Elegante'
      },
      {
        id: '5e',
        text: 'Estampas florais e/ou delicadas como bolinhas, borboletas e corações.',
        styleCategory: 'Romântico'
      },
      {
        id: '5f',
        text: 'Estampas de animal print, como onça, zebra e cobra.',
        styleCategory: 'Sexy'
      },
      {
        id: '5g',
        text: 'Estampas geométricas, abstratas e exageradas como grandes poás.',
        styleCategory: 'Dramático'
      },
      {
        id: '5h',
        text: 'Estampas diferentes do usual, como africanas, xadrez grandes.',
        styleCategory: 'Criativo'
      }
    ]
  },
  {
    id: '10',
    title: 'VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: '10a',
        text: 'São fáceis de cuidar.',
        styleCategory: 'Natural'
      },
      {
        id: '10b',
        text: 'São de excelente qualidade.',
        styleCategory: 'Clássico'
      },
      {
        id: '10c',
        text: 'São fáceis de cuidar e modernos.',
        styleCategory: 'Contemporâneo'
      },
      {
        id: '10d',
        text: 'São sofisticados.',
        styleCategory: 'Elegante'
      },
      {
        id: '10e',
        text: 'São delicados.',
        styleCategory: 'Romântico'
      },
      {
        id: '10f',
        text: 'São perfeitos ao meu corpo.',
        styleCategory: 'Sexy'
      },
      {
        id: '10g',
        text: 'São diferentes, e trazem um efeito para minha roupa.',
        styleCategory: 'Dramático'
      },
      {
        id: '10h',
        text: 'São exclusivos, criam identidade no look.',
        styleCategory: 'Criativo'
      }
    ]
  }
];
