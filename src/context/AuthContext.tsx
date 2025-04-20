
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { UserSession } from '../types/auth';

type AuthContextType = {
  user: UserSession;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession>({
    userName: '',
    isAuthenticated: false
  });

  const login = (name: string) => {
    setUser({
      userName: name,
      isAuthenticated: true
    });
  };

  const logout = () => {
    setUser({
      userName: '',
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
