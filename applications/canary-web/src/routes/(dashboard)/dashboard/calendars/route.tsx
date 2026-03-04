import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/dashboard/calendars")({
  component: CalendarsLayout,
});

function CalendarsLayout() {
  return <Outlet />;
}
