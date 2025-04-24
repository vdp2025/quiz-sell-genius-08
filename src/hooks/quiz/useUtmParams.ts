
import { useState, useCallback, useEffect } from 'react';

export const useUtmParams = () => {
  const [utmParams, setUtmParams] = useState<Record<string, string>>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const storedUtmParams = localStorage.getItem('utmParams');
    
    const params: Record<string, string> = {};
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    utmKeys.forEach(key => {
      const value = urlParams.get(key) || (storedUtmParams ? JSON.parse(storedUtmParams)[key] : '');
      if (value) params[key] = value;
    });

    if (Object.keys(params).length > 0) {
      localStorage.setItem('utmParams', JSON.stringify(params));
    }

    return params;
  });

  const updateUtmParams = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    utmKeys.forEach(key => {
      const value = urlParams.get(key);
      if (value) params[key] = value;
    });

    if (Object.keys(params).length > 0) {
      setUtmParams(params);
      localStorage.setItem('utmParams', JSON.stringify(params));
    }
  }, []);

  useEffect(() => {
    updateUtmParams();
  }, [updateUtmParams]);

  return { utmParams, updateUtmParams };
};
