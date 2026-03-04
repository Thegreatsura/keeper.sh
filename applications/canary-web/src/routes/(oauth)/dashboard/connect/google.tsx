import { createFileRoute } from "@tanstack/react-router";
import { LinkOAuthPreamble } from "../../../../components/auth/oauth-preamble";

export const Route = createFileRoute("/(oauth)/dashboard/connect/google")({
  component: () => <LinkOAuthPreamble provider="google" />,
});
