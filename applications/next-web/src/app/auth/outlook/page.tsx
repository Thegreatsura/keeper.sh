import type { FC } from "react"
import { CalendarPermissionsPage } from "@/compositions/calendar-permissions/calendar-permissions-page"

const OutlookAuthPage: FC = () => {
  return (
    <CalendarPermissionsPage
      provider="outlook"
      providerName="Outlook"
      permissions={[
        "See your email address",
        "View a list of your calendars",
        "View events, summaries and details",
        "Add or remove calendar events"
      ]}
    />
  )
}

export default OutlookAuthPage;
