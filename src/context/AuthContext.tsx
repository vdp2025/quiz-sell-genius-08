
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';

type AuthContextType = {
  user: (User & { userName?: string }) | null;
  isAdmin: boolean;
  setUsername: (name: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<(User & { userName?: string }) | null>({ 
    id: '1',
    userName: localStorage.getItem('userName') || '',
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    role: 'authenticated',
    app_metadata: {},
    user_metadata: {},
  });
  const [isAdmin] = useState(true);

  const login = async () => {
    // No-op since authentication is disabled
  };

  const logout = async () => {
    // No-op since authentication is disabled
  };

  const setUsername = (name: string) => {
    if (user) {
      localStorage.setItem('userName', name);
      setUser({...user, userName: name});
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, setUsername }}>
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
