'use client';

import { useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useUserStore } from '@/stores/userStore';

export function PrivySync() {
  const { user, ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  console.log(wallets)
  const setUser = useUserStore((s) => s.setUser);
  const setWalletData = useUserStore((s) => s.setWalletData);

  useEffect(() => {
    if (!ready || !authenticated || !user) return;

    setUser(user);

    const embeddedWallet = wallets.find(w => w.walletClientType === 'privy' && w.address);
    const evmAddress = embeddedWallet?.address || null;

    setWalletData({
      evmAddress,
    });
  }, [ready, authenticated, user, wallets, setUser, setWalletData]);

  return null;
}
