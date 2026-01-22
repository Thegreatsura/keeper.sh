import type { FC, PropsWithChildren } from "react"
import Link from "next/link"
import { Copy } from "@/components/copy"

type CalendarPermissionsSkipLinkProps = {
  href: string
}

export const CalendarPermissionsSkipLink: FC<PropsWithChildren<CalendarPermissionsSkipLinkProps>> = ({ href, children }) => {
  return (
    <Link href={href} className="text-center hover:underline pt-2">
      <Copy>{children}</Copy>
    </Link>
  )
}
