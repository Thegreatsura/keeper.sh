import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(oauth)/auth")({
  component: OAuthAuthLayout,
});

function OAuthAuthLayout() {
  return <Outlet />;
}
