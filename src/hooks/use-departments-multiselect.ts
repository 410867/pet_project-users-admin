import { useMemo, useRef, useState } from "react";
import { useOutsideClose } from "./use-outside-close";
import type { Option } from "../types";

export type UseDepartmentsMultiSelectArgs = {
  options: Option[];
  selected: Option[];
};

export function useDepartmentsMultiSelect({ options, selected }: UseDepartmentsMultiSelectArgs) {
  const [open, setOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClose(rootRef, () => setOpen(false));

  const selectedSet = useMemo(() => new Set(selected.map(s => s.value)), [selected]);

  const orderedOptions = useMemo(() => {
    const sel = options.filter(o => selectedSet.has(o.value));
    const rest = options.filter(o => !selectedSet.has(o.value));
    return [...sel, ...rest];
  }, [options, selectedSet]);

  const summary = selected.length === 0 ? "Department" : `Selected (${selected.length})`;

  return { open, setOpen, rootRef, selectedSet, orderedOptions, summary };
}
