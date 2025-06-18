'use client';

import React from 'react';
import { cn } from "@/libs/utils";
import { FourSquare } from "react-loading-indicators";
import { useNavigationStore } from '@/stores/navigationStore';

export function LoadingScreen() {
  const { isNavigating } = useNavigationStore();

  return (
    <div className={cn(
        "fixed inset-0 z-50",
        "flex flex-col items-center justify-center",
        "bg-background/80 backdrop-blur-sm",
        isNavigating ? 'animate-fadeIn' : 'fade-out'
      )}>
      <div className="flex flex-col items-center justify-center gap-y-6 text-center">
        <FourSquare color="#de38ff" size="medium" text="" textColor="" />
      </div>
    </div>
  );
}