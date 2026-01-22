import type { FC, PropsWithChildren } from "react"

export const FeatureList: FC<PropsWithChildren> = ({ children }) => {
  return <ul className="space-y-2">{children}</ul>
}
