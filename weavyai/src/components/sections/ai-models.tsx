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
      className="relative w-full"
      style={{ height: '400vh' }}
    >
      {/* Sticky Background & Content Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Dynamic Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/30 z-10" />
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

        {/* Top & Bottom Gradient Overlays */}
        <div 
          className="absolute top-0 left-0 w-full h-[25vh] z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #0a1a1a, transparent)' }}
        />
        <div 
          className="absolute bottom-0 left-0 w-full h-[35vh] z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #4a7c7c, transparent)' }}
        />

        {/* Content Overlay */}
        <div className="relative z-30 h-full w-full flex">
          {/* Left Text Content */}
          <div className="w-[40%] h-full flex flex-col justify-center pl-12 md:pl-20">
            <h2
              className="text-white font-light leading-[0.95] tracking-[-0.03em] mb-6"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontFamily: "'Inter', -apple-system, sans-serif",
              }}
            >
              Use all AI<br />
              models,<br />
              together at<br />
              last
            </h2>
            <p 
              className="max-w-[320px] text-white/70 leading-relaxed"
              style={{
                fontSize: '0.875rem',
                fontFamily: "'Inter', -apple-system, sans-serif",
              }}
            >
              AI models and professional editing tools in one node-based platform. Turn creative vision into scalable workflows without compromising quality.
            </p>
          </div>

          {/* Right Scrolling List of Model Names */}
          <div className="w-[55%] h-full flex items-center justify-start overflow-hidden">
            <div className="relative h-auto w-full">
              {/* This inner div moves based on activeIndex */}
              <div
                className="transition-transform duration-700 ease-out flex flex-col"
                style={{ 
                  transform: `translateY(calc(50vh - ${activeIndex * 58}px - 180px))`,
                }}
              >
                {MODELS.map((model, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center transition-all duration-500 whitespace-nowrap ${
                      activeIndex === idx
                        ? 'text-[#f7ff9e]'
                        : 'opacity-40'
                    }`}
                  >
                    <span
                      className="tracking-[-0.02em]"
                      style={{
                        fontSize: 'clamp(4rem, 5vw, 4rem)',
                        fontFamily: "'General Sans', 'Inter', -apple-system, sans-serif",
                        fontWeight: 400,
                        lineHeight: 1.15,
                        color: activeIndex === idx ? '#f7ff9e' : 'rgba(255, 255, 255, 0.4)',
                      }}
                    >
                      {model.name}
                    </span>
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
