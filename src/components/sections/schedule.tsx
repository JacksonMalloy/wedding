"use client";

import { Clock, MapPin } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { SCHEDULE_EVENTS, WEDDING_DETAILS } from "@/lib/constants";

export function ScheduleSection() {
  return (
    <SectionWrapper
      id="schedule"
      title="Wedding Day Schedule"
      subtitle={WEDDING_DETAILS.date.full}
      background="alternate"
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-wedding-amber/30 -translate-x-1/2" />

        <StaggerContainer className="space-y-8 md:space-y-12">
          {SCHEDULE_EVENTS.map((event, index) => (
            <StaggerItem key={index}>
              <div
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 z-10">
                  <div className="h-3 w-3 rounded-full bg-wedding-amber ring-4 ring-wedding-bg" />
                </div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <ScrollReveal>
                    <div className="bg-wedding-bg rounded-lg p-6 shadow-sm border border-wedding-shade-lightest">
                      <div
                        className={`flex items-center gap-2 text-wedding-amber mb-2 ${
                          index % 2 === 0 ? "md:justify-end" : ""
                        }`}
                      >
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">{event.time}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-wedding-black mb-2">
                        {event.title}
                      </h3>

                      <p className="text-wedding-shade text-sm mb-3">
                        {event.description}
                      </p>

                      {event.location && (
                        <div
                          className={`flex items-center gap-1.5 text-wedding-shade-light text-xs ${
                            index % 2 === 0 ? "md:justify-end" : ""
                          }`}
                        >
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
}
