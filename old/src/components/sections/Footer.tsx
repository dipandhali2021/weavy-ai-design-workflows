import React from 'react';
import Image from 'next/image';
import { Linkedin, Instagram, Twitter, Disc, Youtube } from 'lucide-react';

/**
 * Footer component for Weavy.
 * Features a sage-colored background, large "Artificial Intelligence + Human Creativity" text,
 * node-based decorative elements, and a persistent giant "Start Now" button.
 */

const Footer = () => {
  const footerLinks = [
    {
      title: 'Get Started',
      links: [
        { label: 'REQUEST A DEMO', href: '#' },
        { label: 'PRICING', href: '#' },
        { label: 'ENTERPRISE', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'ABOUT', href: '#' },
        { label: 'CAREERS', href: '#' },
        { label: 'TRUST', href: '#' },
        { label: 'TERMS', href: '#' },
        { label: 'PRIVACY', href: '#' },
      ],
    },
    {
      title: 'Connect',
      links: [{ label: 'COLLECTIVE', href: '#' }],
    },
    {
      title: 'Resources',
      links: [{ label: 'KNOWLEDGE CENTER', href: '#' }],
    },
  ];

  return (
    <footer className="relative bg-[#1A1A1A] overflow-hidden">
      {/* Curved Sage Container */}
      <div className="relative bg-[#A8B1A5] rounded-t-[40px] md:rounded-t-[80px] pt-24 pb-16 px-[5%]">
        {/* Node Decorative SVG - Positioned absolutely based on high-level design */}
        <div className="absolute right-0 top-0 h-full w-1/3 pointer-events-none overflow-hidden hidden lg:block">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/svgs/682231a73b5be7ff98f935ac_footer_20Node-4.svg"
            alt=""
            width={400}
            height={800}
            className="absolute right-[-50px] top-[-100px] opacity-80"
          />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Hero Statement */}
          <div className="flex flex-col md:flex-row items-baseline mb-32">
            <h2 className="text-white text-[clamp(2.5rem,8vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.04em]">
              Artificial <br />
              Intelligence
            </h2>
            <span className="text-white text-[clamp(2.5rem,8vw,6.5rem)] font-light px-6 md:px-12">+</span>
            <h2 className="text-white text-[clamp(2.5rem,8vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.04em]">
              Human <br />
              Creativity
            </h2>
          </div>

          {/* Logo and Tagline Row */}
          <div className="flex flex-col md:flex-row justify-between mb-20 gap-12">
            <div className="flex flex-col max-w-sm">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/svgs/68222dc898cffdbd87733f23_footer-logo_2Btagline_20D-5.svg"
                alt="Weavy Artistic Intelligence"
                width={280}
                height={50}
                className="mb-6 h-auto"
              />
              <p className="text-white/80 text-[14px] leading-relaxed max-w-[450px]">
                Weavy is a new way to create. We’re bridging the gap between AI capabilities and human creativity, to continue the tradition of craft in artistic expression. We call it Artistic Intelligence.
              </p>
            </div>

            {/* Link Columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {footerLinks.map((column) => (
                <div key={column.title} className="flex flex-col">
                  <span className="text-white/50 text-[12px] uppercase tracking-wider mb-4 font-medium">
                    {column.title}
                  </span>
                  <div className="flex flex-col gap-3">
                    {column.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-white text-[13px] font-medium hover:opacity-70 transition-opacity"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 items-start">
              <a href="#" className="text-white hover:opacity-70 transition-opacity"><Linkedin size={18} /></a>
              <a href="#" className="text-white hover:opacity-70 transition-opacity"><Instagram size={18} /></a>
              <a href="#" className="text-white hover:opacity-70 transition-opacity"><Twitter size={18} /></a>
              <a href="#" className="text-white hover:opacity-70 transition-opacity"><Disc size={18} /></a>
              <a href="#" className="text-white hover:opacity-70 transition-opacity"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Bottom Compliance and Copyright Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-white/10 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center overflow-hidden">
                 <Image src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682246416909d06ed8a25c38_SOC2%20Logo.png" alt="SOC2" width={30} height={30} className="opacity-80 grayscale invert" />
              </div>
              <div>
                <p className="text-white font-medium text-[12px]">SOC 2 Type II Certified</p>
                <p className="text-white/50 text-[11px]">Your data is protected with industry-standard security controls.</p>
              </div>
            </div>
            <div className="font-mono text-[10px] text-white/50 uppercase tracking-[0.1em] flex gap-8">
              <span>WEAVY © 2025.</span>
              <span>ALL RIGHTS RESERVED.</span>
            </div>
          </div>
        </div>

        {/* Global "Start Now" Fixed-Style Button (but at footer) */}
        <a 
          href="https://app.weavy.ai/signin"
          className="bg-[#EFFFF2] text-black fixed md:absolute bottom-0 right-0 py-8 px-12 md:py-16 md:px-24 flex items-center justify-center transform transition-transform hover:scale-105 active:scale-95 z-[9999]"
        >
          <span className="text-[32px] md:text-[64px] font-medium leading-none tracking-tight">Start Now</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;