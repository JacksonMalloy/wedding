import assert from "node:assert/strict";
import test from "node:test";
import { RECEPTION_PARTIES, RECEPTION_GUESTS, searchReceptionGuests } from "../src/lib/reception-guests.ts";
import { RECEPTION_DETAILS, hasReceptionTiming } from "../src/lib/reception-details.ts";
import { resolveReceptionRsvp } from "../src/lib/reception-rsvp.ts";
import { receptionRsvpSchema } from "../src/lib/validations/reception-rsvp.ts";

const sample = (changes = {}) => ({
  inviteToken: "local-test-token-only",
  requestId: "9827ecbb-45e1-42f4-a8b6-7b6a35f7b12e",
  party_id: "reception-kelly-richard",
  primary_guest_id: "reception-kelly-malloy",
  email: "guest@example.com",
  attending: "yes",
  attendees: [{ guest_id: "reception-kelly-malloy" }],
  dietaryRestrictions: "",
  message: "",
  website: "",
  ...changes,
});

const resolve = (changes = {}) => resolveReceptionRsvp(sample(changes), RECEPTION_PARTIES);

test("only six confirmed adult-contact households are staged", () => {
  assert.equal(RECEPTION_PARTIES.length, 6);
  assert.equal(RECEPTION_GUESTS.filter((guest) => !guest.isPlusOne).length, 10);
  assert.equal(RECEPTION_GUESTS.filter((guest) => guest.isPlusOne).length, 1);
  assert.equal(new Set(RECEPTION_GUESTS.map((guest) => guest.id)).size, RECEPTION_GUESTS.length);
  const emails = new Set(RECEPTION_PARTIES.flatMap((party) => [party.email, ...party.members.map((guest) => guest.email)]).filter(Boolean));
  assert.equal(emails.size, 7);
  assert.deepEqual(RECEPTION_PARTIES.find((party) => party.id === "reception-colleen-byron").members.map((guest) => guest.first), ["Colleen", "Byron"]);
  assert.equal(searchReceptionGuests("Rick").length, 0);
});

test("name lookup trims, ignores case, supports confirmed spelling aliases, and excludes plus-one slots", () => {
  assert.deepEqual(searchReceptionGuests("  mCCuish  ").map((guest) => guest.id), ["reception-richard-maccuish"]);
  assert.equal(searchReceptionGuests(" ").length, 0);
  assert.equal(searchReceptionGuests("Leon").length, 1);
  assert.equal(searchReceptionGuests("Heather")[0].last, "Bernard");
});

test("event is a confirmed November open house in Vancouver time", () => {
  assert.equal(RECEPTION_DETAILS.date, "Saturday, November 14, 2026");
  assert.equal(RECEPTION_DETAILS.time, "Drop in anytime from 1–5 PM (PST)");
  assert.equal(RECEPTION_DETAILS.timeZone, "America/Vancouver");
  assert.equal(RECEPTION_DETAILS.address, "209 Clearview Drive");
  assert.ok(hasReceptionTiming());
  assert.equal(hasReceptionTiming({ ...RECEPTION_DETAILS, date: null }), false);
  assert.equal(hasReceptionTiming({ ...RECEPTION_DETAILS, time: " " }), false);
});

test("valid RSVP resolves only canonical server-side names", () => {
  const result = resolve({ attendees: [{ guest_id: "reception-richard-maccuish" }, { guest_id: "reception-kelly-malloy" }] });
  assert.deepEqual(result.value.attendeeNames, ["Kelly Malloy", "Richard MacCuish"]);
  assert.equal(result.value.partySize, 2);
});

test("cross-party primary and unknown parties are rejected", () => {
  assert.ok(resolve({ primary_guest_id: "reception-leon-lee" }).error);
  assert.ok(resolve({ party_id: "not-invited" }).error);
});

test("cross-party, duplicated and missing-primary attendees are rejected", () => {
  assert.ok(resolve({ attendees: [{ guest_id: "reception-kelly-malloy" }, { guest_id: "reception-leon-lee" }] }).error);
  assert.ok(resolve({ attendees: [{ guest_id: "reception-kelly-malloy" }, { guest_id: "reception-kelly-malloy" }] }).error);
  assert.ok(resolve({ attendees: [{ guest_id: "reception-richard-maccuish" }] }).error);
});

test("Leon can include the invited unnamed guest, who cannot be the primary", () => {
  const party = { party_id: "reception-leon", primary_guest_id: "reception-leon-lee", attendees: [{ guest_id: "reception-leon-lee" }, { guest_id: "reception-leon-plus-one" }] };
  assert.equal(resolve(party).value.partySize, 2);
  assert.ok(resolve({ ...party, primary_guest_id: "reception-leon-plus-one" }).error);
});

test("declines include no attendees or dietary notes", () => {
  const data = receptionRsvpSchema.parse(sample({ attending: "no", attendees: [], dietaryRestrictions: "stale note" }));
  assert.equal(data.dietaryRestrictions, "");
  assert.equal(resolveReceptionRsvp(data, RECEPTION_PARTIES).value.partySize, 0);
  assert.equal(receptionRsvpSchema.safeParse(sample({ attending: "no" })).success, false);
});

test("schema rejects forged names, invalid email, malformed request IDs and empty attendance", () => {
  assert.equal(receptionRsvpSchema.safeParse(sample({ attendees: [{ guest_id: "reception-kelly-malloy", display_name: "Forged name" }] })).success, false);
  assert.equal(receptionRsvpSchema.safeParse(sample({ email: "not an email" })).success, false);
  assert.equal(receptionRsvpSchema.safeParse(sample({ requestId: "123" })).success, false);
  assert.equal(receptionRsvpSchema.safeParse(sample({ attendees: [] })).success, false);
  assert.equal(receptionRsvpSchema.safeParse(sample({ message: "x".repeat(1001) })).success, false);
});
