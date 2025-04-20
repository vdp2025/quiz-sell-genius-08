
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
  paddingY?: string;
  paddingX?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  // Add more style properties as needed
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
    
    // New properties for enhanced functionality
    autoAdvance?: boolean;
    minSelections?: number;
    maxSelections?: number;
    multiSelect?: number; // For backwards compatibility
    required?: boolean;
    displayType?: 'text' | 'image' | 'both';
    imageSize?: 'small' | 'medium' | 'large';
    layout?: QuizComponentLayout;
    
    // Options for image/multimedia support
    optionImages?: string[];
    optionStyleCategories?: string[];
  };
  style?: QuizComponentStyle;
}

export interface QuizBuilderState {
  components: QuizComponentData[];
  stages: QuizStage[];
  activeStageId?: string;
}
