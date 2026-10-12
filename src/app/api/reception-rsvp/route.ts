import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  hasReceptionInviteSecret,
  isReceptionRsvpOpen,
  isValidReceptionInviteToken,
} from "@/lib/reception-access";
import { RECEPTION_DETAILS } from "@/lib/reception-details";
import { RECEPTION_PARTIES } from "@/lib/reception-guests";
import { resolveReceptionRsvp, type ResolvedReceptionRsvp } from "@/lib/reception-rsvp";
import {
  receptionRsvpSchema,
  type ReceptionRsvpData,
} from "@/lib/validations/reception-rsvp";

export const runtime = "nodejs";

const DEFAULT_RECIPIENTS = [
  "jacksmalloy+wedding@gmail.com",
  "delina.coates+wedding@gmail.com",
];

function getOrganizerRecipients(): string[] {
  const configured = process.env.RECEPTION_RSVP_TO
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
      <p style="margin:0 0 8px"><strong>${escapeHtml(RECEPTION_DETAILS.date)}  · ${escapeHtml(RECEPTION_DETAILS.time)}</strong></p>
      <p style="margin:0">${escapeHtml(RECEPTION_DETAILS.venue)}<br />${escapeHtml(RECEPTION_DETAILS.address)}, ${escapeHtml(RECEPTION_DETAILS.city)}</p>
    </div>
  `;
}

function organizerEmail(data: ReceptionRsvpData, resolved: ResolvedReceptionRsvp) {
  const attending = data.attending === "yes";
  const subject = attending
    ? `West Coast reception RSVP — ${resolved.partyLabel}: ${resolved.partySize} attending`
    : `West Coast reception RSVP — ${resolved.partyLabel} declined`;
  const rows: Array<[string, string]> = [
    ["Party", resolved.partyLabel],
    ["On guest list", resolved.onGuestList ? "Yes" : "No — name typed in"],
    ["Replied by", resolved.primaryName],
    ["Email", data.email],
    ["Attending", attending ? "Yes" : "No"],
  ];

  if (attending) {
    rows.push(["Headcount", String(resolved.partySize)]);
    rows.push([
      "Guests",
      resolved.onGuestList
        ? resolved.attendeeNames.join(", ")
        : `${resolved.primaryName}${resolved.partySize > 1 ? ` + ${resolved.partySize - 1} more` : ""}`,
    ]);
    rows.push(["Dietary notes", data.dietaryRestrictions]);
  }
  rows.push(["Message", data.message]);

  return {
    subject,
    html: `
      <main style="max-width:620px;margin:0 auto;padding:36px 24px;font-family:Georgia,serif;color:#1d211f">
        <p style="margin:0;color:#8a432f;font-size:12px;letter-spacing:2px;text-transform:uppercase">New West Coast reception reply</p>
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

function guestEmail(data: ReceptionRsvpData, resolved: ResolvedReceptionRsvp) {
  const attending = data.attending === "yes";
  const others = resolved.attendeeNames.filter(
    (name) => name !== resolved.primaryName
  );
  const guestListLine = !resolved.onGuestList
    ? resolved.partySize > 1
      ? `We have you down for ${resolved.partySize}.`
      : ""
    : others.length
    ? `We have you down with ${others.join(", ")}.`
    : "";

  return {
    subject: attending
      ? "Your West Coast reception RSVP is confirmed"
      : "We received your West Coast reception RSVP",
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
      `${RECEPTION_DETAILS.date} · ${RECEPTION_DETAILS.time}`,
      RECEPTION_DETAILS.venue,
      `${RECEPTION_DETAILS.address}, ${RECEPTION_DETAILS.city}`,
      "",
      "With love,",
      "Delina & Jackson",
    ].join("\n"),
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please send a valid RSVP" }, { status: 400 });
  }

  try {
    const result = receptionRsvpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? "Invalid RSVP" },
        { status: 400 }
      );
    }

    const data = result.data;

    if (
      !hasReceptionInviteSecret() ||
      !isValidReceptionInviteToken(data.inviteToken)
    ) {
      return NextResponse.json(
        { error: "This invitation link is invalid" },
        { status: 404 }
      );
    }

    if (!isReceptionRsvpOpen()) {
      return NextResponse.json(
        { error: "RSVPs aren’t open yet. Please check back soon." },
        { status: 503 }
      );
    }

    if (data.website) {
      return NextResponse.json({ message: "RSVP sent successfully" });
    }

    const resolution = resolveReceptionRsvp(data, RECEPTION_PARTIES);
    if ("error" in resolution) {
      return NextResponse.json({ error: resolution.error }, { status: 400 });
    }
    const resolved = resolution.value;

    if (!process.env.RESEND_API_KEY) {
      console.error("Reception RSVP is missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "RSVP email is not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const organizers = getOrganizerRecipients();
    const from =
      process.env.RECEPTION_RSVP_FROM ??
      process.env.RESEND_FROM ??
      "Delina & Jackson <onboarding@resend.dev>";
    const replyTo = process.env.RECEPTION_RSVP_REPLY_TO ?? organizers[0];
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
    ], { idempotencyKey: `reception-rsvp/${data.requestId}` });

    if (error) {
      console.error("Reception RSVP Resend error:", error);
      return NextResponse.json(
        { error: "We couldn’t send your RSVP. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "RSVP sent successfully" });
  } catch (error) {
    console.error("Reception RSVP submission error:", error);
    return NextResponse.json(
      { error: "We couldn’t send your RSVP. Please try again." },
      { status: 500 }
    );
  }
}
