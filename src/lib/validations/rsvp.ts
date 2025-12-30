import { z } from "zod";

export const rsvpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  attending: z.boolean({ message: "Please let us know if you can attend" }),
  guest_count: z
    .number()
    .min(1, "At least 1 guest")
    .max(5, "Maximum 5 guests")
    .default(1),
  meal_preference: z
    .string()
    .optional()
    .nullable(),
  dietary_restrictions: z
    .string()
    .max(500, "Please keep dietary restrictions under 500 characters")
    .optional()
    .nullable(),
  special_requests: z
    .string()
    .max(1000, "Please keep special requests under 1000 characters")
    .optional()
    .nullable(),
});

// Input type (what the form submits)
export type RSVPFormInput = z.input<typeof rsvpSchema>;

// Output type (after validation with defaults applied)
export type RSVPFormData = z.output<typeof rsvpSchema>;
