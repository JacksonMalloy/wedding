// Confirmed adult reception contacts only. This is a partial invite list.
// Add unresolved households only after their identities are confirmed.
// Do not import the research tracker, its source links, or child details here.
// These names and addresses are intentionally static and public in this repo.

export type ReceptionGuest = {
  id: string;
  first: string;
  last: string;
  email?: string;
  searchAliases?: string[];
  isPlusOne?: boolean;
};

export type ReceptionParty = {
  id: string;
  label: string;
  email?: string;
  members: ReceptionGuest[];
};

export const RECEPTION_PARTIES: ReceptionParty[] = [
  {
    id: "reception-kelly-richard",
    label: "Kelly & Richard",
    email: "kellymalloy@me.com",
    members: [
      { id: "reception-kelly-malloy", first: "Kelly", last: "Malloy", email: "kellymalloy@me.com" },
      { id: "reception-richard-maccuish", first: "Richard", last: "MacCuish", email: "richardmaccuish@me.com", searchAliases: ["mccuish"] },
    ],
  },
  {
    id: "reception-chris-elaine",
    label: "Chris & Elaine Malloy",
    email: "emalloy@telus.net",
    members: [
      { id: "reception-chris-malloy", first: "Chris", last: "Malloy" },
      { id: "reception-elaine-malloy", first: "Elaine", last: "Malloy" },
    ],
  },
  {
    id: "reception-heather-warren",
    label: "Heather & Warren Bernard",
    email: "notasoccermum@hotmail.com",
    members: [
      { id: "reception-heather-bernard", first: "Heather", last: "Bernard" },
      { id: "reception-warren-bernard", first: "Warren", last: "Bernard" },
    ],
  },
  {
    id: "reception-colleen-byron",
    label: "Colleen & Byron Coates",
    email: "colleen_coates@yahoo.ca",
    members: [
      { id: "reception-colleen-coates", first: "Colleen", last: "Coates" },
      { id: "reception-byron-coates", first: "Byron", last: "Coates" },
    ],
  },
  {
    id: "reception-keenan",
    label: "Keenan Malloy",
    email: "malloyrkeenan@gmail.com",
    members: [{ id: "reception-keenan-malloy", first: "Keenan", last: "Malloy" }],
  },
  {
    id: "reception-leon",
    label: "Leon Lee & guest",
    email: "leonlee123@gmail.com",
    members: [
      { id: "reception-leon-lee", first: "Leon", last: "Lee" },
      { id: "reception-leon-plus-one", first: "Leon’s guest", last: "", isPlusOne: true },
    ],
  },
];

export type ReceptionGuestWithParty = ReceptionGuest & {
  partyId: string;
  partyLabel: string;
};

export const RECEPTION_GUESTS: ReceptionGuestWithParty[] =
  RECEPTION_PARTIES.flatMap((party) =>
    party.members.map((member) => ({
      ...member,
      partyId: party.id,
      partyLabel: party.label,
    }))
  );

export const RECEPTION_GUEST_BY_ID: Record<string, ReceptionGuestWithParty> =
  Object.fromEntries(RECEPTION_GUESTS.map((guest) => [guest.id, guest]));

export const RECEPTION_PARTY_BY_ID: Record<string, ReceptionParty> =
  Object.fromEntries(RECEPTION_PARTIES.map((party) => [party.id, party]));

export function receptionGuestName(guest: ReceptionGuest): string {
  return guest.last ? `${guest.first} ${guest.last}` : guest.first;
}

export function searchReceptionGuests(query: string): ReceptionGuestWithParty[] {
  const q = query.trim().toLocaleLowerCase();
  if (!q) return [];

  return RECEPTION_GUESTS.filter((guest) => {
    if (guest.isPlusOne) return false;
    const aliases = (guest.searchAliases ?? []).join(" ");
    return `${guest.first} ${guest.last} ${guest.partyLabel} ${aliases}`
      .toLocaleLowerCase()
      .includes(q);
  });
}
