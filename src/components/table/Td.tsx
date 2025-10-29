import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "name" | "muted";
};

export default function Td({ children, className, variant = "muted" }: Props) {
  const base = "font-rubik text-[14px] leading-[20px] tracking-[0.2px]";
  const map = {
    name: "font-normal text-[#1B2438]",
    muted: "font-light text-[#5E626B]",
  } as const;
  return <td className={`${base} ${map[variant]} ${className ?? ""}`}>{children}</td>;
}
