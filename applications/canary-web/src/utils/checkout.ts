import { authClient } from "../lib/auth-client";

interface CheckoutCallbacks {
  onSuccess?: () => void;
}

export async function openCheckout(productId: string, callbacks?: CheckoutCallbacks): Promise<void> {
  const [{ PolarEmbedCheckout }, response] = await Promise.all([
    import("@polar-sh/checkout/embed"),
    authClient.checkout({
      embedOrigin: globalThis.location.origin,
      products: [productId],
      redirect: false,
    }),
  ]);

  if (!response.data?.url) {
    throw new Error("Failed to create checkout session");
  }

  const checkout = await PolarEmbedCheckout.create(response.data.url, "light");

  checkout.addEventListener("success", () => {
    callbacks?.onSuccess?.();
  });
}

export async function openCustomerPortal(): Promise<void> {
  await authClient.customer.portal();
}
