
export type BlockType = 
  | 'header'
  | 'text'
  | 'image'
  | 'benefits'
  | 'testimonial'
  | 'pricing'
  | 'guarantee'
  | 'divider'
  | 'styleResult';

export interface Block {
  id: string;
  type: BlockType;
  content: any;
  order: number;
}
