'use client';

import { useRef } from 'react';
import { useScrollProgress, useMousePosition } from './hooks';
import { PARALLAX_IMAGES } from './data';
import type { ParallaxImage } from './types';
import useMediaQuery from '@/hooks/useMediaQuery';

/**
 * Control The Outcome Section Component
 * 
 * A parallax composition section featuring:
 * - Mouse-responsive floating images
 * - Scroll-based parallax effects
 * - Layered astronaut composition
 * - Fully responsive design for mobile screens
 */
const ControlTheOutcome = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScrollProgress();
  const { mousePos, handleMouseMove, handleMouseLeave } = useMousePosition(sectionRef);
  const isMobile = useMediaQuery('(max-width: 768px)');

  /**
   * Calculate transform for a parallax image
   */
  const getParallaxTransform = (image: ParallaxImage) => {
    const xOffset = image.baseX + scrollY * image.scrollMultiplier[0];
    const yOffset = image.baseY + scrollY * image.scrollMultiplier[1];
    const mouseX = mousePos.x * image.mouseMultiplier;
    const mouseY = mousePos.y * image.mouseMultiplier;

    let transform = `translate3d(calc(${xOffset}% + ${mouseX}px), calc(${yOffset}% + ${mouseY}px), 0)`;
    if (image.additionalTransform) {
      transform += ` ${image.additionalTransform}`;
    }
    return transform;
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pb-8 md:pb-12 pt-16 md:pt-0"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, transparent 0%, transparent 80%, #ffffff 90%, #ffffff 100%),
          url(https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681ccdbeb607e939f7db68fa_BG%20NET%20Hero.avif),
          linear-gradient(to bottom, #e8ecef 0%, #ffffff 100%)
        `,
        backgroundSize: '100% 100%, 100% 100%, cover',
        backgroundPosition: 'center top, center top, center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Header Content */}
      <div className="container mx-auto px-4 md:px-[5%] text-center mb-8 md:mb-16 relative z-10">
        <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-black mb-4 md:mb-6">
          Control the<br />Outcome
        </h2>
        <p className="max-w-[360px] md:max-w-[500px] mx-auto text-base md:text-lg text-[#737373] leading-relaxed px-2">
          Layers, type, and blends—all the tools to bring your wildest ideas
          to life. Your creativity, our compositing power.
        </p>
      </div>

      {/* Parallax Composition */}
      <div className="container mx-auto px-2 md:px-[5%] relative z-10 min-h-[100px] md:min-h-[400px] flex items-center justify-center perspective-1000">
        <div className="relative w-full max-w-[1200px] aspect-[1/1] md:aspect-[16/9]">
          {/* Main Background UI */}
          <img
            src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee0eea4106dbd4133065d_Weavy%20UI.avif"
            alt="Weavy UI Interface"
            className="absolute inset-0 w-full h-auto object-contain z-10 pointer-events-none"
          />

          {/* Spaceship (Static Background) */}
          <img
            src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee1e4abc8a6ba31b611d5_spaceship.avif"
            alt="Spaceship"
            className="absolute w-[68%] h-auto object-contain z-10"
            style={{ left: '16%', top: '1%' }}
          />
          
          {/* Inner Parallax Container - Only render on desktop */}
          {!isMobile && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              {PARALLAX_IMAGES.map((image, idx) => (
                <img
                  key={idx}
                  src={image.src}
                  alt={image.alt}
                  className={image.className}
                  style={{
                    transform: getParallaxTransform(image),
                    transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    left: image.left,
                    top: image.top,
                    zIndex: image.zIndex,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ControlTheOutcome;