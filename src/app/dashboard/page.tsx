'use client';

import React, { useState, useEffect } from 'react';
import { HeroSection } from "@/components/main/HeroSection";
import { TokenList } from "@/components/main/TokenList";
import { BottomNavigation } from "@/components/main/BottomNavigation";
import { LoadingScreen } from "@/components/loading-screen";

export default function Dashboard() {
  const [showLoading, setShowLoading] = useState(true);
  const [fadeLoading, setFadeLoading] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeLoading(true);
    }, 2500);

    const hideLoadingTimer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideLoadingTimer);
    };
  }, []);

  return (
    <div className="relative flex flex-col w-full h-screen">
      <div className="flex flex-col w-full h-screen content-fade-in">
        <div className="flex flex-1 w-full">
          <HeroSection />
        </div>
        <TokenList />
        <BottomNavigation />
      </div>
      {showLoading && (
        <LoadingScreen className={fadeLoading ? "fade-out" : ""} />
      )}
    </div>
  );
}