
export interface User {
  id?: string;
  userName?: string;
  email?: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}
