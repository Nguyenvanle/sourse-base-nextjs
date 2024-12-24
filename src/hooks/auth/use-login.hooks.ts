import { useAuthStore } from "~/stores";

import { getAccessToken } from "~/utils";

const useLogin = () => {
  const setState = useAuthStore((state) => state.setState);

  const login = async () => {
    setState({ isLoading: true, error: null });
    try {
      const token = await getAccessToken();
      setState({
        user: {
          name: "John Doe",
          id: "1234",
          avatar: "https://avatars.githubusercontent.com/u/139426?s=60&v=4",
          createdAt: new Date().toISOString(),
        }, // Fake user
        accessToken: token,
        isLoading: false,
      });
    } catch (error) {
      setState({ error, isLoading: false });
    }
  };

  return login;
};

export { useLogin };
