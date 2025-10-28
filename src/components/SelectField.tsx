import React from "react";
import Field from "./Field";
import type { Option } from "../types";

type SelectFieldProps = {
  label: string;
  value?: Option;
  options: Option[];
  onChange: (o: Option) => void;
  id?: string;
  placeholder?: string;
  className?: string;
  selectClassName?: string;
};

export default function SelectField({
  label,
  value,
  options,
  onChange,
  id,
  placeholder,
  className,
  selectClassName,
}: SelectFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = options.find((o) => o.value === e.target.value);
    if (found) onChange(found);
  };

  return (
    <Field label={label} htmlFor={id} className={className}>
      <select
        id={id}
        className={`w-full border border-[#E3E8EE] px-6 py-3.5 ${selectClassName ?? ""}`}
        value={value?.value ?? ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          {placeholder ?? `Select ${label.toLowerCase()}`}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.name}
          </option>
        ))}
      </select>
    </Field>
  );
}
