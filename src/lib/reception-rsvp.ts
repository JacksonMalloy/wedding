import type { ReceptionRsvpData } from "./validations/reception-rsvp";

export type ResolvedReceptionRsvp = {
  primaryName: string;
  firstName: string;
  guestNames: string[];
  partySize: number;
};

const tidyName = (name: string) => name.replace(/\s+/g, " ").trim();

export function resolveReceptionRsvp(data: ReceptionRsvpData): ResolvedReceptionRsvp {
  const primaryName = tidyName(data.name);
  const guestNames = data.attending === "yes" ? data.guests.map(tidyName) : [];

  return {
    primaryName,
    firstName: primaryName.split(" ")[0],
    guestNames,
    partySize: data.attending === "yes" ? 1 + guestNames.length : 0,
  };
}
