import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users";
import type { UserItem } from "../types";

export const useGetUsers = () =>
  useQuery<UserItem[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
