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
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563d93b3ce65b54f07b_Invert%402x.avif',
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
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245634dee7dac1dc3ac42_Painter@2x.avif',
    },
    {
      id: 'mask',
      label: 'Mask Extractor',
      asset:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563d5cb54c747f189ae_Mask@2x.avif',
    },
    {
      id: 'upscale',
      label: 'Upscale',
      asset:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563290cc77eba8f086a_z%20depth%402x.avif',
    },
    {
      id: 'zdepth',
      label: 'Z Depth Extractor',
      asset:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563290cc77eba8f086a_z%20depth@2x.avif',
    },
    {
      id: 'describer',
      label: 'Image Describer',
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
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245638e6550c59d0bce8f_Upscale%402x.avif',
    },
  ];

  const defaultAsset =
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/68223c9e9705b88c35e76dec_Default_402x-20.avif';

  const activeImage =
    tools.find((t) => t.id === activeTool)?.asset || defaultAsset;

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
          <div className="  text-center max-w-[1200px]">
            <h3 className="text-[60px] md:text-[6rem]  leading-[1.1] tracking-[-0.03em] text-black mb-[24px]">
              With all the professional 
              <br/>
              tools you rely on
            </h3>
            <p className="text-[16px] md:text-[1.125rem] text-[#666666] font-normal">
              In one seamless workflow
            </p>
          </div>

          {/* Interaction Area - Large image with chips overlaid on top */}
          <div className="relative w-full max-w-[1400px] mx-auto">
            {/* Main Image - Large and takes full width */}
            <div className="relative w-full aspect-[16/12] rounded-[20px] overflow-hidden -translate-y-[30%]">
              <img
                src={activeImage}
                alt="Professional Tool Demonstration"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500 " 
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Tool Chips Overlaid on top of the image */}
            {/* Left side chips */}
            <ToolChip
              label="Crop"
              isActive={activeTool === 'crop'}
              onHover={() => setActiveTool('crop')}
              onLeave={() => setActiveTool('default')}
              className="absolute top-[23%] left-[3%]"
            />
            <ToolChip
              label="Invert"
              isActive={activeTool === 'invert'}
              onHover={() => setActiveTool('invert')}
              onLeave={() => setActiveTool('default')}
              className="absolute top-[15%] right-[8%]"
            />
            <ToolChip
              label="Outpaint"
              isActive={activeTool === 'outpaint'}
              onHover={() => setActiveTool('outpaint')}
              onLeave={() => setActiveTool('default')}
              className="absolute top-[30%] left-[23%]"
            />
            <ToolChip
              label="Inpaint"
              isActive={activeTool === 'inpaint'}
              onHover={() => setActiveTool('inpaint')}
              onLeave={() => setActiveTool('default')}
              className="absolute top-[38%] left-[8%]"
            />
            <ToolChip
              label="Mask Extractor"
              isActive={activeTool === 'mask'}
              onHover={() => setActiveTool('mask')}
              onLeave={() => setActiveTool('default')}
              className="absolute top-[44%] right-[5%]"
            />
            <ToolChip
              label="Upscale"
              isActive={activeTool === 'upscale'}
              onHover={() => setActiveTool('upscale')}
              onLeave={() => setActiveTool('default')}
              className="absolute top-[50%] left-[21%]"
            />

            {/* Right side chips */}
            <ToolChip
              label="Painter"
              isActive={activeTool === 'painter'}
              onHover={() => setActiveTool('painter')}
              onLeave={() => setActiveTool('default')}
              className="absolute top-[22%] right-[22%]"
            />
            <ToolChip
              label="Channels"
              isActive={activeTool === 'channels'}
              onHover={() => setActiveTool('channels')}
              onLeave={() => setActiveTool('default')}
              className="absolute top-[35%] right-[18%]"
            />
            <ToolChip
              label="Image Describer"
              isActive={activeTool === 'describer'}
              onHover={() => setActiveTool('describer')}
              onLeave={() => setActiveTool('default')}
              className="absolute top-[18%] left-[18%]"
            />
            <ToolChip
              label="Relight"
              isActive={activeTool === 'relight'}
              onHover={() => setActiveTool('relight')}
              onLeave={() => setActiveTool('default')}
              className="absolute top-[52%] left-[5%]"
            />
            <ToolChip
              label="Z Depth Extractor"
              isActive={activeTool === 'zdepth'}
              onHover={() => setActiveTool('zdepth')}
              onLeave={() => setActiveTool('default')}
              className="absolute top-[53%] right-[18%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * ToolChip Sub-component
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
      className={`pointer-events-auto cursor-pointer transition-all duration-300 ease-out 
      px-6 py-3 rounded-full border text-[18px] font-normal z-20
      shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:scale-[1.02]
      ${
        isActive
          ? 'bg-[#f7ff9e] text-black border-[#f7ff9e]'
          : 'bg-white text-[#666] border-white/80 hover:border-white'
      }
      ${className}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onHover}
    >
      <div className="whitespace-nowrap">{label}</div>
    </div>
  );
};

export default ProfessionalTools;
