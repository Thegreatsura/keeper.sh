import { Heading3 } from "@/components/heading"
import { MicroCopy } from "@/components/micro-copy"
import { Copy } from "@/components/copy"
import { LinkButton } from "@/components/button"
import { FlexColumnGroup } from "@/components/flex-column-group"
import { PricingCardPrice } from "@/compositions/pricing/components/pricing-card-price"
import type { FC } from "react"
import type { PricingPlan } from "@/compositions/pricing/constants/plans"

type PricingCardProps = {
  plan: PricingPlan
}

export const PricingCard: FC<PricingCardProps> = ({ plan }) => {
  return (
    <div className="border border-border rounded-2xl p-3 pt-5 flex flex-col shadow-xs">
      <FlexColumnGroup className="px-2">
        <FlexColumnGroup>
          <Heading3>{plan.name}</Heading3>
          <FlexColumnGroup className="gap-1">
            <PricingCardPrice price={plan.price} />
            {plan.priceNote && <MicroCopy className="text-foreground-subtle">{plan.priceNote}</MicroCopy>}
          </FlexColumnGroup>
        </FlexColumnGroup>
        <Copy className="py-4">{plan.description}</Copy>
      </FlexColumnGroup>

      <LinkButton
        href={plan.buttonHref}
        variant="border"
        className="w-full justify-center mt-auto"
      >
        {plan.buttonText}
      </LinkButton>
    </div>
  )
}

export const HighlightedPricingCard: FC<PricingCardProps> = ({ plan }) => {
  return (
    <div className="bg-primary border border-neutral-800 rounded-2xl p-3 pt-5 flex flex-col shadow-xs">
      <FlexColumnGroup className="px-2">
        <FlexColumnGroup>
          <Heading3 inverted>{plan.name}</Heading3>
          <FlexColumnGroup className="gap-1">
            <PricingCardPrice price={plan.price} inverted />
            {plan.priceNote && <MicroCopy inverted className="text-neutral-500">{plan.priceNote}</MicroCopy>}
          </FlexColumnGroup>
        </FlexColumnGroup>
        <Copy inverted className="py-4">{plan.description}</Copy>
      </FlexColumnGroup>

      <LinkButton
        href={plan.buttonHref}
        variant="border"
        className="w-full justify-center mt-auto"
      >
        {plan.buttonText}
      </LinkButton>
    </div>
  )
}
