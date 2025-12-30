"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, WEDDING_DETAILS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ScaleOnHover } from "@/components/motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavClick: (id: string) => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  onNavClick,
}: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] bg-wedding-bg flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle className="font-serif text-lg tracking-wide text-wedding-black">
            {WEDDING_DETAILS.couple.person1} & {WEDDING_DETAILS.couple.person2}
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-0 flex flex-col flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={cn(
                "text-left py-3 mx-1 px-4 rounded-lg transition-colors text-base tracking-wide",
                activeSection === item.id
                  ? "bg-wedding-amber/10 text-wedding-amber"
                  : "text-wedding-shade hover:bg-wedding-shade/5 hover:text-wedding-black"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-4 px-2 mt-auto border-t border-wedding-shade/20">
          <ScaleOnHover scale={1.05}>
            <Button
              onClick={() => onNavClick("rsvp")}
              className="w-full bg-wedding-amber text-white hover:bg-wedding-amber/90 cursor-pointer"
            >
              RSVP Now
            </Button>
          </ScaleOnHover>
          <p className="text-sm text-wedding-shade text-center my-2">
            {WEDDING_DETAILS.date.full}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
