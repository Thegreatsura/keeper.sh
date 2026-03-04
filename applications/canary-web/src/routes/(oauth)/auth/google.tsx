import { createFileRoute } from "@tanstack/react-router";
import { AuthOAuthPreamble } from "../../../components/auth/oauth-preamble";

export const Route = createFileRoute("/(oauth)/auth/google")({
  component: GoogleAuthPage,
});

function GoogleAuthPage() {
  return <AuthOAuthPreamble provider="google" />;
}
