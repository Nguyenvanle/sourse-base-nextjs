const getAccessToken = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("7ac315e0-3d23-4cd6-ba21-9ec9d9ced63a"); // This is a fake token
    }, 1000);
  });
};

const refreshToken = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("7ac315e0-3d23-4cd6-ba21-9ec9d9ced63a"); // This is a fake token
    }, 1000);
  });
};

const clearTokens = () => {
  setTimeout(() => {
    return;
  }, 100);
};

export { clearTokens, getAccessToken, refreshToken };
