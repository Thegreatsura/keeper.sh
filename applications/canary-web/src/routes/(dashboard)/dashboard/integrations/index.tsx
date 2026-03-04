import { createFileRoute, redirect } from "@tanstack/react-router";
import { BackButton } from "../../../../components/ui/back-button";
import { Heading2 } from "../../../../components/ui/heading";
import { Text } from "../../../../components/ui/text";

interface SearchParams {
  error?: string;
}

export const Route = createFileRoute("/(dashboard)/dashboard/integrations/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    error: search.error as string | undefined,
  }),
  beforeLoad: ({ search }) => {
    if (!search.error) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  const { error } = Route.useSearch();

  if (error) {
    return (
      <div className="flex flex-col gap-3">
        <BackButton />
        <div className="flex flex-col gap-1 py-2">
          <Heading2 as="span" className="text-center">Connection failed</Heading2>
          <Text size="sm" tone="muted" align="center">{error}</Text>
        </div>
      </div>
    );
  }

  return null;
}
