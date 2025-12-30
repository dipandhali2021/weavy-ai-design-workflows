'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const OutcomeWorkflowSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / window.innerHeight;
        // Only update if near/in view to save perfs
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setScrollY(scrollProgress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const workflows = [
    {
      title: 'Wan Lora - Rotate',
      image:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/683751c043700044e036204f_bird_mobile.avif',
      tag: 'Try',
    },
    {
      title: 'Multiple Models',
      image:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887e82ac8a8bb8139ebd_GPT%20img%201.avif',
      tag: 'Try',
    },
    {
      title: 'Wan LoRa Inflate',
      image:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68258880f266d11a0748ab63_Minimax%20image%2001.avif',
      tag: 'Try',
    },
    {
      title: 'ControlNet - Structure',
      image:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887d618a9071dd147d5f_SD%203.5.avif',
      tag: 'Try',
    },
  ];

  return (
    <div className="w-full bg-[#F1F3F2]">
      {/* Control the Outcome Section */}
      <section 
        ref={sectionRef}
        className="relative overflow-hidden pt-40 pb-32"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      >
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
        <div className="container mx-auto px-[5%] relative z-10 min-h-[600px] md:min-h-[800px] flex items-center justify-center perspective-1000">
          <div className="relative w-full max-w-[1200px] aspect-[16/9] md:aspect-[2/1]">
            
            {/* Main Background UI */}
            <img 
              src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee0eea4106dbd4133065d_Weavy%20UI.avif" 
              alt="Weavy UI Interface" 
              className="absolute inset-0 w-full h-auto object-contain z-10"
              style={{
                transform: `scale(${1 + scrollY * 0.05})`,
                transition: 'transform 0.1s ease-out',
                willChange: 'transform'
              }}
            />

            {/* Inner Parallax Container */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              
              {/* Spaceship (Background) */}
              <img 
                src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee1e4abc8a6ba31b611d5_spaceship.avif"
                alt="Spaceship"
                className="absolute w-[65%] h-auto object-contain"
                style={{
                  transform: `translate3d(${-0.5 + scrollY * 2}%, ${-0.16 + scrollY * 5}%, 0) scale(1)`,
                  transition: 'transform 0.1s ease-out',
                  left: '18%',
                  top: '10%',
                  willChange: 'transform'
                }}
              />

              {/* Astro Image (Main Subject) */}
              <img 
                src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee1e4018d126165811a7b_Astro.avif"
                alt="Astronaut"
                className="absolute w-[66%] h-auto object-contain"
                style={{
                  transform: `translate3d(${-3 + scrollY * -5}%, ${1.3 + scrollY * -2}%, 0) rotateZ(-1deg)`,
                  transition: 'transform 0.1s ease-out',
                  left: '17%',
                  top: '12%',
                  willChange: 'transform'
                }}
              />

              {/* Text Layer (Floating) */}
              <img 
                src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee1e3553ccb7b1eac8758_text%20-%20in%20astro.svg"
                alt="Text Layer"
                className="absolute w-[30%] h-auto object-contain"
                style={{
                  transform: `translate3d(${-11 + scrollY * -15}%, ${20 + scrollY * -10}%, 0)`,
                  transition: 'transform 0.1s ease-out',
                  left: '35%', 
                  top: '45%',
                  willChange: 'transform'
                }}
              />

              {/* Phone Image (Foreground) */}
              <img 
                src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682eecb4b45672741cafa0f6_phone.avif"
                alt="Phone Interface"
                className="absolute w-[18%] h-auto object-contain"
                style={{
                  transform: `translate3d(${-19 + scrollY * -25}%, ${5.7 + scrollY * -8}%, 0)`,
                  transition: 'transform 0.1s ease-out',
                  left: '15%',
                  top: '25%',
                  willChange: 'transform'
                }}
              />

            </div>
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
                From multi-layer compositing to matte manipulation, Weavy keeps
                up with your creativity with all the editing tools you recognize
                and rely on.
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
                <div
                  key={index}
                  className="flex-shrink-0 w-[300px] md:w-[420px] group cursor-pointer"
                >
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
