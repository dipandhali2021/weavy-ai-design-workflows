"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface WorkflowCard {
  id: string;
  title: string;
  image: string;
}

const workflows: WorkflowCard[] = [
  {
    id: "wan-lora-rotate",
    title: "Wan Lora - Rotate",
    image: "https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd65ba87c69df161752e5_3d_card.avif",
  },
  {
    id: "multiple-models",
    title: "Multiple Models",
    image: "https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd7cbc22419b32bb9d8d8_hcard%20-%20STABLE%20DIFFUSION.avif",
  },
  {
    id: "wan-lora-inflate",
    title: "Wan LoRa Inflate",
    image: "https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6837510acbe777269734b387_bird_desktop.avif",
  },
  {
    id: "controlnet-structure",
    title: "ControlNet - Structure Reference",
    image: "https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd77722078ff43fe428f3_hcard-color%20reference.avif",
  },
  {
    id: "camera-angle",
    title: "Camera Angle Control",
    image: "https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6835ce8a653081a97d92eebd_VIDEO_hero_Desktop.avif",
  },
  {
    id: "relight-2-human",
    title: "Relight 2.0 human",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/6835ce8a653081a97d92eebd_VIDEO_hero_Desktop-11.avif",
  },
];

export default function WorkflowsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#1A1A1A] text-white pt-[160px] pb-[160px] overflow-hidden">
      <div className="container px-[5%] max-w-[1440px] mx-auto">
        <div className="mb-[64px] max-w-[600px]">
          <h2 className="text-[64px] font-medium leading-[1.1] tracking-[-0.03em] mb-[24px]">
            Explore Our Workflows
          </h2>
          <p className="text-[#ABB4A6] text-[16px] leading-[1.5]">
            From multi-layer compositing to matte manipulation, Weavy keeps up with your creativity 
            with all the editing tools you recognize and rely on.
          </p>
        </div>

        <div className="relative group">
          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-[24px] overflow-x-auto scrollbar-hide pb-[40px] snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="flex-shrink-0 w-[400px] snap-start group/card"
              >
                <div className="mb-[16px]">
                  <p className="text-[14px] font-medium tracking-[0.05em] uppercase text-white/60">
                    {workflow.title}
                  </p>
                </div>
                <div className="relative aspect-[1.6/1] rounded-[12px] overflow-hidden bg-[#2A2A2A] border border-white/10">
                  <Image
                    src={workflow.image}
                    alt={workflow.title}
                    fill
                    className="object-cover opacity-90 transition-transform duration-500 group-hover/card:scale-105"
                  />
                  {/* "Try" Button Layer */}
                  <div className="absolute bottom-[16px] left-[16px]">
                    <button className="bg-[#F5FF9C] text-black px-[12px] py-[6px] rounded-[4px] text-[12px] font-medium transition-transform active:scale-95">
                      Try
                    </button>
                  </div>
                  {/* Node visualization overlay (Simulated) */}
                  <div className="absolute inset-0 pointer-events-none p-4 flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center opacity-40">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-white transition-all group-hover/card:scale-125" />
                        <div className="w-8 h-[1px] bg-white translate-y-1" />
                        <div className="w-2 h-2 rounded-full border border-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-[12px] mt-[40px]">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-[12px] rounded-full border transition-all duration-300 ${
                canScrollLeft
                  ? "border-white/20 text-white hover:bg-white hover:text-black"
                  : "border-white/5 text-white/20 cursor-not-allowed"
              }`}
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-[12px] rounded-full border transition-all duration-300 ${
                canScrollRight
                  ? "border-white/20 text-white hover:bg-white hover:text-black"
                  : "border-white/5 text-white/20 cursor-not-allowed"
              }`}
            >
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}