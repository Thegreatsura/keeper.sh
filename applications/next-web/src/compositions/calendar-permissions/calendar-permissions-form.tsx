"use client"

import type { FC, FormEvent } from "react"
import { FlexRowGroup } from "@/components/flex-row-group"
import { CalendarPermissionsConnectButton } from "./components/calendar-permissions-connect-button"
import { CalendarPermissionsBackButton } from "./components/calendar-permissions-back-button"

type CalendarPermissionsFormProps = {
  provider: string
  backHref?: string
}

export const CalendarPermissionsForm: FC<CalendarPermissionsFormProps> = ({ provider, backHref = "/login" }) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    // TODO: Handle form submission
    console.log({ provider })
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      <FlexRowGroup className="items-stretch">
        <CalendarPermissionsBackButton href={backHref} />
        <CalendarPermissionsConnectButton>Connect</CalendarPermissionsConnectButton>
      </FlexRowGroup>
    </form>
  )
}
