'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from "@/libs/utils";
import { Button } from '@/components/ui/button';
import { usePrivy, useLogin, useWallets, useCreateWallet } from '@privy-io/react-auth';
import { LoaderCircle } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();
  const { wallets } = useWallets();
  const { createWallet } = useCreateWallet();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);

  const embeddedWallet = wallets.find(
    (w) => w.walletClientType === 'embedded' && !!w.address
  );

  useEffect(() => {
    if (ready && authenticated && embeddedWallet) {
      setIsRedirecting(true);
      router.push('/dashboard');
    }
  }, [ready, authenticated, embeddedWallet, router]);

  const handleCreateWallet = async () => {
    try {
      setIsCreatingWallet(true);
      await createWallet();
    } catch (err) {
      console.error("Failed to create wallet:", err);
    } finally {
      setIsCreatingWallet(false);
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center w-full h-screen bg-background text-foreground animate-fadeIn")}>
      {isRedirecting ? (
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
          <p className="text-secondary-foreground">Login successful!</p>
          <p className="text-sm text-muted">Redirecting to your dashboard...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-6 text-center">
          <Image
            src="/animation/loading-wallet.gif"
            alt="Loading Wallet Animation"
            width={200}
            height={200}
            unoptimized
          />
          <h1 className="text-2xl font-bold">Nodius Wallet</h1>
          <p className="text-sm text-secondary-foreground max-w-xs px-4">
            {authenticated
              ? "You are logged in but don’t have a wallet yet."
              : "Click connect to get started."}
          </p>

          {!authenticated ? (
            <Button
              className="bg-gradient-to-br from-tersiery via-secondary to-primary text-secondary-foreground"
              onClick={login}
              disabled={!ready}
            >
              {ready ? "Connect" : <LoaderCircle className="animate-spin" />}
            </Button>
          ) : (
            <Button
              onClick={handleCreateWallet}
              disabled={isCreatingWallet}
              className="bg-gradient-to-br from-purple-800 via-pink-600 to-fuchsia-700 text-white mt-2"
            >
              {isCreatingWallet ? <LoaderCircle className="animate-spin" /> : "Create Wallet"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
