import { ENDPOINTS } from "~/constants";

import { User, UserCreate, UserUpdate } from "~/types";

import { apiClient } from "~/libs";

const userService = {
  getUsers: () => apiClient.get<User[]>(ENDPOINTS.users),

  createUser: (userData: UserCreate) =>
    apiClient.post<User>(ENDPOINTS.users, userData),

  updateUser: (id: string, userData: UserUpdate) =>
    apiClient.put<User>(`${ENDPOINTS.users}/${id}`, userData),

  deleteUser: (id: string) => apiClient.delete(`${ENDPOINTS.users}/${id}`),
};

export { userService };
