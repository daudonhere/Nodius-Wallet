'use client';

import React, { useState } from 'react';
import { HeroSection } from "./components/HeroSection"; 
import { TokenList, type MarketToken } from './components/TokenList';
import { MarketChart } from './components/MarketChart';

export default function MarketPage() {
  const [viewingCoin, setViewingCoin] = useState<MarketToken | null>(null);

  return (
    <div className="flex flex-col w-full h-full">
      <HeroSection />
      <div className="flex-1 min-h-0"> 
        {viewingCoin ? (
          <MarketChart
            coin={viewingCoin}
            onBack={() => setViewingCoin(null)}
          />
        ) : (
          <TokenList 
            onCoinSelect={(coin) => setViewingCoin(coin)} 
          />
        )}
      </div>
    </div>
  );
}