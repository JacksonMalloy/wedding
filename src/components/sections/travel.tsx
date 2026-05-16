"use client";

import { ExternalLink, Hotel, Plane, Car } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ACCOMMODATIONS, TRANSPORT_OPTIONS } from "@/lib/constants";

const transportIcons = {
  airport: Plane,
  shuttle: Car,
  taxi: Car,
  rideshare: Car,
  rental: Car,
};

export function TravelSection() {
  return (
    <SectionWrapper
      id="travel"
      title="Travel & Accommodations"
      subtitle="Everything you need to plan your trip"
    >
      {/* Accommodations */}
      <div className="mb-16">
        <ScrollReveal>
          <h3 className="text-2xl font-semibold text-wedding-black mb-6 text-center">
            Where to Stay
          </h3>
        </ScrollReveal>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ACCOMMODATIONS.map((hotel, index) => (
            <StaggerItem key={index}>
              <Card className="h-full bg-wedding-green-light/30 border-wedding-green/20 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-wedding-black">
                      {hotel.name}
                    </CardTitle>
                    <Hotel className="h-5 w-5 text-wedding-green" />
                  </div>
                  {hotel.priceRange && (
                    <Badge variant="secondary" className="w-fit bg-wedding-green-light text-wedding-black-light">
                      {hotel.priceRange}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-wedding-shade">
                    {hotel.description}
                  </p>
                  <div className="text-sm text-wedding-shade-light">
                    <p>{hotel.address}</p>
                    {hotel.phone && <p>{hotel.phone}</p>}
                  </div>
                  {hotel.bookingDetails && (
                    <div className="space-y-4 rounded-md border border-wedding-green/30 bg-white/60 p-4 text-sm text-wedding-shade">
                      <div>
                        <p className="font-semibold text-wedding-black mb-2">
                          Dates &amp; Rates
                        </p>
                        <ul className="space-y-1.5">
                          {hotel.bookingDetails.rates.map((rate) => (
                            <li key={rate.date}>
                              <span className="font-medium text-wedding-black">
                                {rate.date}
                              </span>
                              {" — "}
                              {rate.rooms}
                            </li>
                          ))}
                        </ul>
                        {hotel.bookingDetails.ratesNote && (
                          <p className="mt-2 text-xs text-wedding-shade-light">
                            {hotel.bookingDetails.ratesNote}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-wedding-black mb-1">
                          Reservation Deadline
                        </p>
                        <p>{hotel.bookingDetails.deadline}</p>
                      </div>

                      <div>
                        <p className="font-semibold text-wedding-black mb-2">
                          How to Book
                        </p>
                        <div className="space-y-2">
                          <p>
                            <span className="font-medium text-wedding-black">
                              Online:
                            </span>{" "}
                            <a
                              href={hotel.bookingDetails.onlineUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-wedding-green hover:underline inline-flex items-center gap-1 break-all"
                            >
                              {hotel.bookingDetails.onlineUrl}
                              <ExternalLink className="h-3 w-3 flex-shrink-0" />
                            </a>
                            <span className="block mt-1 text-xs text-wedding-shade-light">
                              Enter Group ID{" "}
                              <span className="font-mono font-semibold text-wedding-black">
                                {hotel.bookingDetails.groupId}
                              </span>{" "}
                              in the &quot;Group ID&quot; box.
                            </span>
                          </p>
                          <p>
                            <span className="font-medium text-wedding-black">
                              By phone:
                            </span>{" "}
                            <a
                              href={`tel:${hotel.bookingDetails.phone.replace(/[^\d+]/g, "")}`}
                              className="text-wedding-green hover:underline"
                            >
                              {hotel.bookingDetails.phone}
                            </a>
                            <span className="block mt-1 text-xs text-wedding-shade-light">
                              {hotel.bookingDetails.phoneInstructions}
                            </span>
                          </p>
                        </div>
                      </div>

                      {hotel.bookingDetails.paymentNote && (
                        <p className="text-xs text-wedding-shade-light">
                          {hotel.bookingDetails.paymentNote}
                        </p>
                      )}
                    </div>
                  )}

                  {hotel.bookingUrl && !hotel.bookingDetails && (
                    <ScaleOnHover scale={1.05}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-wedding-green text-wedding-green hover:bg-wedding-green hover:text-white cursor-pointer"
                        asChild
                      >
                        <a
                          href={hotel.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Book Now <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    </ScaleOnHover>
                  )}
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Transportation */}
      <div>
        <ScrollReveal>
          <h3 className="text-2xl font-semibold text-wedding-black mb-6 text-center">
            Getting There
          </h3>
        </ScrollReveal>

        <StaggerContainer className="grid gap-4 md:grid-cols-3">
          {TRANSPORT_OPTIONS.map((option, index) => {
            const Icon = transportIcons[option.type];
            return (
              <StaggerItem key={index}>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-wedding-green-light/30 border border-wedding-green/20">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-wedding-green/20 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-wedding-green" />
                  </div>
                  <div>
                    <h4 className="font-medium text-wedding-black">
                      {option.name}
                    </h4>
                    <p className="text-sm text-wedding-shade mt-1">
                      {option.description}
                    </p>
                    {option.url && (
                      <a
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-wedding-green hover:underline inline-flex items-center gap-1 mt-2"
                      >
                        Learn more <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  );
}
