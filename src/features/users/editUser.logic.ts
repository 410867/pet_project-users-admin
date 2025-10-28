import type { UserItem } from "../../types";

export const isSameUser = (
  a: UserItem | null | undefined,
  b: UserItem | null | undefined
) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

export const isChanged = (form: UserItem | null, initial: UserItem | null) =>
  !isSameUser(form, initial);

export const patchUser = (user: UserItem | null, patch: Partial<UserItem>) =>
  user ? { ...user, ...patch } : user;

export const replaceUserAt = (
  list: UserItem[],
  index: number,
  next: UserItem
): UserItem[] => {
  const copy = list.slice();
  copy[index] = next;
  return copy;
};
