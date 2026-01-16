import type { FC } from "react"
import Image from "next/image"
import { LinkButton } from "@/components/button"

type OAuthLinkButtonProps = {
  provider: string
  icon: string
  href: string
}

export const OAuthLinkButton: FC<OAuthLinkButtonProps> = ({ provider, icon, href }) => {
  return (
    <LinkButton href={href} className="w-full" variant="border">
      <Image alt={`${provider} icon`} width={17} height={17} src={icon} />
      Sign in with {provider}
    </LinkButton>
  )
}
