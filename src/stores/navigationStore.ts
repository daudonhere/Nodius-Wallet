import { create } from 'zustand';

interface NavigationState {
  isMounted: boolean;
  isNavigating: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isMounted: false,
  isNavigating: false,
  
  showLoader: () => {
    set({ isMounted: true });
    setTimeout(() => {
      set({ isNavigating: true });
    }, 10); 
  },

  hideLoader: () => {
    set({ isNavigating: false });
    setTimeout(() => {
      set({ isMounted: false });
    }, 500);
  },
}));