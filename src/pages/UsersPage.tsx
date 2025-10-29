import { useState } from "react";
import Field from "../components/Field";
import SelectField from "../components/SelectField";
import AddUserModal from "../components/AddUserModal";
import DepartmentsMultiSelect from "../components/DepartmentsMultiSelect";
import Th from "../components/table/Th";
import Td from "../components/table/Td";
import { Trash } from "lucide-react";
import { useUsersPage } from "../features/users/use-users-page";
import { DEPARTMENTS } from "../data/seed";

export default function UsersPage() {
  const {
    users,
    list,
    selectedDepts,
    country,
    status,
    departmentsEnabled,
    removeUser,
    addUser,
    toggleDept,
    resetFilters,
    setCountry,
    setStatus,
    COUNTRIES,
    STATUSES,
  } = useUsersPage();

  const [showAdd, setShowAdd] = useState(false);
  if (!users) return <p>Loading…</p>;

  return (
    <section className="border bg-white p-8">
      <h2 className="text-center tracking-[0.3em] font-semibold mb-8">USERS</h2>

      <div className="flex flex-wrap gap-3 items-end mb-4">
        <DepartmentsMultiSelect
          label={`Selected (${selectedDepts.length})`}
          options={DEPARTMENTS}
          selected={selectedDepts}
          onToggle={toggleDept}
        />

        {departmentsEnabled ? (
          <SelectField
            id="country"
            label="Country"
            value={country ?? undefined}
            options={COUNTRIES}
            onChange={setCountry}
            placeholder="Select country"
            className="min-w-56"
            selectClassName="px-6 py-3.5"
          />
        ) : (
          <Field label="Country" htmlFor="country" className="min-w-56">
            <select
              id="country"
              disabled
              className="w-full border border-[#E3E8EE] px-6 py-3.5 disabled:bg-slate-100"
              value=""
              onChange={() => {}}
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
        )}

        {departmentsEnabled ? (
          <SelectField
            id="status"
            label="All Statuses"
            value={status ?? undefined}
            options={STATUSES}
            onChange={(o) => setStatus(o)}
            placeholder="All statuses"
            className="min-w-56"
            selectClassName="px-6 py-3.5"
          />
        ) : (
          <Field label="All Statuses" htmlFor="status" className="min-w-56">
            <select
              id="status"
              disabled
              className="w-full border border-[#E3E8EE] px-6 py-3.5 disabled:bg-slate-100"
              value="ALL"
              onChange={() => {}}
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
        )}

        <button
          onClick={resetFilters}
          className="ml-auto px-3 py-2 border cursor-pointer"
          title="Reset filters"
        >
          <Trash />
        </button>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-slate-900 text-white cursor-pointer"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto border border-[#E3E8EE]">
        <table className="min-w-full text-sm">
          <thead className="h-[76px]">
            <tr className="border-b border-[#E3E8EE]">
              <Th className="pl-9">Full Name</Th>
              <Th>Department</Th>
              <Th>Country</Th>
              <Th>Status</Th>
              <Th className="pt-9" children={undefined} />
            </tr>
          </thead>
          <tbody>
            {list.map((u, i) => (
              <tr key={u.name + i} className="mx-9 h-20">
                <Td variant="name" className="w-[200px] pl-9">
                  {u.name}
                </Td>
                <Td variant="muted" className="w-[404px]">
                  {u.department.name}
                </Td>
                <Td variant="muted" className="w-[200px]">
                  {u.country.name}
                </Td>
                <Td variant="muted" className="w-[100px]">
                  {u.status.name}
                </Td>
                <Td className="text-right w-6 pr-9">
                  <button
                    onClick={() => removeUser(u)}
                    className="p-2 hover:bg-slate-100 rounded-full cursor-pointer"
                    aria-label="Delete"
                    title="Delete"
                  >
                    <Trash />
                  </button>
                </Td>
              </tr>
            ))}
            {!list.length && (
              <tr>
                <td
                  className="p-4 text-[#5E626B] font-rubik text-[14px] leading-5 tracking-[0.2px]"
                  colSpan={5}
                >
                  No users match filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddUserModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onAdd={(u) => {
          addUser(u);
          setShowAdd(false);
        }}
      />
    </section>
  );
}
