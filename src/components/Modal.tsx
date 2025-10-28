import React, { useEffect } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  disableClose?: boolean;
};

export default function Modal({
  open,
  onClose,
  children,
  className = "w-[640px]",
  disableClose,
}: ModalProps) {
  useEffect(() => {
    if (!open || disableClose) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, disableClose]);

  if (!open) return null;

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => !disableClose && onClose()}
      />
      <div
        className={`relative z-10 bg-white p-6 shadow-xl ${className}`}
      >
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
