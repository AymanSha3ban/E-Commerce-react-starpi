import type { IUser } from "@/interfaces/IUser";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IAuthState {
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;

  login: (token: string, user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: (token, user) => {
        set({
          token,
          user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);