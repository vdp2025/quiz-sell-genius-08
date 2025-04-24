
export type StyleCategory = "Elegante" | "Contemporâneo" | "Natural" | "Clássico" | "Romântico" | "Sexy" | "Dramático" | "Criativo";

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
}

export interface StyleResult {
  category: StyleCategory;
  score: number;
  percentage: number;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle?: string;
  options: QuizOption[];
  type: 'text' | 'image' | 'text-image';
  requiredSelections?: number;
  columnsCount?: number;
  imageSize?: 'small' | 'medium' | 'large';
  orderIndex: number;
  multiSelect: number;
  imageUrl?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
  styleCode: string;
  styleTypeId: string;
  points: number;
  styleCategory?: StyleCategory;
}

export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  participant?: {
    name: string;
    email: string;
  };
  totalSelections?: number;
}

export interface QuizSettings {
  isPublished: boolean;
  requiresName: boolean;
  requiresEmail: boolean;
  showProgressBar: boolean;
  allowPrevious: boolean;
  showSecondaryStyles: boolean;
  colorScheme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}
