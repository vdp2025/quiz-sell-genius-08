
import React, { createContext, useContext, ReactNode, useState } from 'react';

type LoadingState = {
  isLoading: boolean;
  message: string;
};

type LoadingStateContextType = {
  loadingState: LoadingState;
  setLoading: (isLoading: boolean, message?: string) => void;
};

const LoadingStateContext = createContext<LoadingStateContextType | undefined>(undefined);

export const LoadingStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    message: ''
  });
  
  const setLoading = (isLoading: boolean, message: string = '') => {
    setLoadingState({ isLoading, message });
  };
  
  return (
    <LoadingStateContext.Provider value={{ loadingState, setLoading }}>
      {children}
    </LoadingStateContext.Provider>
  );
};

export const useLoadingState = () => {
  const context = useContext(LoadingStateContext);
  if (context === undefined) {
    throw new Error('useLoadingState must be used within a LoadingStateProvider');
  }
  return context;
};
