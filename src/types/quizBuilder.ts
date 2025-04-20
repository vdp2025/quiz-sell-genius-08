
export type QuizComponentType = 
  | 'header' 
  | 'section' 
  | 'columns' 
  | 'headline' 
  | 'text' 
  | 'image' 
  | 'multipleChoice' 
  | 'singleChoice' 
  | 'scale' 
  | 'openEnded' 
  | 'date' 
  | 'benefitsList' 
  | 'faq' 
  | 'quizResult';

export interface QuizComponentStyle {
  paddingY?: string;
  paddingX?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  // Add more style properties as needed
}

export interface QuizComponentData {
  id: string;
  type: QuizComponentType;
  order: number;
  data: {
    [key: string]: any;
    title?: string;
    subtitle?: string;
    text?: string;
    imageUrl?: string;
    alt?: string;
    question?: string;
    options?: string[];
    fullOptions?: QuizOption[];
    // Add more specific data properties as needed
  };
  style?: QuizComponentStyle;
}

export interface QuizOption {
  text: string;
  imageUrl?: string;
  styleCategory?: 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo';
}

export interface QuizStep {
  id: string;
  title: string;
  components: QuizComponentData[];
}

export interface QuizBuilderState {
  steps: QuizStep[];
  currentStepIndex: number;
}
