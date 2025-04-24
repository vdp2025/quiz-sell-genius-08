
import { ResultPageConfig } from '@/types/resultPageConfig';
import { QuizBuilderState, QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { QuizQuestion } from '@/types/quiz';
import { v4 as uuidv4 } from 'uuid';

// Função para carregar a configuração de página de resultado de um estilo específico
export const loadQuizResultConfig = (styleType: string): ResultPageConfig | null => {
  try {
    // Tenta carregar a configuração do localStorage primeiro
    const storedConfig = localStorage.getItem(`quiz_result_config_${styleType}`);
    if (storedConfig) {
      return JSON.parse(storedConfig);
    }
    
    // Se não encontrar no localStorage, retorna configuração padrão
    return createDefaultResultConfig(styleType);
  } catch (error) {
    console.error(`Erro ao carregar configuração para o estilo ${styleType}:`, error);
    return null;
  }
};

// Função para criar uma configuração padrão para página de resultado
export const createDefaultResultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType,
    header: {
      visible: true,
      content: {
        title: `Resultado: ${styleType}`,
        subtitle: 'Descubra como aplicar seu estilo em todas as ocasiões'
      },
      style: {
        backgroundColor: '#FAF9F7',
        color: '#432818',
        borderRadius: '0'
      }
    },
    mainContent: {
      visible: true,
      content: {
        description: `O estilo ${styleType} é caracterizado por suas qualidades únicas e marcantes. Aproveite ao máximo este estilo em seu dia a dia.`,
      },
      style: {
        backgroundColor: '#FFFFFF',
        color: '#432818'
      }
    },
    offer: {
      hero: {
        visible: true,
        content: {
          title: `Guia de Estilo ${styleType}`,
          subtitle: 'Transforme seu guarda-roupa com nossas dicas personalizadas',
          price: '39,00',
          regularPrice: '175,00',
          ctaText: 'Quero meu guia personalizado',
          ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10'
        },
        style: {
          backgroundColor: '#FAF9F7',
          color: '#432818'
        }
      },
      benefits: {
        visible: true,
        content: {
          title: 'O que você vai receber:',
          items: [
            'Análise detalhada do seu estilo pessoal',
            'Paleta de cores personalizada',
            'Guia de peças essenciais para o seu guarda-roupa',
            'Dicas de tecidos e modelagens ideais'
          ]
        },
        style: {
          backgroundColor: '#FFFFFF',
          color: '#432818'
        }
      },
      pricing: {
        visible: true,
        content: {},
        style: {
          backgroundColor: '#FFFFFF',
          color: '#432818'
        }
      },
      products: {
        visible: true,
        content: {},
        style: {
          backgroundColor: '#F9F6F2',
          color: '#432818'
        }
      },
      testimonials: {
        visible: true,
        content: {},
        style: {
          backgroundColor: '#FFFFFF',
          color: '#432818'
        }
      },
      guarantee: {
        visible: true,
        content: {
          days: 7
        },
        style: {
          backgroundColor: '#F9F6F2',
          color: '#432818'
        }
      }
    },
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#aa6b5d',
      textColor: '#432818',
      backgroundColor: '#FAF9F7',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }
  };
};

// Função para gerar estágios iniciais para o construtor
export const generateInitialStages = (): { stages: QuizStage[], components: QuizComponentData[] } => {
  const stages: QuizStage[] = [];
  const components: QuizComponentData[] = [];
  
  // Adicionar estágio de capa
  const coverStageId = `stage-${uuidv4()}`;
  stages.push({
    id: coverStageId,
    title: 'Etapa 1: Capa',
    order: 0,
    type: 'cover'
  });
  
  // Adicionar componente de capa
  components.push({
    id: `component-${uuidv4()}`,
    type: 'stageCover',
    order: 0,
    stageId: coverStageId,
    data: {
      stageTitle: 'Capa do Quiz',
      headline: 'Descubra seu Estilo Pessoal',
      subheadline: 'Responda às perguntas a seguir para revelar seu estilo predominante',
      buttonText: 'Começar'
    },
    style: {
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      paddingY: '32',
      paddingX: '16',
      borderRadius: '0'
    }
  });
  
  // Adicionar estágio de pergunta
  const questionStageId = `stage-${uuidv4()}`;
  stages.push({
    id: questionStageId,
    title: 'Etapa 2: Pergunta',
    order: 1,
    type: 'question'
  });
  
  // Adicionar componente de pergunta
  components.push({
    id: `component-${uuidv4()}`,
    type: 'multipleChoice',
    order: 0,
    stageId: questionStageId,
    data: {
      question: 'Qual dessas roupas você mais se identifica?',
      options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
      multiSelect: 3,
      minSelections: 3,
      maxSelections: 3,
      displayType: 'both',
      required: true
    },
    style: {
      backgroundColor: '#FFFFFF',
      textColor: '#432818',
      paddingY: '24',
      paddingX: '16',
      borderRadius: '0'
    }
  });
  
  // Adicionar estágio de resultado
  const resultStageId = `stage-${uuidv4()}`;
  stages.push({
    id: resultStageId,
    title: 'Etapa 3: Resultado',
    order: 2,
    type: 'result'
  });
  
  // Adicionar componente de resultado
  components.push({
    id: `component-${uuidv4()}`,
    type: 'stageResult',
    order: 0,
    stageId: resultStageId,
    data: {
      stageTitle: 'Resultado',
      title: 'Seu Resultado de Estilo Pessoal',
      subtitle: 'Baseado nas suas escolhas, calculamos seu estilo predominante',
      primaryStyleTitle: 'Seu Estilo Predominante',
      secondaryStylesTitle: 'Seus Estilos Complementares',
      showPercentages: true,
      showDescriptions: true
    },
    style: {
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      paddingY: '32',
      paddingX: '16',
      borderRadius: '0'
    }
  });
  
  return { stages, components };
};

// Função para criar estado de builder a partir de perguntas do quiz
export const createBuilderStateFromQuiz = (
  questions: QuizQuestion[],
  title: string,
  description: string,
  resultTitle: string
): { stages: QuizStage[], components: QuizComponentData[] } => {
  const stages: QuizStage[] = [];
  const components: QuizComponentData[] = [];
  
  // Adicionar estágio de capa
  const coverStageId = `stage-${uuidv4()}`;
  stages.push({
    id: coverStageId,
    title: 'Etapa 1: Capa do Quiz',
    order: 0,
    type: 'cover'
  });
  
  // Adicionar componente de capa
  components.push({
    id: `component-${uuidv4()}`,
    type: 'stageCover',
    order: 0,
    stageId: coverStageId,
    data: {
      stageTitle: 'Capa do Quiz',
      headline: title,
      subheadline: description,
      buttonText: 'Começar'
    },
    style: {
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      paddingY: '32',
      paddingX: '16',
      borderRadius: '0'
    }
  });
  
  // Adicionar estágios para cada pergunta
  questions.forEach((question, index) => {
    const stageId = `stage-${uuidv4()}`;
    stages.push({
      id: stageId,
      title: `Etapa ${index + 2}: Pergunta ${index + 1}`,
      order: index + 1,
      type: 'question'
    });
    
    // Adicionar componente de pergunta
    components.push({
      id: `component-${uuidv4()}`,
      type: 'multipleChoice',
      order: 0,
      stageId: stageId,
      data: {
        question: question.title,
        options: question.options.map(option => option.text),
        optionImages: question.options.map(option => option.imageUrl || ''),
        optionStyleCategories: question.options.map(option => option.styleCategory || 'Natural'),
        multiSelect: question.multiSelect,
        minSelections: question.multiSelect,
        maxSelections: question.multiSelect,
        displayType: question.type,
        required: true
      },
      style: {
        backgroundColor: '#FFFFFF',
        textColor: '#432818',
        paddingY: '24',
        paddingX: '16',
        borderRadius: '0'
      }
    });
  });
  
  // Adicionar estágio de resultado
  const resultStageId = `stage-${uuidv4()}`;
  stages.push({
    id: resultStageId,
    title: `Etapa ${questions.length + 2}: Resultado`,
    order: questions.length + 1,
    type: 'result'
  });
  
  // Adicionar componente de resultado
  components.push({
    id: `component-${uuidv4()}`,
    type: 'stageResult',
    order: 0,
    stageId: resultStageId,
    data: {
      stageTitle: 'Resultado',
      title: resultTitle,
      subtitle: 'Baseado nas suas escolhas, calculamos seu estilo predominante',
      primaryStyleTitle: 'Seu Estilo Predominante',
      secondaryStylesTitle: 'Seus Estilos Complementares',
      showPercentages: true,
      showDescriptions: true
    },
    style: {
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      paddingY: '32',
      paddingX: '16',
      borderRadius: '0'
    }
  });
  
  return { stages, components };
};
