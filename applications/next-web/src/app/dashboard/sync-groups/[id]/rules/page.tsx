import { FC } from "react";
import { AlignJustify, Clock, Calendar, Sparkles, Repeat, UserX, EyeOff, Timer, Trash2, Plus } from "lucide-react";
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
import type { LucideIcon } from "lucide-react";

const syncGroups = [
  { id: "1", name: "Work Availability" },
  { id: "2", name: "Family Shared" },
  { id: "3", name: "Side Projects" },
];

const rules: { icon: LucideIcon; text: string; events: number }[] = [
  { icon: AlignJustify, text: "Exclude \"Appointment\"", events: 12 },
  { icon: AlignJustify, text: "Only \"Standup\"", events: 8 },
  { icon: Clock, text: "Only 9 AM – 5 PM", events: 47 },
  { icon: Calendar, text: "Weekdays only", events: 156 },
  { icon: Sparkles, text: "Exclude all-day events", events: 31 },
  { icon: Repeat, text: "Exclude recurring", events: 24 },
  { icon: UserX, text: "Exclude declined", events: 3 },
  { icon: EyeOff, text: "Exclude private", events: 9 },
  { icon: Sparkles, text: "Busy status only", events: 64 },
  { icon: Timer, text: "Min. 15 minutes", events: 5 },
];

const SyncRulesPage: FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton href={`/dashboard/sync-groups/${id}`} />

      <div className="px-1">
        <Heading4>Sync Rules</Heading4>
        <Copy>Rules that filter which events get synced.</Copy>
      </div>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-visible p-0.5">
        <SyncGroupsPopover
          currentId={id}

          groups={syncGroups}

        />
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        {rules.map((rule, i) => (
          <NavigationItem key={i}>
            <NavigationItemIcon>
              <rule.icon className="text-foreground-muted shrink-0" size={15} />
              <span className="text-sm font-medium tracking-tight text-foreground truncate">{rule.text}</span>
              <Copy className="text-foreground-muted text-xs shrink-0">{rule.events} events</Copy>
            </NavigationItemIcon>
            <NavigationItemRightContent>
              <button className="p-1 hover:bg-surface-muted rounded-lg cursor-pointer shrink-0">
                <Trash2 className="text-foreground-muted" size={15} />
              </button>
            </NavigationItemRightContent>
          </NavigationItem>
        ))}
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem href={`/dashboard/sync-groups/${id}/rules/add`}>
          <NavigationItemIcon>
            <Plus className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Add Rule</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>
      </NavigationMenu>

      <KeeperLogo className="size-8 text-border self-center mt-8" />
    </div>
  );
};

export default SyncRulesPage;
