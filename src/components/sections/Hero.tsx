import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden  min-h-screen pt-32 pb-20"
      style={{
        backgroundImage:
          'url(https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681ccdbeb607e939f7db68fa_BG%20NET%20Hero.avif)',
        backgroundSize: 'contain',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Massive Typography Overlay */}
      <div className="container relative z-10 pointer-events-none">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 px-[5%]">
          <h1 className="text-[clamp(4rem,10vw,8.75rem)] font-medium leading-[0.85] tracking-[-0.04em] text-black uppercase">
            Weavy
          </h1>
          <div className="max-w-[800px] text-right">
            <h1 className="text-[clamp(4rem,10vw,8.75rem)] font-medium leading-[0.85] tracking-[-0.04em] text-black uppercase mb-8">
              Artistic Intelligence
            </h1>
            <p className="text-xl md:text-2xl text-black/80 max-w-[420px] ml-auto leading-relaxed text-left pointer-events-auto">
              Turn your creative vision into scalable workflows. Access all AI
              models and professional editing tools in one node based platform.
            </p>
          </div>
        </div>
      </div>

      {/* Node-based Interactive Layout Area */}
      <div className="relative w-full max-w-[1200px] mx-auto h-[500px] mt-8 px-[5%]">
        {/* SVG Connections (Fluid Lines) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M150 100 C 250 100, 250 250, 380 250"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M150 350 C 250 350, 250 250, 380 250"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M580 250 C 650 250, 650 180, 730 180"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M580 250 C 650 250, 650 340, 730 340"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1.5"
          />
          <path
            d="M850 250 C 920 250, 920 340, 980 340"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1.5"
          />
          {/* Connector dots */}
          <circle
            cx="155"
            cy="95"
            r="3"
            fill="white"
            stroke="rgba(0,0,0,0.1)"
          />
          <circle
            cx="155"
            cy="355"
            r="3"
            fill="white"
            stroke="rgba(0,0,0,0.1)"
          />
          <circle
            cx="375"
            cy="250"
            r="3"
            fill="white"
            stroke="rgba(0,0,0,0.1)"
          />
          <circle
            cx="585"
            cy="250"
            r="3"
            fill="white"
            stroke="rgba(0,0,0,0.1)"
          />
          <circle
            cx="730"
            cy="180"
            r="3"
            fill="white"
            stroke="rgba(0,0,0,0.1)"
          />
          <circle
            cx="730"
            cy="340"
            r="3"
            fill="white"
            stroke="rgba(0,0,0,0.1)"
          />
        </svg>

        {/* Node Cards */}

        {/* Node 1: 3D Rodin */}
        <div className="absolute left-[5%] top-[10%] z-20 group">
          <div className="bg-white rounded-[10px] border border-black/10 p-1 shadow-sm transition-transform hover:-translate-y-1">
            <div className="px-2.5 py-1 flex justify-between items-center border-b border-black/5">
              <span className="font-mono text-[9px] uppercase text-black/40">
                3D
              </span>
              <span className="font-mono text-[9px] uppercase text-black/60 font-medium">
                Rodin 2.0
              </span>
            </div>
            <div className="relative w-[110px] h-[130px] overflow-hidden rounded-b-[8px]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/681cd65ba87c69df161752e5_3d_card-2.avif"
                alt="Rodin 3D Card"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Node 2: Color Reference */}
        <div className="absolute left-[5%] top-[60%] z-20">
          <div className="bg-white rounded-[10px] border border-black/10 p-1 shadow-sm transition-transform hover:-translate-y-1">
            <div className="px-2.5 py-1 flex justify-between items-center border-b border-black/5">
              <span className="font-mono text-[9px] uppercase text-black/40">
                Reference
              </span>
              <span className="font-mono text-[9px] uppercase text-black/60 font-medium">
                Color
              </span>
            </div>
            <div className="relative w-[170px] h-[90px] overflow-hidden rounded-b-[8px]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/681cd77722078ff43fe428f3_hcard-color_20reference-4.avif"
                alt="Color Reference"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Node 3: Main Central Image (Stable Diffusion) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="bg-white rounded-[16px] border border-black/10 p-1 shadow-xl transition-transform hover:scale-[1.02]">
            <div className="px-3 py-1.5 flex justify-between items-center border-b border-black/5">
              <span className="font-mono text-[9px] uppercase text-black/40 tracking-wider">
                Image
              </span>
              <span className="font-mono text-[9px] uppercase text-black/80 font-semibold tracking-wider">
                Stable Diffusion
              </span>
            </div>
            <div className="relative w-[240px] h-[310px] overflow-hidden rounded-b-[14px]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/681cd7cbc22419b32bb9d8d8_hcard_20-_20STABLE_20DIFF-6.avif"
                alt="Stable Diffusion Output"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Node 4: Text Prompt */}
        <div className="absolute right-[28%] top-[20%] z-20">
          <div className="bg-white rounded-[10px] border border-black/10 p-1 shadow-sm max-w-[160px] transition-transform hover:-translate-y-1">
            <div className="px-2.5 py-1 border-b border-black/5">
              <span className="font-mono text-[9px] uppercase text-black/40">
                Text Prompt
              </span>
            </div>
            <div className="p-2">
              <p className="text-[9px] leading-relaxed text-black/70 font-mono">
                "a Great-Tailed Grackle bird is flying from the background and
                seating on the model's shoulder slowly..."
              </p>
            </div>
          </div>
        </div>

        {/* Node 5: Flux Pro Image */}
        <div className="absolute right-[28%] top-[60%] z-20">
          <div className="bg-white rounded-[10px] border border-black/10 p-1 shadow-sm transition-transform hover:-translate-y-1">
            <div className="px-2.5 py-1 flex justify-between items-center border-b border-black/5">
              <span className="font-mono text-[9px] uppercase text-black/40">
                Image
              </span>
              <span className="font-mono text-[9px] uppercase text-black/60 font-medium">
                Flux Pro 1.1
              </span>
            </div>
            <div className="relative w-[120px] h-[150px] overflow-hidden rounded-b-[8px]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/6837510acbe777269734b387_bird_desktop-8.avif"
                alt="Bird generated with Flux"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Node 6: Video Output (Minimax) */}
        <div className="absolute right-[5%] top-[40%] z-20">
          <div className="bg-white rounded-[12px] border border-black/10 p-1 shadow-lg transition-transform hover:-translate-y-1">
            <div className="px-2.5 py-1.5 flex justify-between items-center border-b border-black/5">
              <span className="font-mono text-[9px] uppercase text-black/40">
                Video
              </span>
              <span className="font-mono text-[9px] uppercase text-black/60 font-medium">
                Minimax Video
              </span>
            </div>
            <div className="relative w-[220px] aspect-video overflow-hidden rounded-b-[10px] bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-90"
              >
                <source
                  src="https://assets.weavy.ai/homepage/hero/hero_video.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
