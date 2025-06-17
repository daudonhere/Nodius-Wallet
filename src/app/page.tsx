'use client';

import React, { useState, useEffect } from 'react';
import { HeroSection } from "@/components/main/HeroSection";
import { TokenList } from "@/components/main/TokenList";
import { BottomNavigation } from "@/components/main/BottomNavigation";
import { SplashScreen } from "@/components/splash-screen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeSplash(true);
    }, 3000);

    
    const hideSplashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideSplashTimer);
    };
  }, []);

  return (
    <div className="relative flex flex-col w-full h-screen">
      {showSplash && (
        <SplashScreen className={fadeSplash ? "fade-out" : ""} />
      )}
      {!showSplash && (
        <div className="flex flex-col w-full h-screen content-fade-in">
          <div className="flex flex-1 w-full">
            <HeroSection />
          </div>
          <TokenList />
          <BottomNavigation />
        </div>
      )}
    </div>
  );
}