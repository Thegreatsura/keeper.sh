import { createFileRoute } from "@tanstack/react-router";
import useSWR from "swr";
import { Plus, RefreshCw } from "lucide-react";
import { BackButton } from "../../../../components/ui/back-button";
import {
  NavigationMenu,
  NavigationMenuEmptyItem,
  NavigationMenuItem,
  NavigationMenuItemIcon,
  NavigationMenuItemLabel,
  NavigationMenuItemTrailing,
} from "../../../../components/ui/navigation-menu";

export const Route = createFileRoute("/(dashboard)/dashboard/calendars/")({
  component: RouteComponent,
});

interface SyncProfile {
  id: string;
  name: string;
  sources: string[];
  destinations: string[];
  createdAt: string;
}

const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

function RouteComponent() {
  const { data: profiles, mutate } = useSWR<SyncProfile[]>("/api/profiles", fetcher);

  const handleCreate = async () => {
    const response = await fetch("/api/profiles", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "New Profile" }),
    });

    if (response.ok) {
      await mutate();
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <BackButton />
      <NavigationMenu>
        {(profiles ?? []).length === 0 ? (
          <NavigationMenuEmptyItem>No sync profiles</NavigationMenuEmptyItem>
        ) : (
          (profiles ?? []).map((profile) => (
            <NavigationMenuItem key={profile.id} to={`/dashboard/calendars/${profile.id}`}>
              <NavigationMenuItemIcon>
                <RefreshCw size={15} />
                <NavigationMenuItemLabel>{profile.name}</NavigationMenuItemLabel>
              </NavigationMenuItemIcon>
              <NavigationMenuItemTrailing />
            </NavigationMenuItem>
          ))
        )}
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuItem onClick={handleCreate}>
          <NavigationMenuItemIcon>
            <Plus size={15} />
            <NavigationMenuItemLabel>Create Sync Profile</NavigationMenuItemLabel>
          </NavigationMenuItemIcon>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
}
