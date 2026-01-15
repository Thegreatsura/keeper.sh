import type { Metadata } from "next";
import { EventList, Heading1 } from "@keeper.sh/ui";
import { WEEK_EVENTS } from "./utils/mock-events";

export const metadata: Metadata = {
  title: "Agenda - Keeper",
  description: "View your weekly agenda and upcoming events",
};

const AgendaPage = () => (
  <div className="flex flex-col gap-4">
    <div className="md:hidden mb-4">
      <Heading1>Agenda</Heading1>
    </div>
    <EventList events={WEEK_EVENTS} />
  </div>
);

export default AgendaPage;
