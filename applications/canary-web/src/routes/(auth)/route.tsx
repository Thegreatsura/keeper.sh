import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-2">
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <Outlet />
      </div>
    </div>
  );
}
