"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { CalendarDays, Check, Clock3, MapPin } from "lucide-react";
import { REHEARSAL_DETAILS } from "@/lib/rehearsal-details";

type Attendance = "" | "yes" | "no";

type FormState = {
  name: string;
  email: string;
  attending: Attendance;
  partySize: string;
  dietaryRestrictions: string;
  message: string;
  website: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  attending: "",
  partySize: "1",
  dietaryRestrictions: "",
  message: "",
  website: "",
};

const fieldClassName =
  "mt-2 min-h-12 w-full border-0 border-b border-[#14292B]/35 bg-transparent px-0 py-3 text-base text-[#1D211F] outline-none transition-colors placeholder:text-[#1D211F]/38 focus:border-[#14292B] focus-visible:ring-0";

export function RehearsalInvite({ inviteToken }: { inviteToken: string }) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/rehearsal-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          inviteToken,
          partySize: Number(form.partySize),
        }),
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#F4EFE6] text-[#1D211F]">
      <div className="grid min-h-dvh lg:grid-cols-[43%_57%]">
        <section className="relative min-h-[44svh] overflow-hidden bg-[#14292B] lg:sticky lg:top-0 lg:h-dvh">
          <div className="absolute inset-0">
            <Image
              src="/rehearsal/dinner-invite-background.jpeg"
              alt="Softly blurred evening colors in peach, blue, and midnight tones"
              fill
              priority
              sizes="(min-width: 1024px) 43vw, 100vw"
              className="object-cover object-center scale-[1.02]"
            />
          </div>
          <div className="absolute inset-0 bg-[#14292B]/16" aria-hidden="true" />
          <div
            className="absolute inset-4 border border-white/38 sm:inset-7"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 p-9 text-[#F4EFE6] sm:p-12 lg:p-14">
            <p className="text-xs tracking-[0.34em] uppercase">
              The evening before
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
              <h1 className="mt-7 font-serif text-[clamp(3.6rem,8vw,6.6rem)] leading-[0.82] text-[#14292B]">
                Rehearsal
                <span className="block pl-[0.72em]">Dinner</span>
              </h1>
              <p className="mt-9 max-w-xl text-base leading-8 text-[#1D211F]/72 sm:text-lg">
                {REHEARSAL_DETAILS.invitation}
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
                  <p className="mt-2 leading-6">{REHEARSAL_DETAILS.date}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock3 className="mt-1 size-5 shrink-0 text-[#B86F51]" aria-hidden="true" />
                <div>
                  <p className="text-[0.65rem] tracking-[0.26em] text-[#14292B]/58 uppercase">Dinner</p>
                  <p className="mt-2 leading-6">{REHEARSAL_DETAILS.time}</p>
                </div>
              </div>
              <div className="flex gap-4 sm:col-span-2">
                <MapPin className="mt-1 size-5 shrink-0 text-[#B86F51]" aria-hidden="true" />
                <div>
                  <p className="text-[0.65rem] tracking-[0.26em] text-[#14292B]/58 uppercase">Place</p>
                  <p className="mt-2 leading-6">{REHEARSAL_DETAILS.venue}</p>
                  <p className="text-sm leading-6 text-[#1D211F]/60">
                    {REHEARSAL_DETAILS.address}, {REHEARSAL_DETAILS.city}
                  </p>
                  <a
                    href={REHEARSAL_DETAILS.mapUrl}
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
              {isSubmitted ? (
                <div className="border-l-2 border-[#79B6CF] py-3 pl-6" role="status">
                  <div className="flex size-9 items-center justify-center rounded-full bg-[#14292B] text-[#F4EFE6]">
                    <Check className="size-4" aria-hidden="true" />
                  </div>
                  <h2 className="mt-6 font-serif text-4xl text-[#14292B]">
                    Thank you, {form.name.split(" ")[0]}.
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

                  <form className="mt-9 space-y-8" onSubmit={handleSubmit}>
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
                          placeholder="First and last name"
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
                      <div className="grid gap-7 sm:grid-cols-2">
                        <label className="block text-xs tracking-[0.18em] text-[#14292B]/70 uppercase">
                          Number attending
                          <select
                            className={fieldClassName}
                            name="partySize"
                            value={form.partySize}
                            onChange={(event) => updateField("partySize", event.target.value)}
                          >
                            {Array.from({ length: 10 }, (_, index) => index + 1).map((size) => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        </label>
                        <label className="block text-xs tracking-[0.18em] text-[#14292B]/70 uppercase">
                          Dietary notes
                          <input
                            className={fieldClassName}
                            name="dietaryRestrictions"
                            value={form.dietaryRestrictions}
                            onChange={(event) => updateField("dietaryRestrictions", event.target.value)}
                            placeholder="Optional"
                            maxLength={500}
                          />
                        </label>
                      </div>
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
                        Your email is used only for this RSVP confirmation.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </section>

            <footer className="mt-16 border-t border-[#14292B]/15 pt-6 text-xs tracking-[0.22em] text-[#14292B]/48 uppercase">
              September 25 · Niagara-on-the-Lake
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
}
