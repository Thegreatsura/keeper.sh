import { withAuth, withWideEvent } from "../../../utils/middleware";
import { getEventCount } from "../../../utils/events";

export const GET = withWideEvent(
  withAuth(async ({ userId }) => {
    const count = await getEventCount(userId);
    return Response.json({ count });
  }),
);
