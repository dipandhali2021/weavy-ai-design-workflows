'use client';

import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="navbar_main flex flex-col w-full fixed top-0 left-0 z-1000 bg-transparent">
      {/* Announcement Banner */}
      <section className="w-full h-[49px] bg-[#0E0E13] flex items-center justify-center overflow-hidden">
        <div className="px-[2%] w-full flex justify-center">
          <div className="flex items-center gap-3">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/69032e91ec29a8f27508fa9c_Image-Figma_acc-1.avif"
              alt="Figma"
              className="h-4 w-auto"
            />
            <p className="text-white text-[12px] font-medium">
              <strong>Weavy is now a part of Figma</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Main Navigation */}
      <div className="flex justify-between w-full h-[80px] border-b border-black/5">
        {/* Logo */}
        <div className="pl-0 invert">
          <a href="/">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/svgs/682350d42a7c97b440a58480_Nav_20left_20item_20-_20D-1.svg"
              alt="Weavy Logo"
              className="h-[30px] hidden md:block"
            />
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/svgs/682b76283538127bf3907ded_Frame_20427321089-2.svg"
              alt="Weavy Logo"
              className="h-[30px] md:hidden"
            />
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-start gap-[30px] h-full ">
          {/* Nav Links */}
          <nav className="hidden lg:flex items-start p-1 h-full gap-4">
            {/* Changed items-start to items-center and reduced gap to account for button padding */}
            {[
              ['COLLECTIVE', '/collective'],
              ['ENTERPRISE', '/enterprise'],
              ['PRICING', '/pricing'],
              ['REQUEST A DEMO', '/demo'],
              ['SIGN IN', 'https://app.weavy.ai/signin'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-[13px] uppercase tracking-[0.06em] text-black/70 
                 px-4 py-2 rounded-sm transition-all duration-200
                 flex items-center justify-center
                 hover:text-white hover:bg-[#0E0E13]"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Start Now */}
          <a
            href="https://app.weavy.ai/signin"
            className={`bg-[#FDFFA8] text-black flex items-end justify-center tracking-wide transition-all duration-300 rounded-bl-md  hover:text-white hover:bg-[#16161c] active:scale-[0.98]
              ${
                scrolled
                  ? 'h-[42px] px-2 text-[13px] pb-1 uppercase'
                  : 'h-20 px-4 text-[28px] pb-1 '
              }`}
          >
            Start Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
