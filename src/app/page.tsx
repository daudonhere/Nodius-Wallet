'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from "@/libs/utils";
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';

export default function Home() {
  const router = useRouter();
  const wallet = useTonWallet(); 

  useEffect(() => {
    if (wallet) {
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [wallet, router]);

  return (
    <div className={cn("flex flex-col items-center justify-center w-full h-screen bg-background text-foreground animate-fadeIn")}>
      <div className="flex flex-col items-center justify-center gap-y-6 text-center">
        <Image
          src="/animation/loading-wallet.gif"
          alt="Loading Wallet Animation"
          width={200}
          height={200}
          unoptimized={true}
        />
        <h1 className="text-2xl font-bold">
          Nodius Wallet
        </h1>
        <p className="text-sm text-secondary-foreground max-w-xs px-4">
          Connect your TON wallet to continue.
        </p>
        
        <div className="mt-4">
          <TonConnectButton />
        </div>
      </div>
    </div>
  );
}