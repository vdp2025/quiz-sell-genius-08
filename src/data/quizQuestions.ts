
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
    id: '3',
    title: 'QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?',
    type: 'both',
    multiSelect: 3,
    options: [
      {
        id: '3a',
        text: 'Visual leve, despojado e natural.',
        imageUrl: '/lovable-uploads/24f7dc2c-ab37-41ba-a154-786b0626ae04.png',
        styleCategory: 'Natural'
      },
      {
        id: '3b',
        text: 'Visual clássico e tradicional.',
        imageUrl: '/lovable-uploads/0fb54364-9c71-4373-b6e7-500e6f9a2732.png',
        styleCategory: 'Clássico'
      },
      {
        id: '3c',
        text: 'Visual casual com toque atual.',
        imageUrl: '/lovable-uploads/22d18ed7-b1fc-4fb4-9538-f0ab93fe5c75.png',
        styleCategory: 'Contemporâneo'
      },
      {
        id: '3d',
        text: 'Visual refinado e imponente.',
        imageUrl: '/lovable-uploads/e779494d-0c8d-408d-b034-1964a3b76469.png',
        styleCategory: 'Elegante'
      },
      {
        id: '3e',
        text: 'Visual romântico, feminino e delicado.',
        imageUrl: '/lovable-uploads/94638e1c-0180-4cfd-80be-26db97a1e58f.png',
        styleCategory: 'Romântico'
      },
      {
        id: '3f',
        text: 'Visual sensual, com saia justa e decote.',
        imageUrl: '/lovable-uploads/919b184d-940d-4a4f-b53c-36792cbd6114.png',
        styleCategory: 'Sexy'
      },
      {
        id: '3g',
        text: 'Visual marcante e urbano (jeans + jaqueta).',
        imageUrl: '/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png',
        styleCategory: 'Dramático'
      },
      {
        id: '3h',
        text: 'Visual criativo, colorido e ousado.',
        imageUrl: '/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png',
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
  },
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
    id: '6',
    title: 'QUAL CASACO É SEU FAVORITO?',
    type: 'both',
    multiSelect: 3,
    options: [
      {
        id: '6a',
        text: 'Cardigã bege confortável e casual.',
        imageUrl: '/lovable-uploads/1ac66423-7712-4c33-9c28-13e8b6fe3170.png',
        styleCategory: 'Natural'
      },
      {
        id: '6b',
        text: 'Blazer verde estruturado.',
        imageUrl: '/lovable-uploads/169fe8d0-8afd-4447-a9cc-79d917967e64.png',
        styleCategory: 'Clássico'
      },
      {
        id: '6c',
        text: 'Trench coat bege tradicional.',
        imageUrl: '/lovable-uploads/0530ff81-b41d-45eb-8b47-ef88f75f7d93.png',
        styleCategory: 'Contemporâneo'
      },
      {
        id: '6d',
        text: 'Blazer branco refinado.',
        imageUrl: '/lovable-uploads/d9da05d3-6fdd-46d0-afea-42417af058c5.png',
        styleCategory: 'Elegante'
      },
      {
        id: '6e',
        text: 'Casaco pink vibrante e moderno.',
        imageUrl: '/lovable-uploads/5b819e5d-ca43-465a-906e-353764bdb2ec.png',
        styleCategory: 'Romântico'
      },
      {
        id: '6f',
        text: 'Jaqueta vinho de couro estilosa.',
        imageUrl: '/lovable-uploads/54671bc8-ed46-4e5d-a347-5c8e8fe45f8b.png',
        styleCategory: 'Sexy'
      },
      {
        id: '6g',
        text: 'Jaqueta preta estilo rocker.',
        imageUrl: '/lovable-uploads/e30cb887-b027-40ab-b112-fe8c2244d789.png',
        styleCategory: 'Dramático'
      },
      {
        id: '6h',
        text: 'Casaco estampado criativo e colorido.',
        imageUrl: '/lovable-uploads/fc8f4066-6f40-4ff8-bc55-460da133b6c2.png',
        styleCategory: 'Criativo'
      }
    ]
  },
  {
    id: '7',
    title: 'QUAL SUA CALÇA FAVORITA?',
    type: 'both',
    multiSelect: 3,
    options: [
      {
        id: '7a',
        text: 'Calça fluida acetinada bege.',
        imageUrl: '/lovable-uploads/86053444-8589-43e6-af61-02764cf80510.png',
        styleCategory: 'Natural'
      },
      {
        id: '7b',
        text: 'Calça de alfaiataria cinza.',
        imageUrl: '/lovable-uploads/e2627b2e-8e68-48e0-a678-c685c5631515.png',
        styleCategory: 'Clássico'
      },
      {
        id: '7c',
        text: 'Jeans reto e básico.',
        imageUrl: '/lovable-uploads/ea329cbe-6455-4aca-8fa4-cf73031ca26e.png',
        styleCategory: 'Contemporâneo'
      },
      {
        id: '7d',
        text: 'Calça reta bege de tecido.',
        imageUrl: '/lovable-uploads/54a9ca5f-9b1f-48a3-9fd8-0aa9a240b8ae.png',
        styleCategory: 'Elegante'
      },
      {
        id: '7e',
        text: 'Calça ampla rosa alfaiatada.',
        imageUrl: '/lovable-uploads/061e6932-2ddc-4100-ad82-def9909cfcdc.png',
        styleCategory: 'Romântico'
      },
      {
        id: '7f',
        text: 'Legging preta de couro.',
        imageUrl: '/lovable-uploads/027348ed-9275-43b2-ba49-d49d5baca56a.png',
        styleCategory: 'Sexy'
      },
      {
        id: '7g',
        text: 'Calça reta preta de couro.',
        imageUrl: '/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png',
        styleCategory: 'Dramático'
      },
      {
        id: '7h',
        text: 'Calça estampada floral leve e ampla.',
        imageUrl: '/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png',
        styleCategory: 'Criativo'
      }
    ]
  },
  {
    id: '8',
    title: 'QUAL DESSES SAPATOS VOCÊ TEM OU MAIS GOSTA?',
    type: 'both',
    multiSelect: 3,
    options: [
      {
        id: '8a',
        text: 'Tênis nude casual e confortável.',
        imageUrl: '/lovable-uploads/745a655d-7bc5-455d-910f-1bafa159b22f.png',
        styleCategory: 'Natural'
      },
      {
        id: '8b',
        text: 'Scarpin nude de salto baixo.',
        imageUrl: '/lovable-uploads/8a126cdd-57cc-49c4-98f0-4d3b81e32b95.png',
        styleCategory: 'Clássico'
      },
      {
        id: '8c',
        text: 'Sandália dourada com salto bloco.',
        imageUrl: '/lovable-uploads/50fe376f-73d9-413c-b0d9-ff6a53abe59e.png',
        styleCategory: 'Contemporâneo'
      },
      {
        id: '8d',
        text: 'Scarpin nude salto alto e fino.',
        imageUrl: '/lovable-uploads/68332b46-5016-4b94-9ae0-5eb80f1aba55.png',
        styleCategory: 'Elegante'
      },
      {
        id: '8e',
        text: 'Sandália anabela off white.',
        imageUrl: '/lovable-uploads/83afe58a-f032-453f-ba56-d09d96cba1cd.png',
        styleCategory: 'Romântico'
      },
      {
        id: '8f',
        text: 'Sandália rosa de tiras finas.',
        imageUrl: '/lovable-uploads/94638e1c-0180-4cfd-80be-26db97a1e58f.png',
        styleCategory: 'Sexy'
      },
      {
        id: '8g',
        text: 'Scarpin preto moderno com vinil transparente.',
        imageUrl: '/lovable-uploads/05a536b0-b6ed-41b6-9401-ae24e7706a1a.png',
        styleCategory: 'Dramático'
      },
      {
        id: '8h',
        text: 'Scarpin colorido estampado.',
        imageUrl: '/lovable-uploads/c266ca0a-ad80-4441-8f5e-4ea4aa9ed0bd.png',
        styleCategory: 'Criativo'
      }
    ]
  },
  {
    id: '9',
    title: 'QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: '9a',
        text: 'Pequenos e discretos, às vezes nem uso.',
        styleCategory: 'Natural'
      },
      {
        id: '9b',
        text: 'Brincos pequenos e discretos. Corrente fininha.',
        styleCategory: 'Clássico'
      },
      {
        id: '9c',
        text: 'Acessórios que elevem meu look com um toque moderno.',
        styleCategory: 'Contemporâneo'
      },
      {
        id: '9d',
        text: 'Acessórios sofisticados, joias ou semijoias.',
        styleCategory: 'Elegante'
      },
      {
        id: '9e',
        text: 'Peças delicadas e com um toque feminino.',
        styleCategory: 'Romântico'
      },
      {
        id: '9f',
        text: 'Brincos longos, colares que valorizem minha beleza.',
        styleCategory: 'Sexy'
      },
      {
        id: '9g',
        text: 'Acessórios pesados, que causem um impacto.',
        styleCategory: 'Dramático'
      },
      {
        id: '9h',
        text: 'Acessórios diferentes, grandes e marcantes.',
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
