"use client";

import type { FC } from "react";
import { cn } from "@/utils/cn";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export const Toggle: FC<ToggleProps> = ({ checked, onChange, disabled }) => {
  return (
    <label className={cn("relative inline-flex items-center", disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <div
        className={cn(
          "w-9 h-5 rounded-full transition-colors duration-200",
          checked ? "bg-primary" : "bg-surface-skeleton"
        )}
      >
        <div
          className={cn(
            "absolute top-0.5 size-4 rounded-full bg-white shadow-xs transition-transform duration-200",
            checked ? "translate-x-[18px]" : "translate-x-0.5"
          )}
        />
      </div>
    </label>
  );
};
