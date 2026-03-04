import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import useSWR from "swr";
import { CalendarPlus, CalendarSync, CalendarDays, Settings, Sparkles, LogOut, Bell, Eye } from "lucide-react";
import { signOut } from "../../../lib/auth";
import KeeperLogo from "../../../assets/keeper.svg?react";
import { EventGraph } from "../../../components/dashboard/event-graph";
import { ProviderIcon } from "../../../components/ui/provider-icon";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuItemIcon,
  NavigationMenuItemLabel,
  NavigationMenuItemTrailing,
  NavigationMenuCheckboxItem,
  NavigationMenuToggleItem,
} from "../../../components/ui/navigation-menu";
import { Text } from "../../../components/ui/text";

export const Route = createFileRoute("/(dashboard)/dashboard/")({
  component: RouteComponent,
});

interface CalendarAccount {
  id: string;
  provider: string;
  displayName: string | null;
  email: string | null;
  authType: string;
  needsReauthentication: boolean;
  calendarCount: number;
  createdAt: string;
}

const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

function RouteComponent() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/login" });
  };
  const [notifications, setNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const { data: accountsData } = useSWR<CalendarAccount[]>("/api/accounts", fetcher);
  const accounts = accountsData ?? [];
  const hasCalendars = accounts.some((account) => account.calendarCount > 0);

  return (
    <div className="flex flex-col gap-4">
      <EventGraph />
      <div className="flex flex-col gap-1.5">
        <NavigationMenu>
          <NavigationMenuItem to="/dashboard/connect">
            <NavigationMenuItemIcon>
              <CalendarPlus size={15} />
              <NavigationMenuItemLabel>Link Calendar</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
            <NavigationMenuItemTrailing />
          </NavigationMenuItem>
        </NavigationMenu>
        {accounts.length > 0 && (
          <NavigationMenu>
            {accounts.map((account) => (
                <NavigationMenuItem key={account.id} to={`/dashboard/accounts/${account.id}`}>
                  <NavigationMenuItemIcon>
                    <ProviderIcon provider={account.provider} />
                    <NavigationMenuItemLabel>{account.displayName ?? account.email ?? account.provider}</NavigationMenuItemLabel>
                  </NavigationMenuItemIcon>
                  <NavigationMenuItemTrailing>
                    <div className="pl-2">
                      <Text size="sm" tone="muted" className="whitespace-nowrap">
                        {account.calendarCount} {account.calendarCount === 1 ? "calendar" : "calendars"}
                      </Text>
                    </div>
                  </NavigationMenuItemTrailing>
                </NavigationMenuItem>
            ))}
          </NavigationMenu>
        )}
        <NavigationMenu>
          <NavigationMenuItem to="/dashboard/events">
            <NavigationMenuItemIcon>
              <CalendarDays size={15} />
              <NavigationMenuItemLabel>View Events</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
            <NavigationMenuItemTrailing />
          </NavigationMenuItem>
          {hasCalendars && (
            <NavigationMenuItem to="/dashboard/calendars">
              <NavigationMenuItemIcon>
                <CalendarSync size={15} />
                <NavigationMenuItemLabel>Calendar Syncing</NavigationMenuItemLabel>
              </NavigationMenuItemIcon>
              <NavigationMenuItemTrailing />
            </NavigationMenuItem>
          )}
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuToggleItem checked={notifications} onCheckedChange={setNotifications}>
            <NavigationMenuItemIcon>
              <Bell size={15} />
              <NavigationMenuItemLabel>Notifications</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
          </NavigationMenuToggleItem>
          <NavigationMenuCheckboxItem checked={publicProfile} onCheckedChange={setPublicProfile}>
            <NavigationMenuItemIcon>
              <Eye size={15} />
              <NavigationMenuItemLabel>Public Profile</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
          </NavigationMenuCheckboxItem>
        </NavigationMenu>
        <NavigationMenu variant="highlight">
          <NavigationMenuItem to="/dashboard/upgrade">
            <NavigationMenuItemIcon>
              <Sparkles size={15} />
              <NavigationMenuItemLabel>Upgrade Account</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
            <NavigationMenuItemTrailing />
          </NavigationMenuItem>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuItem to="/dashboard/settings">
            <NavigationMenuItemIcon>
              <Settings size={15} />
              <NavigationMenuItemLabel>Settings</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
            <NavigationMenuItemTrailing />
          </NavigationMenuItem>
          <NavigationMenuItem onClick={handleLogout}>
            <NavigationMenuItemIcon>
              <LogOut size={15} />
              <NavigationMenuItemLabel>Logout</NavigationMenuItemLabel>
            </NavigationMenuItemIcon>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
      <KeeperLogo className="size-8 text-border-elevated self-center" />
    </div>
  );
}
