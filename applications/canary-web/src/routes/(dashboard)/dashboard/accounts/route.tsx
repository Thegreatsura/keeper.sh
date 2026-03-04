import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/dashboard/accounts")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
