
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
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: '3b',
        text: 'Visual clássico e tradicional.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/3_asaunw.webp',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: '3c',
        text: 'Visual casual com toque atual.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: '3d',
        text: 'Visual refinado e imponente.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp',
        styleCategory: 'Elegante',
        points: 1
      },
      {
        id: '3e',
        text: 'Visual romântico, feminino e delicado.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp',
        styleCategory: 'Romântico',
        points: 1
      },
      {
        id: '3f',
        text: 'Visual sensual, com saia justa e decote.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp',
        styleCategory: 'Sexy',
        points: 1
      },
      {
        id: '3g',
        text: 'Visual marcante e urbano (jeans + jaqueta).',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp',
        styleCategory: 'Dramático',
        points: 1
      },
      {
        id: '3h',
        text: 'Visual criativo, colorido e ousado.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp',
        styleCategory: 'Criativo',
        points: 1
      }
    ]
  }
];

