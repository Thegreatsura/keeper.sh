import type { FC } from "react"
import { MicroCopy } from "@/components/micro-copy"
import { InlineLink } from "@/components/inline-link"

export const FormFooter: FC = () => {
  return (
    <MicroCopy className="text-center">
      <span>No account yet? </span>
      <InlineLink href="/blayground/register">Register</InlineLink>
    </MicroCopy>
  )
}
