export interface ProviderStep {
  title: string;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  icon: string | null;
  description: string;
  steps: ProviderStep[];
  connectLabel: string;
}

export type ProviderType = "source" | "destination";
