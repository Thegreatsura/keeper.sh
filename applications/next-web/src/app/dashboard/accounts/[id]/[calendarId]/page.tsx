export const generateStaticParams = () => [{ calendarId: "personal" }];

import { FC } from "react";
import Image from "next/image";
import { DashboardBackButton } from "@/components/dashboard-back-button";
import { Heading4 } from "@/components/heading";
import { Copy } from "@/components/copy";

const mockEvents = [
  {
    date: "Today",
    events: [
      { name: "Yoga class", time: "7 – 8 PM", icon: "/integrations/icon-google.svg" },
    ],
  },
  {
    date: "Tomorrow",
    events: [
      { name: "Dentist appointment", time: "10 – 11 AM", icon: "/integrations/icon-google.svg" },
      { name: "Grocery pickup", time: "5 – 5:30 PM", icon: "/integrations/icon-google.svg" },
    ],
  },
  {
    date: "Wednesday, March 4",
    events: [
      { name: "Yoga class", time: "7 – 8 PM", icon: "/integrations/icon-google.svg" },
    ],
  },
  {
    date: "Thursday, March 5",
    events: [
      { name: "Coffee with Sam", time: "9 – 9:30 AM", icon: "/integrations/icon-google.svg" },
    ],
  },
  {
    date: "Friday, March 6",
    events: [
      { name: "Dinner with parents", time: "6:30 – 8 PM", icon: "/integrations/icon-google.svg" },
    ],
  },
];

const AccountCalendarEventsPage: FC<{ params: Promise<{ id: string; calendarId: string }> }> = async ({ params }) => {
  const { id, calendarId } = await params;
  const calendarName = decodeURIComponent(calendarId).replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton href={`/dashboard/accounts/${id}`} />
      <div className="px-1">
        <Heading4>{calendarName}</Heading4>
        <Copy>Events from this calendar.</Copy>
      </div>
      <div className="flex flex-col gap-3">
        {mockEvents.map((group) => (
          <div key={group.date} className="flex flex-col">
            <p className="text-sm font-medium tracking-tight text-foreground px-1">{group.date}</p>
            {group.events.map((event, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 px-1">
                <Image width={16} height={16} src={event.icon} alt="" className="shrink-0" />
                <span className="text-sm font-medium tracking-tight text-foreground">{event.name}</span>
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

export default AccountCalendarEventsPage;
