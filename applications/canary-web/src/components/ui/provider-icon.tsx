import { Calendar, Link as LinkIcon } from "lucide-react";
import { providerIcons } from "../../lib/providers";

interface ProviderIconProps {
  provider?: string;
  calendarType?: string;
  size?: number;
}

function resolveIconPath(provider: string | undefined): string | undefined {
  if (provider) return providerIcons[provider];
  return undefined;
}

function ProviderIcon({ provider, calendarType, size = 15 }: ProviderIconProps) {
  if (calendarType === "ical" || provider === "ics") {
    return <LinkIcon size={size} />;
  }

  const iconPath = resolveIconPath(provider);

  if (!iconPath) {
    return <Calendar size={size} />;
  }

  return <img src={iconPath} alt="" width={size} height={size} />;
}

export { ProviderIcon };
