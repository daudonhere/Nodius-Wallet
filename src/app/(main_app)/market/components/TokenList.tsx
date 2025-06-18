'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from 'react-intersection-observer';

export type MarketToken = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

interface TokenListProps {
  onCoinSelect: (coin: MarketToken) => void;
}

const truncateName = (name: string, maxLength: number): string => {
  if (name.length <= maxLength) {
    return name;
  }
  return `${name.substring(0, maxLength)}...`;
};

export function TokenList({ onCoinSelect }: TokenListProps) {
  const [coins, setCoins] = useState<MarketToken[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<MarketToken[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (!hasMore && page > 1) return;
    
    const fetchMarketData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=${page}&sparkline=false`);
        if (!response.ok) throw new Error('Failed to fetch market data');
        const newData: MarketToken[] = await response.json();
        
        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setCoins(prevCoins => {
            const existingIds = new Set(prevCoins.map(c => c.id));
            const uniqueNewData = newData.filter(c => !existingIds.has(c.id));
            return [...prevCoins, ...uniqueNewData];
          });
        }
      } catch (error) { console.error(error); setHasMore(false); }
      finally { setIsLoading(false); }
    };
    fetchMarketData();
  }, [page]);

  useEffect(() => {
    if (inView && !isLoading && hasMore) { setPage(prevPage => prevPage + 1); }
  }, [inView, isLoading, hasMore]);

  useEffect(() => {
    const results = coins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(results);
  }, [searchTerm, coins]);

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      <Input
        placeholder="Search Token..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-card border-border"
      />
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {isLoading && page === 1 ? (
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredCoins.map((coin) => (
              <Card
                key={coin.id}
                className="flex w-full h-16 justify-center cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => onCoinSelect(coin)}
              >
                <CardContent className="flex flex-row flex-1 items-center gap-1 py-1 px-4">
                  <Avatar className="w-10 h-10"><AvatarImage src={coin.image} alt={coin.name} /><AvatarFallback>{coin.symbol.toUpperCase()}</AvatarFallback></Avatar>
                  <div className="flex flex-1 flex-col justify-start items-start gap-1 ml-2 min-w-0">
                    <h2 className="flex font-bold text-sm">{coin.symbol.toUpperCase()}</h2>
                    <h6 className="flex font-semibold text-xs text-gray-400">
                      {truncateName(coin.name, 16)}
                    </h6>
                  </div>
                  <div className="flex flex-col flex-1 gap-1 items-end">
                    <h2 className="flex font-bold text-sm">${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</h2>
                    <h6 className={`flex font-semibold text-xs ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>{coin.price_change_percentage_24h.toFixed(2)}%</h6>
                  </div>
                </CardContent>
              </Card>
            ))}

           
          </div>
        )}
        <div ref={ref} className="h-1" />
        {isLoading && page > 1 && (
          <div className="flex justify-center p-4">
            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-gray-500"></div>
          </div>
        )}
         <div className="flex flex-1 w-full min-h-[30%]"/>
      </div>
    </div>
  );
}