
export type QuizComponentLayout = {
  columns: 1 | 2 | 3 | 4;
  spacing: 'none' | 'small' | 'medium' | 'large';
  alignment: 'left' | 'center' | 'right';
  direction: 'horizontal' | 'vertical';
  containerWidth: 'full' | 'medium' | 'small';
};

export type QuizComponentStyle = {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
  padding: 'none' | 'small' | 'medium' | 'large';
  margin: 'none' | 'small' | 'medium' | 'large';
  shadow: 'none' | 'small' | 'medium' | 'large';
};

export type QuizComponentType = 
  | 'header'
  | 'cover'
  | 'question'
  | 'result'
  | 'text'
  | 'image'
  | 'multipleChoice'
  | 'singleChoice'
  | 'carousel'
  | 'countdown'
  | 'progress'
  | 'divider';

export interface QuizStage {
  id: string;
  title: string;
  order: number;
  type: 'cover' | 'question' | 'result';
}

export interface QuizComponentData {
  id: string;
  type: QuizComponentType;
  order: number;
  stageId?: string;
  layout: QuizComponentLayout;
  style: QuizComponentStyle;
  content: {
    title?: string;
    subtitle?: string;
    text?: string;
    imageUrl?: string;
    buttonText?: string;
    options?: Array<{
      text: string;
      imageUrl?: string;
      value: string;
    }>;
    [key: string]: any;
  };
}
