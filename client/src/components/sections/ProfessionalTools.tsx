'use client';

import { useState } from 'react';
import { PROFESSIONAL_TOOLS, DEFAULT_TOOL_ASSET, CHIP_POSITIONS } from './data';
import { ToolChip } from './primitives';

/**
 * Professional Tools Section Component
 * 
 * Displays an interactive grid of professional editing tools.
 * Features:
 * - Hoverable tool chips that change the central image
 * - Smooth transitions between tool previews
 * - Scattered chip layout across the image
 */
const ProfessionalTools = () => {
  const [activeTool, setActiveTool] = useState<string>('default');

  // Find the asset for the currently active tool
  const activeImage =
    PROFESSIONAL_TOOLS.find((t) => t.id === activeTool)?.asset || DEFAULT_TOOL_ASSET;

  return (
    <section
      className="relative w-full overflow-hidden py-[1rem]"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, #ffffff 0%, #ffffff 30%, transparent 70%),
          url(https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681ccdbeb607e939f7db68fa_BG%20NET%20Hero.avif),
          linear-gradient(to bottom, #ffffff 0%, #d1d9e2 100%)
        `,
        backgroundSize: '100% 100%, 100% 100%, cover',
        backgroundPosition: 'center top, center top, center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container relative z-10 px-[5%]">
        <div className="flex flex-col items-center">
          {/* Header Section */}
          <div className="text-center max-w-[1200px]">
            <h3 className="text-[60px] md:text-[6rem] leading-[1.1] tracking-[-0.03em] text-black mb-[24px]">
              With all the professional
              <br />
              tools you rely on
            </h3>
            <p className="text-[16px] md:text-[1.125rem] text-[#666666] font-normal">
              In one seamless workflow
            </p>
          </div>

          {/* Interaction Area - Large image with chips overlaid */}
          <div className="relative w-full max-w-[1400px] mx-auto">
            {/* Main Image */}
            <div className="relative w-full aspect-[16/12] rounded-[20px] overflow-hidden -translate-y-[30%]">
              <img
                src={activeImage}
                alt="Professional Tool Demonstration"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Tool Chips */}
            {CHIP_POSITIONS.map((pos) => {
              const tool = PROFESSIONAL_TOOLS.find((t) => t.id === pos.toolId);
              if (!tool) return null;

              return (
                <ToolChip
                  key={pos.toolId}
                  label={tool.label}
                  isActive={activeTool === pos.toolId}
                  onHover={() => setActiveTool(pos.toolId)}
                  onLeave={() => setActiveTool('default')}
                  className="absolute"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    right: pos.right,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalTools;
