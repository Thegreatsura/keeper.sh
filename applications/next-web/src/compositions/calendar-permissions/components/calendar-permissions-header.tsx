import type { FC, PropsWithChildren } from "react"
import { Heading2 } from "@/components/heading"

export const CalendarPermissionsHeader: FC<PropsWithChildren> = ({ children }) => {
  return <Heading2>{children}</Heading2>
}
