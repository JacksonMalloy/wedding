import type { ReceptionParty } from "./reception-guests";
import type { ReceptionRsvpData } from "./validations/reception-rsvp";

export type ResolvedReceptionRsvp = {
  partyLabel: string;
  primaryName: string;
  firstName: string;
  attendeeNames: string[];
  partySize: number;
  onGuestList: boolean;
};

export function resolveReceptionRsvp(
  data: ReceptionRsvpData,
  parties: ReceptionParty[]
): { value: ResolvedReceptionRsvp; error?: never } | { error: string; value?: never } {
  if (!data.party_id) {
    // Not picked from the list: accept the typed name as-is.
    const name = data.name.replace(/\s+/g, " ").trim();
    const attending = data.attending === "yes";
    return {
      value: {
        partyLabel: name,
        primaryName: name,
        firstName: name.split(" ")[0],
        attendeeNames: attending ? [name] : [],
        partySize: attending ? (data.party_size ?? 1) : 0,
        onGuestList: false,
      },
    };
  }

  const party = parties.find((candidate) => candidate.id === data.party_id);
  const primary = party?.members.find((guest) => guest.id === data.primary_guest_id);

  if (!party || !primary || primary.isPlusOne) {
    return { error: "We couldn’t find that name on the invite list" };
  }

  const memberIds = new Set(party.members.map((member) => member.id));
  const attendeeIds = new Set(data.attendees.map((attendee) => attendee.guest_id));
  if (attendeeIds.size !== data.attendees.length) {
    return { error: "The same guest was listed twice" };
  }
  for (const guestId of attendeeIds) {
    if (!memberIds.has(guestId)) {
      return { error: "Someone in that list isn’t part of your party" };
    }
  }
  if (data.attending === "yes" && !attendeeIds.has(primary.id)) {
    return { error: "Please include yourself in the guest list" };
  }
  if (data.attending === "no" && attendeeIds.size) {
    return { error: "A declined RSVP cannot include attending guests" };
  }

  const guestName = (guest: { first: string; last: string }) =>
    guest.last ? `${guest.first} ${guest.last}` : guest.first;
  const attendeeNames = party.members
    .filter((member) => attendeeIds.has(member.id))
    .map(guestName);

  return {
    value: {
      partyLabel: party.label,
      primaryName: guestName(primary),
      firstName: primary.first,
      attendeeNames,
      partySize: attendeeNames.length,
      onGuestList: true,
    },
  };
}
