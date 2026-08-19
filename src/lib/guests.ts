// Wedding invite list.
//
// Edit freely. The shape is:
//   PARTIES: Party[]           — each Party.members[] is one household.
//   The max number of attending guests for an RSVP = members.length.
//
// `isPlusOne: true` makes the name editable in the form (so e.g. "Keenan +1"
// becomes "Jane Doe" when Keenan tells us who he's bringing).
//
// TODO comments mark groupings I had to guess. Split / merge as needed —
// just keep ids unique across all parties.

export type InviteGroup = "main" | "second-wave" | "reception";

export type Guest = {
  id: string;
  first: string;
  last: string;
  isPlusOne?: boolean;
  searchAliases?: string[];
};

export type Party = {
  id: string;
  label?: string;
  group: InviteGroup;
  members: Guest[];
};

export const PARTIES: Party[] = [
  // ── Main list ────────────────────────────────────────────────────────────

  // TODO confirm: lumped all senior-Coates names into one household.
  {
    id: "coates-colleen",
    label: "Colleen & Byron Coates",
    group: "main",
    members: [
      { id: "colleen-coates", first: "Colleen", last: "Coates" },
      { id: "byron-coates", first: "Byron", last: "Coates" },
      { id: "ethan-coates", first: "Ethan", last: "Coates" },
      { id: "olivia-coates", first: "Olivia", last: "Coates" },
      { id: "emma-coates", first: "Emma", last: "Stanley" }, 
    ],
  },
  // TODO confirm: Corey + Jaquie + their kids assumed one household
  {
    id: "coates-corey",
    label: "Corey & Jaquie Coates",
    group: "main",
    members: [
      { id: "corey-coates", first: "Corey", last: "Coates" },
      { id: "jaquie-slaman-coates", first: "Jaquie", last: "Slaman-Coates" },
      { id: "declan-coates", first: "Declan", last: "Coates" },
      { id: "aidan-coates", first: "Aidan", last: "Coates" },
    ],
  },
  {
    id: "haight-warren",
    group: "main",
    members: [{ id: "warren-haight", first: "Warren", last: "Haight" }],
  },
  {
    id: "haight-curtis",
    group: "main",
    members: [{ id: "curtis-haight", first: "Curtis", last: "Haight" }],
  },
  {
    id: "haight-kevin",
    label: "Kevin & Alicia Haight",
    group: "main",
    members: [
      { id: "kevin-haight", first: "Kevin", last: "Haight" },
      { id: "alicia-haight", first: "Alicia", last: "Haight" },
    ],
  },
  {
    id: "haight-rizza",
    label: "Rizza & Andrew Haight",
    group: "main",
    members: [
      { id: "rizza-haight", first: "Rizza", last: "Haight" },
      { id: "andrew-haight", first: "Andrew", last: "Haight" },
    ],
  },
  {
    id: "vanduen",
    label: "Laila & Johnathan Vanduen",
    group: "main",
    members: [
      { id: "laila-vanduen", first: "Laila", last: "Vanduen" },
      { id: "johnathan-vanduen", first: "Johnathan", last: "Vanduen" },
    ],
  },
  // TODO confirm: separate Coates household
  {
    id: "coates-kevin",
    label: "Kevin & Kai Coates",
    group: "main",
    members: [
      { id: "kevin-coates", first: "Kevin", last: "Coates" },
      { id: "kai-coates", first: "Kai", last: "Coates" },
    ],
  },
  // TODO confirm: Wayne grouped with the Gables
  {
    id: "gable",
    label: "The Gables",
    group: "main",
    members: [
      { id: "daina-gable", first: "Daina", last: "Gable" },
      { id: "wayne-gable", first: "Wayne", last: "" }, // TODO confirm surname
      { id: "justine-gable", first: "Justine", last: "Gable" },
      { id: "addie", first: "Addie", last: "" }, // TODO confirm surname
    ],
  },
  {
    id: "clarke",
    label: "Cristina & Jordan Clarke",
    group: "main",
    members: [
      { id: "cristina-clarke", first: "Cristina", last: "Clarke" },
      { id: "jordan-clarke", first: "Jordan", last: "Clarke" },
    ],
  },
  {
    id: "gupta",
    group: "main",
    members: [{ id: "aperna-gupta", first: "Aperna", last: "Gupta" }],
  },
  {
    id: "selkirk",
    group: "main",
    members: [{ id: "alex-selkirk", first: "Alex", last: "Selkirk" }],
  },
  {
    id: "simut",
    label: "Nicole & David Simut",
    group: "main",
    members: [
      { id: "nicole-simut", first: "Nicole", last: "Simut" },
      { id: "david-simut", first: "David", last: "Simut" },
    ],
  },
  {
    id: "moffat",
    group: "main",
    members: [{ id: "hannah-moffat", first: "Hannah", last: "Moffatt" }, { id: "blake-warpole", first: "Blake", last: "Warpole" }],
  },
  // TODO confirm: Kelly Jackson appeared twice in the source list — deduped here
  // and grouped with the rest of the Jacksons.
  {
    id: "jackson",
    label: "The Jacksons",
    group: "main",
    members: [
      { id: "scott-jackson", first: "Scott", last: "Jackson" },
      { id: "kelly-jackson", first: "Kelly", last: "Jackson" },
      { id: "rosie-jackson", first: "Rosie", last: "Jackson" },
      { id: "charlie-jackson", first: "Charlie", last: "Jackson" },
    ],
  },
  {
    id: "mccuish-malloy",
    label: "Richard Mccuish & Kelly Malloy",
    group: "main",
    members: [
      { id: "richard-mccuish", first: "Richard", last: "Mccuish" },
      { id: "kelly-malloy", first: "Kelly", last: "Malloy" },
    ],
  },
  {
    id: "malloy-keenan",
    label: "Keenan Malloy",
    group: "main",
    members: [
      { id: "keenan-malloy", first: "Keenan", last: "Malloy" },
      {
        id: "keenan-malloy-plus-one",
        first: "Keenan's",
        last: "Plus One",
        isPlusOne: true,
      },
    ],
  },
  {
    id: "malloy-rick",
    label: "Rick Malloy",
    group: "main",
    members: [
      { id: "rick-malloy", first: "Rick", last: "Malloy" },
      {
        id: "rick-malloy-plus-one",
        first: "Rick's",
        last: "Plus One",
        isPlusOne: true,
      },
    ],
  },
  {
    id: "catton-cindy",
    label: "Cindy & Ron Catton",
    group: "main",
    members: [
      { id: "cindy-catton", first: "Cindy", last: "Catton" },
      { id: "ron-catton", first: "Ron", last: "Catton" },
    ],
  },
  // TODO confirm: Corey + Jordan Catton assumed a couple
  {
    id: "catton-corey",
    label: "Corey & Jordan Catton",
    group: "main",
    members: [
      { id: "corey-catton", first: "Corey", last: "Catton" },
      { id: "jordan-catton", first: "Jordan", last: "Catton" },
    ],
  },
  // TODO confirm: "Yvonne +1 Price" interpreted as Yvonne Price + plus-one
  {
    id: "price",
    label: "Yvonne Price",
    group: "main",
    members: [
      { id: "yvonne-price", first: "Yvonne", last: "Price" },
      {
        id: "yvonne-price-plus-one",
        first: "Yvonne's",
        last: "Plus One",
        isPlusOne: true,
      },
    ],
  },
  {
    id: "malloy-chris",
    label: "Chris & Elaine Malloy",
    group: "main",
    members: [
      { id: "chris-malloy", first: "Chris", last: "Malloy" },
      { id: "elaine-malloy", first: "Elaine", last: "Malloy" },
    ],
  },
  {
    id: "bernard",
    label: "Heather & Warren Bernard",
    group: "main",
    members: [
      { id: "heather-bernard", first: "Heather", last: "Bernard" },
      { id: "warren-bernard", first: "Warren", last: "Bernard" },
    ],
  },

  // ── 2nd wave (no surnames — TODO fill in) ────────────────────────────────

  {
    id: "wave2-rick",
    group: "second-wave",
    members: [{ id: "rick-wave2", first: "Rick", last: "" }, { id: "judy-wave2", first: "Judy", last: "" }], // TODO surname
  },

  {
    id: "wave2-rob",
    group: "second-wave",
    members: [{ id: "rob-wave2", first: "Rob", last: "" }, { id: "elly-wave2", first: "Ellie", last: "" }], // TODO surname
  },

  {
    id: "wave2-nisha",
    group: "second-wave",
    members: [{ id: "nisha-wave2", first: "Nisha", last: "" }, { id: "deepik-wave2", first: "Deepik", last: "" }], // TODO surname
  },

  {
    id: "wave2-alex-plus-one",
    group: "second-wave",
    members: [
      {
        id: "alex-plus-one-wave2",
        first: "Alex's",
        last: "Plus One",
        isPlusOne: true,
      },
    ],
  },

  // ── 3rd wave ────────────────────────────────────────────────────────

  {
    id: "reception-alexandra",
    label: "Alexandra",
    group: "reception",
    members: [
      { id: "alexandra", first: "Alexandra", last: "" }, // TODO surname
      {
        id: "alexandra-plus-one",
        first: "Alexandra's",
        last: "Plus One",
        isPlusOne: true,
      },
    ],
  },
  {
    id: "reception-stephanie",
    label: "Stephanie",
    group: "reception",
    members: [
      { id: "stephanie", first: "Stephanie", last: "" }, // TODO surname
      {
        id: "stephanie-plus-1",
        first: "Stephanie's",
        last: "Guest 1",
        isPlusOne: true,
      },
      {
        id: "stephanie-plus-2",
        first: "Stephanie's",
        last: "Guest 2",
        isPlusOne: true,
      },
      {
        id: "stephanie-plus-3",
        first: "Stephanie's",
        last: "Guest 3",
        isPlusOne: true,
      },
    ],
  },
  {
    id: "reception-brayden",
    label: "Brayden",
    group: "reception",
    members: [
      { id: "brayden", first: "Brayden", last: "" }, // TODO surname
      {
        id: "brayden-plus-1",
        first: "Brayden's",
        last: "Guest 1",
        isPlusOne: true,
      },
      {
        id: "brayden-plus-2",
        first: "Brayden's",
        last: "Guest 2",
        isPlusOne: true,
      },
      {
        id: "brayden-plus-3",
        first: "Brayden's",
        last: "Guest 3",
        isPlusOne: true,
      },
    ],
  },
  // "Sprencer +1" in the source was a typo for Spencer
  {
    id: "reception-spencer",
    label: "Spencer",
    group: "reception",
    members: [
      { id: "spencer", first: "Spencer", last: "" }, // TODO surname
      {
        id: "spencer-plus-one",
        first: "Spencer's",
        last: "Plus One",
        isPlusOne: true,
      },
    ],
  },
];

// ── Derived lookup helpers ──────────────────────────────────────────────────

export type GuestWithParty = Guest & { partyId: string; partyLabel?: string };

export const ALL_GUESTS: GuestWithParty[] = PARTIES.flatMap((party) =>
  party.members.map((m) => ({
    ...m,
    partyId: party.id,
    partyLabel: party.label,
  }))
);

export const GUEST_BY_ID: Record<string, GuestWithParty> = Object.fromEntries(
  ALL_GUESTS.map((g) => [g.id, g])
);

export const PARTY_BY_ID: Record<string, Party> = Object.fromEntries(
  PARTIES.map((p) => [p.id, p])
);

export function findParty(guestId: string): Party | undefined {
  const guest = GUEST_BY_ID[guestId];
  return guest ? PARTY_BY_ID[guest.partyId] : undefined;
}

export function guestDisplayName(guest: Guest): string {
  return guest.last ? `${guest.first} ${guest.last}` : guest.first;
}
