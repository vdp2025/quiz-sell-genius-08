import { v4 as uuidv4 } from 'uuid';
import { QuizComponentData, QuizStage, QuizBuilderState } from '@/types/quizBuilder';
import { ResultPageConfig } from '@/types/resultPageConfig';

// Create builder state from quiz data
export const createBuilderStateFromQuiz = (quizData: any): QuizBuilderState => {
  // Implementation here
  return {
    stages: [],
    components: []
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
