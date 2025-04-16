
import { QuizQuestion } from '../types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    title: 'QUAL O SEU TIPO DE ROUPA FAVORITA?',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: '1a',
        text: 'Looks confortáveis, soltos ao corpo, práticos para usar e para cuidar.',
        styleCategory: 'Natural'
      },
      {
        id: '1b',
        text: 'Roupas discretas, com caimento clássico e que passam despercebidas.',
        styleCategory: 'Clássico'
      },
      {
        id: '1c',
        text: 'Roupas confortáveis mas com um toque de estilo.',
        styleCategory: 'Contemporâneo'
      },
      {
        id: '1d',
        text: 'Peças com toques refinados, caimento perfeito, atual, mas sem modismos.',
        styleCategory: 'Elegante'
      },
      {
        id: '1e',
        text: 'Roupas delicadas de cores suaves, fluídas no corpo.',
        styleCategory: 'Romântico'
      },
      {
        id: '1f',
        text: 'Roupas que marquem meu corpo, decotes, fendas.',
        styleCategory: 'Sexy'
      },
      {
        id: '1g',
        text: 'Peças estruturadas, assimétricas, modernas.',
        styleCategory: 'Dramático'
      },
      {
        id: '1h',
        text: 'Formas e peças marcantes, em um mix no look.',
        styleCategory: 'Criativo'
      }
    ]
  },
  // Adding the second question as an example
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
  }
];
