"use client"

import type { FC, InputHTMLAttributes } from "react"
import { cn } from "@/utils/cn"
import { Check } from "lucide-react"

export const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, checked, ...props }) => {
  return (
    <div className="relative inline-flex">
      <input
        type="checkbox"
        checked={checked}
        className="sr-only peer"
        {...props}
      />
      <div
        className={cn(
          "size-4 rounded border border-border shadow-xs bg-surface cursor-pointer",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-border-emphasis",
          "peer-checked:bg-border-emphasis peer-checked:border-border-emphasis",
          "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
          "flex items-center justify-center",
          className
        )}
      >
        {checked && <Check size={12} className="text-primary-foreground" strokeWidth={3} />}
      </div>
    </div>
  )
}
