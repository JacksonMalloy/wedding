"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/motion";

interface SectionWrapperProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  background?: "default" | "alternate" | "accent";
  fullHeight?: boolean;
}

export function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className,
  background = "default",
  fullHeight = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-32",
        fullHeight && "min-h-screen flex flex-col justify-center",
        background === "default" && "bg-wedding-bg",
        background === "alternate" && "bg-white",
        background === "accent" && "bg-wedding-accent/30",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <ScrollReveal className="text-center mb-12 md:mb-16">
            {title && (
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-wedding-black mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-wedding-shade text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-wedding-amber" />
              <span className="h-1.5 w-1.5 rounded-full bg-wedding-amber" />
              <span className="h-px w-12 bg-wedding-amber" />
            </div>
          </ScrollReveal>
        )}
        {children}
      </div>
    </section>
  );
}
