"use client";

import { FC, useState } from "react";
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
import { Toggle } from "@/components/toggle";

const syncGroups = [
  { id: "1", name: "Work Availability" },
  { id: "2", name: "Family Shared" },
  { id: "3", name: "Side Projects" },
];
import { InlineNumberInput } from "@/components/inline-number-input";

export const SyncSettingsClient: FC<{ id: string }> = ({ id }) => {
  const [lookBack, setLookBack] = useState(14);
  const [lookAhead, setLookAhead] = useState(14);
  const [deleteOutOfRange, setDeleteOutOfRange] = useState(true);
  const [syncTitle, setSyncTitle] = useState(true);
  const [syncDescription, setSyncDescription] = useState(true);
  const [syncLocation, setSyncLocation] = useState(false);
  const [syncReminders, setSyncReminders] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton href={`/dashboard/sync-groups/${id}`} />

      <div className="px-1">
        <Heading4>Sync Settings</Heading4>
        <Copy>Configure how events are synced.</Copy>
      </div>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-visible p-0.5">
        <SyncGroupsPopover
          currentId={id}

          groups={syncGroups}

        />
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem>
          <NavigationItemIcon>
            <NavigationItemLabel>Look back</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <InlineNumberInput value={lookBack} onChange={setLookBack} />
            <Copy className="text-foreground-muted">days</Copy>
          </NavigationItemRightContent>
        </NavigationItem>

        <NavigationItem>
          <NavigationItemIcon>
            <NavigationItemLabel>Look ahead</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <InlineNumberInput value={lookAhead} onChange={setLookAhead} />
            <Copy className="text-foreground-muted">days</Copy>
          </NavigationItemRightContent>
        </NavigationItem>

        <NavigationItem>
          <NavigationItemIcon>
            <NavigationItemLabel>Delete out-of-range events</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Toggle checked={deleteOutOfRange} onChange={setDeleteOutOfRange} />
          </NavigationItemRightContent>
        </NavigationItem>
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem>
          <NavigationItemIcon>
            <NavigationItemLabel>Sync title</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Toggle checked={syncTitle} onChange={setSyncTitle} />
          </NavigationItemRightContent>
        </NavigationItem>

        <NavigationItem href={`/dashboard/sync-groups/${id}/settings/custom-title`}>
          <NavigationItemIcon>
            <NavigationItemLabel>Custom title</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Copy className="text-foreground-muted">Busy</Copy>
          </NavigationItemRightContent>
        </NavigationItem>

        <NavigationItem>
          <NavigationItemIcon>
            <NavigationItemLabel>Sync description</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Toggle checked={syncDescription} onChange={setSyncDescription} />
          </NavigationItemRightContent>
        </NavigationItem>

        <NavigationItem>
          <NavigationItemIcon>
            <NavigationItemLabel>Sync location</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Toggle checked={syncLocation} onChange={setSyncLocation} />
          </NavigationItemRightContent>
        </NavigationItem>

        <NavigationItem>
          <NavigationItemIcon>
            <NavigationItemLabel>Sync reminders</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Toggle checked={syncReminders} onChange={setSyncReminders} />
          </NavigationItemRightContent>
        </NavigationItem>
      </NavigationMenu>

      <KeeperLogo className="size-8 text-border self-center mt-8" />
    </div>
  );
};
