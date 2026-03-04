import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/dashboard/calendars")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
