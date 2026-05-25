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
            <div className="bg-wedding-green-light/30 rounded-lg p-6 border border-wedding-green/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-wedding-green/20 flex items-center justify-center">
                  <Shirt className="h-5 w-5 text-wedding-green" />
                </div>
                <h3 className="text-xl font-semibold text-wedding-black">
                  Dress Code
                </h3>
              </div>
              <div className="space-y-4 text-wedding-shade">
                <p>
                  <strong className="text-wedding-black">Business Casual</strong>
                </p>
                <p className="text-sm">
                  Wear whatever makes you most comfortable.
                </p>
                <p className="text-sm text-wedding-shade-light">
                  The ceremony and reception will be held indoors at The Olde Library.
                </p>
                <div className="pt-2">
                  <p className="text-sm">
                    For anyone curious, here are our wedding colours:
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-3">
                    {[
                      { name: "Pink", hex: "#F6EBE7" },
                      { name: "Green", hex: "#B7B7A4" },
                      { name: "Orange", hex: "#D29A89" },
                      { name: "Dark Blue", hex: "#6D8799" },
                      { name: "Light Blue", hex: "#B6C5D5" },
                    ].map((color) => (
                      <li
                        key={color.hex}
                        className="flex items-center gap-2 text-xs text-wedding-shade-light"
                      >
                        <span
                          aria-hidden
                          className="h-5 w-5 rounded-full border border-wedding-green/30"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Weather */}
          <ScrollReveal>
            <div className="bg-wedding-green-light/30 rounded-lg p-6 border border-wedding-green/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-wedding-green/20 flex items-center justify-center">
                  <Sun className="h-5 w-5 text-wedding-green" />
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
              <div className="h-10 w-10 rounded-full bg-wedding-green/20 flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-wedding-green" />
              </div>
              <h3 className="text-xl font-semibold text-wedding-black">
                Frequently Asked Questions
              </h3>
            </div>
          </ScrollReveal>

          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-wedding-black hover:text-wedding-green">
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
