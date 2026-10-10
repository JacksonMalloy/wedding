import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReceptionInvite } from "@/components/reception/reception-invite";
import {
  hasReceptionInviteSecret,
  isReceptionRsvpOpen,
  isValidReceptionInviteToken,
} from "@/lib/reception-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "West Coast Reception | Delina & Jackson",
  description: "A private invitation from Delina and Jackson.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    nocache: true,
  },
  referrer: "no-referrer",
  openGraph: {
    title: "West Coast Reception | Delina & Jackson",
    description: "A private invitation from Delina and Jackson.",
    type: "website",
  },
};

type ReceptionInvitePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ReceptionInvitePage({
  params,
}: ReceptionInvitePageProps) {
  const { slug } = await params;

  if (!hasReceptionInviteSecret() || !isValidReceptionInviteToken(slug)) {
    notFound();
  }

  return <ReceptionInvite inviteToken={slug} rsvpOpen={isReceptionRsvpOpen()} />;
}
