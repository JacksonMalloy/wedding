"use client";

import { Heart } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal, FadeIn } from "@/components/motion";
import { cn } from "@/lib/utils";

interface PersonCardProps {
  name: string;
  role: string;
  texture: "bricks-1" | "bricks-2" | "floor-3" | "floor-4";
  facts: string[];
  className?: string;
  texturePosition: "left" | "right";
  accentColor: string;
}

function PersonCard({
  name,
  role,
  texture,
  facts,
  className,
  texturePosition,
  accentColor,
}: PersonCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center text-center py-12 px-6 md:px-12 overflow-hidden",
        className
      )}
    >

      {/* Content */}
      <div className="relative z-10">
        <ScrollReveal>
          {/* Photo placeholder */}
          <div
            className={cn(
              "w-48 h-48 md:w-56 md:h-56 rounded-full mx-auto mb-6 flex items-center justify-center",
              "bg-gradient-to-br shadow-lg border-4",
              accentColor
            )}
          >
            <span className="text-6xl md:text-7xl font-semibold text-white/90">
              {name.charAt(0)}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <p
            className={cn(
              "text-sm uppercase tracking-[0.3em] mb-2",
              "text-wedding-shade"
            )}
          >
            {role}
          </p>
          <h3 className="text-3xl md:text-4xl font-semibold text-wedding-black mb-6">
            {name}
          </h3>
        </ScrollReveal>

        {/* Fun facts */}
        <ScrollReveal>
          <ul className="space-y-3 max-w-xs mx-auto">
            {facts.map((fact, index) => (
              <li
                key={index}
                className="text-sm text-wedding-shade flex items-start gap-2"
              >
                <span
                  className={cn(
                    "mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0",
                    accentColor.includes("amber")
                      ? "bg-wedding-amber"
                      : "bg-wedding-lime"
                  )}
                />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </div>
  );
}

export function CoupleSection() {
  return (
    <SectionWrapper
      id="couple"
      title="Meet the Couple"
      subtitle="Two hearts, one love story"
      background="alternate"
    >
      <div className="relative">
        {/* Split screen cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-0">
          {/* Delina - The Bride */}
          <PersonCard
            name="Delina"
            role="The Bride"
            texture="bricks-1"
            texturePosition="left"
            accentColor="from-wedding-amber/80 to-wedding-amber border-wedding-amber/30"
            facts={[
              "Definitely NOT a morning person",
              "Matcha over everything",
              "Can recite The Office word for word",
              "Loves knitting & corny TV shows",
              "Calls everyone a sick freak",
              "Black cat energy",
            ]}
            className="md:border-r border-wedding-shade-lightest"
          />

          {/* Jackson - The Groom */}
          <PersonCard
            name="Jackson"
            role="The Groom"
            texture="floor-3"
            texturePosition="right"
            accentColor="from-wedding-lime/80 to-wedding-lime border-wedding-lime/30"
            facts={[
              "Annoyingly a morning person",
              "Runs on way too much coffee",
              "Coder by trade",
              "Strength training & soccer",
              "Bases shows off IMDB ratings",
              "Golden retriever energy",
            ]}
          />
        </div>

        {/* Center heart decoration */}
        <FadeIn
          delay={0.5}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
        >
          <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-wedding-accent">
            <Heart className="h-8 w-8 text-wedding-amber fill-wedding-amber" />
          </div>
        </FadeIn>

        {/* Mobile heart */}
        <FadeIn delay={0.5} className="flex justify-center -mt-4 mb-4 md:hidden">
          <div className="h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-wedding-accent">
            <Heart className="h-6 w-6 text-wedding-amber fill-wedding-amber" />
          </div>
        </FadeIn>
      </div>

      {/* Bottom quote */}
      <ScrollReveal className="text-center mt-12 md:mt-16">
        <p className="text-lg md:text-xl italic text-wedding-black-light max-w-2xl mx-auto">
          &ldquo;We may not have it all together, but together we have it all.&rdquo;
        </p>
      </ScrollReveal>
    </SectionWrapper>
  );
}
