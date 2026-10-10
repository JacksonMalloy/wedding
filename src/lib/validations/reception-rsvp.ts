import { z } from "zod";

export const receptionRsvpSchema = z
  .object({
    inviteToken: z.string().trim().min(16).max(256),
    requestId: z.uuid(),
    party_id: z.string().min(1).max(100),
    primary_guest_id: z.string().min(1).max(100),
    email: z.string().trim().email("Please enter a valid email address").max(254),
    attending: z.enum(["yes", "no"], {
      message: "Please let us know if you can attend",
    }),
    attendees: z.array(z.object({ guest_id: z.string().min(1).max(100) }).strict()).max(50).default([]),
    dietaryRestrictions: z.string().trim().max(500).optional().default(""),
    message: z.string().trim().max(1000).optional().default(""),
    website: z.string().max(200).optional().default(""),
  })
  .strict()
  .refine((data) => data.attending === "no" || data.attendees.length >= 1, {
    message: "Please check off at least one person who's coming",
    path: ["attendees"],
  })
  .refine((data) => data.attending === "yes" || data.attendees.length === 0, {
    message: "A declined RSVP cannot include attending guests",
    path: ["attendees"],
  })
  .transform((data) => ({
    ...data,
    dietaryRestrictions: data.attending === "yes" ? data.dietaryRestrictions : "",
  }));

export type ReceptionRsvpData = z.output<typeof receptionRsvpSchema>;
