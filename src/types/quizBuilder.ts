
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
  type: 'cover' | 'question' | 'result';
  componentId?: string;
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
    // Add more specific data properties as needed
  };
  style?: QuizComponentStyle;
}

export interface QuizBuilderState {
  components: QuizComponentData[];
  stages: QuizStage[];
  activeStageId?: string;
}
