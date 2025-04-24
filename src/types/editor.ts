
export interface EditorBlock {
  id: string;
  type: 'header' | 'hero-section' | 'bonus-carousel' | 'headline' | 'text' | 'image' | 'benefits' | 
        'pricing' | 'guarantee' | 'cta' | 'style-result' | 'secondary-styles' | 'products' | 'testimonials';
  content: any;
  order: number;
}

export interface EditorConfig {
  blocks: EditorBlock[];
  settings: {
    theme: string;
    layout: string;
    fontFamily: string;
  };
}
