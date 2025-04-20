
import { QuizComponentData, QuizStage, QuizComponentType } from '@/types/quizBuilder';
import { generateId } from '@/utils/idGenerator';
import { getDefaultData } from '@/utils/quizComponentDefaults';

// Generate initial stages for a new quiz
export const generateInitialStages = () => {
  const stages: QuizStage[] = [
    {
      id: `stage-${generateId()}`,
      title: 'Etapa 1: Capa do Quiz',
      order: 0,
      type: 'cover'
    },
    {
      id: `stage-${generateId()}`,
      title: 'Etapa 2: Pergunta 1',
      order: 1,
      type: 'question'
    },
    {
      id: `stage-${generateId()}`,
      title: 'Etapa 3: Resultado',
      order: 2,
      type: 'result'
    }
  ];

  const components: QuizComponentData[] = [];

  // Create default components for each stage
  stages.forEach(stage => {
    let componentType: QuizComponentType;
    
    switch (stage.type) {
      case 'cover':
        componentType = 'stageCover';
        break;
      case 'question':
        componentType = 'stageQuestion';
        break;
      case 'result':
        componentType = 'stageResult';
        break;
      default:
        componentType = 'text';
    }
    
    components.push(createStageComponent(componentType, stage.id, 0));
    
    // Add specific components based on stage type
    if (stage.type === 'cover') {
      components.push(createStageComponent('header', stage.id, 1));
      components.push(createStageComponent('text', stage.id, 2));
    } else if (stage.type === 'question') {
      components.push(createStageComponent('multipleChoice', stage.id, 1));
    } else if (stage.type === 'result') {
      components.push(createStageComponent('quizResult', stage.id, 1));
    }
  });

  return {
    stages,
    components
  };
};

// Create a component for a stage
const createStageComponent = (
  type: QuizComponentType, 
  stageId: string, 
  order: number
): QuizComponentData => {
  return {
    id: `component-${generateId()}`,
    type,
    order,
    stageId,
    data: getDefaultData(type),
    style: {
      paddingY: '16',
      paddingX: '16',
      backgroundColor: '',
      textColor: '',
      borderRadius: '0'
    }
  };
};

// Create a quiz builder state from an existing quiz
export const createBuilderStateFromQuiz = (
  questions: any[], 
  coverTitle: string, 
  coverDescription: string, 
  resultTitle: string
) => {
  const stages: QuizStage[] = [
    {
      id: `stage-${generateId()}`,
      title: 'Etapa 1: Capa do Quiz',
      order: 0,
      type: 'cover'
    }
  ];
  
  const components: QuizComponentData[] = [
    {
      id: `component-${generateId()}`,
      type: 'stageCover',
      order: 0,
      stageId: stages[0].id,
      data: {
        headline: coverTitle,
        subheadline: coverDescription,
        buttonText: 'Começar'
      },
      style: {
        paddingY: '24',
        paddingX: '16',
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        borderRadius: '0'
      }
    }
  ];
  
  // Create question stages
  questions.forEach((question, index) => {
    const stageId = `stage-${generateId()}`;
    const stageNumber = index + 2;
    
    stages.push({
      id: stageId,
      title: `Etapa ${stageNumber}: Pergunta ${index + 1}`,
      order: stageNumber - 1,
      type: 'question'
    });
    
    components.push({
      id: `component-${generateId()}`,
      type: 'stageQuestion',
      order: 0,
      stageId,
      data: {
        stageTitle: question.title,
        stageNumber: index + 1,
        progressText: `Questão ${index + 1} de ${questions.length}`
      },
      style: {
        paddingY: '16',
        paddingX: '16',
        backgroundColor: '',
        textColor: '',
        borderRadius: '0'
      }
    });
    
    // Add the multiple choice question
    components.push({
      id: `component-${generateId()}`,
      type: 'multipleChoice',
      order: 1,
      stageId,
      data: {
        question: question.title,
        options: question.options.map((opt: any) => opt.text),
        optionImages: question.options.map((opt: any) => opt.imageUrl || ''),
        optionStyleCategories: question.options.map((opt: any) => opt.styleCategory),
        multiSelect: question.multiSelect,
        required: true,
        displayType: question.type as 'text' | 'image' | 'both',
        imageSize: 'medium',
        layout: {
          columns: question.type === 'text' ? 1 : 2,
          direction: 'vertical'
        }
      },
      style: {
        paddingY: '16',
        paddingX: '16',
        backgroundColor: '',
        textColor: '',
        borderRadius: '0'
      }
    });
  });
  
  // Create result stage
  const resultStageId = `stage-${generateId()}`;
  stages.push({
    id: resultStageId,
    title: 'Etapa Final: Resultado',
    order: stages.length,
    type: 'result'
  });
  
  components.push({
    id: `component-${generateId()}`,
    type: 'stageResult',
    order: 0,
    stageId: resultStageId,
    data: {
      headline: resultTitle,
      subheadline: 'Confira abaixo seu resultado detalhado'
    },
    style: {
      paddingY: '24',
      paddingX: '16',
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      borderRadius: '0'
    }
  });
  
  components.push({
    id: `component-${generateId()}`,
    type: 'quizResult',
    order: 1,
    stageId: resultStageId,
    data: {
      title: 'Seu Estilo Predominante',
      description: 'Descubra mais sobre seu estilo único e como aproveitar ao máximo suas características.',
      showSecondaryStyles: true,
      showOffer: true
    },
    style: {
      paddingY: '24',
      paddingX: '16',
      backgroundColor: '#FFFFFF',
      textColor: '#432818',
      borderRadius: '0'
    }
  });
  
  return {
    stages,
    components
  };
};
