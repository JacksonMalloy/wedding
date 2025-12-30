"use client";

import { useState, useEffect } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { WEDDING_DETAILS } from "@/lib/constants";

interface TimeUnit {
  value: number;
  label: string;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const weddingDate = new Date(
      WEDDING_DETAILS.date.year,
      8, // September (0-indexed)
      WEDDING_DETAILS.date.dayNumber,
      15, // 3:00 PM ceremony time
      0,
      0
    );

    const calculateTimeLeft = () => {
      const now = new Date();

      if (now >= weddingDate) {
        return [
          { value: 0, label: "Days" },
          { value: 0, label: "Hours" },
          { value: 0, label: "Minutes" },
          { value: 0, label: "Seconds" },
        ];
      }

      const totalSeconds = differenceInSeconds(weddingDate, now);
      const totalMinutes = differenceInMinutes(weddingDate, now);
      const totalHours = differenceInHours(weddingDate, now);
      const days = differenceInDays(weddingDate, now);

      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      return [
        { value: days, label: days === 1 ? "Day" : "Days" },
        { value: hours, label: hours === 1 ? "Hour" : "Hours" },
        { value: minutes, label: minutes === 1 ? "Minute" : "Minutes" },
        { value: seconds, label: seconds === 1 ? "Second" : "Seconds" },
      ];
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center gap-4 sm:gap-8">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl font-semibold text-wedding-black tabular-nums">
              --
            </div>
            <div className="text-xs sm:text-sm text-wedding-shade uppercase tracking-wider mt-1">
              --
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      {timeLeft.map((unit, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl font-semibold text-wedding-black tabular-nums">
            {unit.value.toString().padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-wedding-shade uppercase tracking-wider mt-1">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
