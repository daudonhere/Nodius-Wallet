import { create } from 'zustand';
import type { User } from "@privy-io/react-auth";

interface UserState {
  user: User | null;
  evmAddress: string | null;
  privKey: string | null;
  tonAddress: string | null;
  solanaAddress: string | null;

  setUser: (user: User | null) => void;
  setWalletData: (data: Partial<Omit<UserState, "user" | "setUser" | "setWalletData" | "clearUser" | "clearWallet">>) => void;

  clearUser: () => void;
  clearWallet: () => void;
}

export const userStore = create<UserState>((set) => ({
  user: null,
  evmAddress: null,
  privKey: null,
  tonAddress: null,
  solanaAddress: null,

  setUser: (user) => set({ user }),

  setWalletData: (data) => set((state) => ({ ...state, ...data })),

  clearUser: () => set({ user: null }),

  clearWallet: () =>
    set({
      evmAddress: null,
      privKey: null,
      tonAddress: null,
      solanaAddress: null,
    }),
}));


