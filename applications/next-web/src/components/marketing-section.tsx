import { cn } from "@/utils/cn";
import type { FC, HTMLProps, PropsWithChildren } from "react";

export const MarketingSection: FC<PropsWithChildren<HTMLProps<HTMLDivElement>>> = ({ children, className, ...props }) => {
  return (
    <section className={cn("flex flex-col items-center gap-2", className)} {...props}>
      {children}
    </section>
  )
}
