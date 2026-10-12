import { z } from "zod";

// Guests can be told they may bring any number of people, so the form takes
// whatever names they enter rather than checking against a hardcoded list.
export const MAX_RECEPTION_PLUS_GUESTS = 10;

const guestName = z
  .string()
  .trim()
  .min(1, "Please fill in each guest’s name, or remove the empty row")
  .max(100);

export const receptionRsvpSchema = z
  .object({
    inviteToken: z.string().trim().min(16).max(256),
    requestId: z.uuid(),
    name: guestName.min(1, "Please enter your name"),
    guests: z
      .array(guestName)
      .max(MAX_RECEPTION_PLUS_GUESTS, `Please list at most ${MAX_RECEPTION_PLUS_GUESTS} guests`)
      .default([]),
    email: z.string().trim().email("Please enter a valid email address").max(254),
    attending: z.enum(["yes", "no"], {
      message: "Please let us know if you can attend",
    }),
    dietaryRestrictions: z.string().trim().max(500).optional().default(""),
    message: z.string().trim().max(1000).optional().default(""),
    website: z.string().max(200).optional().default(""),
  })
  .strict()
  .transform((data) => ({
    ...data,
    guests: data.attending === "yes" ? data.guests : [],
    dietaryRestrictions: data.attending === "yes" ? data.dietaryRestrictions : "",
  }));

export type ReceptionRsvpData = z.output<typeof receptionRsvpSchema>;
