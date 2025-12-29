'use client';

import { useState } from 'react';

/**
 * ProfessionalTools Component
 * Clones the interactive "Professional Tools" section with tool chips
 * that change the central image on hover/click.
 */
const ProfessionalTools = () => {
  const [activeTool, setActiveTool] = useState<string>('default');

  const tools = [
    {
      id: 'invert',
      label: 'Invert',
      asset:
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/68224563d93b3ce65b54f07b_Invert@2x.avif',
    },
    {
      id: 'outpaint',
      label: 'Outpaint',
      asset:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6822456436dd3ce4b39b6372_Outpaint@2x.avif',
    },
    {
      id: 'crop',
      label: 'Crop',
      asset:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563af147b5d7c2496ff_Crop@2x.avif',
    },
    {
      id: 'inpaint',
      label: 'Inpaint',
      asset:
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/682245639e16941f61edcc06_Inpaint@2x.avif',
    },
    {
      id: 'mask',
      label: 'Mask extractor',
      asset:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563d5cb54c747f189ae_Mask@2x.avif',
    },
    {
      id: 'upscale',
      label: 'Upscale',
      asset:
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/682245638e6550c59d0bce8f_Upscale@2x.avif',
    },
    {
      id: 'zdepth',
      label: 'Z depth extractor',
      asset:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563290cc77eba8f086a_z%20depth@2x.avif',
    },
    {
      id: 'describer',
      label: 'Image describer',
      asset:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825ab42a8f361a9518d5a7f_Image%20describer@2x.avif',
    },
    {
      id: 'channels',
      label: 'Channels',
      asset:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245646909d06ed8a17f4d_Channels@2x.avif',
    },
    {
      id: 'painter',
      label: 'Painter',
      asset:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245634dee7dac1dc3ac42_Painter@2x.avif',
    },
    {
      id: 'relight',
      label: 'Relight',
      asset:
        'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/68224563b4846eaa2d70f69e_Relight@2x.avif',
    },
  ];

  const defaultAsset =
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/68223c9e9705b88c35e76dec_Default_402x-20.avif';

  // Finding the current active image asset
  const activeImage =
    tools.find((t) => t.id === activeTool)?.asset || defaultAsset;

  return (
    <section className="relative w-full overflow-hidden bg-[#F7F8F7] py-[160px] md:py-[10vw]">
      {/* Grid Pattern Background overlay - purely decorative to match high-level design */}
      <div className="absolute inset-0 z-0 grid-background pointer-events-none opacity-[0.4]" />

      <div className="container relative z-10 px-[5%]">
        <div className="flex flex-col items-center">
          {/* Header Section */}
          <div className="mb-[80px] text-center max-w-[800px]">
            <h2 className="text-[40px] md:text-[4rem] font-medium leading-[1.1] tracking-[-0.03em] text-black mb-[24px]">
              With all the professional tools you rely on
            </h2>
            <p className="text-[18px] md:text-[1.25rem] text-[#555555] font-normal">
              In one seamless workflow
            </p>
          </div>

          {/* Interaction Area */}
          <div className="relative w-full max-w-[1200px] flex flex-col items-center justify-center min-h-[600px]">
            {/* Tool Chips Positioned around the center */}
            {/* We manually map these to match the "scattered" visual from the screenshots */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="relative w-full h-full max-w-[1000px] mx-auto">
                <ToolChip
                  label="Crop"
                  isActive={activeTool === 'crop'}
                  onHover={() => setActiveTool('crop')}
                  onLeave={() => setActiveTool('default')}
                  className="top-[5%] left-[10%]"
                />
                <ToolChip
                  label="Invert"
                  isActive={activeTool === 'invert'}
                  onHover={() => setActiveTool('invert')}
                  onLeave={() => setActiveTool('default')}
                  className="top-[15%] left-[30%]"
                />
                <ToolChip
                  label="Outpaint"
                  isActive={activeTool === 'outpaint'}
                  onHover={() => setActiveTool('outpaint')}
                  onLeave={() => setActiveTool('default')}
                  className="top-[30%] left-[20%]"
                />
                <ToolChip
                  label="Inpaint"
                  isActive={activeTool === 'inpaint'}
                  onHover={() => setActiveTool('inpaint')}
                  onLeave={() => setActiveTool('default')}
                  className="top-[45%] left-[12%]"
                />
                <ToolChip
                  label="Upscale"
                  isActive={activeTool === 'upscale'}
                  onHover={() => setActiveTool('upscale')}
                  onLeave={() => setActiveTool('default')}
                  className="top-[65%] left-[22%]"
                />
                <ToolChip
                  label="Mask Extractor"
                  isActive={activeTool === 'mask'}
                  onHover={() => setActiveTool('mask')}
                  onLeave={() => setActiveTool('default')}
                  className="top-[55%] left-[32%]"
                />

                {/* Right side chips */}
                <ToolChip
                  label="Painter"
                  isActive={activeTool === 'painter'}
                  onHover={() => setActiveTool('painter')}
                  onLeave={() => setActiveTool('default')}
                  className="top-[15%] right-[10%]"
                />
                <ToolChip
                  label="Channels"
                  isActive={activeTool === 'channels'}
                  onHover={() => setActiveTool('channels')}
                  onLeave={() => setActiveTool('default')}
                  className="top-[25%] right-[18%]"
                />
                <ToolChip
                  label="Image Describer"
                  isActive={activeTool === 'describer'}
                  onHover={() => setActiveTool('describer')}
                  onLeave={() => setActiveTool('default')}
                  className="top-[40%] right-[22%]"
                />
                <ToolChip
                  label="Relight"
                  isActive={activeTool === 'relight'}
                  onHover={() => setActiveTool('relight')}
                  onLeave={() => setActiveTool('default')}
                  className="top-[55%] right-[12%]"
                />
                <ToolChip
                  label="Z Depth Extractor"
                  isActive={activeTool === 'zdepth'}
                  onHover={() => setActiveTool('zdepth')}
                  onLeave={() => setActiveTool('default')}
                  className="top-[70%] right-[30%]"
                />
              </div>
            </div>

            {/* Central Focal Content */}
            <div className="relative z-10 w-full max-w-[500px] aspect-square rounded-[12px] overflow-hidden shadow-2xl transition-all duration-500 ease-in-out">
              {/* Transition logic for images */}
              <div className="relative w-full h-full">
                {/* Always render default as baseline or handle transitions via visibility */}
                <img
                  src={activeImage}
                  alt="Professional Tool Demonstration"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * ToolChip Sub-component
 * The individual interactive pills that scatter around the central image.
 */
interface ToolChipProps {
  label: string;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  className?: string;
}

const ToolChip = ({
  label,
  isActive,
  onHover,
  onLeave,
  className,
}: ToolChipProps) => {
  return (
    <div
      className={`absolute pointer-events-auto cursor-pointer transition-all duration-300 ease-out 
      px-[16px] py-[10px] rounded-[100px] bg-white border border-[rgba(0,0,0,0.08)] 
      text-[14px] md:text-[15px] font-medium text-black
      shadow-[0_4px_12px_rgba(0,0,0,0.04)]
      hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:scale-105
      ${
        isActive
          ? 'bg-black text-white border-black'
          : 'hover:border-[rgba(0,0,0,0.2)]'
      }
      ${className}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onHover} // Mobile accessibility
    >
      <div className="whitespace-nowrap">{label}</div>
    </div>
  );
};

export default ProfessionalTools;
