"use client";

import { ChevronDown } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { WEDDING_DETAILS } from "@/lib/constants";
import { useScrollTo } from "@/hooks/use-scroll-to";

export function HeroSection() {
  const scrollTo = useScrollTo();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-wedding-bg"
    >
      <main className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-10 px-6 py-24 text-center">
        <FadeIn delay={0.1}>
          <span className="mb-4 inline-block h-px w-16 bg-wedding-amber" />
          <h1 className="text-5xl font-serif tracking-tight text-wedding-black sm:text-7xl">
            {WEDDING_DETAILS.couple.person1} & {WEDDING_DETAILS.couple.person2}
          </h1>
          <span className="mt-4 inline-block h-px w-16 bg-wedding-amber" />
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-lg text-wedding-shade-light">
            We&apos;re getting married
          </p>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="h-1 w-8 rounded-full bg-wedding-accent" />
        </FadeIn>

        <StaggerContainer className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <StaggerItem>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium uppercase tracking-widest text-wedding-shade">
                Date
              </span>
              <span className="text-xl text-wedding-black-light">
                {WEDDING_DETAILS.date.full}
              </span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium uppercase tracking-widest text-wedding-shade">
                Location
              </span>
              <span className="text-xl text-wedding-black-light">
                {WEDDING_DETAILS.venue.ceremony.city}
              </span>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <FadeIn delay={0.7}>
          <ScaleOnHover scale={1.05}>
            <Button
              size="lg"
              onClick={() => scrollTo("rsvp")}
              className="mt-4 bg-wedding-amber text-white hover:bg-wedding-amber/90 cursor-pointer"
            >
              RSVP Now
            </Button>
          </ScaleOnHover>
        </FadeIn>

        <FadeIn delay={0.9}>
          <p className="text-xs text-wedding-shade-lightest">
            <span className="text-wedding-lime">&bull;</span> Save the date{" "}
            <span className="text-wedding-lime">&bull;</span>
          </p>
        </FadeIn>
      </main>

      {/* Scroll indicator */}
      <FadeIn
        delay={1.1}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollTo("schedule")}
          className="flex flex-col items-center gap-2 text-wedding-shade hover:text-wedding-amber transition-colors"
          aria-label="Scroll to next section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </FadeIn>
    </section>
  );
}
