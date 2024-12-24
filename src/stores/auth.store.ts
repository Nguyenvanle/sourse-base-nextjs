import { create } from "zustand";

import { AuthStore } from "~/types";

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
  setState: (state) => set(state),
}));

export { useAuthStore };
