import type {
  NavItem,
  TimelineEvent,
  Accommodation,
  TransportOption,
  StoryMilestone,
  RegistryLink,
  FAQItem,
  MealPreference,
} from "@/types";

// Navigation Items
export const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "couple", label: "The Couple" },
  { id: "schedule", label: "Schedule" },
  { id: "travel", label: "Travel" },
  { id: "story", label: "Our Story" },
  { id: "registry", label: "Registry" },
  { id: "rsvp", label: "RSVP" },
  { id: "details", label: "Details" },
];

// Wedding Details
export const WEDDING_DETAILS = {
  couple: {
    person1: "Delina",
    person2: "Jackson",
  },
  date: {
    full: "Saturday, September 26, 2026",
    short: "09.26.26",
    day: "Saturday",
    month: "September",
    dayNumber: 26,
    year: 2026,
  },
  venue: {
    ceremony: {
      name: "The Olde Library",
      address: "48 John Street West",
      city: "Niagara-on-the-Lake, ON",
      time: "3:00 PM",
    },
    reception: {
      name: "The Olde Library",
      address: "48 John Street West",
      city: "Niagara-on-the-Lake, ON",
      time: "6:00 PM",
    },
  },
  hashtag: "#CoatesAndMalloy",
  guestCount: 45,
};

// Important Dates
export const IMPORTANT_DATES = {
  rsvpDeadline: "September 1, 2026",
  hotelBlockCutoff: "July 27, 2026",
};

// Event Schedule
export const SCHEDULE_EVENTS: TimelineEvent[] = [
  {
    time: "2:30 PM",
    title: "Guest Arrival",
    description: "Guests begin arriving for the ceremony",
    location: "The Olde Library",
  },
  {
    time: "3:00 PM",
    title: "Ceremony",
    description: "The wedding ceremony begins",
    location: "The Olde Library",
  },
  {
    time: "3:30 PM",
    title: "Ceremony Ends",
    description: "Ceremony concludes",
    location: "The Olde Library",
  },
  {
    time: "6:00 PM",
    title: "Cocktail Hour",
    description: "Enjoy drinks and hors d'oeuvres while we take photos",
    location: "The Olde Library",
  },
  {
    time: "7:00 PM",
    title: "Dinner Reception",
    description: "Dinner service, speeches, and celebration",
    location: "The Olde Library",
  },
  {
    time: "11:00 PM",
    title: "Late Night Bites",
    description: "Late night snacks and dancing continues",
    location: "The Olde Library",
  },
  {
    time: "1:00 AM",
    title: "Last Dance",
    description: "Festivities conclude",
    location: "The Olde Library",
  },
];

// Accommodations
export const ACCOMMODATIONS: Accommodation[] = [
  {
    name: "Pillar and Post",
    description:
      "Our wedding venue hotel with a reserved room block for guests. Book by July 27, 2026 for special rates.",
    address: "48 John Street West",
    phone: "(905) 468-2123",
    website: "https://www.vintage-hotels.com/pillar-and-post",
    bookingUrl: "https://www.vintage-hotels.com/pillar-and-post",
    priceRange: "Room block rates available",
  },
  {
    name: "Prince of Wales Hotel",
    description:
      "Historic luxury hotel in the heart of Niagara-on-the-Lake, walking distance to shops and restaurants.",
    address: "6 Picton Street",
    phone: "(905) 468-3246",
    website: "https://www.vintage-hotels.com/prince-of-wales",
    priceRange: "$$$$",
  },
  {
    name: "Queen's Landing",
    description:
      "Elegant Georgian-style hotel overlooking the Niagara River with harbour views.",
    address: "155 Byron Street",
    phone: "(905) 468-2195",
    website: "https://www.vintage-hotels.com/queens-landing",
    priceRange: "$$$",
  },
];

// Transportation
export const TRANSPORT_OPTIONS: TransportOption[] = [
  {
    type: "airport",
    name: "Toronto Pearson International (YYZ)",
    description: "Approximately 1.5 hours from Niagara-on-the-Lake",
    url: "https://www.torontopearson.com",
  },
  {
    type: "airport",
    name: "Buffalo Niagara International (BUF)",
    description: "Approximately 45 minutes from Niagara-on-the-Lake (US border crossing required)",
    url: "https://www.buffaloairport.com",
  },
  {
    type: "rideshare",
    name: "Uber / Lyft",
    description: "Rideshare services are available in the Niagara region",
  },
];

// Our Story
export const STORY_MILESTONES: StoryMilestone[] = [
  {
    date: "September 15, 2023",
    title: "How We Met",
    description:
      "We met at the Paddlewheeler Pub in New Westminster, BC. The pub has since closed, but our story was just beginning.",
  },
  {
    date: "September 26, 2023",
    title: "Made It Official",
    description:
      "Just 11 days later, Jackson asked Delina to be his girlfriend. She said yes.",
  },
  {
    date: "February 29, 2024",
    title: "Moving In Together",
    description:
      "On the rarest of days—a leap day—we took the leap and moved in together.",
  },
  {
    date: "November 12, 2025",
    title: "The Proposal",
    description:
      "On Ucluelet's Wild Pacific Trail at the Lighthouse Loop, Jackson got down on one knee. She said yes (again).",
  },
];

// Registry Links (Placeholder - update with your registries!)
export const REGISTRY_LINKS: RegistryLink[] = [
  {
    name: "Amazon",
    description: "Our Amazon wedding registry",
    url: "https://amazon.com",
    icon: "gift",
  },
  {
    name: "Crate & Barrel",
    description: "Home goods and decor",
    url: "https://crateandbarrel.com",
    icon: "home",
  },
  {
    name: "Honeymoon Fund",
    description: "Contribute to our dream honeymoon",
    url: "https://example.com",
    icon: "plane",
  },
];

// FAQ Items
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the dress code?",
    answer:
      "Cocktail attire. We suggest elegant dresses or jumpsuits for ladies and suits or dress pants with a button-down for gentlemen.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "Due to venue capacity, we can only accommodate guests named on the invitation. Please refer to your RSVP for the number of seats reserved in your honor.",
  },
  {
    question: "Are children welcome?",
    answer:
      "Children are welcome! A children's meal will be available. Please include them in your RSVP count.",
  },
  {
    question: "Is there parking at the venue?",
    answer:
      "Yes, complimentary parking is available at Pillar and Post for hotel guests and event attendees.",
  },
  {
    question: "What time should I book my hotel?",
    answer:
      "Our room block at Pillar and Post expires July 27, 2026. Book before then for special wedding rates! Hotel check-in is at 3:00 PM and check-out is at 11:00 AM.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We kindly ask for an unplugged ceremony. Please silence your phones and put away cameras so everyone can be fully present. Our photographer will capture every moment!",
  },
  {
    question: "Will the ceremony be indoors or outdoors?",
    answer:
      "Both the ceremony and reception will be held indoors at The Olde Library.",
  },
  {
    question: "Are there any venue restrictions I should know about?",
    answer:
      "The venue does not permit confetti, rice, birdseed, glitter, or sparklers. Battery-operated candles are recommended.",
  },
];

// Meal Options
export const MEAL_OPTIONS: { value: MealPreference; label: string }[] = [
  { value: "beef", label: "Beef" },
  { value: "chicken", label: "Chicken" },
  { value: "fish", label: "Fish" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
];

// Contact Info
export const CONTACT = {
  emails: [
    "jacksmalloy+wedding@gmail.com",
    "delina.coates+wedding@gmail.com",
  ],
  phone: "604-505-9772",
};
