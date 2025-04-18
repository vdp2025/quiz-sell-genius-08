
export interface EditableContent {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  items?: string[];
  backgroundColor?: string;
  textColor?: string;
  alignment?: 'left' | 'center' | 'right';
  fontSize?: string;
  padding?: string;
  margin?: string;
}

export interface EditorBlock {
  id: string;
  type: 'headline' | 'image' | 'text' | 'benefits' | 'testimonials' | 'pricing' | 'guarantee';
  content: EditableContent;
  order: number;
}

export interface EditorConfig {
  blocks: EditorBlock[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };
}
