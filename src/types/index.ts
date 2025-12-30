// RSVP Types
export interface RSVP {
  id: string;
  created_at: string;
  updated_at?: string;
  name: string;
  email: string;
  attending: boolean;
  guest_count: number;
  meal_preference: string | null;
  dietary_restrictions: string | null;
  special_requests: string | null;
}

export type RSVPInsert = Omit<RSVP, "id" | "created_at" | "updated_at">;

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
}

// Timeline/Schedule Types
export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  location?: string;
}

// Travel/Accommodation Types
export interface Accommodation {
  name: string;
  description: string;
  address: string;
  phone?: string;
  website?: string;
  bookingUrl?: string;
  priceRange?: string;
  image?: string;
}

export interface TransportOption {
  type: "airport" | "shuttle" | "taxi" | "rideshare" | "rental";
  name: string;
  description: string;
  url?: string;
}

// Story Types
export interface StoryMilestone {
  date: string;
  title: string;
  description: string;
  image?: string;
}

// Registry Types
export interface RegistryLink {
  name: string;
  description: string;
  url: string;
  icon?: string;
}

// FAQ Types
export interface FAQItem {
  question: string;
  answer: string;
}

// Section Types
export type SectionId =
  | "hero"
  | "schedule"
  | "travel"
  | "story"
  | "registry"
  | "rsvp"
  | "details";

// Meal Preferences
export type MealPreference = "beef" | "chicken" | "vegetarian" | "vegan" | "fish";
