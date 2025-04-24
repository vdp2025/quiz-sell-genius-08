import { v4 as uuidv4 } from 'uuid';
import { QuizComponentData, QuizStage, QuizBuilderState } from '@/types/quizBuilder';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { generateId, generateStageId, generateComponentId } from '@/utils/idGenerator';

// Generate initial stages for a new quiz
export const generateInitialStages = (): QuizBuilderState => {
  const coverStageId = generateStageId();
  const resultStageId = generateStageId();
  
  const stages: QuizStage[] = [
    {
      id: coverStageId,
      title: 'Capa do Quiz',
      order: 0,
      type: 'cover'
    },
    {
      id: resultStageId,
      title: 'Resultado do Quiz',
      order: 1,
      type: 'result'
    }
  ];

  const components: QuizComponentData[] = [
    {
      id: generateComponentId(),
      type: 'stageCover',
      order: 0,
      stageId: coverStageId,
      data: {
        stageTitle: 'Descubra seu Estilo Pessoal',
        headline: 'Quiz de Estilo',
        subheadline: 'Responda às perguntas e descubra seu estilo predominante',
        buttonText: 'Começar',
      },
      style: {
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        paddingY: '32',
        paddingX: '16',
        borderRadius: '0'
      }
    },
    {
      id: generateComponentId(),
      type: 'stageResult',
      order: 0,
      stageId: resultStageId,
      data: {
        primaryStyleTitle: 'Seu Estilo Predominante é',
        secondaryStylesTitle: 'Seus Estilos Complementares',
        showPercentages: true,
        showDescriptions: true,
        callToActionText: 'Conhecer Mais',
        callToActionUrl: '#',
      },
      style: {
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        paddingY: '32',
        paddingX: '16',
        borderRadius: '0'
      }
    }
  ];
  
  return {
    stages,
    components,
    activeStageId: coverStageId
  };
};

// Create builder state from quiz data
export const createBuilderStateFromQuiz = (
  quizData: any,
  title: string = 'Quiz de Estilo Pessoal',
  subtitle: string = 'Descubra seu estilo predominante',
  resultTitle: string = 'Seu Resultado de Estilo Pessoal'
): QuizBuilderState => {
  const coverStageId = generateStageId();
  const resultStageId = generateStageId();
  
  // Create initial stages
  const stages: QuizStage[] = [
    {
      id: coverStageId,
      title: 'Capa do Quiz',
      order: 0,
      type: 'cover'
    }
  ];
  
  // Create components for cover stage
  const components: QuizComponentData[] = [
    {
      id: generateComponentId(),
      type: 'stageCover',
      order: 0,
      stageId: coverStageId,
      data: {
        stageTitle: 'Capa do Quiz',
        headline: title,
        subheadline: subtitle,
        buttonText: 'Começar',
      },
      style: {
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        paddingY: '32',
        paddingX: '16',
        borderRadius: '0'
      }
    }
  ];
  
  // Add question stages if quizData has questions
  if (quizData && Array.isArray(quizData)) {
    quizData.forEach((question, index) => {
      const questionStageId = generateStageId();
      
      // Add question stage
      stages.push({
        id: questionStageId,
        title: `Pergunta ${index + 1}`,
        order: index + 1,
        type: 'question'
      });
      
      // Add question component
      components.push({
        id: generateComponentId(),
        type: 'stageQuestion',
        order: 0,
        stageId: questionStageId,
        data: {
          question: question.text || `Pergunta ${index + 1}`,
          options: question.options || [],
          optionImages: question.optionImages || [],
          optionStyleCategories: question.styleCategories || [],
          displayType: question.displayType || 'text',
          multiSelect: question.multiSelect || 3,
          required: true,
          autoAdvance: true
        },
        style: {
          backgroundColor: '#FAF9F7',
          textColor: '#432818',
          paddingY: '32',
          paddingX: '16',
          borderRadius: '0'
        }
      });
    });
  }
  
  // Add result stage at the end
  stages.push({
    id: resultStageId,
    title: resultTitle,
    order: stages.length,
    type: 'result'
  });
  
  // Add result component
  components.push({
    id: generateComponentId(),
    type: 'stageResult',
    order: 0,
    stageId: resultStageId,
    data: {
      primaryStyleTitle: 'Seu Estilo Predominante é',
      secondaryStylesTitle: 'Seus Estilos Complementares',
      showPercentages: true,
      showDescriptions: true,
      callToActionText: 'Conhecer Mais',
      callToActionUrl: '#',
    },
    style: {
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      paddingY: '32',
      paddingX: '16',
      borderRadius: '0'
    }
  });
  
  return {
    stages,
    components,
    activeStageId: coverStageId
  };
};

// Create builder state from result page configuration
export const createBuilderStateFromResultPage = (config: ResultPageConfig): QuizBuilderState => {
  // Create a stage for the result page
  const resultStageId = `stage-${uuidv4().substring(0, 8)}`;
  const stages: QuizStage[] = [
    {
      id: resultStageId,
      title: 'Página de Resultado',
      order: 0,
      type: 'result'
    }
  ];
  
  // Initialize components array
  const components: QuizComponentData[] = [];
  
  // Add header component if visible
  if (config.header?.visible) {
    components.push({
      id: `component-${uuidv4().substring(0, 8)}`,
      type: 'header',
      order: 0,
      stageId: resultStageId,
      data: {
        title: config.header?.content?.title || 'Seu Resultado de Estilo',
        subtitle: config.header?.content?.subtitle || 'Descubra como expressar sua autenticidade'
      },
      style: {
        backgroundColor: config.header?.style?.backgroundColor || '#FFFFFF',
        textColor: config.header?.style?.color || '#432818'
      }
    });
  }
  
  // Add style result component
  components.push({
    id: `component-${uuidv4().substring(0, 8)}`,
    type: 'stageResult',
    order: components.length,
    stageId: resultStageId,
    data: {
      primaryStyleTitle: 'Seu Estilo Predominante é',
      secondaryStylesTitle: 'Seus Estilos Complementares',
      showPercentages: true,
      showDescriptions: true
    },
    style: {
      backgroundColor: config.mainContent?.style?.backgroundColor || '#FAF9F7',
      textColor: config.mainContent?.style?.color || '#432818'
    }
  });
  
  // Add offer component if visible
  if (config.offer?.hero?.visible) {
    components.push({
      id: `component-${uuidv4().substring(0, 8)}`,
      type: 'benefitsList',
      order: components.length,
      stageId: resultStageId,
      data: {
        title: config.offer?.benefits?.content?.title || 'O que você vai receber',
        items: [
          'Análise detalhada do seu estilo pessoal',
          'Paleta de cores personalizada',
          'Guia de peças essenciais',
          'Dicas práticas de estilo'
        ]
      },
      style: {
        backgroundColor: config.offer?.benefits?.style?.backgroundColor || '#FFFFFF',
        textColor: config.offer?.benefits?.style?.color || '#432818'
      }
    });
  }
  
  return {
    stages,
    components,
    activeStageId: resultStageId
  };
};

// Load quiz result configuration
export const loadQuizResultConfig = (styleType: string): ResultPageConfig | null => {
  try {
    const savedConfigs = localStorage.getItem('result_page_configs');
    if (savedConfigs) {
      const configs = JSON.parse(savedConfigs);
      return configs[styleType] || null;
    }
    return null;
  } catch (error) {
    console.error('Error loading quiz result config:', error);
    return null;
  }
};
