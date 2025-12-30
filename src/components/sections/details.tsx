"use client";

import { Shirt, Sun, HelpCircle } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export function DetailsSection() {
  return (
    <SectionWrapper
      id="details"
      title="Details"
      subtitle="Everything else you need to know"
    >
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left column: Dress Code & Weather */}
        <div className="space-y-8">
          {/* Dress Code */}
          <ScrollReveal>
            <div className="bg-white rounded-lg p-6 border border-wedding-shade-lightest">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-wedding-amber/10 flex items-center justify-center">
                  <Shirt className="h-5 w-5 text-wedding-amber" />
                </div>
                <h3 className="text-xl font-semibold text-wedding-black">
                  Dress Code
                </h3>
              </div>
              <div className="space-y-4 text-wedding-shade">
                <p>
                  <strong className="text-wedding-black">Cocktail Attire</strong>
                </p>
                <p className="text-sm">
                  For ladies, we suggest elegant cocktail dresses, jumpsuits, or dressy
                  separates. For gentlemen, suits or dress pants with a button-down
                  shirt are perfect.
                </p>
                <p className="text-sm text-wedding-shade-light">
                  The ceremony and reception will be held indoors at The Olde Library.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Weather */}
          <ScrollReveal>
            <div className="bg-white rounded-lg p-6 border border-wedding-shade-lightest">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-wedding-amber/10 flex items-center justify-center">
                  <Sun className="h-5 w-5 text-wedding-amber" />
                </div>
                <h3 className="text-xl font-semibold text-wedding-black">
                  Weather
                </h3>
              </div>
              <div className="space-y-4 text-wedding-shade">
                <p className="text-sm">
                  Late September in Niagara-on-the-Lake offers beautiful early fall weather
                  with daytime highs around 17-23°C (63-73°F) and evening temperatures
                  dropping to 9-16°C (48-61°F).
                </p>
                <p className="text-sm">
                  Evenings can be cool, so we recommend bringing a light jacket, shawl,
                  or wrap. September is one of the driest months in the region with
                  plenty of sunshine expected.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right column: FAQ */}
        <div>
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-wedding-amber/10 flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-wedding-amber" />
              </div>
              <h3 className="text-xl font-semibold text-wedding-black">
                Frequently Asked Questions
              </h3>
            </div>
          </ScrollReveal>

          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-wedding-black hover:text-wedding-amber">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-wedding-shade">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionWrapper>
  );
}
