'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const modelsData = [
  {
    name: 'GPT img 1',
    type: 'image',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/6825887e82ac8a8bb8139ebd_GPT_20img_201-12.avif',
  },
  {
    name: 'Wan',
    type: 'video',
    src: 'https://assets.weavy.ai/homepage/videos/wan.mp4',
  },
  {
    name: 'SD 3.5',
    type: 'image',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/6825887d618a9071dd147d5f_SD_203_5-13.avif',
  },
  {
    name: 'Runway Gen-4',
    type: 'video',
    src: 'https://assets.weavy.ai/homepage/videos/runway_gen-4.mp4',
  },
  {
    name: 'Imagen 3',
    type: 'image',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/6825887d65bf65cc5194ac05_Imagen_203-14.avif',
  },
  {
    name: 'Recraft V3',
    type: 'image',
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/6825887eda73c12eaa4c3ed8_Recraft_20V3-15.avif',
  },
  { name: 'Veo 3', type: 'placeholder' },
  { name: 'Kling', type: 'placeholder' },
  { name: 'Flux Pro 1.1 Ultra', type: 'placeholder' },
  { name: 'Minimax video', type: 'placeholder' },
  { name: 'Ideogram V3', type: 'placeholder' },
  { name: 'Luma ray 2', type: 'placeholder' },
  { name: 'Minimax image 01', type: 'placeholder' },
  { name: 'Hunyuan', type: 'placeholder' },
  { name: 'Bria', type: 'placeholder' },
];

export default function ModelShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !listRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate progress of scroll within the sticky/tall section
      // The section is intentionally tall to allow scroll-jacking effect or observation
      const scrollProgress =
        -sectionRect.top / (sectionRect.height - viewportHeight);
      const clampedProgress = Math.min(Math.max(scrollProgress, 0), 0.99);

      const newIndex = Math.floor(clampedProgress * modelsData.length);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < modelsData.length
      ) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white"
      style={{ height: '400vh' }}
    >
      {/* Sticky Background Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Media Layers */}
        {modelsData.map((model, idx) => (
          <div
            key={model.name + idx}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-in-out',
              activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            {model.type === 'image' && model.src && (
              <img
                src={model.src}
                alt={model.name}
                className="h-full w-full object-cover"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            )}
            {model.type === 'video' && model.src && (
              <video
                src={model.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            )}
            {model.type === 'placeholder' && (
              <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                <span className="text-neutral-500 font-mono text-sm uppercase tracking-widest">
                  Loading Media for {model.name}...
                </span>
              </div>
            )}
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="relative z-20 h-full max-w-[1440px] mx-auto px-[5%] flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="max-w-xl space-y-6">
              <h2 className="text-[4rem] font-medium leading-[1.1] tracking-[-0.03em]">
                Use all AI models, together at last
              </h2>
              <p className="text-[1.25rem] leading-[1.15] text-neutral-300">
                AI models and professional editing tools in one node-based
                platform. Turn creative vision into scalable workflows without
                compromising quality.
              </p>
            </div>

            {/* Right List - Scrolling Model Names */}
            <div className="relative h-[250px] lg:h-[400px] flex items-center overflow-hidden">
              <div
                ref={listRef}
                className="flex flex-col gap-4 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateY(calc(50% - ${
                    activeIndex * 64
                  }px - 32px))`,
                }}
              >
                {modelsData.map((model, idx) => (
                  <div
                    key={model.name}
                    className={cn(
                      'transition-all duration-300 cursor-default',
                      activeIndex === idx
                        ? 'text-white opacity-100 scale-105'
                        : 'text-white/30 opacity-40 hover:opacity-100'
                    )}
                  >
                    <h3 className="text-[2.5rem] lg:text-[4rem] font-medium tracking-tight whitespace-nowrap">
                      {model.name}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Vignette Shadow on List */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-60" />
            </div>
          </div>
        </div>

        {/* Dynamic Model Indicator (Bottom Left) */}
        <div className="absolute bottom-12 left-[5%] z-30 pointer-events-none">
          <div className="overflow-hidden h-[120px]">
            <div
              className="flex flex-col transition-transform duration-700 ease-in-out"
              style={{ transform: `translateY(-${activeIndex * 120}px)` }}
            >
              {modelsData.map((model) => (
                <span
                  key={model.name}
                  className="text-[5rem] lg:text-[7.5rem] font-medium text-[#F5FF9C]/20 leading-none"
                >
                  {model.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
