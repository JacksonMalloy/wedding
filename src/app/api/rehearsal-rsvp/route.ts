import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  hasRehearsalInviteSecret,
  isValidRehearsalInviteToken,
} from "@/lib/rehearsal-access";
import { REHEARSAL_DETAILS } from "@/lib/rehearsal-details";
import {
  REHEARSAL_GUEST_BY_ID,
  REHEARSAL_PARTY_BY_ID,
  rehearsalGuestName,
} from "@/lib/rehearsal-guests";
import {
  rehearsalRsvpSchema,
  type RehearsalRsvpData,
} from "@/lib/validations/rehearsal-rsvp";

export const runtime = "nodejs";

const DEFAULT_RECIPIENTS = [
  "jacksmalloy+wedding@gmail.com",
  "delina.coates+wedding@gmail.com",
];

// Everything we derive from the invite list rather than trust from the client.
type ResolvedRsvp = {
  partyLabel: string;
  primaryName: string;
  firstName: string;
  attendeeNames: string[];
  partySize: number;
};

function getOrganizerRecipients(): string[] {
  const configured = process.env.REHEARSAL_RSVP_TO
    ?.split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  return configured?.length ? configured : DEFAULT_RECIPIENTS;
}

function escapeHtml(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detailsHtml(): string {
  return `
    <div style="margin:28px 0;padding:22px 24px;border-left:3px solid #e7ad8c;background:#f4efe6;color:#1d211f">
      <p style="margin:0 0 8px"><strong>${escapeHtml(REHEARSAL_DETAILS.date)} at ${escapeHtml(REHEARSAL_DETAILS.time)}</strong></p>
      <p style="margin:0">${escapeHtml(REHEARSAL_DETAILS.venue)}<br />${escapeHtml(REHEARSAL_DETAILS.address)}, ${escapeHtml(REHEARSAL_DETAILS.city)}</p>
    </div>
  `;
}

function organizerEmail(data: RehearsalRsvpData, resolved: ResolvedRsvp) {
  const attending = data.attending === "yes";
  const subject = attending
    ? `Rehearsal dinner RSVP — ${resolved.partyLabel}: ${resolved.partySize} attending`
    : `Rehearsal dinner RSVP — ${resolved.partyLabel} declined`;
  const rows: Array<[string, string]> = [
    ["Party", resolved.partyLabel],
    ["Replied by", resolved.primaryName],
    ["Email", data.email],
    ["Attending", attending ? "Yes" : "No"],
  ];

  if (attending) {
    rows.push(["Headcount", String(resolved.partySize)]);
    rows.push(["Guests", resolved.attendeeNames.join(", ")]);
    rows.push(["Dietary notes", data.dietaryRestrictions]);
  }
  rows.push(["Message", data.message]);

  return {
    subject,
    html: `
      <main style="max-width:620px;margin:0 auto;padding:36px 24px;font-family:Georgia,serif;color:#1d211f">
        <p style="margin:0;color:#8a432f;font-size:12px;letter-spacing:2px;text-transform:uppercase">New rehearsal dinner reply</p>
        <h1 style="margin:12px 0 24px;color:#14292b;font-size:32px;font-weight:normal">${escapeHtml(resolved.partyLabel)}</h1>
        <table cellpadding="10" style="width:100%;border-collapse:collapse;font-size:15px">
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="width:150px;border-bottom:1px solid #d8d1c5;color:#526363"><strong>${escapeHtml(label)}</strong></td>
                  <td style="border-bottom:1px solid #d8d1c5">${escapeHtml(value)}</td>
                </tr>`
            )
            .join("")}
        </table>
      </main>
    `,
    text: rows.map(([label, value]) => `${label}: ${value || "—"}`).join("\n"),
  };
}

function guestEmail(data: RehearsalRsvpData, resolved: ResolvedRsvp) {
  const attending = data.attending === "yes";
  const others = resolved.attendeeNames.filter(
    (name) => name !== resolved.primaryName
  );
  const guestListLine = others.length
    ? `We have you down with ${others.join(", ")}.`
    : "";

  return {
    subject: attending
      ? "Your rehearsal dinner RSVP is confirmed"
      : "We received your rehearsal dinner RSVP",
    html: `
      <main style="max-width:620px;margin:0 auto;padding:40px 24px;font-family:Georgia,serif;color:#1d211f;line-height:1.65">
        <p style="margin:0;color:#8a432f;font-size:12px;letter-spacing:2px;text-transform:uppercase">Delina &amp; Jackson</p>
        <h1 style="margin:14px 0 20px;color:#14292b;font-size:34px;font-weight:normal">Thank you, ${escapeHtml(resolved.firstName)}.</h1>
        <p style="margin:0;font-size:17px">
          ${attending
            ? `We’re so happy you’ll be joining us.${guestListLine ? ` ${escapeHtml(guestListLine)}` : ""}`
            : "We’re sorry you can’t join us, but we appreciate you letting us know."}
        </p>
        ${detailsHtml()}
        <p style="margin:28px 0 0">With love,<br /><strong>Delina &amp; Jackson</strong></p>
      </main>
    `,
    text: [
      `Thank you, ${resolved.firstName}.`,
      attending
        ? `We're so happy you'll be joining us.${guestListLine ? ` ${guestListLine}` : ""}`
        : "We're sorry you can't join us, but we appreciate you letting us know.",
      "",
      `${REHEARSAL_DETAILS.date} at ${REHEARSAL_DETAILS.time}`,
      REHEARSAL_DETAILS.venue,
      `${REHEARSAL_DETAILS.address}, ${REHEARSAL_DETAILS.city}`,
      "",
      "With love,",
      "Delina & Jackson",
    ].join("\n"),
  };
}

export async function POST(request: Request) {
  try {
    const result = rehearsalRsvpSchema.safeParse(await request.json());

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? "Invalid RSVP" },
        { status: 400 }
      );
    }

    const data = result.data;

    if (data.website) {
      return NextResponse.json({ message: "RSVP sent successfully" });
    }

    if (
      !hasRehearsalInviteSecret() ||
      !isValidRehearsalInviteToken(data.inviteToken)
    ) {
      return NextResponse.json(
        { error: "This invitation link is invalid" },
        { status: 404 }
      );
    }

    // The names must come off the invite list — the client only sends ids.
    const party = REHEARSAL_PARTY_BY_ID[data.party_id];
    if (!party) {
      return NextResponse.json(
        { error: "We couldn’t find that name on the invite list" },
        { status: 400 }
      );
    }

    const primary = REHEARSAL_GUEST_BY_ID[data.primary_guest_id];
    if (!primary || primary.partyId !== party.id) {
      return NextResponse.json(
        { error: "We couldn’t find that name on the invite list" },
        { status: 400 }
      );
    }

    const memberIds = new Set(party.members.map((member) => member.id));
    const attendeeIds = new Set(data.attendees.map((a) => a.guest_id));

    if (attendeeIds.size !== data.attendees.length) {
      return NextResponse.json(
        { error: "The same guest was listed twice" },
        { status: 400 }
      );
    }

    for (const guestId of attendeeIds) {
      if (!memberIds.has(guestId)) {
        return NextResponse.json(
          { error: "Someone in that list isn’t part of your party" },
          { status: 400 }
        );
      }
    }

    if (data.attending === "yes" && !attendeeIds.has(primary.id)) {
      return NextResponse.json(
        { error: "Please include yourself in the guest list" },
        { status: 400 }
      );
    }

    const attendeeNames = party.members
      .filter((member) => attendeeIds.has(member.id))
      .map(rehearsalGuestName);

    const resolved: ResolvedRsvp = {
      partyLabel: party.label,
      primaryName: rehearsalGuestName(primary),
      firstName: primary.first,
      attendeeNames,
      partySize: attendeeNames.length,
    };

    if (!process.env.RESEND_API_KEY) {
      console.error("Rehearsal RSVP is missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "RSVP email is not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const organizers = getOrganizerRecipients();
    const from =
      process.env.REHEARSAL_RSVP_FROM ??
      process.env.RESEND_FROM ??
      "Delina & Jackson <onboarding@resend.dev>";
    const replyTo = process.env.REHEARSAL_RSVP_REPLY_TO ?? organizers[0];
    const organizerCopy = organizerEmail(data, resolved);
    const guestCopy = guestEmail(data, resolved);

    const { error } = await resend.batch.send([
      {
        from,
        to: organizers,
        replyTo: data.email,
        ...organizerCopy,
      },
      {
        from,
        to: [data.email],
        replyTo,
        ...guestCopy,
      },
    ]);

    if (error) {
      console.error("Rehearsal RSVP Resend error:", error);
      return NextResponse.json(
        { error: "We couldn’t send your RSVP. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "RSVP sent successfully" });
  } catch (error) {
    console.error("Rehearsal RSVP submission error:", error);
    return NextResponse.json(
      { error: "We couldn’t send your RSVP. Please try again." },
      { status: 500 }
    );
  }
}
