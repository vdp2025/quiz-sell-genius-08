
import { useState, useEffect } from 'react';

export const useTransition = (show: boolean, duration = 300) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show && !mounted) {
      setMounted(true);
      requestAnimationFrame(() => {
        setVisible(true);
      });
    } else if (!show && mounted) {
      setVisible(false);
      const timer = setTimeout(() => {
        setMounted(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  return {
    shouldRender: mounted,
    className: visible ? 'opacity-100' : 'opacity-0',
    style: { transition: `opacity ${duration}ms ease-in-out` }
  };
};

