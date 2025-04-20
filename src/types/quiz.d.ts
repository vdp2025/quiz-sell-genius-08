
export interface Question {
  id: string;
  title: string;
  multiSelect: number;
  type: 'text' | 'image' | 'both';
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  imageUrl?: string;
  styleCategory: string;
}

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
}

export interface StyleResult {
  category: string;
  score: number;
  percentage: number;
}

export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  totalSelections: number;
}
