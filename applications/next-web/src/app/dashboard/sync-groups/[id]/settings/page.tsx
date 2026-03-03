import { SyncSettingsClient } from "./sync-settings-client";

export default async function SyncSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SyncSettingsClient id={id} />;
}
