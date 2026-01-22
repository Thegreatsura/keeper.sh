import type { FC } from "react"
import Image from "next/image"
import { ArrowLeftRight } from "lucide-react"

type CalendarPermissionsIconPairProps = {
  provider: "google" | "outlook"
}

export const CalendarPermissionsIconPair: FC<CalendarPermissionsIconPairProps> = ({ provider }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="size-14 rounded-xl border border-border shadow-xs bg-surface p-1 flex items-center justify-center">
        <Image
          src="/icon.svg"
          alt="Keeper"
          width={40}
          height={40}
          className="w-full h-full rounded-lg"
        />
      </div>
      <ArrowLeftRight size={20} className="text-foreground-subtle" />
      <div className="size-14 rounded-xl border border-border shadow-xs bg-surface p-1 flex items-center justify-center">
        <Image
          src={`/integrations/icon-${provider}.svg`}
          alt={provider === "google" ? "Google" : "Outlook"}
          width={40}
          height={40}
          className="w-full h-full rounded-lg p-3"
        />
      </div>
    </div>
  )
}
