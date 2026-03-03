import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(oauth)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-2">
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Outlet />
      </div>
    </div>
  );
}
