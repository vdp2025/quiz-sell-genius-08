
import { QuizBuilderState, QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { generateId } from '@/utils/idGenerator';
import { ResultPageConfig } from '@/types/resultPageConfig';

// Function to create a basic quiz builder state with initial stages
export const generateInitialStages = () => {
  const welcomeStage: QuizStage = {
    id: generateId(),
    title: 'Bem-vindo',
    type: 'welcome',
    order: 0,
    isEnabled: true
  };
  
  const questionStage: QuizStage = {
    id: generateId(),
    title: 'Pergunta 1',
    type: 'question',
    order: 1,
    isEnabled: true
  };
  
  const resultStage: QuizStage = {
    id: generateId(),
    title: 'Seu Resultado',
    type: 'result',
    order: 2,
    isEnabled: true
  };
  
  const stages = [welcomeStage, questionStage, resultStage];
  
  // Create default components
  const components: QuizComponentData[] = [
    {
      id: generateId(),
      type: 'headline',
      stageId: welcomeStage.id,
      content: {
        title: 'Quiz de Estilo Pessoal',
        subtitle: 'Descubra seu estilo predominante',
        alignment: 'center'
      },
      order: 0
    },
    {
      id: generateId(),
      type: 'text',
      stageId: questionStage.id,
      content: {
        text: 'Qual opção descreve melhor seu estilo?',
        alignment: 'center'
      },
      order: 0
    },
    {
      id: generateId(),
      type: 'result',
      stageId: resultStage.id,
      content: {
        title: 'Seu Resultado de Estilo Pessoal',
        showShare: true,
        alignment: 'center'
      },
      order: 0
    }
  ];
  
  return { stages, components };
};

export const createBuilderStateFromQuiz = (
  quizQuestions: any[],
  title: string = 'Quiz de Estilo Pessoal',
  subtitle: string = 'Descubra seu estilo predominante',
  resultTitle: string = 'Seu Resultado de Estilo Pessoal'
) => {
  // Create stages
  const welcomeStage: QuizStage = {
    id: generateId(),
    title: 'Bem-vindo',
    type: 'welcome',
    order: 0,
    isEnabled: true
  };
  
  // Create a question stage for each question
  const questionStages: QuizStage[] = quizQuestions.map((_, index) => ({
    id: generateId(),
    title: `Pergunta ${index + 1}`,
    type: 'question',
    order: index + 1,
    isEnabled: true
  }));
  
  const resultStage: QuizStage = {
    id: generateId(),
    title: 'Seu Resultado',
    type: 'result',
    order: questionStages.length + 1,
    isEnabled: true
  };
  
  const stages = [welcomeStage, ...questionStages, resultStage];
  
  // Create welcome components
  const welcomeComponents: QuizComponentData[] = [
    {
      id: generateId(),
      type: 'headline',
      stageId: welcomeStage.id,
      content: {
        title,
        subtitle,
        alignment: 'center'
      },
      order: 0
    },
    {
      id: generateId(),
      type: 'button',
      stageId: welcomeStage.id,
      content: {
        text: 'Iniciar Quiz',
        action: 'next',
        alignment: 'center'
      },
      order: 1
    }
  ];
  
  // Create question components
  const questionComponents: QuizComponentData[] = [];
  quizQuestions.forEach((question, qIndex) => {
    questionComponents.push({
      id: generateId(),
      type: 'text',
      stageId: questionStages[qIndex].id,
      content: {
        text: question.text || `Pergunta ${qIndex + 1}`,
        alignment: 'center'
      },
      order: 0
    });
    
    // Add options
    if (question.options && Array.isArray(question.options)) {
      question.options.forEach((option, oIndex) => {
        questionComponents.push({
          id: generateId(),
          type: 'choice',
          stageId: questionStages[qIndex].id,
          content: {
            text: option.text || `Opção ${oIndex + 1}`,
            value: option.value || String(oIndex),
            image: option.image || '',
            alignment: 'center'
          },
          order: oIndex + 1
        });
      });
    }
  });
  
  // Create result component
  const resultComponents: QuizComponentData[] = [
    {
      id: generateId(),
      type: 'result',
      stageId: resultStage.id,
      content: {
        title: resultTitle,
        showShare: true,
        alignment: 'center'
      },
      order: 0
    }
  ];
  
  const components = [...welcomeComponents, ...questionComponents, ...resultComponents];
  
  return { stages, components };
};

// Add function to convert ResultPageConfig to QuizBuilderState
export const createBuilderStateFromResultPage = (config: ResultPageConfig): QuizBuilderState => {
  const resultStageId = generateId();
  
  const stage: QuizStage = {
    id: resultStageId,
    title: 'Página de Resultado',
    type: 'result',
    order: 0,
    isEnabled: true
  };
  
  // Convert blocks from ResultPageConfig to QuizComponentData
  const components: QuizComponentData[] = config.blocks?.map((block, index) => ({
    id: generateId(),
    type: block.type as unknown as QuizComponentType,
    stageId: resultStageId,
    content: block.content,
    order: index
  })) || [];
  
  return {
    stages: [stage],
    components
  };
};

export const loadQuizResultConfig = (styleType: string) => {
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
