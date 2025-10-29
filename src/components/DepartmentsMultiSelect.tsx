import Field from "./Field";
import type { Option } from "../types";
import { ChevronDown } from "lucide-react";
import { useDepartmentsMultiSelect } from "../hooks/use-departments-multiselect";

type Props = {
  label: string;
  options: Option[];
  selected: Option[];
  onToggle: (o: Option) => void;
  className?: string;
};

export default function DepartmentsMultiSelect({
  label,
  options,
  selected,
  onToggle,
  className = "w-72",
}: Props) {
  const { open, setOpen, rootRef, selectedSet, orderedOptions, summary } = useDepartmentsMultiSelect({ options, selected });

  return (
    <Field label={label} className={className}>
      <div ref={rootRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between border border-[#E3E8EE] px-6 py-3.5 text-left font-rubik text-[14px] leading-5 tracking-[0.2px]"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={selected.length ? "text-[#1B2438]" : "text-[#5E626B]"}>
            {summary}
          </span>
          <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div
            role="listbox"
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto border border-[#E3E8EE] bg-white shadow-sm"
          >
            {orderedOptions.map((o, idx) => {
              const checked = selectedSet.has(o.value);
              const showDivider =
                idx > 0 &&
                selectedSet.has(orderedOptions[idx - 1].value) &&
                !checked;

              return (
                <div key={o.value}>
                  {showDivider && <div className="h-px bg-[#E3E8EE]" />}
                  <label className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(o)}
                      className="accent-black"
                    />
                    <span className="font-rubik text-[14px] leading-5 tracking-[0.2px] text-[#1B2438]">
                      {o.name}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Field>
  );
}
