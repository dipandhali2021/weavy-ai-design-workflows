'use client';

import { useScrollProgress } from './hooks';
import { AI_MODELS } from './data';
import { GradientOverlay } from './primitives';

/**
 * AI Models Section Component
 * 
 * A scroll-driven showcase that displays AI models one at a time.
 * Features:
 * - Sticky content that changes based on scroll position
 * - Background images/videos that transition smoothly
 * - Scrolling list of model names that highlight when active
 * - Fully responsive design for mobile screens
 */
export default function AIModelsSection() {
  const { sectionRef, progress } = useScrollProgress();

  // Calculate which model is currently active based on scroll progress
  const activeIndex = Math.min(
    AI_MODELS.length - 1,
    Math.floor(progress * AI_MODELS.length)
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '400vh' }}
    >
      {/* Sticky Background & Content Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Dynamic Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/30 z-10" />
          {AI_MODELS.map((model, idx) => (
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
        <GradientOverlay position="top" fromColor="#0a1a1a" />
        <GradientOverlay position="bottom" fromColor="#4a7c7c" />

        {/* Content Overlay - Responsive Layout */}
        <div className="relative z-30 h-full w-full flex flex-col md:flex-row">
          {/* Left Text Content - Top on mobile */}
          <div className="w-full md:w-[40%] h-auto md:h-full flex flex-col justify-start md:justify-center pt-20 md:pt-0 px-4 md:px-0 md:pl-12 lg:pl-20">
            <h2
              className="text-white font-light leading-[0.95] tracking-[-0.03em] mb-4 md:mb-6 md:text-[5rem] text-[4rem] "
              style={{
                fontFamily: "'Inter', -apple-system, sans-serif",
              }}
            >
              Use all AI models, together at last
            </h2>
            <p
              className="text-white leading-relaxed text-sm md:text-base"
              style={{
                fontFamily: "'Inter', -apple-system, sans-serif",
              }}
            >
              AI models and professional editing tools in one node-based platform. Turn creative vision into scalable workflows without compromising quality.
            </p>
          </div>

          {/* Right Scrolling List of Model Names - Below text on mobile */}
          <div className="w-full md:w-[55%] flex-1 md:h-full flex items-start md:items-center justify-start overflow-hidden px-4 md:px-0 mt-8 md:mt-0">
            <div className="relative h-auto w-full">
              <div
                className="transition-transform duration-700 ease-out flex flex-col mt-2 md:mt-20"
                style={{
                  transform: `translateY(calc(20vh - ${activeIndex * 48}px))`,
                }}
              >
                {AI_MODELS.map((model, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center transition-all duration-500 whitespace-nowrap ${
                      activeIndex === idx ? 'text-[#f7ff9e]' : 'opacity-40'
                    }`}
                  >
                    <span
                      className="tracking-[-0.02em] text-[4rem]"
                      style={{
                        fontFamily: "'General Sans', 'Inter', -apple-system, sans-serif",
                        fontWeight: 400,
                        lineHeight: 1.3,
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

