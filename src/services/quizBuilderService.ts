import { QuizQuestion, QuizOption } from '@/types/quiz';
import { QuizStage, QuizComponentData, QuizBuilderState } from '@/types/quizBuilder';
import { generateId } from '@/utils/idGenerator';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { resultPageStorage } from '@/services/resultPageStorage';

/**
 * Creates a stage for quiz builder based on provided parameters
 */
export const createStage = (
  title: string,
  type: QuizStage['type'],
  order: number
): QuizStage => {
  return {
    id: generateId(),
    title,
    order,
    type
  };
};

/**
 * Creates a component for the quiz builder
 */
export const createComponent = (
  type: QuizComponentData['type'],
  stageId: string,
  data: any,
  order: number
): QuizComponentData => {
  return {
    id: generateId(),
    type,
    stageId,
    order,
    data
  };
};

/**
 * Creates the initial stages and components for a new quiz builder
 */
export const generateInitialStages = (): { stages: QuizStage[], components: QuizComponentData[] } => {
  const coverStage = createStage('Capa do Quiz', 'cover', 0);
  const questionStage = createStage('Primeira Questão', 'question', 1);
  const resultStage = createStage('Resultado Final', 'result', 2);
  
  const coverComponent = createComponent('stageCover', coverStage.id, {
    title: 'Quiz de Estilo',
    subtitle: 'Descubra seu estilo predominante',
    buttonText: 'Começar'
  }, 0);
  
  const questionComponent = createComponent('stageQuestion', questionStage.id, {
    question: 'Qual é o seu tipo de roupa favorita?',
    options: [
      'Looks confortáveis e práticos',
      'Roupas clássicas e atemporais',
      'Peças modernas com toques pessoais',
      'Roupas sofisticadas e elegantes'
    ],
    multiSelect: 3,
    displayType: 'text',
    autoAdvance: true
  }, 0);
  
  const resultComponent = createComponent('stageResult', resultStage.id, {
    title: 'Seu Resultado',
    subtitle: 'Baseado nas suas respostas'
  }, 0);
  
  return {
    stages: [coverStage, questionStage, resultStage],
    components: [coverComponent, questionComponent, resultComponent]
  };
};

export const createBuilderStateFromQuiz = (
  questions: QuizQuestion[],
  title: string,
  description: string,
  resultTitle: string
): QuizBuilderState => {
  const stages: QuizStage[] = [];
  const components: QuizComponentData[] = [];
  
  // Create cover stage
  const coverStage = createStage('Capa do Quiz', 'cover', 0);
  stages.push(coverStage);
  
  components.push(createComponent('stageCover', coverStage.id, {
    title: title,
    subtitle: description,
    buttonText: 'Começar Quiz',
    backgroundColor: '#FFFAF0',
    textColor: '#432818',
    stageTitle: 'Início',
    stageNumber: 1,
    totalStages: questions.length + 2, // Cover + Questions + Result
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp'
  }, 0));
  
  // Create question stages
  questions.forEach((question, index) => {
    const questionStage = createStage(
      question.title || `Pergunta ${index + 1}`,
      'question',
      index + 1
    );
    stages.push(questionStage);
    
    components.push(createComponent('multipleChoice', questionStage.id, {
      question: question.title,
      options: question.options.map(opt => ({
        text: opt.text,
        imageUrl: opt.imageUrl,
        styleCategory: opt.styleCategory
      })),
      multiSelect: question.multiSelect,
      displayType: question.type,
      autoAdvance: true,
      stageTitle: `Questão ${index + 1}`,
      stageNumber: index + 2,
      totalStages: questions.length + 2
    }, 0));
  });
  
  // Create result stage
  const resultStage = createStage('Resultado do Quiz', 'result', questions.length + 1);
  stages.push(resultStage);
  
  components.push(createComponent('stageResult', resultStage.id, {
    title: resultTitle,
    subtitle: 'Baseado nas suas respostas',
    showPercentages: true,
    showDescriptions: true,
    stageTitle: 'Resultado',
    stageNumber: questions.length + 2,
    totalStages: questions.length + 2
  }, 0));
  
  return { stages, components };
};

/**
 * Creates a builder state from an existing result page configuration
 */
export const createBuilderStateFromResultPage = (
  resultConfig: ResultPageConfig
): QuizBuilderState => {
  // Create a minimal quiz builder state with just a result page
  const resultStage = createStage('Resultado do Quiz', 'result', 0);
  
  const resultComponent = createComponent('stageResult', resultStage.id, {
    title: resultConfig.header?.content?.title || 'Seu Resultado',
    subtitle: resultConfig.header?.content?.subtitle || 'Baseado nas suas respostas',
    resultLayout: 'custom',
    primaryStyleTitle: 'Seu Estilo Predominante',
    secondaryStylesTitle: resultConfig.secondaryStyles?.visible !== false ? 'Seus Estilos Complementares' : '',
    showPercentages: true,
    showDescriptions: true,
    callToActionText: resultConfig.offer?.hero?.content?.ctaText || 'Conhecer o Guia Completo',
    callToActionUrl: resultConfig.offer?.hero?.content?.ctaUrl || '#',
    accentColor: resultConfig.globalStyles?.primaryColor || '#B89B7A',
    savedResultConfig: JSON.stringify(resultConfig)
  }, 0);
  
  return {
    stages: [resultStage],
    components: [resultComponent]
  };
};

/**
 * Loads a quiz result page configuration from localStorage
 */
export const loadQuizResultConfig = (styleType: string): ResultPageConfig | null => {
  return resultPageStorage.load(styleType);
};
