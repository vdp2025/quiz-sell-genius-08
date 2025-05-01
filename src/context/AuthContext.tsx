
import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id?: string;
  userName?: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  login: (userName: string, email?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Get from localStorage if available
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      return { userName: savedUserName };
    }
    return null;
  });

  const login = (userName: string, email?: string) => {
    const user = { userName, email };
    localStorage.setItem('userName', userName);
    if (email) {
      localStorage.setItem('userEmail', email);
    }
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setUser(null);
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
