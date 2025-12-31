'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { BsInstagram, BsLinkedin, BsTwitter, BsDiscord, BsYoutube } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
import { FOOTER_LINKS, SOCIAL_LINKS, FOOTER_ASSETS } from './data';
import type { SocialLink } from './types';

/**
 * Icon component mapping for social links
 */
const SocialIcons: Record<SocialLink['icon'], React.ComponentType> = {
  linkedin: BsLinkedin,
  instagram: BsInstagram,
  twitter: BsTwitter,
  discord: BsDiscord,
  youtube: BsYoutube,
};

/**
 * Footer Component
 * 
 * The main site footer featuring:
 * - "Artificial Intelligence + Human Creativity" hero statement
 * - Navigation link columns
 * - Social media links
 * - SOC 2 certification badge
 * - Large "Start Now" CTA button
 * - Fully responsive design for mobile screens
 */
const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.dispatchEvent(
          new CustomEvent('footer-visibility', {
            detail: { isVisible: entry.isIntersecting },
          })
        );
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-[#252525] overflow-hidden">
      {/* Curved Sage Container */}
      <div className="relative bg-[#A8B1A5] max-w-[1440px] rounded-tr-[40px] md:rounded-tr-[60px] mt-8 md:mt-24 mr-0 md:mr-16 pt-12 md:pt-24 pb-8 md:pb-12 px-4 md:px-[5%]">
        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Hero Statement */}
          <HeroStatement />

          {/* Logo and START NOW Row - Mobile */}
          <div className="flex items-center justify-between mb-8 md:hidden">
            <img
              src={FOOTER_ASSETS.logo}
              alt="Weavy Artistic Intelligence"
              className="h-[32px] w-auto"
              decoding="async"
            />
            <Link
              href="/signin"
              className="bg-[#f7ff9e] text-black py-2 px-6 rounded-md text-[14px] font-medium tracking-tight transition-transform hover:scale-[1.02] active:scale-95"
            >
              START NOW
            </Link>
          </div>

          {/* Logo and Description - Desktop */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row md:max-w-[80%] gap-4 md:gap-10">
              <img
                src={FOOTER_ASSETS.logo}
                alt="Weavy Artistic Intelligence"
                className="h-[40px] w-auto mb-2 md:mb-6 hidden md:block"
                decoding="async"
              />
              <p className="text-white text-[13px] leading-[1.6] md:leading-[1.5]">
                <span className="text-white font-medium">Weavy</span> is a new way to create. We're bridging the gap between AI capabilities and human creativity, to continue the tradition of craft in artistic expression. We call it Artistic Intelligence.
              </p>
            </div>
          </div>

          {/* Links and Social Row */}
          <div className="flex flex-col lg:flex-row justify-start gap-8 mb-8 md:mb-12">
            {/* Link Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {FOOTER_LINKS.map((column) => (
                <div key={column.title} className="flex flex-col">
                  <span className="text-white/60 text-[11px] uppercase tracking-[0.1em] mb-3 font-medium">
                    {column.title}
                  </span>
                  <div className="flex flex-col gap-2">
                    {column.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-white text-[12px] font-medium uppercase tracking-[0.02em] hover:opacity-70 transition-opacity"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons - Desktop only here, mobile shown separately */}
            <div className="hidden md:flex gap-5 items-start">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SocialIcons[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:opacity-70 transition-opacity text-lg"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Social Icons - Mobile */}
          <div className="flex md:hidden gap-5 items-center mb-8">
            {SOCIAL_LINKS.map((social) => {
              const Icon = SocialIcons[social.icon];
              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-70 transition-opacity text-xl"
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          {/* SOC 2 Badge */}
          <div className="flex items-center gap-4 mb-4 md:mb-2">
            <img
              src={FOOTER_ASSETS.soc2Badge}
              alt="SOC2"
              className="w-[45px] md:w-[50px] h-[45px] md:h-[50px] object-contain"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="text-[#1A1A1A] font-medium text-[11px] md:text-[12px]">
                SOC 2 Type <span className="text-black">II</span> Certified
              </p>
              <p className="text-[#1A1A1A]/50 text-[10px] md:text-[11px]">
                Your data is protected with industry-standard security controls.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="font-mono text-[10px] text-[#1A1A1A]/60 uppercase tracking-[0.1em] flex gap-4">
            <span>WEAVY © 2025.</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>

      {/* Start Now Button - Desktop only */}
      <Link
        href="/signin"
        className="hidden md:flex bg-[#f7ff9e] text-black absolute bottom-0 right-0 pb-10 pt-2 px-8 ml-16 pr-10 items-center justify-center rounded-tl-[40px] transition-transform hover:scale-[1.02] active:scale-95 z-20"
      >
        <span className="text-[40px] md:text-[80px] font-medium leading-none tracking-tight">
          Start Now
        </span>
      </Link>
    </footer>
  );
};

/**
 * Hero statement sub-component with AI + Human Creativity text
 */
const HeroStatement = () => (
  <div className="flex flex-col items-start gap-2 md:gap-0 md:flex-row md:items-center mb-12 md:mb-32">
    <h2 className="text-white text-[clamp(2.5rem,10vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.03em]">
      Artificial<br />Intelligence
    </h2>
    <span className="flex items-center justify-center text-white py-2 md:py-0 md:px-8 group cursor-pointer">
      <GoPlus
        size={60}
        className="md:w-[100px] md:h-[100px] transition-all duration-300 ease-out group-hover:rotate-45 group-hover:text-[#f7ff9e]"
      />
    </span>
    <h2 className="text-white text-[clamp(2.5rem,10vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.03em]">
      Human<br />Creativity
    </h2>
  </div>
);

export default Footer;

