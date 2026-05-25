"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "@/components/motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type Photo = { src: string; aspect: string };

function buildPhotos(
  folder: string,
  count: number,
  aspect: string,
): Photo[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/japan-2026/${folder}/${String(i + 1).padStart(2, "0")}.jpeg`,
    aspect,
  }));
}

const PHOTOS_BY_TYPE: Photo[][] = [
  buildPhotos("landscape", 30, "3/2"),
  buildPhotos("landscape-selfie", 13, "3/2"),
  buildPhotos("portrait", 45, "2/3"),
  buildPhotos("selfie", 46, "2/3"),
];

// Deterministic (seeded) shuffle so SSR and client render identically.
function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const result = [...items];
  let s = (seed >>> 0) || 1;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Greedy interleave: always pick from the largest remaining bucket that
// isn't the bucket we just picked from, so no two adjacent photos share a
// type. Tie-breaks use a seeded iteration order so each row looks different.
function interleaveBuckets(buckets: Photo[][], tieSeed: number): Photo[] {
  const remaining = buckets.map((b) => [...b]);
  const order = seededShuffle(
    remaining.map((_, i) => i),
    tieSeed,
  );
  const out: Photo[] = [];
  let lastIdx = -1;
  while (remaining.some((b) => b.length > 0)) {
    let bestIdx = -1;
    let bestCount = 0;
    for (const i of order) {
      if (i === lastIdx) continue;
      if (remaining[i].length > bestCount) {
        bestCount = remaining[i].length;
        bestIdx = i;
      }
    }
    if (bestIdx === -1) {
      // Only the just-picked bucket has photos left — forced repeat.
      bestIdx = lastIdx;
    }
    out.push(remaining[bestIdx].shift()!);
    lastIdx = bestIdx;
  }
  return out;
}

// For each row, take every 3rd photo from each type bucket (so each row has
// a roughly even share of each kind), shuffle each bucket so different rows
// pull different orderings, then greedily interleave to avoid same-type
// neighbors.
function buildRow(rowIndex: number, seed: number): Photo[] {
  const bunches = PHOTOS_BY_TYPE.map((bucket, typeIdx) =>
    seededShuffle(
      bucket.filter((_, i) => i % 3 === rowIndex),
      seed + typeIdx * 31,
    ),
  );
  return interleaveBuckets(bunches, seed);
}

const TOP_ROW: Photo[] = buildRow(0, 7);
const MIDDLE_ROW: Photo[] = buildRow(1, 23);
const BOTTOM_ROW: Photo[] = buildRow(2, 41);

const TILE_ROTATIONS = [
  "rotate-1",
  "-rotate-2",
  "rotate-2",
  "-rotate-1",
  "rotate-3",
  "-rotate-3",
];

function PhotoTile({
  src,
  aspect,
  alt,
  rotation,
  onSelect,
}: {
  src: string;
  aspect: string;
  alt: string;
  rotation: string;
  onSelect: (photo: Photo) => void;
}) {
  const widthClass = aspect === "2/3" ? "w-48 md:w-56" : "w-72 md:w-96";
  return (
    <button
      type="button"
      onClick={() => onSelect({ src, aspect })}
      className={`group relative ${widthClass} flex-shrink-0 bg-white p-2 pb-8 shadow-xl ${rotation} cursor-pointer transition-transform duration-300 ease-out hover:z-30 hover:scale-110 focus-visible:z-30 focus-visible:scale-110`}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: aspect.replace("/", " / ") }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 24rem, 18rem"
          className="object-cover grayscale transition-[filter] duration-300 ease-out group-hover:grayscale-0 group-focus-visible:grayscale-0"
        />
        <div className="absolute inset-0 bg-wedding-green/40 mix-blend-multiply transition-opacity duration-300 ease-out group-hover:opacity-0 group-focus-visible:opacity-0" />
      </div>
    </button>
  );
}

function MarqueeRow({
  photos,
  direction,
  duration,
  onSelect,
}: {
  photos: Photo[];
  direction: "left" | "right";
  duration: string;
  onSelect: (photo: Photo) => void;
}) {
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="relative overflow-x-clip pause-on-hover">
      <div
        className={`flex w-max items-center gap-3 md:gap-5 ${animationClass}`}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        {[...photos, ...photos].map((photo, index) => (
          <PhotoTile
            key={index}
            src={photo.src}
            aspect={photo.aspect}
            alt={`Japan 2026 — ${index + 1}`}
            rotation={TILE_ROTATIONS[index % TILE_ROTATIONS.length]}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export function JapanSection() {
  const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);

  return (
    <SectionWrapper
      id="japan"
      title="Japan, 2026"
      subtitle="A few favourites from our pre-honeymoon adventure"
      background="alternate"
    >
      <ScrollReveal>
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen -space-y-6 md:-space-y-10">
          <MarqueeRow
            photos={TOP_ROW}
            direction="left"
            duration="240s"
            onSelect={setOpenPhoto}
          />
          <MarqueeRow
            photos={MIDDLE_ROW}
            direction="right"
            duration="180s"
            onSelect={setOpenPhoto}
          />
          <MarqueeRow
            photos={BOTTOM_ROW}
            direction="left"
            duration="200s"
            onSelect={setOpenPhoto}
          />
        </div>
      </ScrollReveal>

      <Dialog
        open={openPhoto !== null}
        onOpenChange={(open) => {
          if (!open) setOpenPhoto(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="!max-w-[95vw] sm:!max-w-[95vw] !w-fit !p-0 !border-0 !bg-transparent !shadow-none flex items-center justify-center"
          onClick={() => setOpenPhoto(null)}
        >
          <DialogTitle className="sr-only">Japan 2026 photo</DialogTitle>
          {openPhoto && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={openPhoto.src}
              alt="Japan 2026 photo"
              className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
}
