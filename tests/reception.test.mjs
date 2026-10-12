import assert from "node:assert/strict";
import test from "node:test";
import { RECEPTION_PARTIES, RECEPTION_GUESTS, searchReceptionGuests } from "../src/lib/reception-guests.ts";
import { RECEPTION_DETAILS, hasReceptionTiming } from "../src/lib/reception-details.ts";
import { resolveReceptionRsvp } from "../src/lib/reception-rsvp.ts";
import { receptionRsvpSchema } from "../src/lib/validations/reception-rsvp.ts";

const sample = (changes = {}) => ({
  inviteToken: "local-test-token-only",
  requestId: "9827ecbb-45e1-42f4-a8b6-7b6a35f7b12e",
  name: "Jordan  Example",
  guests: ["Sam Smith", " Alex  Lee "],
  email: "guest@example.com",
  attending: "yes",
  dietaryRestrictions: "",
  message: "",
  website: "",
  ...changes,
});

const resolve = (changes = {}) => resolveReceptionRsvp(receptionRsvpSchema.parse(sample(changes)));

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

test("any name is accepted, with the named guests they are bringing", () => {
  const result = resolve();
  assert.equal(result.primaryName, "Jordan Example");
  assert.equal(result.firstName, "Jordan");
  assert.deepEqual(result.guestNames, ["Sam Smith", "Alex Lee"]);
  assert.equal(result.partySize, 3);
  assert.equal(resolve({ guests: [] }).partySize, 1);
  assert.equal(resolve({ guests: undefined }).partySize, 1);
});

test("names and guest rows must be filled in and bounded", () => {
  assert.equal(receptionRsvpSchema.safeParse(sample({ name: "  " })).success, false);
  assert.equal(receptionRsvpSchema.safeParse(sample({ guests: ["Sam", " "] })).success, false);
  assert.equal(receptionRsvpSchema.safeParse(sample({ guests: Array(11).fill("Guest") })).success, false);
  assert.equal(receptionRsvpSchema.safeParse(sample({ guests: Array(10).fill("Guest") })).success, true);
  assert.equal(receptionRsvpSchema.safeParse(sample({ guests: ["x".repeat(101)] })).success, false);
});

test("declines include no guests or dietary notes", () => {
  const data = receptionRsvpSchema.parse(sample({ attending: "no", dietaryRestrictions: "stale note" }));
  assert.equal(data.dietaryRestrictions, "");
  assert.deepEqual(data.guests, []);
  assert.equal(resolveReceptionRsvp(data).partySize, 0);
});

test("schema rejects unknown fields, invalid email and malformed request IDs", () => {
  assert.equal(receptionRsvpSchema.safeParse(sample({ party_id: "reception-kelly-richard" })).success, false);
  assert.equal(receptionRsvpSchema.safeParse(sample({ email: "not an email" })).success, false);
  assert.equal(receptionRsvpSchema.safeParse(sample({ requestId: "123" })).success, false);
  assert.equal(receptionRsvpSchema.safeParse(sample({ message: "x".repeat(1001) })).success, false);
});
