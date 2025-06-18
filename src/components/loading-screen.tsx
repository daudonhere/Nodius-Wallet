import React from 'react';
import { cn } from "@/libs/utils";
import { FourSquare } from "react-loading-indicators";

interface LoadingScreenProps {
  className?: string;
}

export function LoadingScreen({ className }: LoadingScreenProps) {
  return (
    <div className={cn(
        "fixed inset-0 z-50",
        "flex flex-col items-center justify-center",
        "bg-background/30 backdrop-blur-lg",
        "animate-fadeIn",
        className
      )}>
      <div className="flex flex-col items-center justify-center gap-y-6 text-center">
        <FourSquare color="#de38ff" size="medium" text="" textColor="" />
      </div>
    </div>
  );
}