
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserSession } from '@/types/auth';

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (userName: string) => void;
  logout: () => void;
}

// Criar o contexto com um valor padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);

  const login = (userName: string) => {
    setUser({
      userName,
      isAuthenticated: true
    });
    localStorage.setItem('userName', userName);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user?.isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
