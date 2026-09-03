import { z } from "zod";

export const rehearsalRsvpSchema = z.object({
  inviteToken: z.string().trim().min(16, "This invitation link is invalid"),
  partyId: z.string().trim().min(1, "Please select your name"),
  primaryGuestId: z.string().trim().min(1, "Please select your name"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254),
  attending: z.enum(["yes", "no"], {
    message: "Please let us know if you can attend",
  }),
  attendeeIds: z.array(z.string().trim().min(1)).max(10).default([]),
  dietaryRestrictions: z
    .string()
    .trim()
    .max(500, "Please keep dietary notes under 500 characters")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .max(1000, "Please keep your note under 1000 characters")
    .optional()
    .default(""),
  website: z.string().max(200).optional().default(""),
}).superRefine((data, context) => {
  if (data.attending === "yes" && data.attendeeIds.length === 0) {
    context.addIssue({
      code: "custom",
      path: ["attendeeIds"],
      message: "Please select at least one attendee",
    });
  }

  if (data.attending === "no" && data.attendeeIds.length > 0) {
    context.addIssue({
      code: "custom",
      path: ["attendeeIds"],
      message: "A declined RSVP cannot include attendees",
    });
  }
});

export type RehearsalRsvpData = z.output<typeof rehearsalRsvpSchema>;
