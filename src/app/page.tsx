'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from "@/libs/utils";
import { Button } from '@/components/ui/button';
import { usePrivy, useLogin } from '@privy-io/react-auth';
import { LoaderCircle } from 'lucide-react'; 

export default function Home() {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (ready && authenticated) {
      setIsRedirecting(true);
      router.push('/dashboard');
    }
  }, [ready, authenticated, router]);

  return (
    <div className={cn("flex flex-col items-center justify-center w-full h-screen bg-background text-foreground animate-fadeIn")}>
      {isRedirecting ? (
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
          <p className="text-secondary-foreground">Login successful!</p>
          <p className="text-sm text-mutted">Redirecting to your dashboard...</p>
        </div>
      ) : (
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
         If you are not redirected automatically, click the button below.
        </p>
        
        <Button 
            className="bg-gradient-to-br from-tersiery via-secondary to-primary text-secondary-foreground"
            onClick={login}
            disabled={!ready || authenticated}
          >
            {ready ? 'Connect' : 'Loading...'}
          </Button>
        </div>
      )}
    </div>
  );
}