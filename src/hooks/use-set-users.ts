import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setUsers } from "../api/users";
import type { UserItem } from "../types";
import { replaceUserAt } from "../features/users/editUser.logic";

export const useSetUsers = (users: UserItem[] | undefined, selectedIndex: number) => {
  const qc = useQueryClient();

  return useMutation<UserItem[], Error, UserItem>({
    mutationFn: async (payload) => {
      const base = users ?? [];
      const next = replaceUserAt(base, selectedIndex, payload);
      return setUsers(next);
    },
    onSuccess: (data) => {
      qc.setQueryData(["users"], data);
    },
  });
};
