import { QuizBuilderState, QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { resultPageStorage } from './resultPageStorage';

export const createBuilderStateFromResultPage = (config: ResultPageConfig): QuizBuilderState => {
  const coverStageId = `stage-cover-${Date.now()}`;
  const questionStageId = `stage-question-${Date.now()}`;
  const resultStageId = `stage-result-${Date.now()}`;
  
  const stages: QuizStage[] = [
    {
      id: coverStageId,
      title: 'Etapa 1: Capa do Quiz',
      order: 0,
      type: 'cover',
      isEnabled: true
    },
    {
      id: questionStageId,
      title: 'Etapa 2: Pergunta 1',
      order: 1,
      type: 'question',
      isEnabled: true
    },
    {
      id: resultStageId,
      title: 'Etapa 3: Resultado',
      order: 2,
      type: 'result',
      isEnabled: true
    }
  ];
  
  const styleType = config.styleType || 'Personalizado';
  
  const components: QuizComponentData[] = [
    {
      id: `component-cover-${Date.now()}`,
      type: 'stageCover',
      order: 0,
      stageId: coverStageId,
      data: {
        title: `Quiz de Estilo ${styleType}`,
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
        question: `Qual dessas opções descreve melhor o estilo ${styleType}?`,
        options: [
          `Opção A - Estilo ${styleType}`,
          'Opção B - Outro estilo',
          'Opção C - Outro estilo',
          'Opção D - Outro estilo'
        ],
        displayType: 'text',
        multiSelect: 0,
        required: true,
        autoAdvance: true,
        optionStyleCategories: [
          styleType,
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
        title: config.title || `Seu Resultado: ${styleType}`,
        primaryStyleTitle: 'Seu Estilo Predominante',
        secondaryStyleTitle: 'Estilos Complementares',
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
