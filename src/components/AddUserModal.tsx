import { useState } from "react";
import Modal from "./Modal";
import Field from "./Field";
import SelectField from "./SelectField";
import { COUNTRIES, DEPARTMENTS, STATUSES } from "../data/seed";
import type { Option, UserItem } from "../types";

type AddUserModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (u: UserItem) => void;
};

export default function AddUserModal({
  open,
  onClose,
  onAdd,
}: AddUserModalProps) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState<Option | null>(null);
  const [country, setCountry] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);

  const canAdd = !!(name && department && country && status);

  const resetAndClose = () => {
    setName("");
    setDepartment(null);
    setCountry(null);
    setStatus(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={resetAndClose}
      className="w-[640px] flex flex-col items-center gap-15"
    >
      <h3 className="text-center tracking-[0.3em] font-semibold mb-6">
        ADD USER
      </h3>

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <Field label="Full Name" htmlFor="name" className="flex-1">
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#E3E8EE] px-6 py-3"
              placeholder="Enter full name"
            />
          </Field>

          <SelectField
            id="dept"
            label="Department"
            value={department ?? undefined}
            options={DEPARTMENTS}
            onChange={setDepartment}
            placeholder="Select department"
            className="w-full flex-1"
          />
        </div>

        <div className="flex flex-row gap-4">
          <SelectField
            id="country"
            label="Country"
            value={country ?? undefined}
            options={COUNTRIES}
            onChange={setCountry}
            placeholder="Select country"
            className="w-full flex-1"
          />

          <SelectField
            id="status"
            label="Status"
            value={status ?? undefined}
            options={STATUSES.filter((s) => s.value !== "ALL")}
            onChange={setStatus}
            placeholder="Select status"
            className="w-full flex-1"
          />
        </div>
      </div>

      <div className="mt-6 w-full flex justify-end gap-3">
        <button
          onClick={resetAndClose}
          className="px-4 py-2.75 border border-[#C4C4C4] w-[100px]"
        >
          Cancel
        </button>
        <button
          disabled={!canAdd}
          onClick={() => {
            onAdd({
              name,
              department: department!,
              country: country!,
              status: status!,
            });
            resetAndClose();
          }}
          className={
            "px-4 py-2.75 border w-[150px] " +
            (canAdd
              ? "bg-slate-900 text-white"
              : "bg-white text-[#C4C4C4] border border-[#E3E8EE] cursor-not-allowed")
          }
        >
          Add
        </button>
      </div>
    </Modal>
  );
}
