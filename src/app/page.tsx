'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from "@/libs/utils";
import { Button } from '@/components/ui/button';

interface SplashScreenProps {
  className?: string;
}

export default function Home({ className }: SplashScreenProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000); 
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={cn("flex flex-col items-center justify-center w-full h-screen bg-background text-foreground animate-fadeIn", className)}>
      <div className="flex flex-col items-center justify-center gap-y-6 text-center">
        <Image
          src="/animation/loading-wallet.gif"
          alt="Loading Wallet Animation"
          width={200}
          height={200}
          unoptimized={true}
        />
        <h1 className="text-2xl font-bold">
          Nodius Walet
        </h1>
        <p className="text-sm text-secondary-foreground max-w-xs px-4">
         If you are not redirected automatically, click the button below.
        </p>
        <Button className="bg-gradient-to-br from-tersiery via-secondary to-primary text-secondary-foreground">
          Connect
        </Button>
      </div>
    </div>
  );
}