import { withAuth, withWideEvent } from "../../../utils/middleware";
import { ErrorResponse } from "../../../utils/responses";
import { consumeCallbackState } from "../../../utils/oauth-callback-state";

export const GET = withWideEvent(
  withAuth(async ({ request }) => {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return ErrorResponse.badRequest("Token is required").toResponse();
    }

    const state = await consumeCallbackState(token);

    if (!state) {
      return ErrorResponse.notFound().toResponse();
    }

    return Response.json(state);
  }),
);
