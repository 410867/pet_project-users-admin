import { queryClient } from "../lib/queryClient";
import { loadUsers, saveUsers } from "../lib/storage";
import { USERS_SEED } from "../data/seed";
import type { UserItem } from "../types";

const QK = ["users"];

export async function getUsers(): Promise<UserItem[]> {
  await new Promise((r) => setTimeout(r, 250));
  return loadUsers<UserItem[]>(USERS_SEED);
}

export async function setUsers(next: UserItem[]): Promise<UserItem[]> {
  saveUsers(next);
  queryClient.setQueryData(QK, next);
  return next;
}

export function useUsersQuery() {
  return {
    key: QK,
    fetcher: () => getUsers(),
  };
}
