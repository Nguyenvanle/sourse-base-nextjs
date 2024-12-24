import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userService } from "~/services";

import { User, UserCreate, UserUpdate } from "~/types";

import { useToast } from "~/hooks";

import { useUserQuery } from "~/queries";

function useUser(userId?: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query users
  const { users } = useUserQuery();

  // Create user mutation
  const createUser = useMutation({
    mutationFn: (user: UserCreate) => userService.createUser(user),
    onSuccess: (newUser) => {
      queryClient.setQueryData<User[]>(["users"], (old = []) => [
        ...old,
        newUser,
      ]);
      toast({
        title: "User created successfully",
        description: "The user has been created successfully",
      });
    },
    onError: (error: Error) => {
      console.error(`Error while creating user: ${error.message}`);
      toast({
        title: "Error while creating user",
        description:
          "An error occurred while creating the user, please try again later",
      });
    },
  });

  // Update user mutation
  const updateUser = useMutation({
    mutationFn: ({ id, user }: { id: string; user: UserUpdate }) =>
      userService.updateUser(id, user),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<User[]>(["users"], (old = []) =>
        old.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      toast({
        title: "User updated successfully",
        description: "The user has been updated successfully",
      });
    },
    onError: (error: Error) => {
      console.error(`Error while updating user: ${error.message}`);
      toast({
        title: "Error while updating user",
        description:
          "An error occurred while updating the user, please try again later",
      });
    },
  });

  // Delete user mutation
  const deleteUser = useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<User[]>(["users"], (old = []) =>
        old.filter((user) => user.id !== id)
      );
      toast({
        title: "User deleted successfully",
        description: "The user has been deleted successfully",
      });
    },
    onError: (error: Error) => {
      console.error(`Error while deleting user: ${error.message}`);
      toast({
        title: "Error while deleting user",
        description:
          "An error occurred while deleting the user, please try again later",
      });
    },
  });

  return {
    user: userId ? users?.find((user) => user.id === userId) : undefined,
    users,
    createUser,
    updateUser,
    deleteUser,
  };
}

export { useUser };
