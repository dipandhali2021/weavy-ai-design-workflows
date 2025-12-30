'use client';

import { useEffect, useRef, useState, MouseEvent } from 'react';

const ControlTheOutcome = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / window.innerHeight;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setScrollY(scrollProgress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
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

          {/* Inner Parallax Container */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            
            {/* Spaceship (Background ) */}
            <img 
              src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee1e4abc8a6ba31b611d5_spaceship.avif"
              alt="Spaceship"
              className="absolute w-[68%] h-auto object-contain"
              style={{
                left: '16%',
                top: '1%',
              }}
            />

            {/* Astro Image (Main Subject - WITH MOUSE EFFECT) */}
            <img 
              src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee1e4018d126165811a7b_Astro.avif"
              alt="Astronaut"
              className="absolute w-[70%] h-auto object-contain"
              style={{
                transform: `
                  translate3d(
                    calc(${-3 + scrollY * -5}% + ${mousePos.x * 30}px), 
                    calc(${1.3 + scrollY * -2}% + ${mousePos.y * 30}px), 
                    0
                  ) rotateZ(-1deg)
                `,
                transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                left: '18%',
                top: '-5%',
              }}
            />

            

            {/* Phone Image (Foreground - WITH MOUSE EFFECT) */}
            <img 
              src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682eecb4b45672741cafa0f6_phone.avif"
              alt="Phone Interface"
              className="absolute w-[22%] h-auto object-contain blur-[2px]"
              style={{
                transform: `
                  translate3d(
                    calc(${-19 + scrollY * -25}% + ${mousePos.x * -80}px), 
                    calc(${5.7 + scrollY * -8}% + ${mousePos.y * -80}px), 
                    0
                  )
                `,
                transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                left: '65%',
                top: '30%',
                zIndex: 50
              }}
            />
            {/* Text Layer (Floating - WITH MOUSE EFFECT) */}
            <img 
              src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee1e3553ccb7b1eac8758_text%20-%20in%20astro.svg"
              alt="Text Layer"
              className="z-20 absolute w-[30%] h-auto object-contain"
              style={{
                transform: `
                  translate3d(
                    calc(${-11 + scrollY * -15}% + ${mousePos.x * 50}px), 
                    calc(${20 + scrollY * -10}% + ${mousePos.y * 50}px), 
                    0
                  )
                `,
                transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                left: '40%', 
                top: '50%',
                zIndex:60
              }}
            />

          </div>
        </div>
      </div>
    </section>
  );
};

export default ControlTheOutcome;