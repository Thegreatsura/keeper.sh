import { cn } from "@/utils/cn"
import { tv } from "tailwind-variants"
import type { FC, HTMLProps } from "react"

const microCopy = tv({
  base: "text-xs tracking-tight leading-relaxed text-foreground-secondary",
  variants: {
    inverted: {
      true: "text-neutral-500"
    }
  }
})

type MicroCopyProps = HTMLProps<HTMLParagraphElement> & {
  inverted?: boolean
}

export const MicroCopy: FC<MicroCopyProps> = ({ className, children, inverted, ...props }) => {
  return (
    <p {...props} className={cn(microCopy({ inverted }), className)}>{children}</p>
  )
}
