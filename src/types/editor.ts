
export interface Block {
  id: string;
  type: string;
  content: Record<string, any>;
  order?: number;
  settings?: Record<string, any>;
  [key: string]: any;
}

export type BlockType = 
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'button'
  | 'title'
  | 'subtitle'
  | 'text'
  | 'styleResult'
  | 'cta'
  | 'testimonial'
  | 'carousel'
  | 'bonus'
  | 'guarantee'
  | string;
