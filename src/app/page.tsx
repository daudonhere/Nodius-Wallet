'use client';

import Image from 'next/image';
import { cn } from "@/libs/utils";

export default function Home() {

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
          <h1 className="text-2xl font-bold">Nodius Wallet</h1>
        </div>
    </div>
  );
}
