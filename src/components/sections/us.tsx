"use client";

import { Heart, Coffee, Tv, Cat, Utensils } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";

interface UsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function UsItem({ icon, title, description }: UsItemProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="h-14 w-14 rounded-full bg-wedding-green-light flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-wedding-black mb-2">{title}</h3>
      <p className="text-sm text-wedding-shade leading-relaxed">{description}</p>
    </div>
  );
}

const US_ITEMS = [
  {
    icon: <Coffee className="h-6 w-6 text-wedding-green" />,
    title: "Morning Rituals",
    description: "Jackson makes the coffee while Delina slowly wakes up. It's a perfect balance.",
  },
  {
    icon: <Tv className="h-6 w-6 text-wedding-green" />,
    title: "TV Time",
    description: "She picks the shows, he checks the IMDB ratings. They meet in the middle (sometimes).",
  },
  {
    icon: <Cat className="h-6 w-6 text-wedding-green" />,
    title: "Cat Parents",
    description: "Proud parents to their fur baby. Jackson never saw himself as a cat dad, but here we are.",
  },
  {
    icon: <Heart className="h-6 w-6 text-wedding-green" />,
    title: "Gym Partners",
    description: "Jackson plays gym coach, Delina pretends to listen. Somehow gains were made.",
  },
  {
    icon: <Coffee className="h-6 w-6 text-wedding-green" />,
    title: "Cafe Hopping",
    description: "Weekend cafe exploring is their thing. She knits, he codes. Cozy productivity at its finest.",
  },
  {
    icon: <Utensils className="h-6 w-6 text-wedding-green" />,
    title: "Game Night Champions",
    description: "Board games with friends and family are a must. Euchre is the favorite. Hands down.",
  },
];

export function UsSection() {
  return (
    <SectionWrapper
      id="us"
      title="Us"
      subtitle="What makes us, us"
      background="default"
    >
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {US_ITEMS.map((item, index) => (
          <StaggerItem key={index}>
            <ScrollReveal>
              <UsItem
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </ScrollReveal>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
