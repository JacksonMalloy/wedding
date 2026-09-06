// Rehearsal dinner invite list.
//
// Much smaller than the wedding list (`@/lib/guests`) — this is the private
// evening-before dinner, so it's immediate family and the Coates/Malloy
// households only.
//
// Shape mirrors the wedding list so the RSVP forms behave the same way:
//   REHEARSAL_PARTIES: RehearsalParty[]   — each party is one household.
//   Guest ids intentionally match the wedding list ids where the same person
//   appears on both, so replies can be cross-referenced later.
//
// `email` is the address we have on file for the household. It pre-fills the
// RSVP email field and stays editable, so anyone can correct it.

export type RehearsalGuest = {
  id: string;
  first: string;
  last: string;
  searchAliases?: string[];
};

export type RehearsalParty = {
  id: string;
  label: string;
  email?: string;
  members: RehearsalGuest[];
};

export const REHEARSAL_PARTIES: RehearsalParty[] = [
  {
    id: "mccuish-malloy",
    label: "Kelly Malloy & Richard Mccuish",
    email: "kellymalloy@me.com",
    members: [
      { id: "kelly-malloy", first: "Kelly", last: "Malloy", searchAliases: ["mom"] },
      {
        id: "richard-mccuish",
        first: "Richard",
        last: "Mccuish",
        searchAliases: ["maccuish"],
      },
    ],
  },
  {
    id: "malloy-rick",
    label: "Rick Malloy",
    email: "rmalloy@telus.net",
    members: [
      {
        id: "rick-malloy",
        first: "Rick",
        last: "Malloy",
        searchAliases: ["richard", "dad"],
      },
    ],
  },
  {
    id: "malloy-chris",
    label: "Chris & Elaine Malloy",
    email: "emalloy@telus.net",
    members: [
      { id: "chris-malloy", first: "Chris", last: "Malloy" },
      { id: "elaine-malloy", first: "Elaine", last: "Malloy" },
    ],
  },
  {
    id: "coates-colleen",
    label: "Byron & Colleen Coates",
    email: "colleen_coates@yahoo.ca",
    members: [
      { id: "colleen-coates", first: "Colleen", last: "Coates" },
      { id: "byron-coates", first: "Byron", last: "Coates" },
      { id: "ethan-coates", first: "Ethan", last: "Coates" },
      { id: "olivia-coates", first: "Olivia", last: "Coates" },
      { id: "emma-coates", first: "Emma", last: "Stanley" },
    ],
  },
  {
    id: "coates-corey",
    label: "Corey & Jaquie Coates",
    email: "coreycoates@hotmail.com",
    members: [
      { id: "corey-coates", first: "Corey", last: "Coates" },
      { id: "jaquie-slaman-coates", first: "Jaquie", last: "Slaman-Coates" },
      { id: "declan-coates", first: "Declan", last: "Coates" },
      { id: "aidan-coates", first: "Aidan", last: "Coates" },
    ],
  },
  {
    id: "jackson",
    label: "The Jacksons",
    email: "kellymarieconnors@hotmail.com",
    members: [
      { id: "scott-jackson", first: "Scott", last: "Jackson" },
      {
        id: "kelly-jackson",
        first: "Kelly",
        last: "Jackson",
        searchAliases: ["connors"],
      },
      { id: "charlie-jackson", first: "Charlie", last: "Jackson" },
      { id: "rosie-jackson", first: "Rosie", last: "Jackson" },
    ],
  },
  {
    id: "catton-cindy",
    label: "Cindy & Ron Catton",
    email: "cindycatton@gmail.com",
    members: [
      { id: "cindy-catton", first: "Cindy", last: "Catton" },
      { id: "ron-catton", first: "Ron", last: "Catton" },
    ],
  },
];

// ── Derived lookup helpers ──────────────────────────────────────────────────

export type RehearsalGuestWithParty = RehearsalGuest & {
  partyId: string;
  partyLabel: string;
};

export const REHEARSAL_GUESTS: RehearsalGuestWithParty[] =
  REHEARSAL_PARTIES.flatMap((party) =>
    party.members.map((member) => ({
      ...member,
      partyId: party.id,
      partyLabel: party.label,
    }))
  );

export const REHEARSAL_GUEST_BY_ID: Record<string, RehearsalGuestWithParty> =
  Object.fromEntries(REHEARSAL_GUESTS.map((guest) => [guest.id, guest]));

export const REHEARSAL_PARTY_BY_ID: Record<string, RehearsalParty> =
  Object.fromEntries(REHEARSAL_PARTIES.map((party) => [party.id, party]));

export function rehearsalGuestName(guest: RehearsalGuest): string {
  return guest.last ? `${guest.first} ${guest.last}` : guest.first;
}

export function searchRehearsalGuests(query: string): RehearsalGuestWithParty[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return REHEARSAL_GUESTS.filter((guest) => {
    const aliases = (guest.searchAliases ?? []).join(" ");
    return `${guest.first} ${guest.last} ${guest.partyLabel} ${aliases}`
      .toLowerCase()
      .includes(q);
  });
}
