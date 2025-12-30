"use client";

import { Gift, Home, Plane, ExternalLink } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { REGISTRY_LINKS } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  gift: Gift,
  home: Home,
  plane: Plane,
};

export function RegistrySection() {
  return (
    <SectionWrapper
      id="registry"
      title="Gift Registry"
      subtitle="Your presence is the greatest gift, but if you wish to honor us..."
    >
      <ScrollReveal className="text-center mb-12">
        <p className="text-wedding-shade max-w-2xl mx-auto">
          We&apos;re so grateful to have you celebrate with us. If you&apos;d like to
          give a gift, we&apos;ve registered at a few places for your convenience.
        </p>
      </ScrollReveal>

      <StaggerContainer className="grid gap-6 md:grid-cols-3">
        {REGISTRY_LINKS.map((registry, index) => {
          const Icon = registry.icon ? iconMap[registry.icon] || Gift : Gift;
          return (
            <StaggerItem key={index}>
              <Card className="h-full bg-white border-wedding-shade-lightest hover:shadow-md transition-shadow text-center">
                <CardHeader>
                  <div className="mx-auto h-16 w-16 rounded-full bg-wedding-amber/10 flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-wedding-amber" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-wedding-black">
                    {registry.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-wedding-shade">
                    {registry.description}
                  </p>
                  <ScaleOnHover scale={1.05}>
                    <Button
                      className="w-full bg-wedding-amber text-white hover:bg-wedding-amber/90 cursor-pointer"
                      asChild
                    >
                      <a
                        href={registry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Registry <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </ScaleOnHover>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </SectionWrapper>
  );
}
