
import { QuizQuestion, QuizOption } from './quiz';

export interface EditableQuizQuestion extends QuizQuestion {
  isEditing?: boolean;
  isNew?: boolean;
}

export interface EditableQuizOption extends QuizOption {
  isEditing?: boolean;
  isNew?: boolean;
}

export interface QuizEditorState {
  questions: EditableQuizQuestion[];
  editingQuestionId: string | null;
  selectedCategory: string | null;
}

export type QuizCategory = 
  | 'clothingQuestions'
  | 'personalityQuestions'
  | 'accessoriesQuestions'
  | 'stylePreferencesQuestions'
  | 'outerwearQuestions'
  | 'accessoryStyleQuestions'
  | 'selfPerceptionQuestions'
  | 'styleExperienceQuestions'
  | 'purchaseIntentQuestions'
  | 'desiredOutcomesQuestions';

export interface QuizCategoryInfo {
  id: QuizCategory;
  name: string;
  description: string;
  isStrategic: boolean;
}

export const QUIZ_CATEGORIES: QuizCategoryInfo[] = [
  {
    id: 'clothingQuestions',
    name: 'Questões de Vestuário',
    description: 'Perguntas sobre preferências de roupas e estilo pessoal',
    isStrategic: false
  },
  {
    id: 'personalityQuestions',
    name: 'Questões de Personalidade',
    description: 'Perguntas sobre traços de personalidade e auto-percepção',
    isStrategic: false
  },
  {
    id: 'accessoriesQuestions',
    name: 'Questões de Acessórios',
    description: 'Perguntas sobre preferências de sapatos e acessórios',
    isStrategic: false
  },
  {
    id: 'stylePreferencesQuestions',
    name: 'Preferências de Estilo',
    description: 'Perguntas sobre tecidos e estampas preferidas',
    isStrategic: false
  },
  {
    id: 'outerwearQuestions',
    name: 'Questões de Casacos e Calças',
    description: 'Perguntas sobre preferências de casacos e calças',
    isStrategic: false
  },
  {
    id: 'accessoryStyleQuestions',
    name: 'Estilo de Acessórios',
    description: 'Perguntas sobre o estilo de acessórios preferidos',
    isStrategic: false
  },
  {
    id: 'selfPerceptionQuestions',
    name: 'Auto-Percepção',
    description: 'Perguntas estratégicas sobre como a pessoa se vê',
    isStrategic: true
  },
  {
    id: 'styleExperienceQuestions',
    name: 'Experiência com Estilo',
    description: 'Perguntas estratégicas sobre experiências anteriores com moda',
    isStrategic: true
  },
  {
    id: 'purchaseIntentQuestions',
    name: 'Intenção de Compra',
    description: 'Perguntas estratégicas sobre disposição para comprar',
    isStrategic: true
  },
  {
    id: 'desiredOutcomesQuestions',
    name: 'Resultados Desejados',
    description: 'Perguntas estratégicas sobre os objetivos desejados',
    isStrategic: true
  }
];
