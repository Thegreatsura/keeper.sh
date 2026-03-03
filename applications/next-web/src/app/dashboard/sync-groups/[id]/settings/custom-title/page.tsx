import { CustomTitleClient } from "./custom-title-client";

export default async function CustomTitlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CustomTitleClient id={id} />;
}
