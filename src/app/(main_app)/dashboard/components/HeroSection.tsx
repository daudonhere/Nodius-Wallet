'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/app/(main_app)/dashboard/components/ActionButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Check, LayoutDashboard } from "lucide-react"; 
import { useUserStore } from '@/stores/userStore';

const truncateAddress = (address: string | undefined): string => {
  if (!address) return '0x...';
  if (address.length <= 10) return address;

  const start = address.substring(0, 7);
  const end = address.substring(address.length - 7);
  return `${start}.......${end}`;
};

export function HeroSection() {
  const { user } = useUserStore();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!user?.wallet?.address) return;
    navigator.clipboard.writeText(user.wallet.address).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  
  const displayName = user?.google?.name || user?.twitter?.name || 'User';
  const walletAddress = user?.wallet?.address ?? '';
  
  return (
    <Card className="flex w-full rounded-b-4xl rounded-t-none" style={{
      background: 'linear-gradient(140deg,rgba(2, 0, 36, 1) 0%, rgba(0, 0, 191, 1) 26%, rgba(242, 0, 255, 1) 100%)',
      boxShadow: '0 1px 20px rgba(61, 62, 213, 0.8)'
    }}>
      <CardContent className="flex flex-1 flex-col py-2 px-4 md:px-6">
        <div className="flex h-[30%] flex-row text-foreground w-full gap-2 lg:gap-4">
          <div className="flex items-center w-[20%] md:w-[8%] lg:w-[10%]">
            <Avatar className="w-14 h-14 border-2 border-primary">
              <AvatarImage src="/token/eth.svg" />
              <AvatarFallback>{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-2 w-[65%] md:w-[80%] lg:w-[75%]">
            <h2 className="flex font-bold text-xl">
              Hi, Raymond
            </h2>
            <div className="flex flex-row cursor-pointer group"
              onClick={handleCopy}
            >
              <div className="flex items-center gap-2 text-secondary-foreground">
                <h6 className="flex font-semibold text-xs">
                 {truncateAddress(walletAddress)}
                </h6>
                {isCopied ? (
                  <Check className="w-3 h-3 text-success transition-all" />
                ) : (
                  <Copy className="w-3 h-3 group-hover:text-foreground transition-all" />
                )}
              </div>
            </div>
          </div>
          <div className="flex w-[10%] justify-end">
            <LayoutDashboard className="w-6 h-6 cursor-pointer hover:text-primary transition-color duration-500 active:scale-95" />
          </div>
        </div>
        <div className="flex h-[50%] mb-4 w-full">
          <div className="flex flex-1 flex-row gap-2 items-center text-foreground md:justify-center lg:justify-center md:ml-10 lg:ml-10">
            <h2 className="flex font-bold text-4xl">
              $8,876.00
            </h2>
            <Badge variant="danger" className="h-4 text-xs font-semibold mb-6">
              -2%
            </Badge>
          </div>
        </div>
        <ActionButton />
      </CardContent>
    </Card>
  );
}