import { z } from "zod";

export const MAX_UNLISTED_PARTY_SIZE = 10;

// Two shapes are accepted: a guest picked from the reception list (party_id +
// primary_guest_id + attendees), or any typed name with a headcount.
export const receptionRsvpSchema = z
  .object({
    inviteToken: z.string().trim().min(16).max(256),
    requestId: z.uuid(),
    party_id: z.string().min(1).max(100).optional(),
    primary_guest_id: z.string().min(1).max(100).optional(),
    name: z.string().trim().max(100).optional().default(""),
    party_size: z.number().int().min(1).max(MAX_UNLISTED_PARTY_SIZE).optional(),
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
  .superRefine((data, ctx) => {
    const listed = Boolean(data.party_id || data.primary_guest_id);

    if (listed) {
      if (!data.party_id || !data.primary_guest_id) {
        ctx.addIssue({ code: "custom", message: "Please pick your name again", path: ["primary_guest_id"] });
      }
      if (data.attending === "yes" && data.attendees.length === 0) {
        ctx.addIssue({ code: "custom", message: "Please check off at least one person who's coming", path: ["attendees"] });
      }
    } else {
      if (!data.name) {
        ctx.addIssue({ code: "custom", message: "Please enter your name", path: ["name"] });
      }
      if (data.attendees.length) {
        ctx.addIssue({ code: "custom", message: "Please pick your name again", path: ["attendees"] });
      }
      if (data.attending === "yes" && !data.party_size) {
        ctx.addIssue({ code: "custom", message: "Please tell us how many are coming", path: ["party_size"] });
      }
    }

    if (data.attending === "no" && data.attendees.length) {
      ctx.addIssue({ code: "custom", message: "A declined RSVP cannot include attending guests", path: ["attendees"] });
    }
  })
  .transform((data) => ({
    ...data,
    dietaryRestrictions: data.attending === "yes" ? data.dietaryRestrictions : "",
    party_size: data.attending === "yes" ? data.party_size : undefined,
  }));

export type ReceptionRsvpData = z.output<typeof receptionRsvpSchema>;
