'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface WorkflowCard {
  id: string;
  title: string;
  image: string;
}

const workflows: WorkflowCard[] = [
  {
    id: 'wan-lora-rotate',
    title: 'Wan Lora – Rotate',
    image:
      'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/683750be24d06e0a26f7002c_Chair_Desktop.avif',
  },
  {
    id: 'multiple-models',
    title: 'Multiple Models',
    image:
      'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6837510acbe777269734b387_bird_desktop.avif',
  },
  {
    id: 'wan-lora-inflate',
    title: 'Wan LoRa Inflate',
    image:
      'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/683751c043700044e036204f_bird_mobile.avif',
  },
  {
    id: 'controlnet-structure',
    title: 'ControlNet – Structure',
    image:
      'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6835ce8a653081a97d92eebd_VIDEO_hero_Desktop.avif',
  },
  {
    id: 'camera-angle',
    title: 'Camera Angle Control',
    image:
      'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd77722078ff43fe428f3_hcard-color%20reference.avif',
  },
  {
    id: 'relight-2-human',
    title: 'Relight 2.0 human',
    image:
      'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd7cbc22419b32bb9d8d8_hcard%20-%20STABLE%20DIFFUSION.avif',
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
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#252525] text-white py-[120px] md:py-[160px] overflow-hidden">
      <div className="container px-[5%] max-w-[1440px] mx-auto">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-[48px]">
          <div className="max-w-[500px]">
            <h2 className="text-[5rem] font-medium leading-[1.05] tracking-[-0.03em] mb-[20px]">
              Explore Our<br />Workflows
            </h2>
            <p className="text-white text-[15px] md:text-[16px] leading-[1.6]">
              From multi-layer compositing to matte manipulation, Weavy keeps up
              with your creativity with all the editing tools you recognize and
              rely on.
            </p>
          </div>

          {/* Navigation Controls - Desktop */}
          <div className="hidden md:flex gap-[12px]">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-[48px] h-[48px] rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'border-white/20 text-white hover:bg-white hover:text-black'
                  : 'border-white/10 text-white/20 cursor-not-allowed'
              }`}
            >
              <ArrowLeft size={18} strokeWidth={2} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-[48px] h-[48px] rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'border-white/20 text-white hover:bg-white hover:text-black'
                  : 'border-white/10 text-white/20 cursor-not-allowed'
              }`}
            >
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Workflow Cards Slider - Full Width */}
      </div>
      
      <div className="relative w-full">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-[24px] overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="flex-shrink-0 w-[320px] md:w-[400px] lg:w-[420px] group/card"
            >
              {/* Title */}
              <div className="mb-[12px]">
                <p className="text-[1.8rem] font-normal tracking-[0.02em] text-white pb-8">
                  {workflow.title}
                </p>
              </div>
              
              {/* Card */}
              <div className="relative aspect-[5/3] rounded-[16px] overflow-hidden bg-[#1f1f1f] border border-white/5 transition-all duration-300 group-hover/card:border-white/15">
                <img
                  src={workflow.image}
                  alt={workflow.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                {/* "Try" Button */}
                <div className="absolute bottom-0 left-0">
                  <button className="bg-[#f7ff9e] text-black px-[24px] py-[10px] rounded-tr-[16px] text-[16px] font-medium transition-all hover:bg-[#eaff6e] active:scale-95 shadow-lg">
                    Try
                  </button>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>

      {/* Navigation Controls - Mobile */}
      <div className="container px-[5%] max-w-[1440px] mx-auto">
        <div className="flex md:hidden gap-[12px] mt-[32px] justify-center">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-[44px] h-[44px] rounded-full border flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'border-white/20 text-white'
                : 'border-white/10 text-white/20 cursor-not-allowed'
            }`}
          >
            <ArrowLeft size={16} strokeWidth={2} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-[44px] h-[44px] rounded-full border flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'border-white/20 text-white'
                : 'border-white/10 text-white/20 cursor-not-allowed'
            }`}
          >
            <ArrowRight size={16} strokeWidth={2} />
          </button>
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
