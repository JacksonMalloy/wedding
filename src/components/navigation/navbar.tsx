"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, WEDDING_DETAILS } from "@/lib/constants";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { Button } from "@/components/ui/button";
import { ScaleOnHover } from "@/components/motion";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));
  const scrollTo = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-wedding-bg/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Couple Names */}
            <button
              onClick={() => handleNavClick("hero")}
              className="font-serif text-lg tracking-wide text-wedding-black hover:text-wedding-amber transition-colors"
            >
              {WEDDING_DETAILS.couple.person1} & {WEDDING_DETAILS.couple.person2}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.filter((item) => item.id !== "hero").map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "text-sm tracking-wide transition-colors relative py-1",
                    activeSection === item.id
                      ? "text-wedding-amber"
                      : "text-wedding-shade hover:text-wedding-black"
                  )}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-wedding-amber" />
                  )}
                </button>
              ))}
              <ScaleOnHover scale={1.05}>
                <Button
                  onClick={() => handleNavClick("rsvp")}
                  size="sm"
                  className="bg-wedding-amber text-white hover:bg-wedding-amber/90 cursor-pointer"
                >
                  RSVP
                </Button>
              </ScaleOnHover>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
    </>
  );
}
