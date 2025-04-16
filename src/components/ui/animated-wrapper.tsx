
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  show?: boolean;
}

export const AnimatedWrapper = ({
  children,
  show = true,
  className,
  ...props
}: AnimatedWrapperProps) => {
  return (
    <div
      className={cn(
        "transition-all duration-300",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
