
import { QuizStep } from '@/types/quizBuilder';
import { generateId } from '@/utils/idGenerator';

export const styleQuizTemplate: QuizStep[] = [
  {
    id: 'step-welcome',
    title: 'Boas-vindas',
    components: [
      {
        id: generateId(),
        type: 'header',
        order: 0,
        data: {
          title: 'DESCUBRA SEU ESTILO PESSOAL',
          subtitle: 'Responda o quiz e saiba qual estilo combina mais com você'
        },
        style: {
          paddingY: '20',
          paddingX: '10'
        }
      },
      {
        id: generateId(),
        type: 'image',
        order: 1,
        data: {
          imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
          alt: 'Logo Gisele Galvão'
        }
      },
      {
        id: generateId(),
        type: 'text',
        order: 2,
        data: {
          text: 'Este quiz foi desenvolvido para ajudá-la a identificar seu estilo pessoal predominante e como ele pode influenciar suas escolhas de moda e imagem pessoal.'
        },
        style: {
          paddingY: '10',
          paddingX: '20',
          fontSize: 16
        }
      },
      {
        id: generateId(),
        type: 'continueButton',
        order: 3,
        data: {
          buttonText: 'Começar Quiz',
          buttonColor: '#B89B7A',
          buttonTextColor: '#FFFFFF'
        }
      }
    ]
  },
  {
    id: 'step-q1',
    title: 'Questão 1',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAL O SEU TIPO DE ROUPA FAVORITA?',
          multiSelect: 3,
          displayType: 'text',
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
          fullOptions: [
            { text: 'Looks confortáveis, soltos ao corpo, práticos para usar e para cuidar.', styleCategory: 'Natural', points: 3 },
            { text: 'Roupas discretas, com caimento clássico e que passam despercebidas.', styleCategory: 'Clássico', points: 3 },
            { text: 'Roupas confortáveis mas com um toque de estilo.', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Peças com toques refinados, caimento perfeito, atual, mas sem modismos.', styleCategory: 'Elegante', points: 3 },
            { text: 'Roupas delicadas de cores suaves, fluídas no corpo.', styleCategory: 'Romântico', points: 3 },
            { text: 'Roupas que marquem meu corpo, decotes, fendas.', styleCategory: 'Sexy', points: 3 },
            { text: 'Peças estruturadas, assimétricas, modernas.', styleCategory: 'Dramático', points: 3 },
            { text: 'Formas e peças marcantes, em um mix no look.', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q2',
    title: 'Questão 2',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'RESUMA A SUA PERSONALIDADE:',
          multiSelect: 3,
          displayType: 'text',
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
          fullOptions: [
            { text: 'Informal, espontânea, alegre, essencialista.', styleCategory: 'Natural', points: 3 },
            { text: 'Conservadora, séria, organizada.', styleCategory: 'Clássico', points: 3 },
            { text: 'Informada, ativa, prática.', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Exigente, sofisticada, seletiva.', styleCategory: 'Elegante', points: 3 },
            { text: 'Feminina, meiga, delicada, sensível.', styleCategory: 'Romântico', points: 3 },
            { text: 'Glamorosa, vaidosa, sensual.', styleCategory: 'Sexy', points: 3 },
            { text: 'Sou cosmopolita, moderna e audaciosa.', styleCategory: 'Dramático', points: 3 },
            { text: 'Exótica, aventureira, livre.', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q3',
    title: 'Questão 3',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?',
          multiSelect: 3,
          displayType: 'both',
          gridColumns: 2,
          imageHeight: 180,
          options: [
            'Visual leve, despojado e natural.',
            'Visual clássico e tradicional.',
            'Visual casual com toque atual.',
            'Visual refinado e imponente.',
            'Visual romântico, feminino e delicado.',
            'Visual sensual, com saia justa e decote.',
            'Visual marcante e urbano (jeans + jaqueta).',
            'Visual criativo, colorido e ousado.'
          ],
          fullOptions: [
            { text: 'Visual leve, despojado e natural.', imageUrl: '/lovable-uploads/24f7dc2c-ab37-41ba-a154-786b0626ae04.png', styleCategory: 'Natural', points: 3 },
            { text: 'Visual clássico e tradicional.', imageUrl: '/lovable-uploads/0fb54364-9c71-4373-b6e7-500e6f9a2732.png', styleCategory: 'Clássico', points: 3 },
            { text: 'Visual casual com toque atual.', imageUrl: '/lovable-uploads/22d18ed7-b1fc-4fb4-9538-f0ab93fe5c75.png', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Visual refinado e imponente.', imageUrl: '/lovable-uploads/e779494d-0c8d-408d-b034-1964a3b76469.png', styleCategory: 'Elegante', points: 3 },
            { text: 'Visual romântico, feminino e delicado.', imageUrl: '/lovable-uploads/94638e1c-0180-4cfd-80be-26db97a1e58f.png', styleCategory: 'Romântico', points: 3 },
            { text: 'Visual sensual, com saia justa e decote.', imageUrl: '/lovable-uploads/919b184d-940d-4a4f-b53c-36792cbd6114.png', styleCategory: 'Sexy', points: 3 },
            { text: 'Visual marcante e urbano (jeans + jaqueta).', imageUrl: '/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png', styleCategory: 'Dramático', points: 3 },
            { text: 'Visual criativo, colorido e ousado.', imageUrl: '/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q4',
    title: 'Questão 4',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAIS DETALHES VOCÊ GOSTA?',
          multiSelect: 3,
          displayType: 'text',
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
          fullOptions: [
            { text: 'Poucos detalhes, básico e prático.', styleCategory: 'Natural', points: 3 },
            { text: 'Bem discretos e sutis, clean e clássico.', styleCategory: 'Clássico', points: 3 },
            { text: 'Básico, mas com um toque de estilo.', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Detalhes refinados, chic e que deem status.', styleCategory: 'Elegante', points: 3 },
            { text: 'Detalhes delicados, laços, babados.', styleCategory: 'Romântico', points: 3 },
            { text: 'Roupas que valorizem meu corpo: couro, zíper, fendas.', styleCategory: 'Sexy', points: 3 },
            { text: 'Detalhes marcantes, firmeza e peso.', styleCategory: 'Dramático', points: 3 },
            { text: 'Detalhes diferentes do convencional, produções ousadas.', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q5',
    title: 'Questão 5',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?',
          multiSelect: 3,
          displayType: 'text',
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
          fullOptions: [
            { text: 'Estampas clean, com poucas informações.', styleCategory: 'Natural', points: 3 },
            { text: 'Estampas clássicas e atemporais.', styleCategory: 'Clássico', points: 3 },
            { text: 'Atemporais, mas que tenham uma pegada de atual e moderna.', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Estampas clássicas e atemporais, mas sofisticadas.', styleCategory: 'Elegante', points: 3 },
            { text: 'Estampas florais e/ou delicadas como bolinhas, borboletas e corações.', styleCategory: 'Romântico', points: 3 },
            { text: 'Estampas de animal print, como onça, zebra e cobra.', styleCategory: 'Sexy', points: 3 },
            { text: 'Estampas geométricas, abstratas e exageradas como grandes poás.', styleCategory: 'Dramático', points: 3 },
            { text: 'Estampas diferentes do usual, como africanas, xadrez grandes.', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q6',
    title: 'Questão 6',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAL CASACO É SEU FAVORITO?',
          multiSelect: 3,
          displayType: 'both',
          gridColumns: 2,
          imageHeight: 180,
          options: [
            'Cardigã bege confortável e casual.',
            'Blazer verde estruturado.',
            'Trench coat bege tradicional.',
            'Blazer branco refinado.',
            'Casaco pink vibrante e moderno.',
            'Jaqueta vinho de couro estilosa.',
            'Jaqueta preta estilo rocker.',
            'Casaco estampado criativo e colorido.'
          ],
          fullOptions: [
            { text: 'Cardigã bege confortável e casual.', imageUrl: '/lovable-uploads/1ac66423-7712-4c33-9c28-13e8b6fe3170.png', styleCategory: 'Natural', points: 3 },
            { text: 'Blazer verde estruturado.', imageUrl: '/lovable-uploads/169fe8d0-8afd-4447-a9cc-79d917967e64.png', styleCategory: 'Clássico', points: 3 },
            { text: 'Trench coat bege tradicional.', imageUrl: '/lovable-uploads/0530ff81-b41d-45eb-8b47-ef88f75f7d93.png', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Blazer branco refinado.', imageUrl: '/lovable-uploads/d9da05d3-6fdd-46d0-afea-42417af058c5.png', styleCategory: 'Elegante', points: 3 },
            { text: 'Casaco pink vibrante e moderno.', imageUrl: '/lovable-uploads/5b819e5d-ca43-465a-906e-353764bdb2ec.png', styleCategory: 'Romântico', points: 3 },
            { text: 'Jaqueta vinho de couro estilosa.', imageUrl: '/lovable-uploads/54671bc8-ed46-4e5d-a347-5c8e8fe45f8b.png', styleCategory: 'Sexy', points: 3 },
            { text: 'Jaqueta preta estilo rocker.', imageUrl: '/lovable-uploads/e30cb887-b027-40ab-b112-fe8c2244d789.png', styleCategory: 'Dramático', points: 3 },
            { text: 'Casaco estampado criativo e colorido.', imageUrl: '/lovable-uploads/fc8f4066-6f40-4ff8-bc55-460da133b6c2.png', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q7',
    title: 'Questão 7',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAL SUA CALÇA FAVORITA?',
          multiSelect: 3,
          displayType: 'both',
          gridColumns: 2,
          imageHeight: 180,
          options: [
            'Calça fluida acetinada bege.',
            'Calça de alfaiataria cinza.',
            'Jeans reto e básico.',
            'Calça reta bege de tecido.',
            'Calça ampla rosa alfaiatada.',
            'Legging preta de couro.',
            'Calça reta preta de couro.',
            'Calça estampada floral leve e ampla.'
          ],
          fullOptions: [
            { text: 'Calça fluida acetinada bege.', imageUrl: '/lovable-uploads/86053444-8589-43e6-af61-02764cf80510.png', styleCategory: 'Natural', points: 3 },
            { text: 'Calça de alfaiataria cinza.', imageUrl: '/lovable-uploads/e2627b2e-8e68-48e0-a678-c685c5631515.png', styleCategory: 'Clássico', points: 3 },
            { text: 'Jeans reto e básico.', imageUrl: '/lovable-uploads/ea329cbe-6455-4aca-8fa4-cf73031ca26e.png', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Calça reta bege de tecido.', imageUrl: '/lovable-uploads/54a9ca5f-9b1f-48a3-9fd8-0aa9a240b8ae.png', styleCategory: 'Elegante', points: 3 },
            { text: 'Calça ampla rosa alfaiatada.', imageUrl: '/lovable-uploads/061e6932-2ddc-4100-ad82-def9909cfcdc.png', styleCategory: 'Romântico', points: 3 },
            { text: 'Legging preta de couro.', imageUrl: '/lovable-uploads/027348ed-9275-43b2-ba49-d49d5baca56a.png', styleCategory: 'Sexy', points: 3 },
            { text: 'Calça reta preta de couro.', imageUrl: '/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png', styleCategory: 'Dramático', points: 3 },
            { text: 'Calça estampada floral leve e ampla.', imageUrl: '/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q8',
    title: 'Questão 8',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAL DESSES SAPATOS VOCÊ TEM OU MAIS GOSTA?',
          multiSelect: 3,
          displayType: 'both',
          gridColumns: 2,
          imageHeight: 180,
          options: [
            'Tênis nude casual e confortável.',
            'Scarpin nude de salto baixo.',
            'Sandália dourada com salto bloco.',
            'Scarpin nude salto alto e fino.',
            'Sandália anabela off white.',
            'Sandália rosa de tiras finas.',
            'Scarpin preto moderno com vinil transparente.',
            'Scarpin colorido estampado.'
          ],
          fullOptions: [
            { text: 'Tênis nude casual e confortável.', imageUrl: '/lovable-uploads/745a655d-7bc5-455d-910f-1bafa159b22f.png', styleCategory: 'Natural', points: 3 },
            { text: 'Scarpin nude de salto baixo.', imageUrl: '/lovable-uploads/8a126cdd-57cc-49c4-98f0-4d3b81e32b95.png', styleCategory: 'Clássico', points: 3 },
            { text: 'Sandália dourada com salto bloco.', imageUrl: '/lovable-uploads/50fe376f-73d9-413c-b0d9-ff6a53abe59e.png', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Scarpin nude salto alto e fino.', imageUrl: '/lovable-uploads/68332b46-5016-4b94-9ae0-5eb80f1aba55.png', styleCategory: 'Elegante', points: 3 },
            { text: 'Sandália anabela off white.', imageUrl: '/lovable-uploads/83afe58a-f032-453f-ba56-d09d96cba1cd.png', styleCategory: 'Romântico', points: 3 },
            { text: 'Sandália rosa de tiras finas.', imageUrl: '/lovable-uploads/94638e1c-0180-4cfd-80be-26db97a1e58f.png', styleCategory: 'Sexy', points: 3 },
            { text: 'Scarpin preto moderno com vinil transparente.', imageUrl: '/lovable-uploads/05a536b0-b6ed-41b6-9401-ae24e7706a1a.png', styleCategory: 'Dramático', points: 3 },
            { text: 'Scarpin colorido estampado.', imageUrl: '/lovable-uploads/c266ca0a-ad80-4441-8f5e-4ea4aa9ed0bd.png', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q9',
    title: 'Questão 9',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?',
          multiSelect: 3,
          displayType: 'text',
          options: [
            'Pequenos e discretos, às vezes nem uso.',
            'Brincos pequenos e discretos. Corrente fininha.',
            'Acessórios que elevem meu look com um toque moderno.',
            'Acessórios sofisticados, joias ou semijoias.',
            'Peças delicadas e com um toque feminino.',
            'Brincos longos, colares que valorizem minha beleza.',
            'Acessórios pesados, que causem um impacto.',
            'Acessórios diferentes, grandes e marcantes.'
          ],
          fullOptions: [
            { text: 'Pequenos e discretos, às vezes nem uso.', styleCategory: 'Natural', points: 3 },
            { text: 'Brincos pequenos e discretos. Corrente fininha.', styleCategory: 'Clássico', points: 3 },
            { text: 'Acessórios que elevem meu look com um toque moderno.', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Acessórios sofisticados, joias ou semijoias.', styleCategory: 'Elegante', points: 3 },
            { text: 'Peças delicadas e com um toque feminino.', styleCategory: 'Romântico', points: 3 },
            { text: 'Brincos longos, colares que valorizem minha beleza.', styleCategory: 'Sexy', points: 3 },
            { text: 'Acessórios pesados, que causem um impacto.', styleCategory: 'Dramático', points: 3 },
            { text: 'Acessórios diferentes, grandes e marcantes.', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q10',
    title: 'Questão 10',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...',
          multiSelect: 3,
          displayType: 'text',
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
          fullOptions: [
            { text: 'São fáceis de cuidar.', styleCategory: 'Natural', points: 3 },
            { text: 'São de excelente qualidade.', styleCategory: 'Clássico', points: 3 },
            { text: 'São fáceis de cuidar e modernos.', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'São sofisticados.', styleCategory: 'Elegante', points: 3 },
            { text: 'São delicados.', styleCategory: 'Romântico', points: 3 },
            { text: 'São perfeitos ao meu corpo.', styleCategory: 'Sexy', points: 3 },
            { text: 'São diferentes, e trazem um efeito para minha roupa.', styleCategory: 'Dramático', points: 3 },
            { text: 'São exclusivos, criam identidade no look.', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Finalizar Quiz'
        }
      }
    ]
  },
  {
    id: 'step-strategic1',
    title: 'Questão Estratégica 1',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'VOCÊ JÁ SE SENTIU INSEGURA SOBRE SEU ESTILO?',
          multiSelect: 1,
          displayType: 'text',
          options: [
            'Sim, frequentemente não sei o que combina comigo',
            'Às vezes tenho dúvidas sobre o que vestir',
            'Raramente, geralmente sei o que funciona para mim',
            'Não, tenho total confiança no meu estilo'
          ],
          fullOptions: [
            { text: 'Sim, frequentemente não sei o que combina comigo', styleCategory: 'Natural', points: 0, isStrategic: true },
            { text: 'Às vezes tenho dúvidas sobre o que vestir', styleCategory: 'Clássico', points: 0, isStrategic: true },
            { text: 'Raramente, geralmente sei o que funciona para mim', styleCategory: 'Contemporâneo', points: 0, isStrategic: true },
            { text: 'Não, tenho total confiança no meu estilo', styleCategory: 'Elegante', points: 0, isStrategic: true }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-strategic2',
    title: 'Questão Estratégica 2',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'O QUE VOCÊ MAIS GOSTARIA DE MUDAR NO SEU GUARDA-ROUPA?',
          multiSelect: 1,
          displayType: 'text',
          options: [
            'Ter roupas que realmente combinem entre si',
            'Ter peças que valorizem meu corpo',
            'Ter um visual mais sofisticado e elegante',
            'Ter um estilo mais moderno e atual',
            'Ter mais confiança para me vestir'
          ],
          fullOptions: [
            { text: 'Ter roupas que realmente combinem entre si', styleCategory: 'Natural', points: 0, isStrategic: true },
            { text: 'Ter peças que valorizem meu corpo', styleCategory: 'Clássico', points: 0, isStrategic: true },
            { text: 'Ter um visual mais sofisticado e elegante', styleCategory: 'Contemporâneo', points: 0, isStrategic: true },
            { text: 'Ter um estilo mais moderno e atual', styleCategory: 'Elegante', points: 0, isStrategic: true },
            { text: 'Ter mais confiança para me vestir', styleCategory: 'Romântico', points: 0, isStrategic: true }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-strategic3',
    title: 'Questão Estratégica 3',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUANTO VOCÊ ESTARIA DISPOSTA A INVESTIR EM UM GUIA COMPLETO DE ESTILO PERSONALIZADO?',
          multiSelect: 1,
          displayType: 'text',
          options: [
            'Até R$ 97',
            'Entre R$ 97 e R$ 197',
            'Entre R$ 197 e R$ 397',
            'Acima de R$ 397',
            'Não estaria disposta a investir'
          ],
          fullOptions: [
            { text: 'Até R$ 97', styleCategory: 'Natural', points: 0, isStrategic: true },
            { text: 'Entre R$ 97 e R$ 197', styleCategory: 'Clássico', points: 0, isStrategic: true },
            { text: 'Entre R$ 197 e R$ 397', styleCategory: 'Contemporâneo', points: 0, isStrategic: true },
            { text: 'Acima de R$ 397', styleCategory: 'Elegante', points: 0, isStrategic: true },
            { text: 'Não estaria disposta a investir', styleCategory: 'Romântico', points: 0, isStrategic: true }
          ],
          showContinueButton: true,
          buttonText: 'Ver Resultado'
        }
      }
    ]
  }
];
