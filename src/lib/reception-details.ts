export type ReceptionDetails = {
  hosts: string;
  title: string;
  date: string | null;
  time: string | null;
  timeZone: string;
  venue: string;
  address: string;
  city: string;
  mapUrl: string;
  invitation: string;
};

export const RECEPTION_DETAILS: ReceptionDetails = {
  hosts: "Delina & Jackson",
  title: "West Coast Reception",
  date: "Saturday, November 14, 2026",
  time: "Drop in anytime from 1–5 PM (PST)",
  timeZone: "America/Vancouver",
  venue: "At our home",
  address: "209 Clearview Drive",
  city: "Port Moody, British Columbia",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=209%20Clearview%20Drive%20Port%20Moody%20British%20Columbia",
  invitation:
    "Join us at home for our West Coast wedding celebration. Drop in anytime between 1 and 5 PM.",
};

export function hasReceptionTiming(details = RECEPTION_DETAILS): boolean {
  return Boolean(details.date?.trim() && details.time?.trim());
}
