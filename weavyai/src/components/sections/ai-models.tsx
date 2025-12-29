'use client';

import { useEffect, useRef, useState } from 'react';

interface AIModel {
  name: string;
  type: 'image' | 'video';
  src: string;
}

const MODELS: AIModel[] = [
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
    name: 'Veo 3',
    type: 'video',
    src: 'https://assets.weavy.ai/homepage/videos/Veo2.mp4',
  },
  {
    name: 'Recraft V3',
    type: 'image',
    src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887eda73c12eaa4c3ed8_Recraft%20V3.avif',
  },
  {
    name: 'Kling',
    type: 'video',
    src: 'https://assets.weavy.ai/homepage/videos/kling.mp4',
  },
  {
    name: 'Flux Pro 1.1 Ultra',
    type: 'image',
    src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887d8a7b4e937a86ea6a_Flux%20Pro%201.1%20Ultra.avif',
  },
  {
    name: 'Minimax video',
    type: 'video',
    src: 'https://assets.weavy.ai/homepage/videos/minimax_video.mp4',
  },
  {
    name: 'Ideogram V3',
    type: 'image',
    src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887d9b7eb0abc91263b6_Ideogram%20V2.avif',
  },
  {
    name: 'Luma ray 2',
    type: 'video',
    src: 'https://assets.weavy.ai/homepage/videos/luma_ray_2.mp4',
  },
  {
    name: 'Minimax image 01',
    type: 'image',
    src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68258880f266d11a0748ab63_Minimax%20image%2001.avif',
  },
  {
    name: 'Hunyuan',
    type: 'video',
    src: 'https://assets.weavy.ai/homepage/videos/hunyuan.mp4',
  },
  {
    name: 'Bria',
    type: 'image',
    src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887d59ff2f86b8fba523_Bria.avif',
  },
];

export default function AIModelsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrollPos = -rect.top;

      // Calculate how many "steps" we've scrolled through
      // The section is about 500vh tall to allow for the scroll transitions
      const progress = Math.max(
        0,
        Math.min(1, scrollPos / (sectionHeight - window.innerHeight))
      );
      const newIndex = Math.min(
        MODELS.length - 1,
        Math.floor(progress * MODELS.length)
      );

      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full text-white"
      style={{ height: '400vh' }}
    >
      {/* Sticky Background & Content Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Dynamic Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          {MODELS.map((model, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeIndex === idx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {model.src ? (
                model.type === 'video' ? (
                  <video
                    src={model.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={model.src}
                    alt={model.name}
                    className="h-full w-full object-cover"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                )
              ) : (
                <div className="h-full w-full bg-neutral-900 flex items-center justify-center">
                  <span className="text-neutral-700 font-mono text-sm uppercase">
                    Asset Placeholder
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Top & Bottom Gradient Overlays for smooth entry/exit */}
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-linear-to-b from-[#F1F3F2] to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-linear-to-t from-background to-transparent z-20 pointer-events-none" />

        {/* Content Overlay */}
        <div className="relative z-30 container mx-auto px-10 h-full flex flex-col md:flex-row items-center justify-between pointer-events-none">
          {/* Left Text Content */}
          <div className="w-full md:w-1/2 mt-[10vh] md:mt-0">
            <h2
              className="text-[2.5rem] md:text-[4.5rem] font-medium leading-[1.1] tracking-[-0.02em] mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              }}
            >
              Use all AI models, together at last
            </h2>
            <p className="max-w-[400px] text-lg md:text-xl opacity-90 leading-normal">
              AI models and professional editing tools in one node-based
              platform. Turn creative vision into scalable workflows without
              compromising quality.
            </p>
          </div>

          {/* Right Scrolling List of Model Names */}
          <div className="w-full md:w-1/2 flex justify-end items-center h-full overflow-hidden">
            <div className="relative h-[200px] w-full flex flex-col items-end md:items-end justify-center">
              {/* This inner div moves based on activeIndex to keep the current model centered */}
              <div
                className="transition-transform duration-700 ease-out flex flex-col items-end"
                style={{ transform: `translateY(${-activeIndex * 64 + 32}px)` }}
              >
                {MODELS.map((model, idx) => (
                  <div
                    key={idx}
                    className={`h-16 flex items-center transition-all duration-500 whitespace-nowrap ${
                      activeIndex === idx
                        ? 'text-lime scale-110 opacity-100'
                        : 'text-white/30 scale-100 opacity-100'
                    }`}
                  >
                    <h3
                      className={`text-[2rem] md:text-[3.5rem] font-medium tracking-tighter uppercase font-sans`}
                    >
                      {model.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Spacers to trigger index changes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />
    </section>
  );
}
