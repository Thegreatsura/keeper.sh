import type { FC } from "react"
import { ArrowLeft } from "lucide-react"
import { LinkButton } from "@/components/button"

type CalendarPermissionsBackButtonProps = {
  href: string
}

export const CalendarPermissionsBackButton: FC<CalendarPermissionsBackButtonProps> = ({ href }) => {
  return (
    <LinkButton href={href} variant="border" size="normal" className="px-3.5 mr-2">
      <ArrowLeft size={17} />
    </LinkButton>
  )
}
