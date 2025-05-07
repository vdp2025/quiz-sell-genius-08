"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsLowPerformanceDevice } from "@/hooks/use-mobile";

interface AnimatedWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  show?: boolean;
  delay?: number;
  duration?: number;
  animation?: "fade" | "slide" | "scale" | "none";
  disableOnLowPerformance?: boolean;
}

export const AnimatedWrapper = ({
  children,
  show = true,
  delay = 0,
  duration = 300,
  animation = "fade",
  disableOnLowPerformance = true,
  className,
  ...props
}: AnimatedWrapperProps) => {
  const [mounted, setMounted] = useState(false);
  const isLowPerformance = useIsLowPerformanceDevice();
  
  // Desativar completamente as animações para eliminar o flash
  const shouldAnimate = false; // Anteriormente: !(disableOnLowPerformance && isLowPerformance);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Simplificar as classes de animação para evitar flashes
  const getAnimationClasses = () => {
    if (!shouldAnimate || animation === "none") return "";
    
    // Usar uma transição mais simples e suave
    const baseClasses = `transition-opacity`;
    
    switch (animation) {
      case "fade":
        return `${baseClasses} ${show && mounted ? "opacity-100" : "opacity-0"}`;
      case "slide":
        // Remover o translate-y que pode causar flashes
        return `${baseClasses} ${show && mounted ? "opacity-100" : "opacity-0"}`;
      case "scale":
        // Remover o scale que pode causar flashes
        return `${baseClasses} ${show && mounted ? "opacity-100" : "opacity-0"}`;
      default:
        return `${baseClasses} ${show && mounted ? "opacity-100" : "opacity-0"}`;
    }
  };
  
  // Remover estilos de transição para evitar problemas
  const animationStyles = {};

  return (
    <div
      className={cn(
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
