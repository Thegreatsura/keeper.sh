import type { FC } from "react"
import { FlexRowGroup } from "@/components/flex-row-group"
import { Divider } from "@/components/divider"

export const OrDivider: FC = () => {
  return (
    <FlexRowGroup>
      <Divider />
      <span className="text-xs px-2 text-foreground-subtle">or</span>
      <Divider />
    </FlexRowGroup>
  )
}
