import React from 'react';
import Image from 'next/image';
import { Type, Layout, Image as ImageIcon, Box, User, Rocket, ChevronDown, Monitor } from 'lucide-react';

const ControlTheOutcome = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Grid Background Overlay */}
      <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-50 grid-background" />

      {/* Top Professional Tools Section (Partial visual as context for "Control the Outcome") */}
      <div className="container mx-auto px-[5%] pt-20 pb-10 text-center relative z-10">
        <h2 className="text-[4rem] font-medium leading-[1.1] tracking-[-0.03em] mb-6 text-primary">
          With all the professional tools you rely on
        </h2>
        <p className="text-[1.25rem] text-secondary mb-16 font-sans">
          In one seamless workflow
        </p>

        {/* Floating Tools Interaction Area */}
        <div className="relative h-[480px] w-full max-w-[1000px] mx-auto flex items-center justify-center">
          {/* Left Chips */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-8 items-end pr-12">
            <div className="bg-white px-4 py-2 rounded-full border border-black/10 text-[0.875rem] font-medium shadow-sm translate-x-12 -translate-y-12">Crop</div>
            <div className="bg-white px-4 py-2 rounded-full border border-black/10 text-[0.875rem] font-medium shadow-sm -translate-x-8">Inpaint</div>
            <div className="bg-white px-4 py-2 rounded-full border border-black/10 text-[0.875rem] font-medium shadow-sm translate-x-4 translate-y-8">Outpaint</div>
            <div className="bg-white px-4 py-2 rounded-full border border-black/10 text-[0.875rem] font-medium shadow-sm -translate-x-4 translate-y-16">Upscale</div>
          </div>

          {/* Central Image Mask Overlay Metaphor */}
          <div className="relative w-[400px] h-[400px] rounded-xl overflow-hidden shadow-2xl z-20">
            <Image 
              src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68223c9e9705b88c35e76dec_Default%402x.avif"
              alt="Professional tool center display"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Chips */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-8 items-start pl-12">
            <div className="bg-white px-4 py-2 rounded-full border border-black/10 text-[0.875rem] font-medium shadow-sm -translate-x-12 -translate-y-12">Painter</div>
            <div className="bg-white px-4 py-2 rounded-full border border-black/10 text-[0.875rem] font-medium shadow-sm translate-x-8 -translate-y-4">Channels</div>
            <div className="bg-white px-4 py-2 rounded-full border border-black/10 text-[0.875rem] font-medium shadow-sm -translate-x-4 translate-y-8">Relight</div>
            <div className="bg-white px-4 py-2 rounded-full border border-black/10 text-[0.875rem] font-medium shadow-sm translate-x-4 translate-y-16">Z Depth Extractor</div>
          </div>
        </div>
      </div>

      {/* Main "Control the Outcome" Header */}
      <div className="container mx-auto px-[5%] pt-32 pb-16 text-center">
        <h2 className="text-[4rem] font-medium leading-[1.1] tracking-[-0.03em] mb-6">
          Control the Outcome
        </h2>
        <p className="max-w-[600px] mx-auto text-[1.25rem] text-secondary leading-relaxed">
          Layers, type, and blends—all the tools to bring your wildest ideas to life. Your creativity, our compositing power.
        </p>
      </div>

      {/* Complex Editor UI Wrapper */}
      <div className="container mx-auto px-[5%] pb-40">
        <div className="w-full max-w-[1100px] mx-auto bg-[#1A1A1A] rounded-[24px] overflow-hidden flex shadow-[0_40px_100px_rgba(0,0,0,0.25)] border border-white/5">
          {/* Left Sidebar - Layers */}
          <div className="w-[240px] flex flex-col border-r border-white/10 shrink-0">
            <div className="p-4 border-b border-white/10">
              <span className="text-white/90 text-sm font-medium">Title sequence</span>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Layers</div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-white/5 group">
                  <Layout className="w-4 h-4 text-white/40" />
                  <span className="text-[12px] text-white/60 font-mono">CANVAS</span>
                </div>
                <div className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-white/5 group">
                  <ImageIcon className="w-4 h-4 text-white/40" />
                  <span className="text-[12px] text-white/60 font-mono">WALKIE TALKIE</span>
                </div>
                <div className="flex items-center gap-3 px-2 py-1.5 rounded-md bg-white/10 group">
                  <Type className="w-4 h-4 text-white/90" />
                  <span className="text-[12px] text-white/90 font-mono">TEXT LAYER</span>
                </div>
                <div className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-white/5 group">
                  <User className="w-4 h-4 text-white/40" />
                  <span className="text-[12px] text-white/60 font-mono">ASTRONAUT</span>
                </div>
                <div className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-white/5 group">
                  <Box className="w-4 h-4 text-white/40" />
                  <span className="text-[12px] text-white/60 font-mono">SPACESHIP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area - Canvas View */}
          <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden p-8">
            <div className="relative w-full aspect-[16/10] bg-[#222] rounded-lg overflow-hidden border border-white/10">
              <Image 
                src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563b4846eaa2d70f69e_Relight%402x.avif"
                alt="Compositing Canvas"
                fill
                className="object-cover opacity-80"
              />
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <div className="text-center">
                  <div className="text-white/60 text-[10px] mb-2 font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">Directed by</div>
                  <div className="relative border border-black p-4 bg-white/5 backdrop-blur-md">
                    <span className="font-mono text-2xl text-black tracking-tight font-medium">Michael Abernathy</span>
                    {/* Bounding box handles */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-black -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-black translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-black -translate-x-1/2 translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-black translate-x-1/2 translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Properties */}
          <div className="w-[280px] flex flex-col border-l border-white/10 shrink-0 bg-[#1A1A1A]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-white/60" />
                <span className="text-white/90 text-xs font-medium uppercase tracking-wider">Text Layer</span>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-6">
              {/* Transform Group */}
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Dimensions</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded px-2 py-1.5">
                    <span className="text-white/30 text-[10px] mr-2">W</span>
                    <span className="text-white/90 text-xs font-mono">1024</span>
                  </div>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded px-2 py-1.5">
                    <span className="text-white/30 text-[10px] mr-2">H</span>
                    <span className="text-white/90 text-xs font-mono">1240</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Position</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded px-2 py-1.5">
                    <span className="text-white/30 text-[10px] mr-2">X</span>
                    <span className="text-white/90 text-xs font-mono">240</span>
                  </div>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded px-2 py-1.5">
                    <span className="text-white/30 text-[10px] mr-2">Y</span>
                    <span className="text-white/90 text-xs font-mono">724</span>
                  </div>
                </div>
              </div>

              {/* Interaction Details */}
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Typography</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded px-3 py-2">
                    <span className="text-white/80 text-[11px] font-mono">JETBRAINS MONO</span>
                    <ChevronDown className="w-3 h-3 text-white/40" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded px-3 py-2">
                      <span className="text-white/80 text-[11px] font-mono">MEDIUM</span>
                      <ChevronDown className="w-3 h-3 text-white/40" />
                    </div>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded px-3 py-2">
                      <span className="text-white/80 text-[11px] font-mono">12</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fill Section */}
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Fill</div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-white border border-white/10" />
                  <span className="text-white/80 text-[11px] font-mono">FFFFFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interface Accents */}
      <div className="absolute top-[20%] left-[10%] opacity-20 hidden lg:block">
        <Monitor className="w-32 h-32 text-secondary" />
      </div>
      <div className="absolute bottom-[10%] right-[10%] opacity-20 hidden lg:block">
        <Rocket className="w-24 h-24 text-secondary rotate-12" />
      </div>
    </section>
  );
};

export default ControlTheOutcome;