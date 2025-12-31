'use client';

import { useRef } from 'react';
import { useScrollProgress, useMousePosition } from './hooks';
import { PARALLAX_IMAGES } from './data';
import type { ParallaxImage } from './types';

/**
 * Control The Outcome Section Component
 * 
 * A parallax composition section featuring:
 * - Mouse-responsive floating images
 * - Scroll-based parallax effects
 * - Layered astronaut composition
 */
const ControlTheOutcome = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScrollProgress();
  const { mousePos, handleMouseMove, handleMouseLeave } = useMousePosition(sectionRef);

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
      className="relative overflow-hidden pb-12"
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
      <div className="container mx-auto px-[5%] text-center mb-16 relative z-10">
        <h2 className="text-[clamp(3.5rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-black mb-6">
          Control the<br />Outcome
        </h2>
        <p className="max-w-[500px] mx-auto text-lg text-[#737373] leading-relaxed">
          Layers, type, and blends—all the tools to bring your wildest ideas
          to life. Your creativity, our compositing power.
        </p>
      </div>

      {/* Parallax Composition */}
      <div className="container mx-auto px-[5%] relative z-10 min-h-[600px] md:min-h-[400px] flex items-center justify-center perspective-1000">
        <div className="relative w-full max-w-[1200px] aspect-[16/9] md:aspect-[2/1]">
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

          {/* Inner Parallax Container */}
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
        </div>
      </div>
    </section>
  );
};

export default ControlTheOutcome;