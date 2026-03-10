import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthOAuthPreamble } from "../../../features/auth/components/oauth-preamble";
import { fetchAuthCapabilitiesWithApi } from "../../../lib/auth-capabilities";

export const Route = createFileRoute("/(oauth)/auth/outlook")({
  loader: async ({ context }) => {
    const capabilities = await fetchAuthCapabilitiesWithApi(context.fetchApi);
    if (!capabilities.socialProviders.microsoft) {
      throw redirect({ to: "/login" });
    }
    return capabilities;
  },
  component: OutlookAuthPage,
});

function OutlookAuthPage() {
  return <AuthOAuthPreamble provider="outlook" />;
}
