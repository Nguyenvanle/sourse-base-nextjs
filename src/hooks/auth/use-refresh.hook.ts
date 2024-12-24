import { useAuthStore } from "~/stores";

import { refreshToken } from "~/utils";

const useRefreshAccessToken = () => {
  const setState = useAuthStore((state) => state.setState);

  const refreshAccessToken = async () => {
    setState({ isLoading: true, error: null });
    try {
      const token = await refreshToken();
      setState({ accessToken: token, isLoading: false });
    } catch (error) {
      setState({ error, isLoading: false });
    }
  };

  return refreshAccessToken;
};

export { useRefreshAccessToken };
