import { QuizBuilderState, QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { QuizImportData } from '@/types/quizBuilderTypes';

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
      type: 'cover',
      isEnabled: true
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
      type: 'question',
      isEnabled: true
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
        multiSelect: question.multiSelect ? 1 : 0,
        required: true,
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
    type: 'result',
    isEnabled: true
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
      type: 'cover',
      isEnabled: true
    },
    {
      id: `stage-question-${Date.now()}`,
      title: 'Etapa 2: Pergunta 1',
      order: 1,
      type: 'question',
      isEnabled: true
    },
    {
      id: `stage-result-${Date.now()}`,
      title: 'Etapa 3: Resultado',
      order: 2,
      type: 'result',
      isEnabled: true
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
        multiSelect: 0,
        required: true,
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
