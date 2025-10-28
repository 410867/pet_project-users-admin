const KEY = "users-admin/users";

export function loadUsers<T>(fallback: T): T {
  const s = localStorage.getItem(KEY);
  return s ? (JSON.parse(s) as T) : fallback;
}
export function saveUsers<T>(data: T) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
