import type { Option, UserItem } from "../../types";

export type UsersFilters = {
  selectedDepts: Option[];
  country: Option | null;
  status: Option;
};

export const isDepartmentsEnabled = (selectedDepts: Option[]) =>
  selectedDepts.length >= 3;

export const toggleOption = (list: Option[], o: Option): Option[] => {
  return list.find((x) => x.value === o.value) ? list.filter((x) => x.value !== o.value) : [...list, o];
}

export const applyUsersFilters = (
  users: UserItem[] | undefined,
  filters: UsersFilters
): UserItem[] => {
  if (!users) return [];

  const { selectedDepts, country, status } = filters;

  let list = users;
  if (selectedDepts.length) {
    const allow = new Set(selectedDepts.map((d) => d.value));
    list = list.filter((u) => allow.has(u.department.value));
  }

  const enabled = isDepartmentsEnabled(selectedDepts);
  if (enabled && country) {
    list = list.filter((u) => u.country.value === country.value);
  }
  
  if (enabled && status.value !== "ALL") {
    list = list.filter((u) => u.status.value === status.value);
  }

  return list;
};
