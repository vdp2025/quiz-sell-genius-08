
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
  variant?: "default" | "destructive";
  icon?: React.ReactNode;
  dismissible?: boolean;
  duration?: number;
}

// Create a store to handle toasts outside of React components
const TOAST_LIMIT = 5;
let toasts: ToasterToast[] = [];
let listeners: ((toasts: ToasterToast[]) => void)[] = [];

const emitChange = () => {
  listeners.forEach((listener) => {
    listener(toasts);
  });
};

export const toast = (props: Omit<ToasterToast, "id">) => {
  const id = props.id ?? Math.random().toString(36).substring(2, 9);
  const newToast = {
    ...props,
    id,
    variant: props.variant || 'default',
    dismissible: props.dismissible !== false
  };

  toasts = [newToast, ...toasts].slice(0, TOAST_LIMIT);
  emitChange();
  
  return id;
};

export const dismiss = (toastId?: string) => {
  toasts = toastId
    ? toasts.filter((t) => t.id !== toastId)
    : [];
  emitChange();
};

export const useToast = () => {
  const [_toasts, setToasts] = useState<ToasterToast[]>(toasts);

  // Subscribe to changes
  useState(() => {
    const listener = (newToasts: ToasterToast[]) => {
      setToasts(newToasts);
    };

    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  });

  return {
    toasts: _toasts,
    toast,
    dismiss
  };
};
