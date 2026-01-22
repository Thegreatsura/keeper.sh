import type { FC } from "react"
import { CalendarPermissionsPage } from "@/compositions/calendar-permissions/calendar-permissions-page"

const GoogleAuthPage: FC = () => {
  return (
    <CalendarPermissionsPage
      provider="google"
      providerName="Google"
      permissions={[
        "See your email address",
        "View a list of your calendars",
        "View events, summaries and details",
        "Add or remove calendar events"
      ]}
    />
  )
}

export default GoogleAuthPage;
