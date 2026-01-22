import type { FC, PropsWithChildren } from "react"
import { Button } from "@/components/button"

export const CalendarPermissionsConnectButton: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Button type="submit" className="w-full" variant="primary" size="normal">
      {children}
    </Button>
  )
}
