import { cn } from "@/utils/cn"
import { tv } from "tailwind-variants"
import type { FC, HTMLProps } from "react"

const copy = tv({
  base: "tracking-tight leading-relaxed text-sm text-foreground-secondary",
  variants: {
    inverted: {
      true: "text-neutral-400"
    }
  }
})

type CopyProps = HTMLProps<HTMLParagraphElement> & {
  inverted?: boolean
}

export const Copy: FC<CopyProps> = ({ className, children, inverted, ...props }) => {
  return (
    <p {...props} className={cn(copy({ inverted }), className)}>{children}</p>
  )
}
