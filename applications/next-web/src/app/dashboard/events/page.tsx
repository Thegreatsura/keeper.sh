import { FC } from "react";
import Image from "next/image";
import { DashboardBackButton } from "@/components/dashboard-back-button";
import { Heading4 } from "@/components/heading";
import { Copy } from "@/components/copy";

const mockEvents = [
  {
    date: "Today",
    events: [
      { name: "Team dinner", calendar: "Work", time: "7 – 8 PM", icon: "/integrations/icon-google.svg" },
    ],
  },
  {
    date: "Tomorrow",
    events: [
      { name: "Product sync", calendar: "Work", time: "1 – 1:30 PM", icon: "/integrations/icon-google.svg" },
      { name: "1:1 with Alex", calendar: "Work", time: "1:30 – 2:20 PM", icon: "/integrations/icon-google.svg" },
      { name: "Sprint review", calendar: "Work", time: "2 – 2:50 PM", icon: "/integrations/icon-google.svg" },
    ],
  },
  {
    date: "Tuesday, March 3",
    events: [
      { name: "Quick check-in", calendar: "Work", time: "1:30 – 1:55 PM", icon: "/integrations/icon-google.svg" },
      { name: "Design critique", calendar: "Work", time: "2:30 – 3 PM", icon: "/integrations/icon-google.svg" },
    ],
  },
  {
    date: "Wednesday, March 4",
    events: [
      { name: "Yoga class", calendar: "Personal", time: "7 – 8 PM", icon: "/integrations/icon-google.svg" },
    ],
  },
  {
    date: "Thursday, March 5",
    events: [
      { name: "Team lunch", calendar: "Work", time: "11:30 AM – 12:30 PM", icon: "/integrations/icon-google.svg" },
      { name: "Standup", calendar: "Work", time: "1:30 – 1:55 PM", icon: "/integrations/icon-google.svg" },
      { name: "Retro", calendar: "Work", time: "2 – 2:50 PM", icon: "/integrations/icon-google.svg" },
    ],
  },
  {
    date: "Friday, March 6",
    events: [
      { name: "Retro", calendar: "Work", time: "2 – 2:50 PM", icon: "/integrations/icon-google.svg" },
    ],
  },
];

const EventsPage: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton />
      <div className="px-1">
        <Heading4>Events</Heading4>
        <Copy>All synced events across your calendars.</Copy>
      </div>
      <div className="flex flex-col gap-3">
        {mockEvents.map((group) => (
          <div key={group.date} className="flex flex-col">
            <p className="text-sm font-medium tracking-tight text-foreground px-1">{group.date}</p>
            {group.events.map((event, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 px-1">
                <Image width={16} height={16} src={event.icon} alt="" className="shrink-0" />
                <span className="text-sm font-medium tracking-tight text-foreground">{event.name}</span>
                <Copy className="text-foreground-muted text-xs shrink-0">{event.calendar}</Copy>
                <Copy className="text-foreground-muted text-xs shrink-0 ml-auto whitespace-nowrap text-right">
                  {event.time}
                </Copy>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
