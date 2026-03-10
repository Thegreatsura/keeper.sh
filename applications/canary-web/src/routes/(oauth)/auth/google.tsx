import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthOAuthPreamble } from "../../../features/auth/components/oauth-preamble";
import { fetchAuthCapabilitiesWithApi } from "../../../lib/auth-capabilities";

export const Route = createFileRoute("/(oauth)/auth/google")({
  loader: async ({ context }) => {
    const capabilities = await fetchAuthCapabilitiesWithApi(context.fetchApi);
    if (!capabilities.socialProviders.google) {
      throw redirect({ to: "/login" });
    }
    return capabilities;
  },
  component: GoogleAuthPage,
});

function GoogleAuthPage() {
  return <AuthOAuthPreamble provider="google" />;
}
