'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from "@/libs/utils";
import { Button } from '@/components/ui/button';
import { usePrivy, useLogin, useWallets, useCreateWallet } from '@privy-io/react-auth';
import { LoaderCircle } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();
  const { wallets } = useWallets();
  const { createWallet } = useCreateWallet();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Please follow the login instructions...');
  const loginTriggered = useRef(false);
  const createWalletTriggered = useRef(false);

  const embeddedWallet = wallets.find(
    (w) => w.walletClientType === 'embedded' && !!w.address
  );

  const handleCreateWallet = useCallback(async () => {
    setStatusMessage('Login successful. Creating your secure wallet...');
    try {
      await createWallet();
    } catch (err) {
      console.error("Failed to create wallet:", err);
      setStatusMessage('Error: Could not create wallet.');
    }
  }, [createWallet]);

  useEffect(() => {
    if (!ready) {
      setStatusMessage('Initializing...');
      return;
    }

    if (authenticated && embeddedWallet) {
      setStatusMessage('Wallet ready! Redirecting...');
      setIsRedirecting(true);
      setTimeout(() => router.push('/dashboard'), 700);
      return;
    }

    if (authenticated && !embeddedWallet && !createWalletTriggered.current) {
      createWalletTriggered.current = true;
      handleCreateWallet();
      return;
    }

    if (!authenticated && !loginTriggered.current) {
      loginTriggered.current = true;
      login();
    }
  }, [ready, authenticated, embeddedWallet, login, router, handleCreateWallet]);

  return (
    <div className={cn("flex flex-col items-center justify-center w-full h-screen bg-background text-foreground animate-fadeIn")}>
      {isRedirecting ? (
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
          <p className="text-secondary-foreground">{statusMessage}</p>
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
          
          <div className="flex items-center gap-2 mt-4 h-10">
            {ready ? (
              <p className="text-sm text-secondary-foreground max-w-xs px-4">{statusMessage}</p>
            ) : (
              <LoaderCircle className="w-6 h-6 animate-spin" />
            )}
          </div>
          
          {!authenticated && ready && (
             <Button
              variant="outline"
              size="sm"
              onClick={login}
            >
              Open Login
            </Button>
          )}
        </div>
      )}
    </div>
  );
}