'use client';

import { useState } from 'react';

/**
 * ProfessionalTools Section
 *
 * Featuring a central interactive image area surrounded by floating tool chips.
 * Hovering over tool chips changes the central image to showcase that specific tool's effect.
 */

const tools = [
  { id: 'crop', label: 'Crop', x: '18%', y: '25%' },
  { id: 'invert', label: 'Invert', x: '35%', y: '34%' },
  { id: 'outpaint', label: 'Outpaint', x: '28%', y: '39%' },
  { id: 'inpaint', label: 'Inpaint', x: '21%', y: '44%' },
  { id: 'mask-extractor', label: 'Mask Extractor', x: '35%', y: '49%' },
  { id: 'upscale', label: 'Upscale', x: '27%', y: '54%' },
  { id: 'painter', label: 'Painter', x: '80%', y: '29%' },
  { id: 'channels', label: 'Channels', x: '75%', y: '36%' },
  { id: 'image-describer', label: 'Image Describer', x: '70%', y: '41%' },
  { id: 'relight', label: 'Relight', x: '79%', y: '49%' },
  { id: 'z-depth', label: 'Z Depth Extractor', x: '65%', y: '54%' },
];

const toolImages: Record<string, string> = {
  default:
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/68223c9e9705b88c35e76dec_Default_402x-20.avif',
  blur: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224564b78bd840120b7a38_Blur%402x.avif',
  invert:
    'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563d93b3ce65b54f07b_Invert%402x.avif',
  crop: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563af147b5d7c2496ff_Crop%402x.avif',
  'mask-extractor':
    'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563d5cb54c747f189ae_Mask%402x.avif',
  inpaint:
    'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245639e16941f61edcc06_Inpaint%402x.avif',
  painter:
    'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245634dee7dac1dc3ac42_Painter%402x.avif',
  relight:
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/68224563b4846eaa2d70f69e_Relight_402x-27.avif',
  upscale:
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/682245638e6550c59d0bce8f_Upscale_402x-28.avif',
  'z-depth':
    'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563290cc77eba8f086a_z%20depth%402x.avif',
  channels:
    'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245646909d06ed8a17f4d_Channels%402x.avif',
  outpaint:
    'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6822456436dd3ce4b39b6372_Outpaint%402x.avif',
  'image-describer':
    'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825ab42a8f361a9518d5a7f_Image%20describer%402x.avif',
};

export default function ProfessionalTools() {
  const [activeTool, setActiveTool] = useState('default');

  return (
    <section className="relative overflow-hidden bg-background py-[160px]">
      {/* Background Grid Pattern */}
      <div className="blueprint-grid absolute inset-0 pointer-events-none opacity-40" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.02em] text-foreground mb-4">
            With all the professional tools you rely on
          </h2>
          <p className="text-xl text-muted-foreground">
            In one seamless workflow
          </p>
        </div>

        {/* Interaction Area */}
        <div className="relative min-h-[600px] w-full flex items-center justify-center">
          {/* Central Image Frame */}
          <div className="relative w-[400px] h-[400px] rounded-[20px] overflow-hidden shadow-2xl z-20 bg-white">
            <img
              src={toolImages[activeTool] || toolImages.default}
              alt="Professional adjustment preview"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Floating Tool Chips */}
          <div className="absolute inset-0 hidden lg:block">
            {tools.map((tool) => (
              <div
                key={tool.id}
                onMouseEnter={() => setActiveTool(tool.id)}
                onMouseLeave={() => setActiveTool('default')}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-105 group"
                style={{ left: tool.x, top: tool.y }}
              >
                {/* Visual Connector Anchor */}
                <div className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 bg-border rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Chip Bubble */}
                <div className="relative px-4 py-2 bg-white border border-border rounded-full shadow-sm text-[13px] font-medium whitespace-nowrap text-foreground hover:bg-accent transition-colors">
                  {tool.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Tool Scroll (Simplified for responsiveness) */}
          <div className="lg:hidden w-full mt-12 flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                  activeTool === tool.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-foreground border-border'
                }`}
              >
                {tool.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Gradient Overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none" />
    </section>
  );
}
