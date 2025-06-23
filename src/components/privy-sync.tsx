'use client';

import { useEffect, useState } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { userStore } from '@/stores/userStore';
import { CreateWallet } from './create-wallet';

export function PrivySync() {
  const { user, ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [showCreatePrompt, setShowCreatePrompt] = useState(false);
  const setUser = userStore((s) => s.setUser);
  const setWalletData = userStore((s) => s.setWalletData);
  const clearUser = userStore((s) => s.clearUser);
  const clearWallet = userStore((s) => s.clearWallet);

  useEffect(() => {
    if (!ready) return;

    if (authenticated && user) {
      setUser(user);

      const embeddedWallet = wallets.find((w) => w.walletClientType === 'embedded' && !!w.address);

      if (embeddedWallet) {
        setWalletData({
          evmAddress: embeddedWallet.address,
        });
        setShowCreatePrompt(false); 
      } else {
        setShowCreatePrompt(true);
      }
    } else {
      clearUser();
      clearWallet();
    }
  }, [user, wallets, ready, authenticated, setUser, setWalletData, clearUser, clearWallet]);

  return (
    <>
      {showCreatePrompt && <CreateWallet />}
    </>
  );
}
