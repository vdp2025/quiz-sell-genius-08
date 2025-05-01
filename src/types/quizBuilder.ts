
export interface QuizComponentStyle {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  borderColor?: string;
  borderWidth?: string;
  boxShadow?: string;
  paddingX?: string;
  paddingY?: string;
}

export interface QuizComponentData {
  id: string;
  type: QuizComponentType;
  data: Record<string, any>;
  style?: QuizComponentStyle;
  order: number;
  stageId: string;
}

export interface QuizStage {
  id: string;
  title: string;
  description?: string;
  type: 'cover' | 'question' | 'result' | 'strategic';
  order: number;
  isEnabled: boolean;
}

export type QuizComponentType = 
  | 'header'
  | 'headline' 
  | 'text' 
  | 'image' 
  | 'singleChoice' 
  | 'multipleChoice'
  | 'quizResult'
  | 'stageCover'
  | 'stageQuestion'
  | 'stageResult'
  | 'scale'
  | 'benefitsList'
  | 'faq'
  | 'columns';

export interface QuizBuilderState {
  stages: QuizStage[];
  components: QuizComponentData[];
}
