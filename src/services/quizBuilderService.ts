
import { QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { quizQuestions } from '@/data/quizQuestions';
import { strategicQuestions } from '@/data/strategicQuestions';
import { defaultResultTemplate } from '@/config/resultPageTemplates';

export const generateInitialStages = (): { stages: QuizStage[], components: QuizComponentData[] } => {
  const stages: QuizStage[] = [];
  const components: QuizComponentData[] = [];

  // Add cover stage
  stages.push({
    id: `stage-cover-${Date.now()}`,
    title: 'Etapa 1: Capa do Quiz',
    order: 0,
    type: 'cover'
  });

  // Add header component to cover
  components.push({
    id: `component-cover-header-${Date.now()}`,
    type: 'header',
    order: 0,
    stageId: stages[0].id,
    data: {
      title: 'Descubra seu Estilo Predominante',
      subtitle: 'Responda as perguntas abaixo para descobrir seu estilo pessoal único'
    },
    style: {
      paddingY: '24',
      paddingX: '16',
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
    }
  });

  // Add quiz questions as stages
  let order = 1;
  
  // Strategic questions first
  strategicQuestions.forEach((question, index) => {
    const stageId = `stage-strategic-${Date.now()}-${index}`;
    
    stages.push({
      id: stageId,
      title: `Etapa ${order + 1}: ${question.title.split('\n')[0]}`,
      order: order++,
      type: 'strategic'
    });

    components.push({
      id: `component-question-${Date.now()}-${index}`,
      type: 'multipleChoice',
      order: 0,
      stageId: stageId,
      data: {
        question: question.title,
        options: question.options.map(opt => opt.text),
        optionStyleCategories: question.options.map(opt => opt.styleCategory),
        multiSelect: question.multiSelect,
        required: true,
        displayType: question.type
      },
      style: {
        paddingY: '16',
        paddingX: '16',
      }
    });
  });

  // Style questions next
  quizQuestions.forEach((question, index) => {
    const stageId = `stage-question-${Date.now()}-${index}`;
    
    stages.push({
      id: stageId,
      title: `Etapa ${order + 1}: ${question.title}`,
      order: order++,
      type: 'question'
    });

    components.push({
      id: `component-question-${Date.now()}-${index}`,
      type: 'multipleChoice',
      order: 0,
      stageId: stageId,
      data: {
        question: question.title,
        options: question.options.map(opt => opt.text),
        optionImages: question.options.map(opt => opt.imageUrl).filter(Boolean),
        optionStyleCategories: question.options.map(opt => opt.styleCategory),
        multiSelect: question.multiSelect,
        required: true,
        displayType: question.type
      },
      style: {
        paddingY: '16',
        paddingX: '16',
      }
    });
  });

  // Add result stage
  const resultStageId = `stage-result-${Date.now()}`;
  stages.push({
    id: resultStageId,
    title: 'Página de Resultado',
    order: order++,
    type: 'result'
  });

  // Add result components
  components.push({
    id: `component-result-header-${Date.now()}`,
    type: 'header',
    order: 0,
    stageId: resultStageId,
    data: {
      ...defaultResultTemplate.header.content
    },
    style: defaultResultTemplate.header.style
  });

  components.push({
    id: `component-result-content-${Date.now()}`,
    type: 'quizResult',
    order: 1,
    stageId: resultStageId,
    data: {
      ...defaultResultTemplate.mainContent.content
    },
    style: {
      paddingY: '16',
      paddingX: '16',
    }
  });

  return { stages, components };
};
