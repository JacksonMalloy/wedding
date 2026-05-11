"use client";

import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronsUpDown,
  Heart,
  Loader2,
  PartyPopper,
} from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScaleOnHover, ScrollReveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { rsvpSchema, type RSVPFormInput } from "@/lib/validations/rsvp";
import {
  ALL_GUESTS,
  GUEST_BY_ID,
  PARTY_BY_ID,
  guestDisplayName,
  type Guest,
} from "@/lib/guests";
import {
  IMPORTANT_DATES,
  MEAL_OPTIONS,
  WEDDING_DETAILS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function RSVPSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [search, setSearch] = useState("");

  const form = useForm<RSVPFormInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      party_id: "",
      primary_guest_id: "",
      email: "",
      attending: undefined,
      attendees: [],
      song_request: "",
      special_requests: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attendees",
  });

  const partyId = form.watch("party_id");
  const primaryGuestId = form.watch("primary_guest_id");
  const attending = form.watch("attending");

  const party = useMemo(
    () => (partyId ? PARTY_BY_ID[partyId] : undefined),
    [partyId]
  );

  const primaryGuest = primaryGuestId ? GUEST_BY_ID[primaryGuestId] : undefined;

  useEffect(() => {
    if (!attending) {
      if (fields.length > 0) form.setValue("attendees", []);
      return;
    }
    if (
      primaryGuestId &&
      !fields.some((f) => f.guest_id === primaryGuestId)
    ) {
      const g = GUEST_BY_ID[primaryGuestId];
      if (g) {
        append({
          guest_id: g.id,
          display_name: guestDisplayName(g),
          meal_preference: null,
          dietary_restrictions: "",
        });
      }
    }
  }, [attending, primaryGuestId, fields, append, form]);

  function selectGuest(guestId: string) {
    const g = GUEST_BY_ID[guestId];
    if (!g) return;
    form.setValue("party_id", g.partyId, { shouldValidate: true });
    form.setValue("primary_guest_id", g.id, { shouldValidate: true });
    form.setValue("attendees", []);
    setSearch("");
    setComboboxOpen(false);
  }

  function isMemberSelected(memberId: string) {
    return fields.some((f) => f.guest_id === memberId);
  }

  function toggleMember(member: Guest) {
    if (member.id === primaryGuestId) return;
    const idx = fields.findIndex((f) => f.guest_id === member.id);
    if (idx >= 0) {
      remove(idx);
    } else {
      append({
        guest_id: member.id,
        display_name: guestDisplayName(member),
        meal_preference: null,
        dietary_restrictions: "",
      });
    }
  }

  async function onSubmit(data: RSVPFormInput) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      <SectionWrapper id="rsvp" title="Thank You!" background="accent">
        <ScrollReveal className="text-center max-w-lg mx-auto">
          <div className="bg-wedding-green-light/40 rounded-lg p-8 shadow-sm border border-wedding-green/20">
            <PartyPopper className="h-16 w-16 text-wedding-green mx-auto mb-4" />
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
        <div className="bg-wedding-green-light/40 rounded-lg p-6 md:p-8 shadow-sm border border-wedding-green/20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Name picker */}
              <FormField
                control={form.control}
                name="primary_guest_id"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Find Your Name *</FormLabel>
                    <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between font-normal bg-white",
                              !primaryGuest && "text-wedding-shade"
                            )}
                          >
                            {primaryGuest
                              ? guestDisplayName(primaryGuest)
                              : "Search for your name…"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0 w-[var(--radix-popover-trigger-width)]"
                        align="start"
                      >
                        <Command shouldFilter={false}>
                          <CommandInput
                            placeholder="Type your name…"
                            value={search}
                            onValueChange={setSearch}
                          />
                          <CommandList>
                            {search.trim().length === 0 ? (
                              <div className="py-6 text-center text-sm text-wedding-shade">
                                Start typing to find your name…
                              </div>
                            ) : (
                              (() => {
                                const q = search.trim().toLowerCase();
                                const matches = ALL_GUESTS.filter((g) => {
                                  const aliases = (g.searchAliases ?? []).join(" ");
                                  return `${g.first} ${g.last} ${aliases}`
                                    .toLowerCase()
                                    .includes(q);
                                });
                                if (matches.length === 0) {
                                  return (
                                    <CommandEmpty>
                                      No match — please double-check your invitation.
                                    </CommandEmpty>
                                  );
                                }
                                return (
                                  <CommandGroup>
                                    {matches.map((g) => (
                                      <CommandItem
                                        key={g.id}
                                        value={g.id}
                                        onSelect={() => selectGuest(g.id)}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            primaryGuestId === g.id
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {guestDisplayName(g)}
                                        {g.partyLabel && (
                                          <span className="ml-2 text-xs text-wedding-shade">
                                            {g.partyLabel}
                                          </span>
                                        )}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                );
                              })()
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
              {primaryGuest && (
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
                            <Label
                              htmlFor="attending-yes"
                              className="cursor-pointer"
                            >
                              Joyfully Accept
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="attending-no" />
                            <Label
                              htmlFor="attending-no"
                              className="cursor-pointer"
                            >
                              Regretfully Decline
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Party members */}
              {attending && party && (
                <div className="space-y-4">
                  <div>
                    <FormLabel>Your Party</FormLabel>
                    <p className="text-sm text-wedding-shade mt-1">
                      Check off everyone in your party who&apos;ll be joining.
                    </p>
                  </div>

                  {party.members.map((member) => {
                    const selected = isMemberSelected(member.id);
                    const fieldIndex = fields.findIndex(
                      (f) => f.guest_id === member.id
                    );
                    const isPrimary = member.id === primaryGuestId;

                    return (
                      <div
                        key={member.id}
                        className={cn(
                          "rounded-lg border bg-white/60 p-4 transition-colors",
                          selected
                            ? "border-wedding-green/40"
                            : "border-wedding-green/15"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={`member-${member.id}`}
                            checked={selected}
                            disabled={isPrimary}
                            onCheckedChange={() => toggleMember(member)}
                          />
                          <Label
                            htmlFor={`member-${member.id}`}
                            className="cursor-pointer text-wedding-black font-medium"
                          >
                            {guestDisplayName(member)}
                            {isPrimary && (
                              <span className="ml-2 text-xs text-wedding-shade">
                                (you)
                              </span>
                            )}
                            {member.isPlusOne && !isPrimary && (
                              <span className="ml-2 text-xs text-wedding-shade">
                                (plus one)
                              </span>
                            )}
                          </Label>
                        </div>

                        {selected && fieldIndex >= 0 && (
                          <div className="mt-4 space-y-4 pl-7">
                            {member.isPlusOne && (
                              <FormField
                                control={form.control}
                                name={`attendees.${fieldIndex}.display_name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Their full name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Their name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}

                            <FormField
                              control={form.control}
                              name={`attendees.${fieldIndex}.meal_preference`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Meal preference</FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      value={field.value ?? undefined}
                                      className="flex gap-4 pt-1"
                                    >
                                      {MEAL_OPTIONS.map((opt) => (
                                        <div
                                          key={opt.value}
                                          className="flex items-center space-x-2"
                                        >
                                          <RadioGroupItem
                                            value={opt.value}
                                            id={`meal-${member.id}-${opt.value}`}
                                          />
                                          <Label
                                            htmlFor={`meal-${member.id}-${opt.value}`}
                                            className="cursor-pointer"
                                          >
                                            {opt.label}
                                          </Label>
                                        </div>
                                      ))}
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`attendees.${fieldIndex}.dietary_restrictions`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Dietary restrictions or allergies
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Anything we should know?"
                                      {...field}
                                      value={field.value ?? ""}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <FormField
                    control={form.control}
                    name="attendees"
                    render={() => <FormMessage />}
                  />
                </div>
              )}

              {/* Song Request */}
              {attending && (
                <FormField
                  control={form.control}
                  name="song_request"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Song Request</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="A song that will get you on the dance floor"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Special Requests */}
              <FormField
                control={form.control}
                name="special_requests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message for the couple</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requests or a note for us?"
                        {...field}
                        value={field.value ?? ""}
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
                  className="w-full bg-wedding-green text-white hover:bg-wedding-green/90 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting…
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
