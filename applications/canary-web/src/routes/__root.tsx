import { Outlet, createRootRoute } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Heading2 } from "../components/ui/heading";
import { Text } from "../components/ui/text";
import { LinkButton, ButtonText } from "../components/ui/button";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorFallback,
});

function RootComponent() {
  return <Outlet />;
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-2 gap-3">
      <Heading2>Page not found</Heading2>
      <Text size="sm" tone="muted">
        The page you're looking for doesn't exist.
      </Text>
      <LinkButton to="/" variant="border" size="compact">
        <ButtonText>Go home</ButtonText>
      </LinkButton>
    </div>
  );
}

function ErrorFallback({ error }: ErrorComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-2 gap-3">
      <Heading2>Something went wrong</Heading2>
      <Text size="sm" tone="muted">
        {error instanceof Error ? error.message : "An unexpected error occurred."}
      </Text>
      <LinkButton to="/" variant="border" size="compact">
        <ButtonText>Go home</ButtonText>
      </LinkButton>
    </div>
  );
}
