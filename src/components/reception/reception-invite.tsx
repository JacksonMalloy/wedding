"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { CalendarDays, Check, Clock3, MapPin, Plus, X } from "lucide-react";
import { RECEPTION_DETAILS } from "@/lib/reception-details";
import { MAX_RECEPTION_PLUS_GUESTS } from "@/lib/validations/reception-rsvp";

type Attendance = "" | "yes" | "no";

type FormState = {
  name: string;
  email: string;
  attending: Attendance;
  dietaryRestrictions: string;
  message: string;
  website: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  attending: "",
  dietaryRestrictions: "",
  message: "",
  website: "",
};

const fieldClassName =
  "mt-2 min-h-12 w-full border-0 border-b border-[#14292B]/35 bg-transparent px-0 py-3 text-base text-[#1D211F] outline-none transition-colors placeholder:text-[#1D211F]/38 focus:border-[#14292B] focus-visible:ring-0";

export function ReceptionInvite({
  inviteToken,
  rsvpOpen,
}: {
  inviteToken: string;
  rsvpOpen: boolean;
}) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  // Names of the people the guest is bringing; blank rows are dropped on submit.
  const [guests, setGuests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submissionRef = useRef<{ body: string; id: string } | null>(null);
  const submittingRef = useRef(false);
  const guestInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const addGuest = () => {
    if (guests.length >= MAX_RECEPTION_PLUS_GUESTS) return;
    const index = guests.length;
    setGuests((current) => [...current, ""]);
    requestAnimationFrame(() => guestInputRefs.current[index]?.focus());
  };

  const updateGuest = (index: number, value: string) => {
    setGuests((current) => current.map((guest, i) => (i === index ? value : guest)));
  };

  const removeGuest = (index: number) => {
    setGuests((current) => current.filter((_, i) => i !== index));
  };

  const firstName = form.name.trim().split(/\s+/)[0] || "friend";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current || !rsvpOpen) return;
    setError("");

    const attending = form.attending === "yes";

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const payload = {
          inviteToken,
          name: form.name,
          guests: attending
            ? guests.map((guest) => guest.trim()).filter(Boolean)
            : [],
          email: form.email,
          attending: form.attending,
          dietaryRestrictions: attending ? form.dietaryRestrictions : "",
          message: form.message,
          website: form.website,
      };
      const body = JSON.stringify(payload);
      if (submissionRef.current?.body !== body) {
        submissionRef.current = { body, id: crypto.randomUUID() };
      }
      const response = await fetch("/api/reception-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, requestId: submissionRef.current.id }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "We couldn’t send your RSVP.");
      }

      setIsSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We couldn’t send your RSVP. Please try again."
      );
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#F4EFE6] text-[#1D211F]">
      <div className="grid min-h-dvh lg:grid-cols-[43%_57%]">
        <section className="relative aspect-[3/2] overflow-hidden bg-[#14292B] lg:sticky lg:top-0 lg:aspect-auto lg:h-dvh">
          <div className="absolute inset-0">
            <Image
              src="/reception/celebration.webp"
              alt="A black-and-white photograph of a couple dancing at their wedding"
              fill
              priority
              sizes="(min-width: 1024px) 43vw, 100vw"
              className="object-cover object-[57%_40%]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" aria-hidden="true" />
          <div
            className="absolute inset-4 border border-white/38 sm:inset-7"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 p-7 text-[#F4EFE6] sm:p-12 lg:p-14">
            <p className="text-xs tracking-[0.34em] uppercase">
              A celebration close to home
            </p>
            <p className="mt-3 font-serif text-4xl leading-none sm:text-5xl">
              Delina & Jackson
            </p>
          </div>
        </section>

        <main className="flex min-h-dvh items-center px-6 py-16 sm:px-12 lg:px-16 lg:py-24 xl:px-24">
          <article className="mx-auto w-full max-w-2xl animate-in fade-in slide-in-from-bottom-3 duration-700 motion-reduce:animate-none">
            <header>
              <div className="flex items-center gap-4 text-[0.68rem] tracking-[0.34em] text-[#14292B]/72 uppercase">
                <span className="h-px w-12 bg-[#E7AD8C]" aria-hidden="true" />
                Private invitation
              </div>
              <h1 className="mt-7 font-serif text-[clamp(3.2rem,8vw,6.6rem)] leading-[0.82] text-[#14292B]">
                West Coast
                <span className="block pl-[0.35em]">Reception</span>
              </h1>
              <p className="mt-9 max-w-xl text-base leading-8 text-[#1D211F]/72 sm:text-lg">
                {RECEPTION_DETAILS.invitation}
              </p>
            </header>

            <section
              className="mt-12 grid gap-7 border-y border-[#14292B]/20 py-8 sm:grid-cols-2"
              aria-label="Event details"
            >
              <div className="flex gap-4">
                <CalendarDays className="mt-1 size-5 shrink-0 text-[#B86F51]" aria-hidden="true" />
                <div>
                  <p className="text-[0.65rem] tracking-[0.26em] text-[#14292B]/58 uppercase">Date</p>
                  <p className="mt-2 leading-6">{RECEPTION_DETAILS.date ?? "To be announced"}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock3 className="mt-1 size-5 shrink-0 text-[#B86F51]" aria-hidden="true" />
                <div>
                  <p className="text-[0.65rem] tracking-[0.26em] text-[#14292B]/58 uppercase">Time</p>
                  <p className="mt-2 leading-6">{RECEPTION_DETAILS.time ?? "To be announced"}</p>
                </div>
              </div>
              <div className="flex gap-4 sm:col-span-2">
                <MapPin className="mt-1 size-5 shrink-0 text-[#B86F51]" aria-hidden="true" />
                <div>
                  <p className="text-[0.65rem] tracking-[0.26em] text-[#14292B]/58 uppercase">Place</p>
                  <p className="mt-2 leading-6">{RECEPTION_DETAILS.venue}</p>
                  <p className="text-sm leading-6 text-[#1D211F]/60">
                    {RECEPTION_DETAILS.address}, {RECEPTION_DETAILS.city}
                  </p>
                  <a
                    href={RECEPTION_DETAILS.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block border-b border-[#14292B]/45 text-xs tracking-[0.18em] text-[#14292B] uppercase transition-colors hover:border-[#B86F51] hover:text-[#B86F51] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14292B]"
                  >
                    View map
                  </a>
                </div>
              </div>
            </section>

            <section className="mt-14" aria-labelledby="rsvp-heading">
              {!rsvpOpen ? (
                <div className="border-l-2 border-[#79B6CF] py-3 pl-6" role="status">
                  <h2 id="rsvp-heading" className="font-serif text-4xl text-[#14292B]">
                    More details soon
                  </h2>
                  <p className="mt-3 max-w-lg leading-7 text-[#1D211F]/68">
                    We’re getting the guest list ready. Please check back for
                    RSVP details.
                  </p>
                </div>
              ) : isSubmitted ? (
                <div className="border-l-2 border-[#79B6CF] py-3 pl-6" role="status">
                  <div className="flex size-9 items-center justify-center rounded-full bg-[#14292B] text-[#F4EFE6]">
                    <Check className="size-4" aria-hidden="true" />
                  </div>
                  <h2 className="mt-6 font-serif text-4xl text-[#14292B]">
                    Thank you, {firstName}.
                  </h2>
                  <p className="mt-3 max-w-lg leading-7 text-[#1D211F]/68">
                    {form.attending === "yes"
                      ? "We can’t wait to celebrate with you. A confirmation is on its way to your inbox."
                      : "Thank you for letting us know. We’ll miss you, and a confirmation is on its way to your inbox."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <p className="text-[0.68rem] tracking-[0.3em] text-[#14292B]/60 uppercase">Kindly reply</p>
                      <h2 id="rsvp-heading" className="mt-2 font-serif text-5xl text-[#14292B]">RSVP</h2>
                    </div>
                    <p className="hidden max-w-48 text-right text-xs leading-5 text-[#1D211F]/50 sm:block">
                      A confirmation will be emailed to you.
                    </p>
                  </div>

                  <form className="mt-9" onSubmit={handleSubmit}>
                    <fieldset disabled={isSubmitting} className="space-y-8">
                    <legend className="sr-only">Reception RSVP</legend>
                    <fieldset>
                      <legend className="text-xs tracking-[0.2em] text-[#14292B]/70 uppercase">
                        Will you join us?
                      </legend>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {([
                          ["yes", "Joyfully accepts"],
                          ["no", "Sadly declines"],
                        ] as const).map(([value, label]) => (
                          <label key={value} className="cursor-pointer">
                            <input
                              className="peer sr-only"
                              type="radio"
                              name="attending"
                              value={value}
                              checked={form.attending === value}
                              onChange={() => updateField("attending", value)}
                              required
                            />
                            <span className="flex min-h-14 items-center justify-center border border-[#14292B]/25 px-3 text-center text-sm transition-colors peer-checked:border-[#14292B] peer-checked:bg-[#14292B] peer-checked:text-[#F4EFE6] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[#14292B]">
                              {label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid gap-7 sm:grid-cols-2">
                      <label className="block text-xs tracking-[0.18em] text-[#14292B]/70 uppercase">
                        Your name
                        <input
                          className={fieldClassName}
                          name="name"
                          autoComplete="name"
                          value={form.name}
                          onChange={(event) => updateField("name", event.target.value)}
                          placeholder="Your full name"
                          maxLength={100}
                          required
                        />
                      </label>

                      <label className="block text-xs tracking-[0.18em] text-[#14292B]/70 uppercase">
                        Email
                        <input
                          className={fieldClassName}
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(event) => updateField("email", event.target.value)}
                          placeholder="you@example.com"
                          required
                        />
                      </label>
                    </div>

                    {form.attending === "yes" && (
                      <fieldset>
                        <legend className="text-xs tracking-[0.2em] text-[#14292B]/70 uppercase">
                          Who are you bringing?
                        </legend>
                        <p className="mt-2 text-sm leading-6 text-[#1D211F]/58">
                          Add the name of each guest coming with you, so we know who to expect.
                        </p>
                        {guests.length > 0 && (
                          <ul className="mt-2">
                            {guests.map((guest, index) => (
                              <li key={index} className="flex items-end gap-3">
                                <label className="flex-1">
                                  <span className="sr-only">Guest {index + 1} name</span>
                                  <input
                                    ref={(element) => {
                                      guestInputRefs.current[index] = element;
                                    }}
                                    className={fieldClassName}
                                    name={`guest-${index + 1}`}
                                    autoComplete="off"
                                    value={guest}
                                    onChange={(event) => updateGuest(index, event.target.value)}
                                    placeholder={`Guest ${index + 1}’s full name`}
                                    maxLength={100}
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() => removeGuest(index)}
                                  className="mb-2 flex size-10 shrink-0 items-center justify-center text-[#14292B]/60 transition-colors hover:text-[#B86F51] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14292B]"
                                  aria-label={`Remove guest ${index + 1}`}
                                >
                                  <X className="size-4" aria-hidden="true" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                        {guests.length < MAX_RECEPTION_PLUS_GUESTS && (
                          <button
                            type="button"
                            onClick={addGuest}
                            className="mt-4 inline-flex min-h-11 items-center gap-2 border-b border-[#14292B]/45 text-xs tracking-[0.18em] text-[#14292B] uppercase transition-colors hover:border-[#B86F51] hover:text-[#B86F51] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14292B]"
                          >
                            <Plus className="size-3.5" aria-hidden="true" />
                            {guests.length ? "Add another guest" : "Add a guest"}
                          </button>
                        )}
                      </fieldset>
                    )}

                    {form.attending === "yes" && (
                      <label className="block text-xs tracking-[0.18em] text-[#14292B]/70 uppercase">
                        Dietary notes
                        <input
                          className={fieldClassName}
                          name="dietaryRestrictions"
                          value={form.dietaryRestrictions}
                          onChange={(event) => updateField("dietaryRestrictions", event.target.value)}
                          placeholder="Allergies or anything we should know — optional"
                          maxLength={500}
                        />
                      </label>
                    )}

                    <label className="block text-xs tracking-[0.18em] text-[#14292B]/70 uppercase">
                      A note for us
                      <textarea
                        className={`${fieldClassName} min-h-24 resize-y leading-6`}
                        name="message"
                        value={form.message}
                        onChange={(event) => updateField("message", event.target.value)}
                        placeholder="Optional"
                        maxLength={1000}
                      />
                    </label>

                    <label className="sr-only" aria-hidden="true">
                      Website
                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        name="website"
                        value={form.website}
                        onChange={(event) => updateField("website", event.target.value)}
                      />
                    </label>

                    {error && (
                      <p className="border-l-2 border-[#B86F51] pl-4 text-sm leading-6 text-[#8A432F]" role="alert">
                        {error}
                      </p>
                    )}

                    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="min-h-13 bg-[#14292B] px-8 py-3 text-sm tracking-[0.2em] text-[#F4EFE6] uppercase transition-colors hover:bg-[#223F41] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14292B] disabled:cursor-wait disabled:opacity-60"
                      >
                        {isSubmitting ? "Sending…" : "Send RSVP"}
                      </button>
                      <p className="text-xs leading-5 text-[#1D211F]/50">
                        Your reply goes to us, with a confirmation sent to your email.
                      </p>
                    </div>
                    </fieldset>
                  </form>
                </>
              )}
            </section>

            <footer className="mt-16 border-t border-[#14292B]/15 pt-6 text-xs tracking-[0.22em] text-[#14292B]/48 uppercase">
              West Coast reception · Port Moody
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
}
