import React from 'react';
import { cn } from "@/libs/utils";

interface SplashScreenProps {
  className?: string;
}

export function SplashScreen({ className }: SplashScreenProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-fuchsia-700 text-white animate-fadeIn",
        className
      )}
    >
      <div className="mt-8 w-16 h-16 border-4 border-t-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
    </div>
  );
}