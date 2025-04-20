import { QuizBuilderState } from '@/types/quizBuilder';
import { generateId } from '@/utils/idGenerator';

export const styleQuizTemplate: QuizBuilderState = {
  components: [
    {
      id: generateId(),
      type: 'stageCover',
      order: 0,
      stageId: 'cover',
      data: {
        title: 'Quiz de Estilo Pessoal',
        subtitle: 'Descubra seu estilo predominante respondendo às perguntas a seguir',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
        stageTitle: 'Início',
        stageNumber: 1,
        buttonText: 'Iniciar Quiz',
        backgroundColor: '#FFFAF0',
        textColor: '#432818'
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    {
      id: generateId(),
      type: 'stageQuestion',
      order: 1,
      stageId: 'q1',
      data: {
        title: 'QUAL O SEU TIPO DE ROUPA FAVORITA?',
        question: 'Selecione 3 opções que mais combinam com seu estilo',
        options: [
          'Looks confortáveis, soltos ao corpo, práticos para usar e para cuidar.',
          'Roupas discretas, com caimento clássico e que passam despercebidas.',
          'Roupas confortáveis mas com um toque de estilo.',
          'Peças com toques refinados, caimento perfeito, atual, mas sem modismos.',
          'Roupas delicadas de cores suaves, fluídas no corpo.',
          'Roupas que marquem meu corpo, decotes, fendas.',
          'Peças estruturadas, assimétricas, modernas.',
          'Formas e peças marcantes, em um mix no look.'
        ],
        optionImages: [
          'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp',
          'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp',
          'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/4_snhaym.webp',
          'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
          'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/15_xezvcy.webp',
          'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735316/16_mpqpew.webp',
          'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735319/17_m5ogub.webp',
          'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/18_j8ipfb.webp'
        ],
        optionStyleCategories: [
          'Natural',
          'Clássico',
          'Contemporâneo',
          'Elegante',
          'Romântico',
          'Sexy',
          'Dramático',
          'Criativo'
        ],
        multiSelect: 3,
        displayType: 'both',
        imageSize: 'medium',
        required: true,
        stageTitle: 'Pergunta 1',
        stageNumber: 2,
        layout: {
          columns: 2,
          direction: 'vertical'
        },
        backgroundColorQuestion: '#FFFAF0',
        textColorQuestion: '#432818',
        selectionIndicator: 'border'
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    {
      id: generateId(),
      type: 'stageQuestion',
      order: 2,
      stageId: 'q2',
      data: {
        title: 'RESUMA A SUA PERSONALIDADE:',
        question: 'Selecione 3 opções que mais combinam com sua personalidade',
        options: [
          'Informal, espontânea, alegre, essencialista.',
          'Conservadora, séria, organizada.',
          'Informada, ativa, prática.',
          'Exigente, sofisticada, seletiva.',
          'Feminina, meiga, delicada, sensível.',
          'Glamorosa, vaidosa, sensual.',
          'Sou cosmopolita, moderna e audaciosa.',
          'Exótica, aventureira, livre.'
        ],
        optionStyleCategories: [
          'Natural',
          'Clássico',
          'Contemporâneo',
          'Elegante',
          'Romântico',
          'Sexy',
          'Dramático',
          'Criativo'
        ],
        multiSelect: 3,
        displayType: 'text',
        required: true,
        stageTitle: 'Pergunta 2',
        stageNumber: 3,
        layout: {
          columns: 1,
          direction: 'vertical'
        },
        backgroundColorQuestion: '#FFFAF0',
        textColorQuestion: '#432818',
        selectionIndicator: 'border'
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    {
      id: generateId(),
      type: 'stageQuestion',
      order: 3,
      stageId: 'q3',
      data: {
        title: 'QUAIS DETALHES VOCÊ GOSTA?',
        question: 'Selecione 3 opções que mais combinam com seu estilo',
        options: [
          'Poucos detalhes, básico e prático.',
          'Bem discretos e sutis, clean e clássico.',
          'Básico, mas com um toque de estilo.',
          'Detalhes refinados, chic e que deem status.',
          'Detalhes delicados, laços, babados.',
          'Roupas que valorizem meu corpo: couro, zíper, fendas.',
          'Detalhes marcantes, firmeza e peso.',
          'Detalhes diferentes do convencional, produções ousadas.'
        ],
        optionStyleCategories: [
          'Natural',
          'Clássico',
          'Contemporâneo',
          'Elegante',
          'Romântico',
          'Sexy',
          'Dramático',
          'Criativo'
        ],
        multiSelect: 3,
        displayType: 'text',
        required: true,
        stageTitle: 'Pergunta 3',
        stageNumber: 4
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    {
      id: generateId(),
      type: 'stageQuestion',
      order: 4,
      stageId: 'q4',
      data: {
        title: 'QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?',
        question: 'Selecione 3 opções que mais combinam com seu estilo',
        options: [
          'Estampas clean, com poucas informações.',
          'Estampas clássicas e atemporais.',
          'Atemporais, mas que tenham uma pegada de atual e moderna.',
          'Estampas clássicas e atemporais, mas sofisticadas.',
          'Estampas florais e/ou delicadas como bolinhas, borboletas e corações.',
          'Estampas de animal print, como onça, zebra e cobra.',
          'Estampas geométricas, abstratas e exageradas como grandes poás.',
          'Estampas diferentes do usual, como africanas, xadrez grandes.'
        ],
        optionStyleCategories: [
          'Natural',
          'Clássico',
          'Contemporâneo',
          'Elegante',
          'Romântico',
          'Sexy',
          'Dramático',
          'Criativo'
        ],
        multiSelect: 3,
        displayType: 'text',
        required: true,
        stageTitle: 'Pergunta 4',
        stageNumber: 5
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    {
      id: generateId(),
      type: 'stageQuestion',
      order: 5,
      stageId: 'q5',
      data: {
        title: 'VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...',
        question: 'Selecione 3 opções que mais combinam com seu estilo',
        options: [
          'São fáceis de cuidar.',
          'São de excelente qualidade.',
          'São fáceis de cuidar e modernos.',
          'São sofisticados.',
          'São delicados.',
          'São perfeitos ao meu corpo.',
          'São diferentes, e trazem um efeito para minha roupa.',
          'São exclusivos, criam identidade no look.'
        ],
        optionStyleCategories: [
          'Natural',
          'Clássico',
          'Contemporâneo',
          'Elegante',
          'Romântico',
          'Sexy',
          'Dramático',
          'Criativo'
        ],
        multiSelect: 3,
        displayType: 'text',
        required: true,
        stageTitle: 'Pergunta 5',
        stageNumber: 6
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    {
      id: generateId(),
      type: 'stageResult',
      order: 6,
      stageId: 'result',
      data: {
        title: 'Seu Resultado de Estilo Pessoal',
        subtitle: 'Baseado nas suas escolhas, calculamos seu estilo predominante',
        stageTitle: 'Resultado',
        stageNumber: 7,
        resultLayout: 'modern',
        primaryStyleTitle: 'Olá, seu Estilo Predominante é:',
        secondaryStylesTitle: 'Seus Estilos Complementares:',
        showPercentages: true,
        showDescriptions: true,
        callToActionText: 'Conhecer o Guia Completo',
        callToActionUrl: '#',
        offerImageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
        authorImageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp',
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        accentColor: '#B89B7A'
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    }
  ],
  stages: [
    {
      id: 'cover',
      title: 'Início',
      order: 0,
      type: 'cover'
    },
    {
      id: 'q1',
      title: 'Pergunta 1',
      order: 1,
      type: 'question'
    },
    {
      id: 'q2',
      title: 'Pergunta 2',
      order: 2,
      type: 'question'
    },
    {
      id: 'q3',
      title: 'Pergunta 3',
      order: 3,
      type: 'question'
    },
    {
      id: 'q4',
      title: 'Pergunta 4',
      order: 4,
      type: 'question'
    },
    {
      id: 'q5',
      title: 'Pergunta 5',
      order: 5,
      type: 'question'
    },
    {
      id: 'result',
      title: 'Resultado',
      order: 6,
      type: 'result'
    }
  ]
};
