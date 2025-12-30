"use client";

import { ArrowUp, Mail, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WEDDING_DETAILS, CONTACT } from "@/lib/constants";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { FadeIn, ScaleOnHover } from "@/components/motion";

export function FooterSection() {
  const scrollTo = useScrollTo();

  return (
    <footer className="bg-wedding-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              {WEDDING_DETAILS.couple.person1} & {WEDDING_DETAILS.couple.person2}
            </h2>
            <p className="text-wedding-shade-light">
              {WEDDING_DETAILS.date.full}
            </p>
            {WEDDING_DETAILS.hashtag && (
              <p className="text-wedding-amber mt-2">
                {WEDDING_DETAILS.hashtag}
              </p>
            )}
          </div>
        </FadeIn>

        {/* Contact */}
        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center justify-center gap-4 mb-12">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {CONTACT.emails.map((email, index) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-wedding-shade-light hover:text-wedding-amber transition-colors text-sm"
                >
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </a>
              ))}
            </div>
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-2 text-wedding-shade-light hover:text-wedding-amber transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>{CONTACT.phone}</span>
            </a>
          </div>
        </FadeIn>

        {/* Divider */}
        <div className="border-t border-wedding-shade/20 my-8" />

        {/* Back to top & Copyright */}
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-wedding-shade flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-wedding-amber" /> by the happy couple
            </p>

            <ScaleOnHover scale={1.05}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollTo("hero")}
                className="text-wedding-shade-light hover:text-white hover:bg-wedding-shade/20 cursor-pointer"
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                Back to Top
              </Button>
            </ScaleOnHover>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
