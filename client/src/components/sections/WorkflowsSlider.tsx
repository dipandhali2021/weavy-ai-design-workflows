'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useHorizontalScroll } from './hooks';
import { WORKFLOW_CARDS } from './data';
import type { NavigationButtonProps, WorkflowCard } from './types';

/**
 * Workflows Slider Section Component
 * 
 * A horizontal carousel showcasing workflow examples.
 * Features:
 * - Smooth horizontal scrolling with arrow navigation
 * - Responsive card sizes
 * - "Try" buttons for each workflow
 */
export default function WorkflowsSlider() {
  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useHorizontalScroll({ scrollAmount: 400 });

  return (
    <section className="hidden md:block bg-[#252525] text-white py-[120px] md:py-[160px] overflow-hidden">
      <div className="container px-[5%] max-w-[1440px] mx-auto">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-[48px]">
          <div className="max-w-[500px]">
            <h2 className="text-[5rem] font-medium leading-[1.05] tracking-[-0.03em] mb-[20px]">
              Explore Our<br />Workflows
            </h2>
            <p className="text-white text-[15px] md:text-[16px] leading-[1.6]">
              From multi-layer compositing to matte manipulation, Weavy keeps up
              with your creativity with all the editing tools you recognize and
              rely on.
            </p>
          </div>

          {/* Navigation Controls - Desktop */}
          <div className="hidden md:flex gap-[12px]">
            <NavigationButton
              direction="left"
              onClick={() => scrollLeft()}
              disabled={!canScrollLeft}
            />
            <NavigationButton
              direction="right"
              onClick={() => scrollRight()}
              disabled={!canScrollRight}
            />
          </div>
        </div>
      </div>

      {/* Workflow Cards Slider */}
      <div className="relative w-full">
        <div
          ref={scrollRef}
          className="flex gap-[24px] overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {WORKFLOW_CARDS.map((workflow) => (
            <WorkflowCardComponent key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </div>

      {/* Navigation Controls - Mobile */}
      <div className="container px-[5%] max-w-[1440px] mx-auto">
        <div className="flex md:hidden gap-[12px] mt-[32px] justify-center">
          <NavigationButton
            direction="left"
            onClick={() => scrollLeft()}
            disabled={!canScrollLeft}
            size="small"
          />
          <NavigationButton
            direction="right"
            onClick={() => scrollRight()}
            disabled={!canScrollRight}
            size="small"
          />
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

/**
 * Navigation button component for the slider
 */
const NavigationButton = ({
  direction,
  onClick,
  disabled,
  size = 'normal',
}: NavigationButtonProps) => {
  const Icon = direction === 'left' ? ArrowLeft : ArrowRight;
  const dimensions = size === 'normal' ? 'w-[48px] h-[48px]' : 'w-[44px] h-[44px]';
  const iconSize = size === 'normal' ? 18 : 16;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${dimensions} rounded-full border flex items-center justify-center transition-all duration-300 ${
        disabled
          ? 'border-white/10 text-white/20 cursor-not-allowed'
          : 'border-white/20 text-white hover:bg-white hover:text-black'
      }`}
    >
      <Icon size={iconSize} strokeWidth={2} />
    </button>
  );
};

/**
 * Individual workflow card component
 */
interface WorkflowCardComponentProps {
  workflow: WorkflowCard;
}

const WorkflowCardComponent = ({ workflow }: WorkflowCardComponentProps) => {
  return (
    <div className="flex-shrink-0 w-[320px] md:w-[400px] lg:w-[420px] group/card">
      {/* Title */}
      <div className="mb-[12px]">
        <p className="text-[1.8rem] font-normal tracking-[0.02em] text-white pb-8">
          {workflow.title}
        </p>
      </div>

      {/* Card */}
      <div className="relative aspect-[5/3] rounded-[16px] overflow-hidden bg-[#1f1f1f] border border-white/5 transition-all duration-300 group-hover/card:border-white/15">
        <img
          src={workflow.image}
          alt={workflow.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* "Try" Button */}
        <div className="absolute bottom-0 left-0">
          <button className="bg-[#f7ff9e] text-black px-[24px] py-[10px] rounded-tr-[16px] text-[16px] font-medium transition-all hover:bg-[#eaff6e] active:scale-95 shadow-lg">
            Try
          </button>
        </div>
      </div>
    </div>
  );
};
