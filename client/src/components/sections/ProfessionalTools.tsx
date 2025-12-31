'use client';

import { useState } from 'react';
import { PROFESSIONAL_TOOLS, DEFAULT_TOOL_ASSET, CHIP_POSITIONS } from './data';
import { ToolChip } from './primitives';

/**
 * Tool description mapping for the "Describer" feature
 */
const TOOL_DESCRIPTIONS: Record<string, string> = {
  describer: "A unique ceramic or clay artifact, possibly a vase or a decorative piece, with a speckled black and white pattern. It is displayed on a rectangular pedestal against a muted beige background. The artifact has an asymmetrical shape, with one side appearing more voluminous and the other more slender. The pedestal itself is of a solid beige color and is placed on a white platform. soft dramatic gradient warm flare. dramatic",
  default: "",
};

/**
 * Professional Tools Section Component
 * 
 * Displays an interactive grid of professional editing tools.
 * Features:
 * - Hoverable tool chips that change the central image
 * - Smooth transitions between tool previews
 * - Scattered chip layout on desktop, horizontal scroll on mobile
 * - Fully responsive design for mobile screens
 */
const ProfessionalTools = () => {
  const [activeTool, setActiveTool] = useState<string>('default');

  // Find the asset for the currently active tool
  const activeImage =
    PROFESSIONAL_TOOLS.find((t) => t.id === activeTool)?.asset || DEFAULT_TOOL_ASSET;
  
  // Get description for the active tool
  const activeDescription = TOOL_DESCRIPTIONS[activeTool] || TOOL_DESCRIPTIONS.default;

  return (
    <section
      className="relative w-full overflow-hidden py-8 md:py-[1rem]"
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
      <div className="container relative z-10 px-4 md:px-[5%]">
        <div className="flex flex-col items-center">
          {/* Header Section */}
          <div className="text-center max-w-[1200px] px-2">
            <h3 className="text-[32px] md:text-[60px] lg:text-[6rem] leading-[1.1] tracking-[-0.03em] text-black mb-4 md:mb-[24px]">
              With all the
              <br className="md:hidden" />
              {" "}professional
              <br />
              tools you rely on
            </h3>
            <p className="text-[14px] md:text-[16px] lg:text-[1.125rem] text-[#666666] font-normal">
              In one seamless workflow
            </p>
          </div>

          {/* Interaction Area */}
          <div className="relative w-full max-w-[1400px] mx-auto">
            {/* Tool Description - Visible when a tool is selected on mobile */}
            {activeDescription && (
              <div className="md:hidden px-4 py-6 text-center">
                <p className="text-[14px] leading-relaxed text-black/80 font-serif italic">
                  {activeDescription}
                </p>
              </div>
            )}

            {/* Main Image Container */}
            <div className="relative w-full aspect-[16/8] rounded-[12px] md:rounded-[20px] overflow-hidden -translate-y-[30%] md:-translate-y-[30%] mx-auto max-w-[400px] md:max-w-none">
              <img
                src={activeImage}
                alt="Professional Tool Demonstration"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Mobile Tool Chips - Horizontal Scrollable Row */}
            <div className="md:hidden relative -mt-4 pb-4">
              <div className="flex gap-3 overflow-x-auto px-4 py-2 scrollbar-hide snap-x snap-mandatory">
                {PROFESSIONAL_TOOLS.map((tool) => (
                  <ToolChip
                    key={tool.id}
                    label={tool.label}
                    isActive={activeTool === tool.id}
                    onHover={() => setActiveTool(tool.id)}
                    onLeave={() => {}}
                    onClick={() => setActiveTool(activeTool === tool.id ? 'default' : tool.id)}
                    className="flex-shrink-0 snap-center"
                  />
                ))}
              </div>
            </div>

            {/* Desktop Tool Chips - Positioned absolutely */}
            <div className="hidden md:block">
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
      </div>
    </section>
  );
};

export default ProfessionalTools;

