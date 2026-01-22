import { cn } from "@/utils/cn";
import type { FC } from "react"

type DividerProps = {
  className?: string;
}

export const Divider: FC<DividerProps> = ({ className }) => {
  return (
    <div className={cn("w-full h-px my-2 bg-[repeating-linear-gradient(to_right,transparent,transparent_4px,var(--color-border-elevated)_4px,var(--color-border-elevated)_calc(4px*2),transparent_calc(4px*2))]", className)} />
  )
}
