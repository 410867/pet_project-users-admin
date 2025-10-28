import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setUsers } from "../api/users";
import type { UserItem } from "../types";

/** Saves whole users array and updates cache. */
export const useSetUserList = () => {
  const qc = useQueryClient();
  return useMutation<UserItem[], Error, UserItem[]>({
    mutationFn: (next) => setUsers(next),
    onSuccess: (data) => {
      qc.setQueryData(["users"], data);
    },
  });
};
