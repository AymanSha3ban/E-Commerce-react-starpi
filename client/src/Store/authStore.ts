import type { IUser } from "@/interfaces/IUser";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartState } from "./CartStore";

export interface IAuthState {
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
  setUser: (user: IUser) => void;
  login: (token: string, user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setUser: (user) => {
        set({ user });
      },
      login: (token, user) => {
        set({
          token,
          user,
          isAuthenticated: true,
        });
        useCartState.getState().switchUser(user.documentId);
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
        useCartState.getState().switchUser(null);
      },
    }),
    {
      name: "auth-storage",
    }
  )
);