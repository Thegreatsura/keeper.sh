import { createFileRoute } from "@tanstack/react-router";
import useSWR from "swr";
import { ArrowDown, Calendar, AlertTriangle, CalendarPlus, CalendarArrowDown } from "lucide-react";
import { BackButton } from "../../../../components/ui/back-button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuItemIcon,
  NavigationMenuItemLabel,
  NavigationMenuItemTrailing,
} from "../../../../components/ui/navigation-menu";
import { Text } from "../../../../components/ui/text";

export const Route = createFileRoute("/(dashboard)/dashboard/calendars/")({
  component: RouteComponent,
});

interface Source {
  id: string;
  name: string;
  type: string;
  email?: string;
  url?: string;
  provider?: string;
}

interface Destination {
  id: string;
  provider: string;
  email: string | null;
  needsReauthentication: boolean;
}

const providerIcons: Record<string, string> = {
  google: "/integrations/icon-google.svg",
  outlook: "/integrations/icon-outlook.svg",
  icloud: "/integrations/icon-icloud.svg",
  fastmail: "/integrations/icon-fastmail.svg",
  "microsoft-365": "/integrations/icon-microsoft-365.svg",
};

const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

function ProviderIcon({ provider }: { provider?: string }) {
  const iconPath = provider ? providerIcons[provider] : undefined;

  if (!iconPath) {
    return <Calendar size={15} />;
  }

  return <img src={iconPath} alt="" width={15} height={15} />;
}

function RouteComponent() {
  const { data: sources = [] } = useSWR<Source[]>("/api/sources", fetcher);
  const { data: destinations = [] } = useSWR<Destination[]>("/api/destinations", fetcher);

  return (
    <div className="flex flex-col gap-1.5">
      <BackButton />
      <SourceList sources={sources} />
      <div className="flex justify-center py-1">
        <ArrowDown size={16} className="text-foreground-muted" />
      </div>
      <DestinationList destinations={destinations} />
    </div>
  );
}

function SourceList({ sources }: { sources: Source[] }) {
  return (
    <NavigationMenu>
      {sources.map((source) => (
        <NavigationMenuItem key={source.id}>
          <NavigationMenuItemIcon>
            <ProviderIcon provider={source.provider ?? source.type} />
            <NavigationMenuItemLabel>{source.name}</NavigationMenuItemLabel>
          </NavigationMenuItemIcon>
          <NavigationMenuItemTrailing>
            {source.email && <Text size="sm" tone="muted">{source.email}</Text>}
          </NavigationMenuItemTrailing>
        </NavigationMenuItem>
      ))}
      <NavigationMenuItem to="/dashboard/connect/source">
        <NavigationMenuItemIcon>
          <CalendarPlus size={15} />
          <NavigationMenuItemLabel>Add Source Calendar</NavigationMenuItemLabel>
        </NavigationMenuItemIcon>
        <NavigationMenuItemTrailing />
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

function DestinationList({ destinations }: { destinations: Destination[] }) {
  return (
    <NavigationMenu>
      {destinations.map((destination) => (
        <NavigationMenuItem key={destination.id}>
          <NavigationMenuItemIcon>
            <ProviderIcon provider={destination.provider} />
            <NavigationMenuItemLabel>
              {destination.email ?? destination.provider}
            </NavigationMenuItemLabel>
          </NavigationMenuItemIcon>
          <NavigationMenuItemTrailing>
            {destination.needsReauthentication && (
              <AlertTriangle size={14} className="text-amber-500" />
            )}
          </NavigationMenuItemTrailing>
        </NavigationMenuItem>
      ))}
      <NavigationMenuItem to="/dashboard/connect/destination">
        <NavigationMenuItemIcon>
          <CalendarArrowDown size={15} />
          <NavigationMenuItemLabel>Add Destination Calendar</NavigationMenuItemLabel>
        </NavigationMenuItemIcon>
        <NavigationMenuItemTrailing />
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
