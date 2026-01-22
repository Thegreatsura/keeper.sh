import type { FC } from "react"
import { FeatureList } from "@/components/feature-list"
import { FeatureListItem } from "@/components/feature-list-item"

type CalendarPermissionsListProps = {
  items: string[]
}

export const CalendarPermissionsList: FC<CalendarPermissionsListProps> = ({ items }) => {
  return (
    <FeatureList>
      {items.map((item, index) => (
        <FeatureListItem key={index}>{item}</FeatureListItem>
      ))}
    </FeatureList>
  )
}
