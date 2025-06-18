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
  onTokenSelect: (token: MarketToken) => void;
}

const truncateName = (name: string, maxLength: number): string => {
  if (name.length <= maxLength) {
    return name;
  }
  return `${name.substring(0, maxLength)}...`;
};

export function TokenList({ onTokenSelect }: TokenListProps) {
  const [tokens, setTokens] = useState<MarketToken[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<MarketToken[]>([]);
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
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false`);
        if (!response.ok) throw new Error('Failed to fetch market data');
        const newData: MarketToken[] = await response.json();
        
        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setTokens(prevTokens => {
            const existingIds = new Set(prevTokens.map(t => t.id));
            const uniqueNewData = newData.filter(t => !existingIds.has(t.id));
            return [...prevTokens, ...uniqueNewData];
          });
        }
      } catch (error) { console.error(error); setHasMore(false); }
      finally { setIsLoading(false); }
    };
    fetchMarketData();
  }, [page, hasMore]);

  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, isLoading, hasMore]);

  useEffect(() => {
    const results = tokens.filter(token =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(results);
  }, [searchTerm, tokens]);

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      <Input
        placeholder="Cari Token..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-card border-border"
      />
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {(isLoading && page === 1) ? (
          <div className="space-y-3 pt-2">
            {[...Array(10)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredTokens.map((token) => (
              <Card
                key={token.id}
                className="flex w-full h-16 justify-center cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => onTokenSelect(token)}
              >
                <CardContent className="flex flex-row flex-1 items-center gap-1 py-1 px-4">
                  <Avatar className="w-10 h-10"><AvatarImage src={token.image} alt={token.name} /><AvatarFallback>{token.symbol.toUpperCase()}</AvatarFallback></Avatar>
                  <div className="flex flex-1 flex-col justify-start items-start gap-1 ml-2 min-w-0">
                    <h2 className="flex font-bold text-sm">{token.symbol.toUpperCase()}</h2>
                    <h6 className="flex font-normal text-xs text-gray-400">{truncateName(token.name, 20)}</h6>
                  </div>
                  <div className="flex flex-col flex-1 gap-1 items-end">
                    <h2 className="flex font-bold text-sm">${token.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</h2>
                    <h6 className={`flex font-semibold text-xs ${token.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>{token.price_change_percentage_24h.toFixed(2)}%</h6>
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
      </div>
    </div>
  );
}