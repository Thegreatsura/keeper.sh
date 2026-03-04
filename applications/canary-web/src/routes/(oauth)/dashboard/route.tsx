import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(oauth)/dashboard")({
  component: OAuthDashboardLayout,
});

function OAuthDashboardLayout() {
  return <Outlet />;
}
