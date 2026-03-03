"use client";

import type { FC } from "react";
import { cn } from "@/utils/cn";

type InlineNumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

export const InlineNumberInput: FC<InlineNumberInputProps> = ({ value, onChange, className }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={cn(
        "rounded-lg bg-surface-subtle border border-border text-center text-sm px-2 py-0.5 w-12 focus-visible:outline-2 outline-offset-1 outline-border-emphasis",
        className
      )}
    />
  );
};
