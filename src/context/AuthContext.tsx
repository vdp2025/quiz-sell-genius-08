
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  userName: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user exists in localStorage on mount
    const savedUser = localStorage.getItem('userName');
    if (savedUser) {
      setUser({ userName: savedUser });
    }
  }, []);

  const login = (name: string) => {
    const newUser = { userName: name };
    setUser(newUser);
    localStorage.setItem('userName', name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
