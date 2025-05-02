
import { useState, useEffect } from 'react';

interface LoadingOptions {
  initialState?: boolean;
  minDuration?: number;
  maxDuration?: number;
}

export const useLoadingState = ({
  initialState = true,
  minDuration = 800,
  maxDuration = 5000
}: LoadingOptions = {}) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [startTime] = useState<number>(Date.now());

  // Handle loading completion
  const completeLoading = () => {
    const elapsedTime = Date.now() - startTime;
    
    // If less time has passed than minDuration, wait a bit before completing
    if (elapsedTime < minDuration) {
      const remainingTime = minDuration - elapsedTime;
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    } else {
      // If enough time has passed, complete immediately
      setIsLoading(false);
    }
  };

  // Provide manual control over loading state
  const setLoading = (state: boolean) => {
    if (state === false) {
      completeLoading();
    } else {
      setIsLoading(true);
    }
  };

  // Set up timeout for maximum loading duration
  useEffect(() => {
    if (isLoading && maxDuration) {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        setIsTimedOut(true);
      }, maxDuration);
      
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isLoading, maxDuration]);

  return {
    isLoading,
    setLoading,
    isTimedOut,
    completeLoading
  };
};
