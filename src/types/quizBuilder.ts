
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
  | 'stageCover'
  | 'stageQuestion'
  | 'stageResult'
  | 'countdown-timer'
  | 'feature-comparison'
  | 'testimonial-card'
  | 'callToAction'
  | 'testimonial'
  | 'countdownTimer'
  | 'products';

export interface QuizComponentStyle {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  paddingY?: string;
  paddingX?: string;
  // Add any other style properties here
}

export interface QuizStage {
  id: string;
  title: string;
  order: number;
  type: 'cover' | 'question' | 'result' | 'strategic';
  componentId?: string;
}

export interface QuizComponentLayout {
  columns: 1 | 2 | 3 | 4;
  direction: 'vertical' | 'horizontal';
}

export interface QuizComponentData {
  id: string;
  type: QuizComponentType;
  order: number;
  stageId?: string;
  data: {
    [key: string]: any;
    title?: string;
    subtitle?: string;
    text?: string;
    imageUrl?: string;
    alt?: string;
    question?: string;
    options?: string[];
    stageTitle?: string;
    stageNumber?: number;
    
    // Question properties
    autoAdvance?: boolean;
    minSelections?: number;
    maxSelections?: number;
    multiSelect?: number;
    required?: boolean;
    displayType?: 'text' | 'image' | 'both';
    imageSize?: 'small' | 'medium' | 'large';
    layout?: QuizComponentLayout;
    optionImages?: string[];
    optionStyleCategories?: string[];
    optionScores?: number[];
    backgroundColorQuestion?: string;
    textColorQuestion?: string;
    selectionIndicator?: 'border' | 'checkbox' | 'highlight';
    borderRadius?: string;
    paddingX?: string;
    paddingY?: string;
    
    // Cover properties
    buttonText?: string;
    backgroundColor?: string;
    textColor?: string;
    
    // Result properties
    resultLayout?: 'classic' | 'modern' | 'minimal';
    primaryStyleTitle?: string;
    secondaryStylesTitle?: string;
    showPercentages?: boolean;
    showDescriptions?: boolean;
    callToActionText?: string;
    callToActionUrl?: string;
    offerImageUrl?: string;
    authorImageUrl?: string;
    accentColor?: string;
    
    // Styling properties for all components
    style?: {
      backgroundColor?: string;
      textColor?: string;
      borderRadius?: string;
      padding?: string;
      margin?: string;
      borderColor?: string;
      borderWidth?: string;
      boxShadow?: string;
    };
  };
  style?: QuizComponentStyle;
}

export interface QuizBuilderState {
  components: QuizComponentData[];
  stages: QuizStage[];
  activeStageId?: string;
}
