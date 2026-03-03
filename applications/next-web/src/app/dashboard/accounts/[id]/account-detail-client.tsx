"use client";

import { FC } from "react";
import Image from "next/image";
import { ArrowUpRight, RefreshCw, Trash2 } from "lucide-react";
import KeeperLogo from "@/assets/keeper.svg";
import { Heading4 } from "@/components/heading";
import { DashboardBackButton } from "@/components/dashboard-back-button";
import {
  NavigationMenu,
  NavigationItem,
  NavigationItemIcon,
  NavigationItemLabel,
  NavigationItemRightContent,
} from "@/components/navigation-menu";
import { Copy } from "@/components/copy";

const calendars = [
  { name: "Personal", events: 24 },
  { name: "Business", events: 22 },
];

export const AccountDetailClient: FC<{ id: string }> = ({ id }) => {
  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton />

      <div className="px-1">
        <Heading4>Account</Heading4>
        <Copy>Manage calendars and connection settings.</Copy>
      </div>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem>
          <NavigationItemIcon>
            <Image width={15} height={15} src="/integrations/icon-google.svg" alt="" />
            <NavigationItemLabel>alex@example.com</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Copy className="text-foreground-muted">{calendars.length} calendars</Copy>
          </NavigationItemRightContent>
        </NavigationItem>
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        {calendars.map((cal) => (
          <NavigationItem key={cal.name} href={`/dashboard/accounts/${id}/${encodeURIComponent(cal.name.toLowerCase())}`}>
            <NavigationItemIcon>
              <NavigationItemLabel>{cal.name}</NavigationItemLabel>
            </NavigationItemIcon>
            <NavigationItemRightContent>
              <Copy className="text-foreground-muted">{cal.events} events</Copy>
            </NavigationItemRightContent>
          </NavigationItem>
        ))}
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem onClick={() => {}}>
          <NavigationItemIcon>
            <RefreshCw className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Re-authenticate</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <ArrowUpRight className="text-foreground-muted" size={15} />
          </NavigationItemRightContent>
        </NavigationItem>
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem onClick={() => {}}>
          <NavigationItemIcon>
            <Trash2 className="text-red-500" size={15} />
            <NavigationItemLabel className="text-red-500">Disconnect account</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>
      </NavigationMenu>

      <KeeperLogo className="size-8 text-border self-center mt-8" />
    </div>
  );
};
