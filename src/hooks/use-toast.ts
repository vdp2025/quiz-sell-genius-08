
import { useState } from 'react';
import type { ToastActionElement, ToastProps } from '@/components/ui/toast';

export interface Toast extends ToastProps {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
}

export interface ToasterToast extends Toast {
  id: string;
  type?: 'normal' | 'error' | 'success' | 'warning';
  icon?: React.ReactNode;
  dismissible?: boolean;
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

  const toast = ({ ...props }: ToasterToast) => {
    const id = props.id || Math.random().toString(36).substring(2, 9);
    const newToast = {
      ...props,
      id,
      type: props.type || 'normal',
      dismissible: props.dismissible !== false
    };

    setToasts((currentToasts) => [...currentToasts, newToast]);
    return id;
  };

  const dismiss = (toastId?: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((t) => (toastId ? t.id !== toastId : false))
    );
  };

  return {
    toasts,
    toast,
    dismiss
  };
};
