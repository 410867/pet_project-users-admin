import { useEffect } from "react";

export function useOutsideClose<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onClose: () => void
) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();

    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, ref]);
}
