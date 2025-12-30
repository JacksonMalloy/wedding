"use client";

import { Heart } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { STORY_MILESTONES, WEDDING_DETAILS } from "@/lib/constants";

export function StorySection() {
  return (
    <SectionWrapper
      id="story"
      title="Our Story"
      subtitle={`How ${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2} found each other`}
      background="alternate"
    >
      <StaggerContainer className="space-y-12 md:space-y-0">
        {STORY_MILESTONES.map((milestone, index) => (
          <StaggerItem key={index}>
            <div
              className={`md:flex items-center gap-8 ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              } ${index !== 0 ? "md:mt-16" : ""}`}
            >
              {/* Image placeholder */}
              <div className="md:w-1/2 mb-6 md:mb-0">
                <ScrollReveal>
                  <div className="aspect-[4/3] rounded-lg bg-wedding-shade-lightest flex items-center justify-center">
                    <Heart className="h-12 w-12 text-wedding-amber/30" />
                  </div>
                </ScrollReveal>
              </div>

              {/* Content */}
              <div
                className={`md:w-1/2 ${
                  index % 2 === 0 ? "md:pl-8" : "md:pr-8"
                }`}
              >
                <ScrollReveal>
                  <span className="inline-block px-3 py-1 bg-wedding-amber/10 text-wedding-amber text-sm rounded-full mb-4">
                    {milestone.date}
                  </span>
                  <h3 className="text-2xl font-semibold text-wedding-black mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-wedding-shade leading-relaxed">
                    {milestone.description}
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Love quote */}
      <ScrollReveal className="mt-16 text-center">
        <blockquote className="max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl italic text-wedding-black-light">
            &ldquo;And suddenly, all the love songs were about you.&rdquo;
          </p>
        </blockquote>
      </ScrollReveal>
    </SectionWrapper>
  );
}
