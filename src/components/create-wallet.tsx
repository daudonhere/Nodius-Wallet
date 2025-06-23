'use client';

import React from 'react';
import { useWallets, useCreateWallet } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export function CreateWallet() {
  const { wallets, ready: walletsReady } = useWallets();
  const { createWallet } = useCreateWallet({
    onError: (err) => console.error("Create wallet error:", err),
  });

  const noWallet = walletsReady && wallets.length === 0;
  const [isLoading, setIsLoading] = React.useState(false);

  if (!walletsReady || !noWallet) return null;

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createWallet();
    } catch (e) {
      console.error("Failed to create wallet:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-center">
      <h2 className="text-xl font-bold">Wallet Not Found</h2>
      <p className="text-muted-foreground max-w-sm">
        Youre logged in but no embedded wallet found. Please create one now.
      </p>
      <Button onClick={handleCreate} disabled={isLoading} className="mt-4 bg-gradient-to-br from-primary to-secondary text-white">
        {isLoading ? (
          <>
            <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
            Creating Wallet...
          </>
        ) : (
          "Create Wallet Now"
        )}
      </Button>
    </div>
  );
}
