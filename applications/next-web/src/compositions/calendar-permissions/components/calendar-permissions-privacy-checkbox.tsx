"use client"

import type { FC } from "react"
import { Checkbox } from "@/components/checkbox"
import { Copy } from "@/components/copy"

type CalendarPermissionsPrivacyCheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const CalendarPermissionsPrivacyCheckbox: FC<CalendarPermissionsPrivacyCheckboxProps> = ({ checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Copy>Hide event details from Keeper</Copy>
    </label>
  )
}
