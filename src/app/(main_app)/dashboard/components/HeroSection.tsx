'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "./ActionButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Check, LayoutDashboard } from "lucide-react"; 
import { useUserStore } from '@/stores/userStore';

const truncateAddress = (address: string | undefined): string => {
  if (!address) return '...';
  if (address.length <= 10) return address;
  const start = address.substring(0, 5);
  const end = address.substring(address.length - 5);
  return `${start}.....${end}`;
};

export function HeroSection() {
  const { user, evmAddress } = useUserStore();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!evmAddress) return;
    navigator.clipboard.writeText(evmAddress).then(() => {
      setIsCopied(true);
      setTimeout(() => { setIsCopied(false); }, 2000);
    }).catch(err => { console.error('Failed to copy text: ', err); });
  };

  const displayName = user?.google?.name || 'User';

  return (
    <Card className="flex w-full rounded-b-4xl rounded-t-none" style={{
      background: 'linear-gradient(140deg,rgba(2, 0, 36, 1) 0%, rgba(0, 0, 191, 1) 26%, rgba(242, 0, 255, 1) 100%)',
      boxShadow: '0 1px 20px rgba(61, 62, 213, 0.8)'
    }}>
      <CardContent className="flex flex-1 flex-col py-2 px-4 md:px-6">
        <div className="flex h-[30%] flex-row text-foreground w-full gap-2 lg:gap-4 items-center">
          <div className="flex-shrink-0">
            <Avatar className="w-14 h-14 border-2 border-primary">
              <AvatarImage src="/token/eth.svg" />
              <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-2 flex-grow min-w-0">
            <h2 className="flex font-bold text-xl truncate">
              Hi, {displayName}
            </h2>
            <div className="flex flex-row cursor-pointer group" onClick={handleCopy}>
              <div className="flex items-center gap-2 text-secondary-foreground">
                <h6 className="flex font-semibold text-xs truncate">
                  {truncateAddress(evmAddress || undefined)}
                </h6>
                {isCopied ? (
                  <Check className="w-3 h-3 text-green-500 transition-all" />
                ) : (
                  <Copy className="w-3 h-3 group-hover:text-foreground transition-all" />
                )}
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <LayoutDashboard className="w-6 h-6 cursor-pointer hover:text-primary transition-colors duration-500 active:scale-95" />
          </div>
        </div>
        <div className="flex h-[50%] mb-4 w-full">
          <div className="flex flex-1 flex-row gap-2 items-center text-foreground md:justify-center lg:justify-center">
            <h2 className="flex font-bold text-4xl">
              $0.00
            </h2>
            <Badge variant="danger" className="h-4 text-xs font-semibold">
              -2%
            </Badge>
          </div>
        </div>
        <ActionButton />
      </CardContent>
    </Card>
  );
}
