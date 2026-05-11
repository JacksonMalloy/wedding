import { z } from "zod";

const attendeeSchema = z.object({
  guest_id: z.string().min(1),
  display_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  meal_preference: z.enum(["beef", "vegetarian"]).optional().nullable(),
  dietary_restrictions: z
    .string()
    .max(500, "Please keep dietary restrictions under 500 characters")
    .optional()
    .nullable(),
});

export const rsvpSchema = z
  .object({
    party_id: z.string().min(1, "Please select your name from the list"),
    primary_guest_id: z.string().min(1, "Please select your name from the list"),
    email: z.string().email("Please enter a valid email address"),
    attending: z.boolean({ message: "Please let us know if you can attend" }),
    attendees: z.array(attendeeSchema).default([]),
    song_request: z
      .string()
      .max(200, "Please keep song requests under 200 characters")
      .optional()
      .nullable(),
    special_requests: z
      .string()
      .max(1000, "Please keep special requests under 1000 characters")
      .optional()
      .nullable(),
  })
  .refine((d) => !d.attending || d.attendees.length >= 1, {
    message: "At least one guest must be attending",
    path: ["attendees"],
  });

export type RSVPFormInput = z.input<typeof rsvpSchema>;
export type RSVPFormData = z.output<typeof rsvpSchema>;
