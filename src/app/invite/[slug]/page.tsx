import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RehearsalInvite } from "@/components/rehearsal/rehearsal-invite";
import {
  hasRehearsalInviteSecret,
  isValidRehearsalInviteToken,
} from "@/lib/rehearsal-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rehearsal Dinner | Delina & Jackson",
  description: "A private invitation from Delina and Jackson.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    nocache: true,
  },
  referrer: "no-referrer",
};

type RehearsalInvitePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RehearsalInvitePage({
  params,
}: RehearsalInvitePageProps) {
  const { slug } = await params;

  if (!hasRehearsalInviteSecret() || !isValidRehearsalInviteToken(slug)) {
    notFound();
  }

  return <RehearsalInvite inviteToken={slug} />;
}
