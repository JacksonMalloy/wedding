import { z } from "zod";

export const rehearsalRsvpSchema = z.object({
  inviteToken: z.string().trim().min(16, "This invitation link is invalid"),
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Please keep your name under 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254),
  attending: z.enum(["yes", "no"], {
    message: "Please let us know if you can attend",
  }),
  partySize: z.coerce.number().int().min(1).max(10),
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
});

export type RehearsalRsvpData = z.output<typeof rehearsalRsvpSchema>;
