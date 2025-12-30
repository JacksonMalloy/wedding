"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PartyPopper, Heart } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal, ScaleOnHover } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { rsvpSchema, type RSVPFormInput } from "@/lib/validations/rsvp";
import { MEAL_OPTIONS, WEDDING_DETAILS, IMPORTANT_DATES } from "@/lib/constants";
import { toast } from "sonner";

export function RSVPSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<RSVPFormInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      email: "",
      attending: undefined,
      guest_count: 1,
      meal_preference: "",
      dietary_restrictions: "",
      special_requests: "",
    },
  });

  const attending = form.watch("attending");

  async function onSubmit(data: RSVPFormInput) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit RSVP");
      }

      setIsSubmitted(true);
      toast.success("RSVP submitted successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit RSVP"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <SectionWrapper
        id="rsvp"
        title="Thank You!"
        background="accent"
      >
        <ScrollReveal className="text-center max-w-lg mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <PartyPopper className="h-16 w-16 text-wedding-amber mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-wedding-black mb-3">
              We&apos;ve received your RSVP!
            </h3>
            <p className="text-wedding-shade">
              {attending
                ? `We can't wait to celebrate with you on ${WEDDING_DETAILS.date.full}!`
                : "We're sorry you can't make it. You'll be missed!"}
            </p>
            <ScaleOnHover scale={1.05}>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
                variant="outline"
                className="mt-6 cursor-pointer"
              >
                Submit Another RSVP
              </Button>
            </ScaleOnHover>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="rsvp"
      title="RSVP"
      subtitle={`Please respond by ${IMPORTANT_DATES.rsvpDeadline}`}
      background="accent"
    >
      <ScrollReveal className="max-w-xl mx-auto">
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Attending */}
              <FormField
                control={form.control}
                name="attending"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Will you be attending? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                        value={field.value?.toString()}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="attending-yes" />
                          <Label htmlFor="attending-yes" className="cursor-pointer">
                            Joyfully Accept
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="attending-no" />
                          <Label htmlFor="attending-no" className="cursor-pointer">
                            Regretfully Decline
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditional fields for attending guests */}
              {attending && (
                <>
                  {/* Guest Count */}
                  <FormField
                    control={form.control}
                    name="guest_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Guests</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                          value={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of guests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "guest" : "guests"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Meal Preference */}
                  <FormField
                    control={form.control}
                    name="meal_preference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meal Preference</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select meal preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {MEAL_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dietary Restrictions */}
                  <FormField
                    control={form.control}
                    name="dietary_restrictions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Restrictions or Allergies</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please let us know of any dietary restrictions or allergies"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Special Requests */}
              <FormField
                control={form.control}
                name="special_requests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests or Messages</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requests or a message for the couple?"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <ScaleOnHover scale={1.05}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-wedding-amber text-white hover:bg-wedding-amber/90 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-4 w-4" />
                      Submit RSVP
                    </>
                  )}
                </Button>
              </ScaleOnHover>
            </form>
          </Form>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
