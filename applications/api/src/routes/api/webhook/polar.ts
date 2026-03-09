import type { MaybePromise } from "bun";
import { WebhookVerificationError, validateEvent } from "@polar-sh/sdk/webhooks";
import { ErrorResponse } from "../../../utils/responses";
import { database } from "../../../context";
import env from "@keeper.sh/env/api";
import { userSubscriptionsTable } from "@keeper.sh/database/schema";
import { respondWithLoggedError, runWideEvent, setLogFields } from "../../../utils/logging";

const HTTP_OK = 200;

const getPlanFromActiveStatus = (active: boolean): "pro" | "free" => {
  if (active) {
    return "pro";
  }
  return "free";
};

const upsertSubscription = async (
  userId: string,
  plan: "free" | "pro",
  polarSubscriptionId: string,
): Promise<void> => {
  await database
    .insert(userSubscriptionsTable)
    .values({
      plan,
      polarSubscriptionId,
      userId,
    })
    .onConflictDoUpdate({
      set: {
        plan,
        polarSubscriptionId,
      },
      target: userSubscriptionsTable.userId,
    });
};

const handleSubscriptionCreated = async (
  userId: string | null,
  subscriptionId: string,
): Promise<Response> => {
  if (!userId) {
    return new Response(null, { status: HTTP_OK });
  }

  setLogFields({ "user.id": userId });
  await upsertSubscription(userId, "pro", subscriptionId);
  return new Response(null, { status: HTTP_OK });
};

const handleSubscriptionUpdated = async (
  userId: string | null,
  subscriptionId: string,
  isActive: boolean,
): Promise<Response> => {
  if (!userId) {
    return new Response(null, { status: HTTP_OK });
  }

  const plan = getPlanFromActiveStatus(isActive);
  setLogFields({ "subscription.plan": plan, "user.id": userId });
  await upsertSubscription(userId, plan, subscriptionId);
  return new Response(null, { status: HTTP_OK });
};

const handleSubscriptionCanceled = async (
  userId: string | null,
  subscriptionId: string,
): Promise<Response> => {
  if (!userId) {
    return new Response(null, { status: HTTP_OK });
  }

  setLogFields({ "subscription.plan": "free", "user.id": userId });
  await upsertSubscription(userId, "free", subscriptionId);
  return new Response(null, { status: HTTP_OK });
};

const POST = (request: Request): MaybePromise<Response> => {
  const webhookSecret = env.POLAR_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return ErrorResponse.notImplemented().toResponse();
  }

  return runWideEvent({
    "operation.name": "polar",
    "operation.type": "webhook",
  }, async () => {
    try {
      const body = await request.text();
      const headers: Record<string, string> = {};
      for (const [key, value] of request.headers.entries()) {
        headers[key] = value;
      }

      const event = validateEvent(body, headers, webhookSecret);
      setLogFields({ "operation.name": `polar:${event.type}` });

      if (event.type === "subscription.created") {
        return handleSubscriptionCreated(
          event.data.customer.externalId ?? null,
          event.data.id,
        );
      }

      if (event.type === "subscription.updated") {
        return handleSubscriptionUpdated(
          event.data.customer.externalId ?? null,
          event.data.id,
          event.data.status === "active",
        );
      }

      if (event.type === "subscription.canceled") {
        return handleSubscriptionCanceled(
          event.data.customer.externalId ?? null,
          event.data.id,
        );
      }

      return new Response(null, { status: HTTP_OK });
    } catch (error) {
      if (error instanceof WebhookVerificationError) {
        return respondWithLoggedError(error, ErrorResponse.unauthorized().toResponse());
      }
      setLogFields({ "http.status_code": 500 });
      throw error;
    }
  });
};

export { POST };
