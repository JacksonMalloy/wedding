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
export interface BookingRate {
  date: string;
  rooms: string;
}

export interface BookingDetails {
  rates: BookingRate[];
  ratesNote?: string;
  deadline: string;
  onlineUrl: string;
  groupId: string;
  phone: string;
  phoneInstructions: string;
  paymentNote?: string;
}

export interface Accommodation {
  name: string;
  description: string;
  address: string;
  phone?: string;
  website?: string;
  bookingUrl?: string;
  priceRange?: string;
  image?: string;
  bookingDetails?: BookingDetails;
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
  images?: string[];
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
export type MealPreference = "beef" | "vegetarian";
