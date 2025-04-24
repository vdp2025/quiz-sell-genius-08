
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define User type
export interface User {
  name: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      return { name: savedName, email: localStorage.getItem('userEmail') || undefined };
    }
    return null;
  });

  const login = (name: string, email?: string) => {
    const userObj = { name, email };
    setUser(userObj);
    localStorage.setItem('userName', name);
    if (email) localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
