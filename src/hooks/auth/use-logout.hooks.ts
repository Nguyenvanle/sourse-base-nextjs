import { useAuthStore } from "~/stores";

import { clearTokens } from "~/utils";

const useLogout = () => {
  const setState = useAuthStore((state) => state.setState);

  const logout = () => {
    setState({ isLoading: true });
    clearTokens();
    setState({ user: null, accessToken: null, isLoading: false });
  };

  return logout;
};

export default useLogout;
