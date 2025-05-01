
import { QuizBuilderState, QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { QuizImportData } from '@/types/quizBuilderTypes';
import { generateId } from '@/utils/idGenerator';
import { createComponent } from '@/utils/componentCreator';

export const createBuilderStateFromQuiz = (
  questions: any[],
  title: string = 'Quiz de Estilo Pessoal',
  subtitle: string = 'Descubra seu estilo predominante',
  resultTitle: string = 'Seu Resultado de Estilo Pessoal'
): QuizBuilderState => {
  const stages: QuizStage[] = [
    {
      id: `stage-cover-${generateId()}`,
      title: 'Etapa 1: Capa do Quiz',
      order: 0,
      type: 'cover'
    }
  ];
  
  const components: QuizComponentData[] = [
    createComponent({
      type: 'stageCover',
      data: {
        title: title,
        subtitle: subtitle,
        buttonText: 'Iniciar Quiz',
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        paddingY: 32,
        paddingX: 16
      }
    }, stages[0].id, 0)
  ];
  
  // Add questions
  questions.forEach((question, index) => {
    const stageId = `stage-question-${generateId()}`;
    
    stages.push({
      id: stageId,
      title: `Etapa ${index + 2}: Pergunta ${index + 1}`,
      order: index + 1,
      type: 'question'
    });
    
    components.push(
      createComponent({
        type: 'stageQuestion',
        data: {
          question: question.title || question.question,
          options: question.options || question.answers?.map((a: any) => a.text) || ['Opção 1', 'Opção 2'],
          optionImages: question.optionImages || Array(question.options?.length || 2).fill(''),
          optionStyleCategories: question.styleCategories || Array(question.options?.length || 2).fill(''),
          optionScores: question.optionScores || Array(question.options?.length || 2).fill(0),
          displayType: question.type === 'image' ? 'image' : question.type === 'both' ? 'both' : 'text',
          multiSelect: question.multiSelect ? 1 : 0,
          required: question.required ?? true,
          autoAdvance: question.autoAdvance || false,
          layout: {
            columns: question.columns || 1,
            direction: 'vertical'
          },
          selectionIndicator: 'border',
          backgroundColor: '#FAF9F7',
          textColor: '#432818',
          paddingY: 24,
          paddingX: 16
        }
      }, stageId, 0)
    );
  });
  
  // Add result stage
  const resultStageId = `stage-result-${generateId()}`;
  stages.push({
    id: resultStageId,
    title: 'Etapa Final: Resultado',
    order: stages.length,
    type: 'result'
  });
  
  components.push(
    createComponent({
      type: 'stageResult',
      data: {
        title: resultTitle,
        primaryStyleTitle: 'Seu Estilo Predominante',
        secondaryStylesTitle: 'Estilos Complementares',
        showPercentages: true,
        showDescriptions: true,
        callToActionText: 'Ver Recomendações',
        accentColor: '#B89B7A',
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        paddingY: 32,
        paddingX: 16
      }
    }, resultStageId, 0)
  );
  
  return { stages, components };
};

export const generateInitialStages = (): QuizBuilderState => {
  const stages: QuizStage[] = [
    {
      id: `stage-cover-${generateId()}`,
      title: 'Etapa 1: Capa do Quiz',
      order: 0,
      type: 'cover'
    },
    {
      id: `stage-question-${generateId()}`,
      title: 'Etapa 2: Pergunta 1',
      order: 1,
      type: 'question'
    },
    {
      id: `stage-result-${generateId()}`,
      title: 'Etapa 3: Resultado',
      order: 2,
      type: 'result'
    }
  ];
  
  const components: QuizComponentData[] = [
    createComponent({
      type: 'stageCover',
      data: {
        title: 'Descubra Seu Estilo Pessoal',
        subtitle: 'Responda algumas perguntas e descubra qual é o seu estilo predominante',
        buttonText: 'Começar Quiz',
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        paddingY: 32,
        paddingX: 16
      }
    }, stages[0].id, 0),
    
    createComponent({
      type: 'stageQuestion',
      data: {
        question: 'Qual dessas opções mais combina com seu estilo preferido?',
        options: [
          'Elegante e sofisticado',
          'Casual e confortável',
          'Ousado e expressivo',
          'Clássico e tradicional'
        ],
        optionImages: ['', '', '', ''],
        optionStyleCategories: ['Elegante', 'Natural', 'Criativo', 'Clássico'],
        optionScores: [0.8, 0.7, 0.9, 0.75],
        displayType: 'text',
        multiSelect: 0,
        required: true,
        autoAdvance: true,
        layout: {
          columns: 1,
          direction: 'vertical'
        },
        selectionIndicator: 'border',
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        paddingY: 24,
        paddingX: 16
      }
    }, stages[1].id, 0),
    
    createComponent({
      type: 'stageResult',
      data: {
        title: 'Seu Resultado de Estilo',
        primaryStyleTitle: 'Seu Estilo Predominante',
        secondaryStylesTitle: 'Estilos Complementares',
        showPercentages: true,
        showDescriptions: true,
        callToActionText: 'Ver Recomendações',
        accentColor: '#B89B7A',
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        paddingY: 32,
        paddingX: 16
      }
    }, stages[2].id, 0)
  ];
  
  return { stages, components };
};

// Import quiz data from external format
export const importQuizFromExternalData = (data: QuizImportData): QuizBuilderState => {
  return createBuilderStateFromQuiz(
    data.questions || [],
    data.title || 'Quiz de Estilo Pessoal',
    data.subtitle || 'Descubra seu estilo predominante',
    data.resultTitle || 'Seu Resultado de Estilo Pessoal'
  );
};

// Convert builder state to quiz output format
export const convertBuilderStateToQuizData = (state: QuizBuilderState) => {
  const { stages, components } = state;
  
  // Get cover data
  const coverStage = stages.find(s => s.type === 'cover');
  const coverComponent = coverStage ? components.find(c => c.stageId === coverStage.id && c.type === 'stageCover') : null;
  
  // Get questions
  const questionStages = stages.filter(s => s.type === 'question').sort((a, b) => a.order - b.order);
  const questions = questionStages.map(stage => {
    const questionComponent = components.find(c => c.stageId === stage.id && c.type === 'stageQuestion');
    if (!questionComponent) return null;
    
    return {
      id: stage.id,
      title: questionComponent.data.question || '',
      type: questionComponent.data.displayType || 'text',
      multiSelect: questionComponent.data.multiSelect || 0,
      required: questionComponent.data.required || false,
      options: (questionComponent.data.options || []).map((option, index) => ({
        id: `option-${index}`,
        text: option,
        imageUrl: (questionComponent.data.optionImages || [])[index] || undefined,
        styleCategory: (questionComponent.data.optionStyleCategories || [])[index] || undefined,
        points: (questionComponent.data.optionScores || [])[index] || 0
      }))
    };
  }).filter(q => q !== null);
  
  // Get result data
  const resultStage = stages.find(s => s.type === 'result');
  const resultComponent = resultStage ? components.find(c => c.stageId === resultStage.id && c.type === 'stageResult') : null;
  
  return {
    title: coverComponent?.data.title || 'Quiz',
    subtitle: coverComponent?.data.subtitle || '',
    questions,
    resultTitle: resultComponent?.data.title || 'Resultado',
    showPercentages: resultComponent?.data.showPercentages || true,
    showDescriptions: resultComponent?.data.showDescriptions || true
  };
};
