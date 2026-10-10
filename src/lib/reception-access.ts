import "server-only";

import { timingSafeEqual } from "node:crypto";
import { hasReceptionTiming } from "@/lib/reception-details";

export function hasReceptionInviteSecret(): boolean {
  return (process.env.RECEPTION_INVITE_SLUG?.trim().length ?? 0) >= 16;
}

export function isValidReceptionInviteToken(token: string): boolean {
  const expected = process.env.RECEPTION_INVITE_SLUG?.trim();
  if (!expected || !hasReceptionInviteSecret()) return false;

  const suppliedBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);
  return (
    suppliedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(suppliedBuffer, expectedBuffer)
  );
}

export function isReceptionRsvpOpen(): boolean {
  return (
    hasReceptionInviteSecret() &&
    hasReceptionTiming() &&
    process.env.RECEPTION_RSVP_ENABLED === "true"
  );
}
