import { useState, type SubmitEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getFormData } from "../../../../lib/forms";
import useSWR from "swr";
import { LoaderCircle } from "lucide-react";
import { BackButton } from "../../../../components/ui/back-button";
import { Button, ButtonText } from "../../../../components/ui/button";
import { Divider } from "../../../../components/ui/divider";
import { Input } from "../../../../components/ui/input";
import { Text } from "../../../../components/ui/text";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuItemIcon,
  NavigationMenuItemLabel,
  NavigationMenuItemTrailing,
} from "../../../../components/ui/navigation-menu";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalTitle,
} from "../../../../components/ui/modal";

export const Route = createFileRoute(
  "/(dashboard)/dashboard/calendars/$sourceId",
)({
  component: RouteComponent,
});

interface SourceDetail {
  id: string;
  name: string;
  sourceType: string;
  provider: string | null;
  url: string | null;
  calendarUrl: string | null;
  excludeWorkingLocation: boolean;
  excludeFocusTime: boolean;
  excludeOutOfOffice: boolean;
  createdAt: string;
  updatedAt: string;
}

const fetcher = async (url: string): Promise<SourceDetail> => {
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

const sourceTypeLabels: Record<string, string> = {
  ical: "iCal Feed",
  oauth: "OAuth",
  caldav: "CalDAV",
};

const providerLabels: Record<string, string> = {
  google: "Google Calendar",
  outlook: "Outlook",
  icloud: "iCloud",
  fastmail: "Fastmail",
  "microsoft-365": "Microsoft 365",
};

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function RouteComponent() {
  const { sourceId } = Route.useParams();
  const navigate = useNavigate();
  const { data: source, isLoading, mutate } = useSWR(`/api/sources/${sourceId}`, fetcher);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (isLoading || !source) {
    return (
      <div className="flex flex-col gap-1.5">
        <BackButton fallback="/dashboard/calendars" />
        <div className="flex justify-center py-6">
          <LoaderCircle size={20} className="animate-spin text-foreground-muted" />
        </div>
      </div>
    );
  }

  const displayUrl = source.url ?? source.calendarUrl;
  const displayType = sourceTypeLabels[source.sourceType] ?? source.sourceType;
  const displayProvider = source.provider
    ? (providerLabels[source.provider] ?? source.provider)
    : null;

  return (
    <div className="flex flex-col gap-1.5">
      <BackButton fallback="/dashboard/calendars" />
      <SourceName source={source} onUpdate={mutate} />
      <SourceInfo
        type={displayType}
        provider={displayProvider}
        url={displayUrl}
        createdAt={source.createdAt}
      />
      <Divider />
      <NavigationMenu>
        <NavigationMenuItem onClick={() => setDeleteOpen(true)}>
          <NavigationMenuItemIcon>
            <Text size="sm" tone="danger">Delete Source</Text>
          </NavigationMenuItemIcon>
        </NavigationMenuItem>
      </NavigationMenu>
      <DeleteConfirmation
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        deleting={deleting}
        onConfirm={async () => {
          setDeleting(true);
          const response = await fetch(`/api/sources/${sourceId}`, {
            credentials: "include",
            method: "DELETE",
          });
          setDeleting(false);
          if (response.ok) {
            navigate({ to: "/dashboard/calendars" });
          }
        }}
      />
    </div>
  );
}

interface SourceNameProps {
  source: SourceDetail;
  onUpdate: () => void;
}

function SourceName({ source, onUpdate }: SourceNameProps) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = getFormData(event);
    const name = (formData.get("name") as string)?.trim();
    if (!name || name === source.name) {
      setEditing(false);
      return;
    }

    setSaving(true);
    const response = await fetch(`/api/sources/${source.id}`, {
      body: JSON.stringify({ name }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
    });

    setSaving(false);

    if (response.ok) {
      onUpdate();
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
        <Input name="name" defaultValue={source.name} placeholder="Calendar name" autoFocus />
        <div className="flex items-stretch gap-2">
          <Button variant="elevated" className="grow justify-center" onClick={() => setEditing(false)}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button type="submit" className="grow justify-center" disabled={saving}>
            {saving && <LoaderCircle size={16} className="animate-spin" />}
            <ButtonText>{saving ? "Saving..." : "Save"}</ButtonText>
          </Button>
        </div>
      </form>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuItem onClick={() => setEditing(true)}>
        <NavigationMenuItemIcon>
          <NavigationMenuItemLabel>{source.name}</NavigationMenuItemLabel>
        </NavigationMenuItemIcon>
        <NavigationMenuItemTrailing>
          <Text size="sm" tone="muted">Edit</Text>
        </NavigationMenuItemTrailing>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

interface SourceInfoProps {
  type: string;
  provider: string | null;
  url: string | null;
  createdAt: string;
}

function SourceInfo({ type, provider, url, createdAt }: SourceInfoProps) {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuItemIcon>
          <NavigationMenuItemLabel>Type</NavigationMenuItemLabel>
        </NavigationMenuItemIcon>
        <NavigationMenuItemTrailing>
          <Text size="sm" tone="muted">{type}</Text>
        </NavigationMenuItemTrailing>
      </NavigationMenuItem>
      {provider && (
        <NavigationMenuItem>
          <NavigationMenuItemIcon>
            <NavigationMenuItemLabel>Provider</NavigationMenuItemLabel>
          </NavigationMenuItemIcon>
          <NavigationMenuItemTrailing>
            <Text size="sm" tone="muted">{provider}</Text>
          </NavigationMenuItemTrailing>
        </NavigationMenuItem>
      )}
      {url && (
        <NavigationMenuItem>
          <NavigationMenuItemIcon>
            <NavigationMenuItemLabel>URL</NavigationMenuItemLabel>
          </NavigationMenuItemIcon>
          <NavigationMenuItemTrailing>
            <Text size="sm" tone="muted" className="truncate max-w-[180px]" style={{ direction: "rtl" }}>
              {url}
            </Text>
          </NavigationMenuItemTrailing>
        </NavigationMenuItem>
      )}
      <NavigationMenuItem>
        <NavigationMenuItemIcon>
          <NavigationMenuItemLabel>Added</NavigationMenuItemLabel>
        </NavigationMenuItemIcon>
        <NavigationMenuItemTrailing>
          <Text size="sm" tone="muted">{formatDate(createdAt)}</Text>
        </NavigationMenuItemTrailing>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

interface DeleteConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deleting: boolean;
  onConfirm: () => void;
}

function DeleteConfirmation({ open, onOpenChange, deleting, onConfirm }: DeleteConfirmationProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalTitle>Delete source?</ModalTitle>
        <ModalDescription>
          This will permanently remove this source and all its events.
        </ModalDescription>
        <ModalFooter>
          <Button variant="destructive" className="w-full justify-center" onClick={onConfirm} disabled={deleting}>
            {deleting && <LoaderCircle size={16} className="animate-spin" />}
            <ButtonText>{deleting ? "Deleting..." : "Delete"}</ButtonText>
          </Button>
          <Button variant="elevated" className="w-full justify-center" onClick={() => onOpenChange(false)}>
            <ButtonText>Cancel</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
