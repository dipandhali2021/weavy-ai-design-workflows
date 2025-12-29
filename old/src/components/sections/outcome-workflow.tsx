import React from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const OutcomeWorkflowSection = () => {
  const workflows = [
    {
      title: "Wan Lora - Rotate",
      image: "https://cdn.prod.website-files.com/681b040781d5b5e278a69989/683751c043700044e036204f_bird_mobile.avif",
      tag: "Try"
    },
    {
      title: "Multiple Models",
      image: "https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887e82ac8a8bb8139ebd_GPT%20img%201.avif",
      tag: "Try"
    },
    {
      title: "Wan LoRa Inflate",
      image: "https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68258880f266d11a0748ab63_Minimax%20image%2001.avif",
      tag: "Try"
    },
    {
      title: "ControlNet - Structure",
      image: "https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887d618a9071dd147d5f_SD%203.5.avif",
      tag: "Try"
    }
  ];

  return (
    <div className="w-full bg-[#F1F3F2]">
      {/* Control the Outcome Section */}
      <section className="relative overflow-hidden blueprint-grid pt-40 pb-32">
        <div className="container mx-auto px-[5%] text-center mb-20">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.02em] text-black mb-6">
            Control the Outcome
          </h2>
          <p className="max-w-[600px] mx-auto text-lg md:text-xl text-[#737373] leading-relaxed">
            Layers, type, and blends—all the tools to bring your wildest ideas to life. Your creativity, our compositing power.
          </p>
        </div>

        {/* High-fidelity Editor UI Mockup */}
        <div className="container mx-auto px-[5%] relative z-10">
          <div className="bg-[#1A1A1A] rounded-[24px] shadow-2xl overflow-hidden border border-white/10 aspect-[16/9] flex">
            {/* Left Sidebar */}
            <div className="w-[240px] border-r border-white/5 flex flex-col p-6 hidden md:flex">
              <div className="text-white font-medium mb-8">Title sequence</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-4 font-mono">Layers</div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <div className="w-4 h-4 bg-white/10 rounded-sm"></div>
                  CANVAS
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm pl-4">
                  <div className="w-4 h-4 border border-white/20"></div>
                  WALKIE TALKIE
                </div>
                <div className="flex items-center gap-3 text-white text-sm pl-4 bg-white/5 -mx-6 px-6 py-2 border-l-2 border-[#EFFFF2]">
                  <div className="w-4 h-4 border border-[#EFFFF2]"></div>
                  TEXT LAYER
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm pl-4">
                  <div className="w-4 h-4 border border-white/20"></div>
                  ASTRONAUT
                </div>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 bg-[#141414] relative flex items-center justify-center p-8 overflow-hidden">
               {/* Grid Pattern in Canvas */}
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
               <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner">
                  <img 
                    src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6836e7885ff7357d922037c4_default_mobile.avif" 
                    alt="Editor Canvas Content" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  {/* Focus Rect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#EFFFF2] p-4 text-[#EFFFF2] font-mono text-center">
                    <div className="mb-2 text-[10px]">Directed by</div>
                    <div className="text-2xl md:text-3xl font-medium">Michael Abernathy</div>
                    {/* Measurement Lines */}
                    <div className="absolute -top-6 left-0 right-0 h-px bg-[#EFFFF2]/40 flex justify-center items-center">
                      <span className="bg-[#1A1A1A] px-1 text-[8px]">1024</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Right Properties Panel */}
            <div className="w-[300px] border-l border-white/5 bg-[#1A1A1A] p-6 hidden lg:block">
              <div className="flex items-center gap-2 text-white font-medium mb-8">
                <span className="text-[#EFFFF2]">T</span> TEXT LAYER
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3 font-mono">Dimensions</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#262626] rounded-md p-2 flex items-center gap-2 border border-white/5">
                      <span className="text-white/30 font-mono text-[10px]">W</span>
                      <span className="text-white text-xs font-mono">1024</span>
                    </div>
                    <div className="bg-[#262626] rounded-md p-2 flex items-center gap-2 border border-white/5">
                      <span className="text-white/30 font-mono text-[10px]">H</span>
                      <span className="text-white text-xs font-mono">1240</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3 font-mono">Position</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#262626] rounded-md p-2 flex items-center gap-2 border border-white/5">
                      <span className="text-white/30 font-mono text-[10px]">X</span>
                      <span className="text-white text-xs font-mono">240</span>
                    </div>
                    <div className="bg-[#262626] rounded-md p-2 flex items-center gap-2 border border-white/5">
                      <span className="text-white/30 font-mono text-[10px]">Y</span>
                      <span className="text-white text-xs font-mono">724</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3 font-mono">Blending</div>
                  <div className="bg-[#262626] rounded-md p-3 flex items-center justify-between border border-white/5">
                    <span className="text-white text-xs">NORMAL</span>
                    <span className="text-white/40">▼</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3 font-mono">Font</div>
                  <div className="bg-[#262626] rounded-md p-3 flex items-center justify-between border border-white/10 ring-1 ring-[#EFFFF2]/20">
                    <span className="text-white text-xs font-mono">JETBRAINS MONO</span>
                    <span className="text-white/40">▼</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Tag */}
        <div className="container mx-auto px-[5%] mt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-4">
            <span className="text-[12px] font-mono uppercase tracking-widest text-[#737373]">From</span>
            <span className="text-xl md:text-2xl font-medium italic">Workflow</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[12px] font-mono uppercase tracking-widest text-[#737373]">to</span>
            <span className="text-xl md:text-2xl font-medium">App Mode</span>
          </div>
        </div>
      </section>

      {/* Explore Our Workflows Section (Dark) */}
      <section className="bg-[#141414] py-32 md:py-48 overflow-hidden">
        <div className="container mx-auto px-[5%]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
            <div className="max-w-[500px]">
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.02em] text-white mb-8">
                Explore Our Workflows
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                From multi-layer compositing to matte manipulation, Weavy keeps up with your creativity with all the editing tools you recognize and rely on.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all">
                <ArrowLeft size={20} />
              </button>
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-white transition-all bg-white/5">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Workflow Slider */}
          <div className="relative -mr-[50vw]">
            <div className="flex gap-6 overflow-x-auto pb-10 no-scrollbar pr-[50vw]">
              {workflows.map((workflow, index) => (
                <div key={index} className="flex-shrink-0 w-[300px] md:w-[420px] group cursor-pointer">
                  <div className="mb-4 text-white/40 font-mono text-[12px] uppercase tracking-widest">
                    {workflow.title}
                  </div>
                  <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-500">
                    <img 
                      src={workflow.image} 
                      alt={workflow.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay Nodes Mock */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    
                    {/* Badge/CTA */}
                    <div className="absolute bottom-4 left-4 bg-[#EFFFF2] text-black text-[14px] font-medium px-4 py-1.5 flex items-center gap-2 transform transition-transform group-hover:translate-x-1">
                      {workflow.tag}
                    </div>

                    {/* Functional Dots/Lines (Small node mock) */}
                    <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <div className="flex-1 border-t border-dashed border-white/50 mx-2"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OutcomeWorkflowSection;