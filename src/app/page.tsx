'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from "@/libs/utils";
import { userStore } from '@/stores/userStore';
import { LoaderCircle } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user } = userStore.getState();

  useEffect(() => {
    const splashScreenDuration = 2500;
    const timer = setTimeout(() => {
      if (user) {
        console.log("User session found. Redirecting to /dashboard...");
        router.push('/dashboard');
      } else {
        console.log("No user session found. Redirecting to /auth...");
        router.push('/auth');
      }
    }, splashScreenDuration);
    return () => clearTimeout(timer);
  }, [router, user]);

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
          <div className="flex items-center gap-2 mt-2 text-mutted">
            <LoaderCircle className="w-4 h-4 animate-spin" />
            <p>Checking your session...</p>
          </div>
        </div>
    </div>
  );
}