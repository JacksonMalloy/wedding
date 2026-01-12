"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { STORY_MILESTONES, WEDDING_DETAILS } from "@/lib/constants";

// Rotation patterns for the main stacked polaroid
const stackRotations = [
  { main: "rotate-2", back1: "-rotate-3", back2: "rotate-6" },
  { main: "-rotate-2", back1: "rotate-4", back2: "-rotate-5" },
  { main: "rotate-1", back1: "-rotate-4", back2: "rotate-3" },
  { main: "-rotate-1", back1: "rotate-3", back2: "-rotate-6" },
  { main: "rotate-3", back1: "-rotate-2", back2: "rotate-5" },
  { main: "-rotate-3", back1: "rotate-2", back2: "-rotate-4" },
];

// Offset positions for extra scattered photos (overlapping edges of main photo)
const scatterPositions = [
  // Layout 1: Déjà Vu - 3 photos
  [
    { position: "right-0 -top-8 translate-x-1/3 md:-top-12 md:translate-x-1/2", rotation: "-rotate-6", size: "w-40 md:w-52" },
    { position: "left-0 -bottom-6 -translate-x-1/3 md:-bottom-10 md:-translate-x-1/2", rotation: "rotate-4", size: "w-36 md:w-48" },
  ],
  // Layout 2: First Date - 2 photos
  [
    { position: "left-0 -top-6 -translate-x-1/4 md:-top-10 md:-translate-x-1/3", rotation: "rotate-5", size: "w-40 md:w-52" },
  ],
  // Layout 3: Made It Official - 3 photos
  [
    { position: "right-0 top-0 translate-x-1/3 -translate-y-1/4 md:translate-x-1/2", rotation: "-rotate-5", size: "w-40 md:w-52" },
    { position: "left-0 -bottom-8 -translate-x-1/4 md:-bottom-12 md:-translate-x-1/3", rotation: "rotate-3", size: "w-36 md:w-48" },
  ],
  // Layout 4: Moving In Together - 3 photos
  [
    { position: "left-0 -top-6 -translate-x-1/3 md:-top-10 md:-translate-x-1/2", rotation: "rotate-6", size: "w-40 md:w-52" },
    { position: "right-0 bottom-0 translate-x-1/4 translate-y-1/4 md:translate-x-1/3", rotation: "-rotate-4", size: "w-36 md:w-44" },
  ],
  // Layout 5: Becoming a Cat Dad - 4 photos (lots of cat pics!)
  [
    { position: "right-0 -top-4 translate-x-1/3 md:-top-8 md:translate-x-1/2", rotation: "-rotate-4", size: "w-36 md:w-44" },
    { position: "left-0 top-1/4 -translate-x-1/3 md:-translate-x-1/2", rotation: "rotate-5", size: "w-32 md:w-40" },
    { position: "right-0 -bottom-6 translate-x-1/4 md:-bottom-10 md:translate-x-1/3", rotation: "-rotate-6", size: "w-36 md:w-44" },
  ],
  // Layout 6: The Proposal - 3 photos
  [
    { position: "left-0 -top-8 -translate-x-1/4 md:-top-12 md:-translate-x-1/3", rotation: "rotate-4", size: "w-44 md:w-56" },
    { position: "right-0 -bottom-6 translate-x-1/3 md:-bottom-10 md:translate-x-1/2", rotation: "-rotate-5", size: "w-40 md:w-48" },
  ],
];

function Polaroid({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`bg-white p-2 pb-8 shadow-xl ${className}`}>
      <div className="aspect-[3/4] overflow-hidden relative">
        <Image
          src={src}
          alt={alt}
          width={300}
          height={400}
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-wedding-green/40 mix-blend-multiply" />
      </div>
    </div>
  );
}

function StackedPolaroid({
  src,
  alt,
  rotation,
}: {
  src: string;
  alt: string;
  rotation: typeof stackRotations[0];
}) {
  return (
    <div className="relative w-full max-w-sm md:max-w-md mx-auto">
      {/* Background polaroid 2 (furthest back) */}
      <div
        className={`absolute inset-0 bg-white p-3 pb-12 shadow-lg ${rotation.back2}`}
        style={{ transform: `translateX(12px) translateY(-8px)` }}
      >
        <div className="aspect-[3/4] bg-wedding-green-light/30" />
      </div>

      {/* Background polaroid 1 */}
      <div
        className={`absolute inset-0 bg-white p-3 pb-12 shadow-lg ${rotation.back1}`}
        style={{ transform: `translateX(-8px) translateY(6px)` }}
      >
        <div className="aspect-[3/4] bg-wedding-green-light/50" />
      </div>

      {/* Main polaroid */}
      <div className={`relative bg-white p-3 pb-12 shadow-xl ${rotation.main}`}>
        <div className="aspect-[3/4] overflow-hidden relative">
          <Image
            src={src}
            alt={alt}
            width={450}
            height={600}
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-wedding-green/40 mix-blend-multiply" />
        </div>
      </div>
    </div>
  );
}

function PolaroidPlaceholder({ rotation }: { rotation: typeof stackRotations[0] }) {
  return (
    <div className="relative w-full max-w-sm md:max-w-md mx-auto">
      {/* Background polaroid */}
      <div
        className={`absolute inset-0 bg-white p-3 pb-12 shadow-lg ${rotation.back1}`}
        style={{ transform: `translateX(-6px) translateY(4px)` }}
      >
        <div className="aspect-[3/4] bg-wedding-green-light/30" />
      </div>

      {/* Main polaroid */}
      <div className={`relative bg-white p-3 pb-12 shadow-xl ${rotation.main}`}>
        <div className="aspect-[3/4] bg-wedding-green-light/50 flex items-center justify-center">
          <Heart className="h-12 w-12 text-wedding-green/30" />
        </div>
      </div>
    </div>
  );
}

function PhotoCluster({
  images,
  title,
  index,
}: {
  images?: string[];
  title: string;
  index: number;
}) {
  const stackRotation = stackRotations[index % stackRotations.length];
  const scatterConfig = scatterPositions[index % scatterPositions.length];

  const mainImage = images?.[0];
  const extraImages = images?.slice(1) || [];

  return (
    <div className="relative py-8 md:py-12">
      {/* Extra scattered photos */}
      {extraImages.map((image, idx) => {
        const config = scatterConfig[idx];
        if (!config) return null;

        return (
          <div
            key={idx}
            className={`absolute ${config.position} ${config.size} z-20 transition-transform hover:scale-110 hover:z-30`}
          >
            <Polaroid
              src={image}
              alt={`${title} - Photo ${idx + 2}`}
              className={config.rotation}
            />
          </div>
        );
      })}

      {/* Main stacked polaroid */}
      <div className="relative z-10">
        {mainImage ? (
          <StackedPolaroid
            src={mainImage}
            alt={title}
            rotation={stackRotation}
          />
        ) : (
          <PolaroidPlaceholder rotation={stackRotation} />
        )}
      </div>
    </div>
  );
}

export function StorySection() {
  return (
    <SectionWrapper
      id="story"
      title="Our Story"
      subtitle={`How ${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2} found each other`}
      background="alternate"
    >
      <StaggerContainer className="space-y-16 md:space-y-0">
        {STORY_MILESTONES.map((milestone, index) => (
          <StaggerItem key={index}>
            <div
              className={`md:flex items-center gap-8 lg:gap-12 ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              } ${index !== 0 ? "md:mt-28" : ""}`}
            >
              {/* Photo Cluster */}
              <div className="md:w-1/2 mb-8 md:mb-0 overflow-visible">
                <ScrollReveal>
                  <PhotoCluster
                    images={milestone.images}
                    title={milestone.title}
                    index={index}
                  />
                </ScrollReveal>
              </div>

              {/* Content */}
              <div
                className={`md:w-1/2 ${
                  index % 2 === 0 ? "md:pl-8" : "md:pr-8"
                }`}
              >
                <ScrollReveal>
                  <span className="inline-block px-3 py-1 bg-wedding-green-light text-wedding-black-light text-sm rounded-full mb-4">
                    {milestone.date}
                  </span>
                  <h3 className="text-2xl font-semibold text-wedding-black mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-wedding-shade leading-relaxed">
                    {milestone.description}
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
