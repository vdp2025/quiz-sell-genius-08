
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
  | 'quizResult'
  | 'continueButton';

export interface QuizComponentStyle {
  paddingY?: string;
  paddingX?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  lineHeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  imageWidth?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export type StyleCategory = 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo';

export interface QuizOption {
  text: string;
  imageUrl?: string;
  styleCategory?: StyleCategory;
  points?: number;
  isStrategic?: boolean;
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
    
    // Multiple choice specific
    multiSelect?: number;
    displayType?: 'text' | 'image' | 'both';
    gridColumns?: number;
    imageHeight?: number;
    optionFontFamily?: string;
    optionFontSize?: number;
    optionFontWeight?: string;
    optionTextColor?: string;
    
    // Navigation
    showContinueButton?: boolean;
    buttonText?: string;
    buttonUrl?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    buttonRadius?: number;
    buttonPadding?: string;
    
    // Action buttons
    onClickAction?: 'nextQuestion' | 'submitQuiz' | 'goToUrl';
  };
  style?: QuizComponentStyle;
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
