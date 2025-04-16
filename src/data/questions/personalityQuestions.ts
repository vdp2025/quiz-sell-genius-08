
import { QuizQuestion } from '../../types/quiz';

export const personalityQuestions: QuizQuestion[] = [
  {
    id: '2',
    title: 'RESUMA A SUA PERSONALIDADE:',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: '2a',
        text: 'Informal, espontânea, alegre, essencialista.',
        styleCategory: 'Natural'
      },
      {
        id: '2b',
        text: 'Conservadora, séria, organizada.',
        styleCategory: 'Clássico'
      },
      {
        id: '2c',
        text: 'Informada, ativa, prática.',
        styleCategory: 'Contemporâneo'
      },
      {
        id: '2d',
        text: 'Exigente, sofisticada, seletiva.',
        styleCategory: 'Elegante'
      },
      {
        id: '2e',
        text: 'Feminina, meiga, delicada, sensível.',
        styleCategory: 'Romântico'
      },
      {
        id: '2f',
        text: 'Glamorosa, vaidosa, sensual.',
        styleCategory: 'Sexy'
      },
      {
        id: '2g',
        text: 'Sou cosmopolita, moderna e audaciosa.',
        styleCategory: 'Dramático'
      },
      {
        id: '2h',
        text: 'Exótica, aventureira, livre.',
        styleCategory: 'Criativo'
      }
    ]
  },
  {
    id: '4',
    title: 'QUAIS DETALHES VOCÊ GOSTA?',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: '4a',
        text: 'Poucos detalhes, básico e prático.',
        styleCategory: 'Natural'
      },
      {
        id: '4b',
        text: 'Bem discretos e sutis, clean e clássico.',
        styleCategory: 'Clássico'
      },
      {
        id: '4c',
        text: 'Básico, mas com um toque de estilo.',
        styleCategory: 'Contemporâneo'
      },
      {
        id: '4d',
        text: 'Detalhes refinados, chic e que deem status.',
        styleCategory: 'Elegante'
      },
      {
        id: '4e',
        text: 'Detalhes delicados, laços, babados.',
        styleCategory: 'Romântico'
      },
      {
        id: '4f',
        text: 'Roupas que valorizem meu corpo: couro, zíper, fendas.',
        styleCategory: 'Sexy'
      },
      {
        id: '4g',
        text: 'Detalhes marcantes, firmeza e peso.',
        styleCategory: 'Dramático'
      },
      {
        id: '4h',
        text: 'Detalhes diferentes do convencional, produções ousadas.',
        styleCategory: 'Criativo'
      }
    ]
  }
];
