import React from "react";

type Props = { children: React.ReactNode; className?: string };
export default function Th({ children, className }: Props) {
  return (
    <th
      className={
        "text-left font-medium font-rubik text-[14px] leading-5 tracking-[0.2px] text-[#1B2438] " +
        (className ?? "")
      }
    >
      {children}
    </th>
  );
}
