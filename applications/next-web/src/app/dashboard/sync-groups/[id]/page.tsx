import { FC } from "react";
import Image from "next/image";
import { ArrowDown, Check, Plus, Send, SlidersHorizontal } from "lucide-react";
import KeeperLogo from "@/assets/keeper.svg";
import { DashboardBackButton } from "@/components/dashboard-back-button";
import {
  NavigationMenu,
  NavigationItem,
  NavigationItemIcon,
  NavigationItemLabel,
  NavigationItemRightContent,
} from "@/components/navigation-menu";
import { Copy } from "@/components/copy";
import { Heading4 } from "@/components/heading";
import { SyncGroupsPopover } from "@/components/sync-groups-popover";

const syncGroups = [
  { id: "1", name: "Work Availability" },
  { id: "2", name: "Family Shared" },
  { id: "3", name: "Side Projects" },
];

const sourceCalendars = [
  { name: "Personal", email: "alex@fastmail.com", icon: "/integrations/icon-fastmail.svg", events: 24 },
  { name: "Work", email: "jane@company.com", icon: "/integrations/icon-google.svg", events: 156 },
  { name: "TV Releases", email: "john@icloud.com", icon: "/integrations/icon-icloud.svg", events: 61 },
  { name: "Movie Releases", email: "john@icloud.com", icon: "/integrations/icon-icloud.svg", events: 61 },
];

const destinationCalendar = {
  name: "Availability",
  email: "jane@company.com",
  icon: "/integrations/icon-google.svg",
  events: 89,
};

const SyncGroupDetailPage: FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton />

      <div className="px-1">
        <Heading4>Calendars</Heading4>
        <Copy>Source and destination calendars for this sync group.</Copy>
      </div>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-visible p-0.5">
        <SyncGroupsPopover
          currentId={id}

          groups={syncGroups}

        />
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem href={`/dashboard/sync-groups/${id}/rules`}>
          <NavigationItemIcon>
            <Send className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Sync Rules</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Copy className="text-foreground-muted">3 rules</Copy>
          </NavigationItemRightContent>
        </NavigationItem>

        <NavigationItem href={`/dashboard/sync-groups/${id}/settings`}>
          <NavigationItemIcon>
            <SlidersHorizontal className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Sync Settings</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>
      </NavigationMenu>

      <div className="flex justify-center py-1">
        <ArrowDown className="text-foreground-muted" size={15} />
      </div>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        {sourceCalendars.map((cal) => (
          <NavigationItem key={`${cal.name}-${cal.email}`}>
            <NavigationItemIcon>
              <Image width={16} height={16} src={cal.icon} alt="" />
              <span className="text-sm font-medium tracking-tight text-foreground">{cal.name}</span>
              <Copy className="text-foreground-muted text-xs">{cal.email}</Copy>
            </NavigationItemIcon>
            <NavigationItemRightContent>
              <Copy className="text-foreground-muted text-xs">{cal.events} events</Copy>
              <Check className="text-foreground-muted" size={15} />
            </NavigationItemRightContent>
          </NavigationItem>
        ))}
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem>
          <NavigationItemIcon>
            <Plus className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Add Source Calendar</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>
      </NavigationMenu>

      <div className="flex justify-center py-1">
        <ArrowDown className="text-foreground-muted" size={15} />
      </div>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem>
          <NavigationItemIcon>
            <Image width={16} height={16} src={destinationCalendar.icon} alt="" />
            <span className="text-sm font-medium tracking-tight text-foreground">{destinationCalendar.name}</span>
            <Copy className="text-foreground-muted text-xs">{destinationCalendar.email}</Copy>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Copy className="text-foreground-muted text-xs">{destinationCalendar.events} events</Copy>
            <Check className="text-foreground-muted" size={15} />
          </NavigationItemRightContent>
        </NavigationItem>
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem>
          <NavigationItemIcon>
            <Plus className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Add Destination Calendar</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>
      </NavigationMenu>

      <KeeperLogo className="size-8 text-border self-center mt-8" />
    </div>
  );
};

export default SyncGroupDetailPage;
