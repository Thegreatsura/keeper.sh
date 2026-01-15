import type { Provider } from "../types/provider";

export const SOURCE_PROVIDERS: Provider[] = [
  {
    id: "google",
    name: "Google Calendar",
    icon: "/integrations/icon-google.svg",
    description: "Connect your Google Calendar using secure OAuth authentication.",
    steps: [
      {
        title: "Sign in with Google",
        description: "Authenticate with your Google account.",
      },
      {
        title: "Grant calendar access",
        description: "Allow Keeper to read your calendar events.",
      },
    ],
    connectLabel: "Connect Google",
  },
  {
    id: "outlook",
    name: "Outlook",
    icon: "/integrations/icon-outlook.svg",
    description: "Connect your Outlook or Microsoft 365 calendar using secure OAuth authentication.",
    steps: [
      {
        title: "Sign in with Microsoft",
        description: "Authenticate with your Microsoft account.",
      },
      {
        title: "Grant calendar access",
        description: "Allow Keeper to read your calendar events.",
      },
    ],
    connectLabel: "Connect Outlook",
  },
  {
    id: "icloud",
    name: "iCloud Calendar",
    icon: "/integrations/icon-icloud.svg",
    description: "Connect your iCloud Calendar using an app-specific password.",
    steps: [
      {
        title: "Generate an app-specific password",
        description: "Go to appleid.apple.com → Sign-In and Security → App-Specific Passwords.",
      },
      {
        title: "Enter your credentials",
        description: "Use your Apple ID email and the app-specific password you generated.",
      },
      {
        title: "Select calendars",
        description: "Choose which iCloud calendars you want to sync.",
      },
    ],
    connectLabel: "Connect iCloud",
  },
  {
    id: "fastmail",
    name: "Fastmail",
    icon: "/integrations/icon-fastmail.svg",
    description: "Connect your Fastmail calendar using an app password.",
    steps: [
      {
        title: "Generate an app password",
        description: "Go to Fastmail Settings → Privacy & Security → App Passwords.",
      },
      {
        title: "Enter your credentials",
        description: "Use your Fastmail email and the app password you generated.",
      },
      {
        title: "Select calendars",
        description: "Choose which Fastmail calendars you want to sync.",
      },
    ],
    connectLabel: "Connect Fastmail",
  },
  {
    id: "caldav",
    name: "CalDAV",
    icon: null,
    description: "Connect any CalDAV-compatible calendar server.",
    steps: [
      {
        title: "Find your CalDAV URL",
        description: "Locate the CalDAV server URL from your calendar provider's settings.",
      },
      {
        title: "Enter server details",
        description: "Provide the CalDAV URL, your username, and password.",
      },
      {
        title: "Select calendars",
        description: "Choose which calendars from this server you want to sync.",
      },
    ],
    connectLabel: "Connect CalDAV",
  },
  {
    id: "ical",
    name: "iCal Link",
    icon: null,
    description: "Subscribe to any calendar using an iCal URL for read-only access.",
    steps: [
      {
        title: "Get the iCal URL",
        description: "Find the iCal or ICS subscription link from your calendar provider.",
      },
      {
        title: "Paste the URL",
        description: "Enter the iCal URL to subscribe to the calendar.",
      },
    ],
    connectLabel: "Add iCal Link",
  },
];

export const DESTINATION_PROVIDERS: Provider[] = [
  {
    id: "google",
    name: "Google Calendar",
    icon: "/integrations/icon-google.svg",
    description: "Write events to your Google Calendar using secure OAuth authentication.",
    steps: [
      {
        title: "Sign in with Google",
        description: "Authenticate with your Google account.",
      },
      {
        title: "Grant calendar write access",
        description: "Allow Keeper to create and update calendar events.",
      },
    ],
    connectLabel: "Connect Google",
  },
  {
    id: "outlook",
    name: "Outlook",
    icon: "/integrations/icon-outlook.svg",
    description: "Write events to your Outlook or Microsoft 365 calendar using secure OAuth authentication.",
    steps: [
      {
        title: "Sign in with Microsoft",
        description: "Authenticate with your Microsoft account.",
      },
      {
        title: "Grant calendar write access",
        description: "Allow Keeper to create and update calendar events.",
      },
    ],
    connectLabel: "Connect Outlook",
  },
  {
    id: "icloud",
    name: "iCloud Calendar",
    icon: "/integrations/icon-icloud.svg",
    description: "Write events to your iCloud Calendar using an app-specific password.",
    steps: [
      {
        title: "Generate an app-specific password",
        description: "Go to appleid.apple.com → Sign-In and Security → App-Specific Passwords.",
      },
      {
        title: "Enter your credentials",
        description: "Use your Apple ID email and the app-specific password you generated.",
      },
      {
        title: "Select calendar",
        description: "Choose which iCloud calendar you want to write events to.",
      },
    ],
    connectLabel: "Connect iCloud",
  },
  {
    id: "fastmail",
    name: "Fastmail",
    icon: "/integrations/icon-fastmail.svg",
    description: "Write events to your Fastmail calendar using an app password.",
    steps: [
      {
        title: "Generate an app password",
        description: "Go to Fastmail Settings → Privacy & Security → App Passwords.",
      },
      {
        title: "Enter your credentials",
        description: "Use your Fastmail email and the app password you generated.",
      },
      {
        title: "Select calendar",
        description: "Choose which Fastmail calendar you want to write events to.",
      },
    ],
    connectLabel: "Connect Fastmail",
  },
  {
    id: "caldav",
    name: "CalDAV",
    icon: null,
    description: "Write events to any CalDAV-compatible calendar server.",
    steps: [
      {
        title: "Find your CalDAV URL",
        description: "Locate the CalDAV server URL from your calendar provider's settings.",
      },
      {
        title: "Enter server details",
        description: "Provide the CalDAV URL, your username, and password.",
      },
      {
        title: "Select calendar",
        description: "Choose which calendar from this server you want to write events to.",
      },
    ],
    connectLabel: "Connect CalDAV",
  },
];
