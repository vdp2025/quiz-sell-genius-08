
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: { userName: string } | null;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ userName: string } | null>(() => {
    const savedName = localStorage.getItem('userName');
    return savedName ? { userName: savedName } : null;
  });

  const login = (name: string) => {
    setUser({ userName: name });
    localStorage.setItem('userName', name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userName');
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
