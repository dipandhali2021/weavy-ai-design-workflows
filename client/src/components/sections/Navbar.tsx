'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NAV_LINKS, NAVBAR_ASSETS } from './data';

/**
 * Navbar Component
 * 
 * The main site navigation featuring:
 * - Figma announcement banner
 * - Logo with responsive sizing
 * - Navigation links (desktop only)
 * - "Start Now" CTA that shrinks on scroll
 * - Auto-hide when footer is visible
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleFooterVisibility = (e: CustomEvent<{ isVisible: boolean }>) => {
      setFooterVisible(e.detail.isVisible);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('footer-visibility', handleFooterVisibility as EventListener);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('footer-visibility', handleFooterVisibility as EventListener);
    };
  }, []);

  const navbarVisibilityClass = footerVisible
    ? 'opacity-0 -translate-y-full pointer-events-none'
    : 'opacity-100 translate-y-0';

  return (
    <div
      className={`navbar_main flex flex-col w-full fixed top-0 left-0 z-[1000] bg-transparent transition-all duration-500 ${navbarVisibilityClass}`}
    >
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Main Navigation */}
      <div className="flex justify-between w-full h-20 border-black/5">
        {/* Logo */}
        <div className="pl-0 invert">
          <Link href="/">
            <img
              src={NAVBAR_ASSETS.logoDesktop}
              alt="Weavy Logo"
              className="h-[30px] hidden md:block"
            />
            <img
              src={NAVBAR_ASSETS.logoMobile}
              alt="Weavy Logo"
              className="h-[30px] md:hidden"
            />
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-start gap-[30px] h-full">
          {/* Nav Links - Desktop Only */}
          <nav className="hidden lg:flex items-start p-1 h-full gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] uppercase tracking-[0.06em] text-black/70 
                  px-4 py-2 rounded-sm transition-all duration-200
                  flex items-center justify-center
                  hover:text-white hover:bg-[#0E0E13]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Start Now CTA */}
          <Link
            href="/signin"
            className={`bg-[#FDFFA8] text-black flex items-end justify-center tracking-wide transition-all duration-300 rounded-bl-md hover:text-white hover:bg-[#16161c] active:scale-[0.98] ${
              scrolled
                ? 'h-[42px] px-2 text-[13px] pb-1 uppercase'
                : 'h-20 px-4 text-[28px] pb-1'
            }`}
          >
            Start Now
          </Link>
        </div>
      </div>
    </div>
  );
};

/**
 * Announcement banner sub-component
 */
const AnnouncementBanner = () => (
  <section className="w-full h-[49px] bg-[#0E0E13] flex items-center justify-center overflow-hidden">
    <div className="px-[2%] w-full flex justify-center">
      <div className="flex items-center gap-3">
        <img
          src={NAVBAR_ASSETS.figmaIcon}
          alt="Figma"
          className="h-4 w-auto"
        />
        <p className="text-white text-[12px] font-medium">
          <strong>Weavy is now a part of Figma</strong>
        </p>
      </div>
    </div>
  </section>
);

export default Navbar;
