'use client';

// 1. Impor useRef dan pustaka smooth-scrollbar
import React, { useEffect, useState, useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge";
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

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hasMore && page > 1) return;
    const fetchMarketData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false`);
        if (!response.ok) throw new Error('Failed to fetch market data');
        const newData: MarketToken[] = await response.json();
        if (newData.length === 0) { setHasMore(false); } 
        else { setTokens(prevTokens => { const existingIds = new Set(prevTokens.map(t => t.id)); const uniqueNewData = newData.filter(t => !existingIds.has(t.id)); return [...prevTokens, ...uniqueNewData]; }); }
      } catch (error) { console.error(error); setHasMore(false); }
      finally { setIsLoading(false); }
    };
    fetchMarketData();
  }, [page, hasMore]);

  useEffect(() => {
    if (inView && !isLoading && hasMore) { setPage(prevPage => prevPage + 1); }
  }, [inView, isLoading, hasMore]);

  useEffect(() => {
    const results = tokens.filter(token => token.name.toLowerCase().includes(searchTerm.toLowerCase()) || token.symbol.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredTokens(results);
  }, [searchTerm, tokens]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollbar = Scrollbar.init(scrollContainerRef.current, {
        damping: 0.08
      });
      return () => {
        if (scrollbar) scrollbar.destroy();
      };
    }
  }, []);

  return (
    <div className="p-4 mt-2 flex flex-col gap-4 h-full">
      <Input
        placeholder="Search Token..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div ref={scrollContainerRef} className="flex-1 overflow-hidden" style={{ height: 'calc(100% - 30px)' }}>
        {(isLoading && page === 1) ? (
          <div className="space-y-3 pt-2">
            {[...Array(10)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredTokens.map((token) => (
              <Card
                key={token.id}
                className="flex w-full h-16 justify-center cursor-pointer hover:bg-mutted/5 transition-colors"
                style={{ boxShadow: '0 20px 20px -22px rgba(61, 62, 213, 0.8)' }}
                onClick={() => onTokenSelect(token)}
              >
                <CardContent className="flex flex-row flex-1 items-center gap-1 py-1 px-4">
                  <Avatar className="w-10 h-10 border-2 border-primary">
                    <AvatarImage src={token.image} alt={token.name} />
                    <AvatarFallback>{token.symbol.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col justify-start items-start gap-1 ml-2 min-w-0">
                    <h2 className="flex font-bold text-sm text-foreground">{token.symbol.toUpperCase()}</h2>
                    <h6 className="flex font-semibold text-xs text-secondary-foreground">{truncateName(token.name, 16)}</h6>
                  </div>
                  <div className="flex flex-col flex-1 gap-1 items-end">
                    <h2 className="flex font-bold text-sm text-foreground">${token.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</h2>
                    <Badge variant={`${token.price_change_percentage_24h >= 0 ? 'success' : 'danger'}`} className="h-4 px-2 text-xs">
                      {token.price_change_percentage_24h.toFixed(2)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div ref={ref} className="h-1" />
            {isLoading && page > 1 && (
              <div className="flex justify-center p-4">
                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-mutted"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}