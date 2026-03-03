import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import useSWR from "swr";
import { Calendar, Check, LoaderCircle } from "lucide-react";
import { BackButton } from "../../../../components/ui/back-button";
import { Button, ButtonText } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuItemIcon,
  NavigationMenuItemLabel,
  NavigationMenuItemTrailing,
} from "../../../../components/ui/navigation-menu";
import { Heading2 } from "../../../../components/ui/heading";
import { Text } from "../../../../components/ui/text";

interface SearchParams {
  source?: string;
  sourceCredentialId?: string;
  provider?: string;
  destination?: string;
  error?: string;
}

interface CalendarOption {
  id: string;
  summary: string;
  primary?: boolean;
}

export const Route = createFileRoute("/(dashboard)/dashboard/integrations/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    source: search.source as string | undefined,
    sourceCredentialId: search.sourceCredentialId as string | undefined,
    provider: search.provider as string | undefined,
    destination: search.destination as string | undefined,
    error: search.error as string | undefined,
  }),
});

const fetcher = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

function RouteComponent() {
  const { source, sourceCredentialId, provider, destination, error } = Route.useSearch();
  const navigate = useNavigate();

  if (destination === "connected") {
    navigate({ to: "/dashboard/calendars" });
    return null;
  }

  if (error) {
    return <ErrorView message={error} />;
  }

  if (source === "connected" && sourceCredentialId && provider) {
    return (
      <CalendarPicker
        provider={provider}
        credentialId={sourceCredentialId}
      />
    );
  }

  navigate({ to: "/dashboard" });
  return null;
}

function ErrorView({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-3">
      <BackButton />
      <div className="flex flex-col gap-1 py-2">
        <Heading2 as="span" className="text-center">Connection failed</Heading2>
        <Text size="sm" tone="muted" align="center">{message}</Text>
      </div>
    </div>
  );
}

function CalendarPicker({ provider, credentialId }: { provider: string; credentialId: string }) {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useSWR<{ calendars: CalendarOption[] }>(
    `/api/sources/${provider}/calendars?credentialId=${credentialId}`,
    fetcher,
  );

  const calendars = data?.calendars ?? [];

  const handleImport = async () => {
    if (!selectedId) return;

    const calendar = calendars.find((c) => c.id === selectedId);
    if (!calendar) return;

    setSubmitting(true);
    setError(null);

    const response = await fetch(`/api/sources/${provider}`, {
      body: JSON.stringify({
        externalCalendarId: selectedId,
        name: calendar.summary,
        oauthSourceCredentialId: credentialId,
      }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? "Failed to import calendar");
      setSubmitting(false);
      return;
    }

    navigate({ to: "/dashboard/calendars" });
  };

  return (
    <div className="flex flex-col gap-3">
      <BackButton />
      <div className="flex flex-col py-2">
        <Heading2 as="span" className="text-center">Select a calendar</Heading2>
        <Text size="sm" tone="muted" align="center">
          Choose which calendar to import events from.
        </Text>
      </div>
      {isLoading && (
        <div className="flex justify-center py-6">
          <LoaderCircle size={20} className="animate-spin text-foreground-muted" />
        </div>
      )}
      {!isLoading && calendars.length > 0 && (
        <NavigationMenu>
          {calendars.map((calendar) => (
            <NavigationMenuItem
              key={calendar.id}
              onClick={() => setSelectedId(calendar.id)}
            >
              <NavigationMenuItemIcon>
                <Calendar size={15} />
                <NavigationMenuItemLabel>{calendar.summary}</NavigationMenuItemLabel>
              </NavigationMenuItemIcon>
              <NavigationMenuItemTrailing>
                {selectedId === calendar.id && (
                  <Check size={14} className="text-foreground" />
                )}
              </NavigationMenuItemTrailing>
            </NavigationMenuItem>
          ))}
        </NavigationMenu>
      )}
      {!isLoading && calendars.length === 0 && (
        <Text size="sm" tone="muted" align="center">No calendars found.</Text>
      )}
      {error && <Text size="sm" tone="danger" align="center">{error}</Text>}
      <Button
        className="w-full justify-center"
        disabled={!selectedId || submitting}
        onClick={handleImport}
      >
        {submitting && <LoaderCircle size={16} className="animate-spin" />}
        <ButtonText>{submitting ? "Importing..." : "Import calendar"}</ButtonText>
      </Button>
    </div>
  );
}
