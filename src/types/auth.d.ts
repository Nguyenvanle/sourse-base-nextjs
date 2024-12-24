import { User } from "~/types/user";

export interface AuthStore {
  user: User | null | undefined;
  accessToken: string | null | undefined;
  isLoading: boolean;
  error: Error | null | unknown;
  setState: (state: Partial<AuthStore>) => void;
}
