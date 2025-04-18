
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
  // Properties for pricing block
  regularPrice?: string;
  salePrice?: string;
  buttonText?: string;
  checkoutUrl?: string;
  // Properties for CTA block
  url?: string;
}

export interface EditorBlock {
  id: string;
  type: 'headline' | 'image' | 'text' | 'benefits' | 'testimonials' | 'pricing' | 
        'guarantee' | 'cta' | 'style-result' | 'secondary-styles' | 'bonus';
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
