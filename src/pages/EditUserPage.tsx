import { useEffect, useMemo, useState } from "react";
import { COUNTRIES, DEPARTMENTS, STATUSES } from "../data/seed";
import type { UserItem } from "../types";
import { isChanged, patchUser } from "../features/users/editUser.logic";
import { useGetUsers } from "../hooks/use-get-users";
import { useSetUsers } from "../hooks/use-set-users";
import SelectField from "../components/SelectField";
import Field from "../components/Field";

export default function EditUserPage() {
  const { data: users } = useGetUsers();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const user = users?.[selectedIndex] ?? null;

  const [form, setForm] = useState<UserItem | null>(null);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const initial = useMemo(() => user, [user]);
  const changed = isChanged(form, initial);

  const saveMutation = useSetUsers(users, selectedIndex);

  const setField = (patch: Partial<UserItem>) =>
    setForm((f) => patchUser(f, patch));

  const onUndo = () => setForm(initial ?? null);
  const onSave = () => form && saveMutation.mutate(form);

  if (!users) return <p>Loading…</p>;

  return (
    <section className="border border-[#E3E8EE] bg-white p-8">
      <h2 className="text-center tracking-[0.3em] font-semibold mb-8">
        EDIT USER
      </h2>

      <div className="mb-8">
        <label className="block text-sm text-[#5E626B] font-medium mb-1">User</label>
        <select
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
          className="w-80 border border-[#E3E8EE] px-6 py-3.5"
        >
          {users.map((u, idx) => (
            <option key={u.name + idx} value={idx}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <h3 className="text-lg font-semibold mb-4">User Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Full Name">
          <input
            className="w-full border border-[#E3E8EE] px-6 py-3.5"
            value={form?.name ?? ""}
            onChange={(e) => setField({ name: e.target.value })}
          />
        </Field>

        <SelectField
          label="Department"
          value={form?.department}
          options={DEPARTMENTS}
          onChange={(v) => setField({ department: v })}
        />

        <SelectField
          label="Country"
          value={form?.country}
          options={COUNTRIES}
          onChange={(v) => setField({ country: v })}
        />

        <SelectField
          label="Status"
          value={form?.status}
          options={STATUSES.filter((s) => s.value !== "ALL")}
          onChange={(v) => setField({ status: v })}
        />
      </div>

      <div className="mt-8 flex gap-3 justify-end">
        {changed && (
          <button onClick={onUndo} className="px-4 py-3.5 w-[100px] border border-[#E3E8EE]">
            Undo
          </button>
        )}
        <button
          onClick={onSave}
          disabled={!changed || saveMutation.isPending}
          className={
            "px-4 py-3.5 w-[200px] " +
            (changed
              ? "bg-slate-900 text-white"
              : "bg-white text-[#C4C4C4] border border-[#E3E8EE] cursor-not-allowed")
          }
        >
          {saveMutation.isPending ? "Saving…" : "Save"}
        </button>
      </div>
    </section>
  );
}