import React from "react";

type FieldProps = {
  label: string;
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  labelClassName?: string;
};

export default function Field({
  label,
  children,
  htmlFor,
  className = "",
  labelClassName = "",
}: FieldProps) {
  return (
    <div className={className}>
      <label
        className={`block text-sm font-medium mb-1 ${labelClassName}`}
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
