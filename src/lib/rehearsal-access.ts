import "server-only";

import { timingSafeEqual } from "node:crypto";

export function hasRehearsalInviteSecret(): boolean {
  return Boolean(process.env.REHEARSAL_INVITE_SLUG?.trim());
}

export function isValidRehearsalInviteToken(token: string): boolean {
  const expected = process.env.REHEARSAL_INVITE_SLUG?.trim();

  if (!expected) return false;

  const suppliedBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  return (
    suppliedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(suppliedBuffer, expectedBuffer)
  );
}
