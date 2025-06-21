import { create } from 'zustand';
import { type Wallet } from '@tonconnect/ui-react';

interface TonWalletState {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet | null) => void;
  clearWallet: () => void;
}

export const useUserStore = create<TonWalletState>((set) => ({
  wallet: null,
  
  setWallet: (wallet) => set({ wallet }),

  clearWallet: () => set({ wallet: null }),
}));