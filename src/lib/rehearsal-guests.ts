export type RehearsalGuest = {
  id: string;
  displayName: string;
  searchAliases?: string[];
  partyId: string;
  partyLabel: string;
};

export type RehearsalParty = {
  id: string;
  label: string;
  members: RehearsalGuest[];
};

type PartyConfig = {
  id: string;
  label: string;
  members: Array<{
    id: string;
    displayName: string;
    searchAliases?: string[];
  }>;
};

// Rehearsal-dinner households are intentionally separate from the main wedding
// parties. This lets a main household be split into smaller invitation groups
// and prevents main-list plus-ones from being inherited accidentally.
const PARTY_CONFIG: PartyConfig[] = [
  {
    id: "rehearsal-richard-malloy",
    label: "Richard Malloy",
    members: [
      {
        id: "rick-malloy",
        displayName: "Richard Malloy",
        searchAliases: ["Rick Malloy"],
      },
    ],
  },
  {
    id: "rehearsal-keenan-malloy",
    label: "Keenan Malloy",
    members: [{ id: "keenan-malloy", displayName: "Keenan Malloy" }],
  },
  {
    id: "rehearsal-mccuish-malloy",
    label: "Kelly Malloy & Richard Mccuish",
    members: [
      { id: "kelly-malloy", displayName: "Kelly Malloy" },
      { id: "richard-mccuish", displayName: "Richard Mccuish" },
    ],
  },
  {
    id: "rehearsal-jackson-family",
    label: "The Jackson Family",
    members: [
      { id: "kelly-jackson", displayName: "Kelly Jackson" },
      { id: "scott-jackson", displayName: "Scott Jackson" },
      { id: "rosie-jackson", displayName: "Rosie Jackson" },
      { id: "charlie-jackson", displayName: "Charlie Jackson" },
    ],
  },
  {
    id: "rehearsal-chris-elaine-malloy",
    label: "Chris & Elaine Malloy",
    members: [
      { id: "chris-malloy", displayName: "Chris Malloy" },
      { id: "elaine-malloy", displayName: "Elaine Malloy" },
    ],
  },
  {
    id: "rehearsal-cindy-ron-catton",
    label: "Cindy & Ron Catton",
    members: [
      { id: "cindy-catton", displayName: "Cindy Catton" },
      { id: "ron-catton", displayName: "Ron Catton" },
    ],
  },
  {
    id: "rehearsal-byron-colleen-coates",
    label: "Byron & Colleen Coates",
    members: [
      { id: "byron-coates", displayName: "Byron Coates" },
      { id: "colleen-coates", displayName: "Colleen Coates" },
    ],
  },
  {
    id: "rehearsal-olivia-emma",
    label: "Olivia & Emma",
    members: [
      { id: "olivia-coates", displayName: "Olivia Coates" },
      { id: "emma-coates", displayName: "Emma Stanley" },
    ],
  },
  {
    id: "rehearsal-ethan-coates",
    label: "Ethan Coates",
    members: [{ id: "ethan-coates", displayName: "Ethan Coates" }],
  },
  {
    id: "rehearsal-corey-coates-family",
    label: "Corey, Jaquie, Declan & Aidan",
    members: [
      { id: "corey-coates", displayName: "Corey Coates" },
      {
        id: "jaquie-slaman-coates",
        displayName: "Jaquie Slaman-Coates",
        searchAliases: ["Jackie Coates"],
      },
      { id: "declan-coates", displayName: "Declan Coates" },
      {
        id: "aidan-coates",
        displayName: "Aidan Coates",
        searchAliases: ["Aiden Coates"],
      },
    ],
  },
];

export const REHEARSAL_PARTIES: RehearsalParty[] = PARTY_CONFIG.map(
  (party) => ({
    ...party,
    members: party.members.map((member) => ({
      ...member,
      partyId: party.id,
      partyLabel: party.label,
    })),
  })
);

export const REHEARSAL_GUESTS: RehearsalGuest[] = REHEARSAL_PARTIES.flatMap(
  (party) => party.members
);

export const REHEARSAL_PARTY_BY_ID: Record<string, RehearsalParty> =
  Object.fromEntries(REHEARSAL_PARTIES.map((party) => [party.id, party]));

export const REHEARSAL_GUEST_BY_ID: Record<string, RehearsalGuest> =
  Object.fromEntries(REHEARSAL_GUESTS.map((guest) => [guest.id, guest]));
