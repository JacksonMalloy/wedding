import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rsvpSchema } from "@/lib/validations/rsvp";
import { PARTY_BY_ID, GUEST_BY_ID } from "@/lib/guests";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM ?? "Wedding RSVP <onboarding@resend.dev>";
const TO = [
  "jacksmalloy+wedding@gmail.com",
  "delina.coates+wedding@gmail.com",
];

function escape(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const MEAL_LABEL: Record<string, string> = {
  beef: "Beef",
  vegetarian: "Vegetarian",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = rsvpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = result.data;

    // Verify the party + guest ids resolve to the same party.
    const party = PARTY_BY_ID[data.party_id];
    if (!party) {
      return NextResponse.json(
        { error: "Unknown party" },
        { status: 400 }
      );
    }
    const primary = GUEST_BY_ID[data.primary_guest_id];
    if (!primary || primary.partyId !== party.id) {
      return NextResponse.json(
        { error: "Primary guest does not belong to this party" },
        { status: 400 }
      );
    }
    const validMemberIds = new Set(party.members.map((m) => m.id));
    for (const a of data.attendees) {
      if (!validMemberIds.has(a.guest_id)) {
        return NextResponse.json(
          { error: `Guest ${a.guest_id} does not belong to this party` },
          { status: 400 }
        );
      }
    }
    if (data.attendees.length > party.members.length) {
      return NextResponse.json(
        { error: "More attendees than party allows" },
        { status: 400 }
      );
    }

    const primaryName = `${primary.first}${primary.last ? ` ${primary.last}` : ""}`;
    const partyLabel = party.label ?? primaryName;

    const subject = data.attending
      ? `RSVP — ${partyLabel}: ${data.attendees.length} attending 🎉`
      : `RSVP — ${partyLabel}: not attending`;

    const summaryRows: Array<[string, string]> = [
      ["Party", partyLabel],
      ["Primary contact", `${primaryName} (${data.email})`],
      ["Group", party.group],
      ["Attending", data.attending ? "Yes" : "No"],
    ];
    if (data.attending) {
      summaryRows.push(["Headcount", String(data.attendees.length)]);
    }
    if (data.song_request) summaryRows.push(["Song request", data.song_request]);
    if (data.special_requests) summaryRows.push(["Message", data.special_requests]);

    const summaryHtml = `
      <h2 style="font-family:Georgia,serif;color:#171717;margin-bottom:8px">New RSVP</h2>
      <table cellpadding="8" style="border-collapse:collapse;font-family:Georgia,serif;font-size:14px;margin-bottom:24px">
        ${summaryRows
          .map(
            ([k, v]) =>
              `<tr><td style="border:1px solid #e5e5e5;background:#fafafa;width:180px"><strong>${escape(
                k
              )}</strong></td><td style="border:1px solid #e5e5e5">${escape(v)}</td></tr>`
          )
          .join("")}
      </table>
    `;

    let attendeesHtml = "";
    if (data.attending && data.attendees.length > 0) {
      attendeesHtml = `
        <h3 style="font-family:Georgia,serif;color:#171717;margin-bottom:8px">Attendees</h3>
        <table cellpadding="8" style="border-collapse:collapse;font-family:Georgia,serif;font-size:14px">
          <thead>
            <tr>
              <th style="border:1px solid #e5e5e5;background:#fafafa;text-align:left">Name</th>
              <th style="border:1px solid #e5e5e5;background:#fafafa;text-align:left">Meal</th>
              <th style="border:1px solid #e5e5e5;background:#fafafa;text-align:left">Dietary</th>
            </tr>
          </thead>
          <tbody>
            ${data.attendees
              .map(
                (a) =>
                  `<tr>
                    <td style="border:1px solid #e5e5e5">${escape(a.display_name)}</td>
                    <td style="border:1px solid #e5e5e5">${escape(
                      a.meal_preference ? MEAL_LABEL[a.meal_preference] : null
                    )}</td>
                    <td style="border:1px solid #e5e5e5">${escape(a.dietary_restrictions)}</td>
                  </tr>`
              )
              .join("")}
          </tbody>
        </table>
      `;
    }

    const html = summaryHtml + attendeesHtml;

    const textLines = [
      ...summaryRows.map(([k, v]) => `${k}: ${v}`),
      "",
    ];
    if (data.attending && data.attendees.length > 0) {
      textLines.push("Attendees:");
      for (const a of data.attendees) {
        const meal = a.meal_preference ? MEAL_LABEL[a.meal_preference] : "—";
        const diet = a.dietary_restrictions || "—";
        textLines.push(`- ${a.display_name} | Meal: ${meal} | Dietary: ${diet}`);
      }
    }
    const text = textLines.join("\n");

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send RSVP" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "RSVP sent successfully" });
  } catch (error) {
    console.error("RSVP submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
