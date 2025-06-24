'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from "@/libs/utils";
import { userStore } from '@/stores/userStore';
import { LoaderCircle } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const user = userStore((state) => state.user);
  
  const [statusMessage, setStatusMessage] = useState('Checking your session...');

  useEffect(() => {
    const messageDelay = 500;
    const redirectDelay = 2500;

    const decisionTimer = setTimeout(() => {
      if (user && user.wallet) {
        setStatusMessage('Session found! Redirecting to dashboard...');
      } else {
        setStatusMessage("Seems like you're not connected, redirecting to login page...");
      }
    }, messageDelay);

    const redirectTimer = setTimeout(() => {
      if (user && user.wallet) {
        router.push('/dashboard');
      } else {
        router.push('/auth');
      }
    }, redirectDelay);

    return () => {
      clearTimeout(decisionTimer);
      clearTimeout(redirectTimer);
    };
  }, [user, router]);

  return (
    <div className={cn("flex flex-col items-center justify-center w-full h-screen bg-background text-foreground animate-fadeIn")}>
        <div className="flex flex-col items-center justify-center gap-y-6 text-center">
          <Image
            src="/animation/loading-wallet.gif"
            alt="Loading Wallet Animation"
            width={200}
            height={200}
            unoptimized
          />
          <h1 className="text-2xl font-bold mt-4">Nodius Wallet</h1>
          <div className="flex items-center gap-2 mt-2 text-gray-400">
            <LoaderCircle className="w-4 h-4 animate-spin" />
            <p>{statusMessage}</p>
          </div>
        </div>
    </div>
  );
}