
import { QuizQuestion, QuizOption } from '@/types/quiz';
import { QuizStep, QuizComponentData } from '@/types/quizBuilder';
import { generateId } from './idGenerator';

export const convertQuestionsToSteps = (questions: QuizQuestion[]): QuizStep[] => {
  return questions.map((question, index) => {
    const component: QuizComponentData = {
      id: `component-${Date.now()}-${index}`,
      type: 'multipleChoice',
      order: 0,
      data: {
        question: question.title,
        displayType: question.type,
        multiSelect: question.multiSelect,
        options: question.options.map(opt => opt.text),
        fullOptions: question.options.map(opt => ({
          text: opt.text,
          imageUrl: opt.imageUrl,
          styleCategory: opt.styleCategory,
          points: opt.points,
          isStrategic: question.isRequired
        }))
      },
      style: {
        paddingY: '16',
        paddingX: '16'
      }
    };

    return {
      id: `step-${Date.now()}-${index}`,
      title: `Pergunta ${index + 1}`,
      components: [component]
    };
  });
};

export const convertStepsToQuestions = (steps: QuizStep[]): QuizQuestion[] => {
  return steps
    .map(step => {
      // Find the first multipleChoice component in the step
      const component = step.components.find(comp => comp.type === 'multipleChoice');
      
      if (!component) return null;
      
      const options: QuizOption[] = component.data.fullOptions?.map(opt => ({
        id: generateId(),
        text: opt.text,
        imageUrl: opt.imageUrl,
        styleCategory: opt.styleCategory,
        points: opt.points
      })) || [];
      
      return {
        id: generateId(),
        title: component.data.question || '',
        type: component.data.displayType || 'text',
        multiSelect: component.data.multiSelect || 3,
        options,
        isRequired: component.data.isRequired
      };
    })
    .filter(Boolean) as QuizQuestion[];
};
