import { useEffect, useMemo, useState } from "react";
import { COUNTRIES, STATUSES } from "../../data/seed";
import type { Option, UserItem } from "../../types";
import {
  applyUsersFilters,
  isDepartmentsEnabled,
  toggleOption,
} from "./users.logic";
import { useGetUsers } from "../../hooks/use-get-users";
import { useSetUserList } from "../../hooks/use-set-user-list";

export function useUsersPage() {
  const { data: users } = useGetUsers();
  const save = useSetUserList();

  const [selectedDepts, setSelectedDepts] = useState<Option[]>([]);
  const [country, setCountry] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option>(STATUSES[0]);

  const departmentsEnabled = isDepartmentsEnabled(selectedDepts);

  useEffect(() => {
    if (!departmentsEnabled) {
      setCountry(null);
      setStatus(STATUSES[0]);
    }
  }, [departmentsEnabled]);

  const list = useMemo(
    () =>
      applyUsersFilters(users, {
        selectedDepts,
        country,
        status,
      }),
    [users, selectedDepts, country, status]
  );

  const removeUser = (u: UserItem) => {
    if (!users) return;
    const copy = users.filter((x) => x !== u);
    save.mutate(copy);
  };

  const addUser = (u: UserItem) => {
    if (!users) return;
    save.mutate([...(users ?? []), u]);
  };

  const resetFilters = () => {
    setSelectedDepts([]);
    setCountry(null);
    setStatus(STATUSES[0]);
  };

  const toggleDept = (o: Option) =>
    setSelectedDepts((cur) => toggleOption(cur, o));

  return {
    users,
    list,

    selectedDepts,
    setSelectedDepts,
    country,
    setCountry,
    status,
    setStatus,
    departmentsEnabled,

    removeUser,
    addUser,
    toggleDept,
    resetFilters,

    COUNTRIES,
    STATUSES,
  };
}
