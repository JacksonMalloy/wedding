"use client";

import { ExternalLink, Hotel, Plane, Car } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ACCOMMODATIONS, TRANSPORT_OPTIONS } from "@/lib/constants";
import type { BookingDetails } from "@/types";

const transportIcons = {
  airport: Plane,
  shuttle: Car,
  taxi: Car,
  rideshare: Car,
  rental: Car,
};

function BookingDrawer({
  hotelName,
  details,
}: {
  hotelName: string;
  details: BookingDetails;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full border-wedding-green text-wedding-green hover:bg-wedding-green hover:text-white cursor-pointer"
        >
          Book Now <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-[90vh] overflow-y-auto rounded-t-2xl bg-wedding-bg"
      >
        <SheetHeader className="border-b border-wedding-green/20 pb-4">
          <SheetTitle className="font-serif text-2xl text-wedding-black">
            Book at {hotelName}
          </SheetTitle>
          <SheetDescription className="text-wedding-shade">
            Reserved room block for the Coates/Malloy Wedding weekend.
          </SheetDescription>
        </SheetHeader>

        <div className="mx-auto w-full max-w-2xl space-y-6 p-4 text-sm text-wedding-shade">
          <section>
            <h3 className="font-semibold text-wedding-black mb-2">
              Dates &amp; Rates
            </h3>
            <ul className="space-y-1.5">
              {details.rates.map((rate) => (
                <li key={rate.date}>
                  <span className="font-medium text-wedding-black">
                    {rate.date}
                  </span>
                  {" — "}
                  {rate.rooms}
                </li>
              ))}
            </ul>
            {details.ratesNote && (
              <p className="mt-2 text-xs text-wedding-shade-light">
                {details.ratesNote}
              </p>
            )}
          </section>

          <section>
            <h3 className="font-semibold text-wedding-black mb-1">
              Reservation Deadline
            </h3>
            <p>{details.deadline}</p>
          </section>

          <section>
            <h3 className="font-semibold text-wedding-black mb-2">
              How to Book
            </h3>
            <div className="space-y-3">
              <div>
                <p>
                  <span className="font-medium text-wedding-black">
                    Online:
                  </span>{" "}
                  <a
                    href={details.onlineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-wedding-green hover:underline inline-flex items-center gap-1 break-all"
                  >
                    {details.onlineUrl}
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  </a>
                </p>
                <p className="mt-1 text-xs text-wedding-shade-light">
                  Enter Group ID{" "}
                  <span className="font-mono font-semibold text-wedding-black">
                    {details.groupId}
                  </span>{" "}
                  in the &quot;Group ID&quot; box.
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium text-wedding-black">
                    By phone:
                  </span>{" "}
                  <a
                    href={`tel:${details.phone.replace(/[^\d+]/g, "")}`}
                    className="text-wedding-green hover:underline"
                  >
                    {details.phone}
                  </a>
                </p>
                <p className="mt-1 text-xs text-wedding-shade-light">
                  {details.phoneInstructions}
                </p>
              </div>
            </div>
          </section>

          {details.paymentNote && (
            <p className="text-xs text-wedding-shade-light border-t border-wedding-green/20 pt-4">
              {details.paymentNote}
            </p>
          )}

          <Button
            asChild
            className="w-full bg-wedding-green text-white hover:bg-wedding-green/90"
          >
            <a
              href={details.onlineUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Booking Site <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

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

                  {hotel.bookingDetails ? (
                    <ScaleOnHover scale={1.05}>
                      <BookingDrawer
                        hotelName={hotel.name}
                        details={hotel.bookingDetails}
                      />
                    </ScaleOnHover>
                  ) : (
                    hotel.bookingUrl && (
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
                    )
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
