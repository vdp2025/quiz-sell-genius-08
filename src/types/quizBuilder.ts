
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
  | 'stageResult';

export interface QuizComponentStyle {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  paddingY?: string;
  paddingX?: string;
  selectionIndicator?: 'border' | 'checkbox' | 'highlight';
  // Add any other style properties here
}

export interface QuizStage {
  id: string;
  title: string;
  order: number;
  type: 'cover' | 'question' | 'result' | 'strategic';
  componentId?: string;
  data?: {
    requiredSelections?: number;
    [key: string]: any;
  };
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
    backgroundColorQuestion?: string;
    textColorQuestion?: string;
    selectionIndicator?: 'border' | 'checkbox' | 'highlight';
    
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
  };
  style?: QuizComponentStyle;
}

export interface QuizBuilderState {
  components: QuizComponentData[];
  stages: QuizStage[];
  activeStageId?: string;
}
