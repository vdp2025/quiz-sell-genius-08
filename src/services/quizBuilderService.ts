
import { QuizBuilderState, QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { resultPageStorage } from './resultPageStorage';

export interface QuizQuestion {
  id: string;
  title: string;
  description?: string;
  type: 'multiple-choice' | 'single-choice' | 'scale';
  answers: QuizAnswer[];
  required: number; // Replacing boolean with number
  order: number;
}

export interface QuizAnswer {
  id: string;
  text: string;
  value: string;
  styleScores?: Record<string, number>;
  required: number; // Replacing boolean with number
  order: number;
}

export const createBuilderStateFromQuiz = (
  questions: any[],
  title: string = 'Quiz de Estilo Pessoal',
  subtitle: string = 'Descubra seu estilo predominante',
  resultTitle: string = 'Seu Resultado de Estilo Pessoal'
): QuizBuilderState => {
  const stages: QuizStage[] = [
    {
      id: `stage-cover-${Date.now()}`,
      title: 'Etapa 1: Capa do Quiz',
      order: 0,
      type: 'cover'
    }
  ];
  
  const components: QuizComponentData[] = [
    {
      id: `component-cover-${Date.now()}`,
      type: 'stageCover',
      order: 0,
      stageId: stages[0].id,
      data: {
        title: title,
        subtitle: subtitle,
        buttonText: 'Iniciar Quiz',
        backgroundColor: '#FAF9F7',
        textColor: '#432818'
      }
    }
  ];
  
  // Add questions
  questions.forEach((question, index) => {
    const stageId = `stage-question-${Date.now()}-${index}`;
    
    stages.push({
      id: stageId,
      title: `Etapa ${index + 2}: Pergunta ${index + 1}`,
      order: index + 1,
      type: 'question'
    });
    
    components.push({
      id: `component-question-${Date.now()}-${index}`,
      type: 'stageQuestion',
      order: index + 1,
      stageId: stageId,
      data: {
        question: question.question,
        options: question.options,
        optionImages: question.optionImages || [],
        optionStyleCategories: question.styleCategories || [],
        displayType: question.displayType || 'text',
        multiSelect: question.multiSelect || false,
        required: 1, // Changed from boolean to number
        autoAdvance: question.autoAdvance || false,
      }
    });
  });
  
  // Add result stage
  const resultStageId = `stage-result-${Date.now()}`;
  stages.push({
    id: resultStageId,
    title: 'Etapa Final: Resultado',
    order: stages.length,
    type: 'result'
  });
  
  components.push({
    id: `component-result-${Date.now()}`,
    type: 'stageResult',
    order: components.length,
    stageId: resultStageId,
    data: {
      title: resultTitle,
      primaryStyleTitle: 'Seu Estilo Predominante',
      secondaryStylesTitle: 'Estilos Complementares',
      showPercentages: true,
      showDescriptions: true,
      callToActionText: 'Ver Recomendações',
      accentColor: '#B89B7A'
    }
  });
  
  return { stages, components };
};

export const generateInitialStages = (): QuizBuilderState => {
  const stages: QuizStage[] = [
    {
      id: `stage-cover-${Date.now()}`,
      title: 'Etapa 1: Capa do Quiz',
      order: 0,
      type: 'cover'
    },
    {
      id: `stage-question-${Date.now()}`,
      title: 'Etapa 2: Pergunta 1',
      order: 1,
      type: 'question'
    },
    {
      id: `stage-result-${Date.now()}`,
      title: 'Etapa 3: Resultado',
      order: 2,
      type: 'result'
    }
  ];
  
  const components: QuizComponentData[] = [
    {
      id: `component-cover-${Date.now()}`,
      type: 'stageCover',
      order: 0,
      stageId: stages[0].id,
      data: {
        title: 'Descubra Seu Estilo Pessoal',
        subtitle: 'Responda algumas perguntas e descubra qual é o seu estilo predominante',
        buttonText: 'Começar Quiz',
        backgroundColor: '#FAF9F7',
        textColor: '#432818'
      }
    },
    {
      id: `component-question-${Date.now()}`,
      type: 'stageQuestion',
      order: 0,
      stageId: stages[1].id,
      data: {
        question: 'Qual dessas opções mais combina com seu estilo preferido?',
        options: [
          'Elegante e sofisticado',
          'Casual e confortável',
          'Ousado e expressivo',
          'Clássico e tradicional'
        ],
        displayType: 'text',
        multiSelect: false,
        required: 1, // Changed from boolean to number
        autoAdvance: true
      }
    },
    {
      id: `component-result-${Date.now()}`,
      type: 'stageResult',
      order: 0,
      stageId: stages[2].id,
      data: {
        title: 'Seu Resultado de Estilo',
        primaryStyleTitle: 'Seu Estilo Predominante',
        secondaryStylesTitle: 'Estilos Complementares',
        showPercentages: true,
        showDescriptions: true,
        callToActionText: 'Ver Recomendações',
        accentColor: '#B89B7A'
      }
    }
  ];
  
  return { stages, components };
};

export const createBuilderStateFromResultPage = (config: ResultPageConfig): QuizBuilderState => {
  const coverStageId = `stage-cover-${Date.now()}`;
  const questionStageId = `stage-question-${Date.now()}`;
  const resultStageId = `stage-result-${Date.now()}`;
  
  const stages: QuizStage[] = [
    {
      id: coverStageId,
      title: 'Etapa 1: Capa do Quiz',
      order: 0,
      type: 'cover'
    },
    {
      id: questionStageId,
      title: 'Etapa 2: Pergunta 1',
      order: 1,
      type: 'question'
    },
    {
      id: resultStageId,
      title: 'Etapa 3: Resultado',
      order: 2,
      type: 'result'
    }
  ];
  
  const styleTitle = config.styleType || 'Personalizado';
  
  const components: QuizComponentData[] = [
    {
      id: `component-cover-${Date.now()}`,
      type: 'stageCover',
      order: 0,
      stageId: coverStageId,
      data: {
        title: `Quiz de Estilo ${styleTitle}`,
        subtitle: 'Responda as perguntas e descubra seu estilo pessoal',
        buttonText: 'Iniciar Quiz',
        backgroundColor: config.globalStyles?.backgroundColor || '#FAF9F7',
        textColor: config.globalStyles?.textColor || '#432818'
      }
    },
    {
      id: `component-question-${Date.now()}`,
      type: 'stageQuestion',
      order: 0,
      stageId: questionStageId,
      data: {
        question: `Qual dessas opções descreve melhor o estilo ${styleTitle}?`,
        options: [
          `Opção A - Estilo ${styleTitle}`,
          'Opção B - Outro estilo',
          'Opção C - Outro estilo',
          'Opção D - Outro estilo'
        ],
        displayType: 'text',
        multiSelect: false,
        required: 1, // Changed from boolean to number
        autoAdvance: true,
        optionStyleCategories: [
          styleTitle,
          'Outro Estilo',
          'Outro Estilo',
          'Outro Estilo'
        ]
      }
    },
    {
      id: `component-result-${Date.now()}`,
      type: 'stageResult',
      order: 0,
      stageId: resultStageId,
      data: {
        title: config.title || `Seu Resultado: ${styleTitle}`,
        primaryStyleTitle: 'Seu Estilo Predominante',
        secondaryStylesTitle: 'Estilos Complementares',
        showPercentages: true,
        showDescriptions: true,
        callToActionText: 'Ver Recomendações',
        accentColor: config.globalStyles?.primaryColor || '#B89B7A',
        resultPageId: config.styleType // Link to the result page
      }
    }
  ];
  
  return { stages, components };
};

export const loadQuizResultConfig = (styleType: string): ResultPageConfig | null => {
  return resultPageStorage.loadConfig(styleType);
};
