
export type StyleCategory = "Elegante" | "Contemporâneo" | "Natural" | "Clássico" | "Romântico" | "Sexy" | "Dramático" | "Criativo";

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
  type: 'text' | 'image' | 'both';  // Changed from 'text-image' to 'both' to match usage
  requiredSelections?: number;
  multiSelect: number;  // Added this property that was missing
  imageUrl?: string;    // Added this property that was missing
  columnsCount?: number;
  imageSize?: 'small' | 'medium' | 'large';
  orderIndex: number;
}

export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
  styleCode?: string;
  styleTypeId?: string;
  styleCategory?: StyleCategory; // Added this property that was missing
  points: number;
}

export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  participant?: {
    name: string;
    email: string;
  };
  totalSelections?: number; // Added this property that was missing
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

// Add missing UserResponse interface
export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
}
