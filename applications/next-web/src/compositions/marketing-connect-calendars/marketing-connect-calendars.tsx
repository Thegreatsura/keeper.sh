import Image from "next/image";
import { FlexColumnGroup } from "@/components/flex-column-group";
import { FlexRowGroup } from "@/components/flex-row-group";
import type { FC } from "react";
import { Heading2, Heading3 } from "@/components/heading";
import { Copy } from "@/components/copy";
import { MicroCopy } from "@/components/micro-copy";
import { Ellipsis } from "lucide-react";
import { MarketingSection } from "@/components/marketing-section";

type MarketingCalendarAppIconProps = {
  /**
   * Application name which is used to construct
   * the alt tag for the image
   */
  name: string;
  src: string;
}

const MarketingCalendarAppIcon: FC<MarketingCalendarAppIconProps> = ({ name, src }) => {
  return (
    <Image className="filter-[drop-shadow(0px_2px_2px_rgba(0,0,0,0.2))]" alt={`${name} app icon`} width={48} height={48} src={src} />
  )
}

export const MarketingConnectCalendars: FC = () => {
  return (
    <MarketingSection>
      <FlexRowGroup className="justify-center">
        <ul className="contents *:-mx-1.5">
          <li>
            <MarketingCalendarAppIcon name="Apple Calendar" src="/app-icons/app-apple-calendar.webp" />
          </li>
          <li>
            <MarketingCalendarAppIcon name="Google Calendar" src="/app-icons/app-google-calendar.webp" />
          </li>
          <li>
            <MarketingCalendarAppIcon name="Microsoft Outlook" src="/app-icons/app-microsoft-outlook.webp" />
          </li>
          <li>
            <MarketingCalendarAppIcon name="Fastmail" src="/app-icons/app-fastmail.webp" />
          </li>
        </ul>
      </FlexRowGroup>
      <Heading3 className="text-center">Connect all your accounts</Heading3>
      <Copy className="text-center">Keeper supports the most providers to make sure that whether you&apos;re connecting to a work, personal or business-personal calendar, you&apos;re covered.</Copy>
    </MarketingSection>
  )
}
