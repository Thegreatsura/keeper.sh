import Image from "next/image";
import { FlexColumnGroup } from "@/components/flex-column-group";
import { FlexRowGroup } from "@/components/flex-row-group";
import type { FC } from "react";
import { Heading2, Heading3 } from "@/components/heading";
import { Copy } from "@/components/copy";
import { MicroCopy } from "@/components/micro-copy";
import { Ellipsis } from "lucide-react";
import { MarketingSection } from "@/components/marketing-section";

export const MarketingHowItWorks: FC = () => {
  return (
    <MarketingSection>
      <Heading3 className="text-center">Sync all your events</Heading3>
      <Copy className="text-center">Once your accounts and are connected and your calendars are configured, events will begin to transfer between them as configured.</Copy>
    </MarketingSection>
  )
}
