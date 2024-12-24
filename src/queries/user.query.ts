import { useQuery } from "@tanstack/react-query";

import { userService } from "~/services";

import { createQueryKeys } from "~/libs";

function useUserQuery() {
  const userKey = createQueryKeys("users");
  const { data: users } = useQuery({
    queryKey: userKey.all,
    queryFn: userService.getUsers,
  });

  return { users, userKey };
}

export { useUserQuery };
