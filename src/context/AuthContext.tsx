
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: { userName: string } | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (name: string, isAdmin?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ userName: string } | null>(() => {
    const savedName = localStorage.getItem('userName');
    return savedName ? { userName: savedName } : null;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const login = (name: string, isAdmin: boolean = false) => {
    setUser({ userName: name });
    setIsAdmin(isAdmin);
    localStorage.setItem('userName', name);
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isAdmin, 
      login, 
      logout 
    }}>
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
