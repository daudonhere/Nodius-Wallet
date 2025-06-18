import React from 'react';
import { HeroSection } from "./components/HeroSection"; 
import { TokenList } from "./components/TokenList";

export default function DashboardPage() {

  return (
    <div className="flex flex-col w-full h-full content-fade-in">
      <HeroSection />
      <TokenList />
    </div>
  );
}