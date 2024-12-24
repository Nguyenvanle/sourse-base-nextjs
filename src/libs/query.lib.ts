import { QueryClient } from "@tanstack/react-query";

import { Endpoints } from "~/types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
      refetchOnWindowFocus: false,
      staleTime: 1 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

const createQueryKeys = (endpoint: Endpoints) => {
  return {
    all: [endpoint],
    details: (id: string) => [endpoint, id],
    pages: (page: number) => [endpoint, page],
  };
};

export { createQueryKeys, queryClient };
