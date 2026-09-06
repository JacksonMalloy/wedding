import { z } from "zod";

const rehearsalAttendeeSchema = z.object({
  guest_id: z.string().min(1),
  display_name: z
    .string()
    .trim()
    .min(2, "Please enter a name")
    .max(100, "Please keep names under 100 characters"),
});

export const rehearsalRsvpSchema = z
  .object({
    inviteToken: z.string().trim().min(16, "This invitation link is invalid"),
    party_id: z.string().min(1, "Please find your name in the list"),
    primary_guest_id: z.string().min(1, "Please find your name in the list"),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .max(254),
    attending: z.enum(["yes", "no"], {
      message: "Please let us know if you can attend",
    }),
    attendees: z.array(rehearsalAttendeeSchema).default([]),
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
  })
  .refine((data) => data.attending === "no" || data.attendees.length >= 1, {
    message: "Please check off at least one person who's coming",
    path: ["attendees"],
  });

export type RehearsalRsvpInput = z.input<typeof rehearsalRsvpSchema>;
export type RehearsalRsvpData = z.output<typeof rehearsalRsvpSchema>;
