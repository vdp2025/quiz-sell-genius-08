
import { QuizBuilderState, QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { generateId } from '@/utils/idGenerator';
import { getDefaultComponentData } from '@/utils/quizComponentDefaults';

export const createBuilderStateFromQuiz = (quizData: any): QuizBuilderState => {
  const stages: QuizStage[] = quizData.stages.map((stage: any, index: number) => ({
    id: stage.id || generateId(),
    title: stage.title || `Etapa ${index + 1}`,
    order: index,
    type: stage.type || 'question',
    isEnabled: stage.isEnabled !== undefined ? stage.isEnabled : true
  }));

  const components: QuizComponentData[] = quizData.components.map((component: any) => ({
    id: component.id || generateId(),
    type: component.type || 'text',
    data: component.data || {},
    style: component.style || {},
    order: component.order || 0,
    stageId: component.stageId || stages[0]?.id || ''
  }));

  return { stages, components };
};

export const createBuilderStateFromResultPage = (config: ResultPageConfig): QuizBuilderState => {
  const stages: QuizStage[] = [];
  const components: QuizComponentData[] = [];
  let order = 0;

  // Function to add a stage and its components
  const addStageAndComponents = (stageData: any, stageType: QuizStage['type'], title: string) => {
    if (stageData?.visible !== false) {
      const stageId = generateId();
      stages.push({
        id: stageId,
        title: `Etapa ${order + 1}: ${title}`,
        order: order++,
        type: stageType,
        isEnabled: true
      });

      // Add components based on the content of the section
      if (stageData?.content) {
        Object.keys(stageData.content).forEach((key, index) => {
          const componentType = key === 'title' ? 'header' : 'text';
          components.push({
            id: generateId(),
            type: componentType,
            data: {
              [key]: stageData.content[key]
            },
            style: stageData.style || {},
            order: index,
            stageId: stageId
          });
        });
      }
    }
  };

  // Create stages and components based on the ResultPageConfig
  addStageAndComponents(config.header, 'cover', 'Cabeçalho');
  addStageAndComponents(config.mainContent, 'question', 'Conteúdo Principal');
  addStageAndComponents(config.secondaryStyles, 'question', 'Estilos Secundários');

  // Create a result stage
  const resultStage: QuizStage = {
    id: generateId(),
    title: `Etapa ${order + 1}: Resultado`,
    order: order,
    type: "result",
    isEnabled: true
  };
  stages.push(resultStage);

  // Add a quizResult component to the result stage
  components.push({
    id: generateId(),
    type: 'quizResult',
    data: {
      resultTitle: config.resultTitle || 'Seu Estilo é...',
    },
    style: {},
    order: 0,
    stageId: resultStage.id
  });

  return { stages, components };
};

export const loadQuizResultConfig = (styleType: string): ResultPageConfig | null => {
  try {
    const configKey = `result_page_config_${styleType}`;
    const savedConfig = localStorage.getItem(configKey);
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }
    return null;
  } catch (error) {
    console.error('Error loading quiz result config:', error);
    return null;
  }
};

// Import the generateInitialStages function from quizBuilderCreator.ts to maintain compatibility
export { generateInitialStages } from '@/services/quizBuilderCreator';
