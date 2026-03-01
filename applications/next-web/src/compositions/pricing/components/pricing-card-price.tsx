import { MicroCopy } from "@/components/micro-copy"
import { cn } from "@/utils/cn"
import { tv } from "tailwind-variants"
import { Lora } from "next/font/google"
import type { FC } from "react"

const lora = Lora()

const priceText = tv({
  base: "text-3xl font-medium tracking-tighter text-foreground",
  variants: {
    inverted: {
      true: "text-primary-foreground"
    }
  }
})

type PricingCardPriceProps = {
  price: string
  inverted?: boolean
}

export const PricingCardPrice: FC<PricingCardPriceProps> = ({ price, inverted }) => {
  return (
    <div className="flex items-baseline gap-1">
      <span className={cn(lora.className, priceText({ inverted }))}>{price}</span>
      <MicroCopy inverted={inverted} className={inverted ? "text-neutral-500" : "text-foreground-subtle"}>per month</MicroCopy>
    </div>
  )
}
