import React from 'react';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className="navbar_main flex flex-col w-full relative z-[1000]">
      {/* Announcement Banner */}
      <section className="banner_component w-full h-[49px] bg-[#0E0E13] flex items-center justify-center overflow-hidden">
        <div className="padding-global flex items-center justify-center px-[5%] w-full">
          <div className="banner_wrapper flex items-center gap-[12px]">
            <div className="banner_small-image-wrapp flex items-center">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/69032e91ec29a8f27508fa9c_Image-Figma_acc-1.avif"
                alt="Figma"
                className="h-[16px] w-auto object-contain"
              />
            </div>
            <div className="banner_content">
              <div className="banner_rich-text text-white text-[14.4px] font-sans">
                <p><strong>Weavy is now a part of Figma</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Navigation Row */}
      <div className="flex items-center justify-between w-full h-[80px] px-[5%] border-b border-border bg-background">
        {/* Logo Left */}
        <div className="navbar-left">
          <a href="/" className="brand">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/svgs/682350d42a7c97b440a58480_Nav_20left_20item_20-_20D-1.svg"
              alt="Weavy Logo"
              className="h-[24px] w-auto hidden md:block"
            />
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/svgs/682b76283538127bf3907ded_Frame_20427321089-2.svg"
              alt="Weavy Logo"
              className="h-[30px] w-auto md:hidden"
            />
          </a>
        </div>

        {/* Links and CTA Right */}
        <div className="navbar-right flex items-center gap-[40px] h-full">
          <nav className="nav-links-wrapper hidden lg:flex items-center gap-[32px]">
            <a href="/collective" className="nav-link text-[14px] font-medium uppercase tracking-[0.05em] hover:opacity-70 transition-opacity">
              COLLECTIVE
            </a>
            <a href="/enterprise" className="nav-link text-[14px] font-medium uppercase tracking-[0.05em] hover:opacity-70 transition-opacity">
              ENTERPRISE
            </a>
            <a href="/pricing" className="nav-link text-[14px] font-medium tracking-[0.05em] hover:opacity-70 transition-opacity">
              Pricing
            </a>
            <a href="https://app.weavy.ai/signin" className="nav-link text-[14px] font-medium tracking-[0.05em] hover:opacity-70 transition-opacity">
              Sign In
            </a>
          </nav>

          {/* Start Now CTA - Fixed style based on high level design */}
          <div className="flex items-center h-full">
            <a
              id="try_now_top"
              href="https://app.weavy.ai/signin"
              className="bg-lime text-black font-medium h-[80px] px-[40px] flex items-center justify-center text-[18px] transition-transform active:scale-95 whitespace-nowrap"
              style={{ borderRadius: '0' }}
            >
              Start Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;