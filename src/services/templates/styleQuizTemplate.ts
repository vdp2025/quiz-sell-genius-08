
import { QuizBuilderState } from '@/types/quizBuilder';
import { generateId } from '@/utils/idGenerator';

export const styleQuizTemplate: QuizBuilderState = {
  components: [
    {
      id: generateId(),
      type: 'stageCover' as const,
      order: 0,
      stageId: 'cover',
      data: {
        title: 'Descubra seu Estilo Pessoal',
        subtitle: 'Responda às perguntas a seguir para descobrir o seu estilo predominante',
        stageTitle: 'Início',
        stageNumber: 1,
        buttonText: 'Começar o Quiz',
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
    // Question 1 - Text only
    {
      id: generateId(),
      type: 'stageQuestion' as const,
      order: 1,
      stageId: 'q1',
      data: {
        title: 'QUAL O SEU TIPO DE ROUPA FAVORITA?',
        question: 'Selecione 3 opções',
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
        displayType: 'text' as 'text' | 'image' | 'both',
        required: true,
        stageTitle: 'Pergunta 1',
        stageNumber: 2,
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
    // Question 2 - Text only
    {
      id: generateId(),
      type: 'stageQuestion' as const,
      order: 2,
      stageId: 'q2',
      data: {
        title: 'RESUMA A SUA PERSONALIDADE:',
        question: 'Selecione 3 opções',
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
        displayType: 'text' as 'text' | 'image' | 'both',
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
    // Question 3 - Image and Text
    {
      id: generateId(),
      type: 'stageQuestion' as const,
      order: 3,
      stageId: 'q3',
      data: {
        title: 'QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?',
        question: 'Selecione 3 opções',
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
        optionImages: [
          '/lovable-uploads/24f7dc2c-ab37-41ba-a154-786b0626ae04.png',
          '/lovable-uploads/0fb54364-9c71-4373-b6e7-500e6f9a2732.png',
          '/lovable-uploads/22d18ed7-b1fc-4fb4-9538-f0ab93fe5c75.png',
          '/lovable-uploads/e779494d-0c8d-408d-b034-1964a3b76469.png',
          '/lovable-uploads/94638e1c-0180-4cfd-80be-26db97a1e58f.png',
          '/lovable-uploads/919b184d-940d-4a4f-b53c-36792cbd6114.png',
          '/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png',
          '/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png'
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
        displayType: 'both' as 'text' | 'image' | 'both',
        required: true,
        stageTitle: 'Pergunta 3',
        stageNumber: 4,
        layout: {
          columns: 2,
          direction: 'vertical'
        },
        backgroundColorQuestion: '#FFFAF0',
        textColorQuestion: '#432818',
        selectionIndicator: 'border',
        imageSize: 'medium' as 'small' | 'medium' | 'large'
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    // Add more questions following the same pattern...
    // Question 6 - Image and Text (Casacos)
    {
      id: generateId(),
      type: 'stageQuestion' as const,
      order: 6,
      stageId: 'q6',
      data: {
        title: 'QUAL CASACO É SEU FAVORITO?',
        question: 'Selecione 3 opções',
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
        optionImages: [
          '/lovable-uploads/1ac66423-7712-4c33-9c28-13e8b6fe3170.png',
          '/lovable-uploads/169fe8d0-8afd-4447-a9cc-79d917967e64.png',
          '/lovable-uploads/0530ff81-b41d-45eb-8b47-ef88f75f7d93.png',
          '/lovable-uploads/d9da05d3-6fdd-46d0-afea-42417af058c5.png',
          '/lovable-uploads/5b819e5d-ca43-465a-906e-353764bdb2ec.png',
          '/lovable-uploads/54671bc8-ed46-4e5d-a347-5c8e8fe45f8b.png',
          '/lovable-uploads/e30cb887-b027-40ab-b112-fe8c2244d789.png',
          '/lovable-uploads/fc8f4066-6f40-4ff8-bc55-460da133b6c2.png'
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
        displayType: 'both' as 'text' | 'image' | 'both',
        required: true,
        stageTitle: 'Pergunta 6',
        stageNumber: 7,
        layout: {
          columns: 2,
          direction: 'vertical'
        },
        backgroundColorQuestion: '#FFFAF0',
        textColorQuestion: '#432818',
        selectionIndicator: 'border',
        imageSize: 'medium' as 'small' | 'medium' | 'large'
      },
      style: {
        backgroundColor: '#FFFAF0',
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    // Result page component
    {
      id: generateId(),
      type: 'stageResult' as const,
      order: 10,
      stageId: 'result',
      data: {
        title: 'Seu Estilo Predominante',
        subtitle: 'Confira o resultado com base nas suas respostas',
        stageTitle: 'Resultado',
        stageNumber: 11,
        primaryStyleTitle: 'Seu estilo predominante é',
        secondaryStylesTitle: 'Seus estilos secundários são',
        showPercentages: true,
        showDescriptions: true,
        callToActionText: 'Ver meu resultado completo',
        callToActionUrl: '/resultado-detalhado',
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
      id: 'q6',
      title: 'Pergunta 6',
      order: 6,
      type: 'question'
    },
    {
      id: 'result',
      title: 'Resultado',
      order: 10,
      type: 'result'
    }
  ]
};
