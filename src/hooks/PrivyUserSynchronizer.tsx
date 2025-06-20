'use client';

import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useUserStore } from '@/stores/userStore';

export function PrivyUserSynchronizer() {
  const { user } = usePrivy();
  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(user ?? null);
  }, [user, setUser]);
  return null;
}