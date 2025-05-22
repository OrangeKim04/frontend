import { create } from 'zustand';

interface UserState {
   name: string;
   email: string;
   setName: (name: string) => void;
   setEmail: (email: string) => void;
   reset: () => void;
}

const initialState = {
   name: '',
   email: '',
};

export const useUserStore = create<UserState>(set => ({
   ...initialState,
   setName: (name: string) => set({ name }),
   setEmail: (email: string) => set({ email }),
   reset: () => set(initialState),
}));
