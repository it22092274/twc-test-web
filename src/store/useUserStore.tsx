import {create} from 'zustand';

export const useUserStore = create((set) => ({
  user: null, 
  setUser: (userData: object) => set({ user: userData }),
  clearUser: () => set({ user: null }), // For logging out
}));
