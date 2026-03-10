import { authCapabilitiesSchema } from "@keeper.sh/data-schemas";
import type { AuthCapabilities } from "@keeper.sh/data-schemas";
import type { AppJsonFetcher } from "./router-context";

type SocialProviderId = keyof AuthCapabilities["socialProviders"];

interface CredentialField {
  autoComplete: string;
  label: string;
  placeholder: string;
  type: "email" | "text";
}

const resolveCredentialField = (
  capabilities: AuthCapabilities,
): CredentialField => {
  if (capabilities.credentialMode === "username") {
    return {
      autoComplete: "username",
      label: "Username",
      placeholder: "johndoe",
      type: "text",
    };
  }

  return {
    autoComplete: "email",
    label: "Email",
    placeholder: "johndoe+keeper@example.com",
    type: "email",
  };
};

const getEnabledSocialProviders = (
  capabilities: AuthCapabilities,
): SocialProviderId[] =>
  Object.entries(capabilities.socialProviders)
    .filter(([, enabled]) => enabled)
    .map(([provider]) => provider as SocialProviderId);

const supportsPasskeys = (capabilities: AuthCapabilities): boolean =>
  capabilities.supportsPasskeys;

const fetchAuthCapabilitiesWithApi = async (
  fetchApi: AppJsonFetcher,
): Promise<AuthCapabilities> => {
  const data = await fetchApi<unknown>("/api/auth/capabilities");
  return authCapabilitiesSchema.assert(data);
};

export {
  fetchAuthCapabilitiesWithApi,
  getEnabledSocialProviders,
  resolveCredentialField,
  supportsPasskeys,
};
export type { AuthCapabilities, CredentialField, SocialProviderId };
