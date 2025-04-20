
export interface StyleResult {
  category: 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo';
  score: number;
  percentage: number;
}

export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  totalSelections: number;
}

export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
  styleCategory: StyleResult['category'];
  points: number;
}

export interface QuizQuestion {
  id: string;
  title: string;
  type: 'text' | 'image' | 'both';
  multiSelect: number;
  options: QuizOption[];
}

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
}
