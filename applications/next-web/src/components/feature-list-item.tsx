import type { FC, PropsWithChildren } from "react"
import { Check } from "lucide-react"
import { Copy } from "./copy"

export const FeatureListItem: FC<PropsWithChildren> = ({ children }) => {
  return (
    <li className="flex items-start gap-2">
      <Check className="shrink-0 mt-0.5 text-foreground" size={16} />
      <Copy>{children}</Copy>
    </li>
  )
}
