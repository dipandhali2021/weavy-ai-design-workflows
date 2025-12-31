'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { SidebarNavItemProps } from '../types';

/**
 * SidebarNavItem Component
 * 
 * A navigation item for the dashboard sidebar
 */
export function SidebarNavItem({
  icon,
  label,
  active,
  disabled,
  trailing,
  onClick,
}: SidebarNavItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors',
        active
          ? 'bg-card text-foreground'
          : 'text-foreground/80 hover:bg-card/60 hover:text-foreground',
        disabled && 'cursor-not-allowed opacity-40 hover:bg-transparent'
      )}
    >
      <span className="grid h-8 w-8 place-items-center text-foreground/80">
        {icon}
      </span>
      <span className="text-[14px] font-medium">{label}</span>
      <span className="ml-auto text-foreground/80">{trailing}</span>
    </button>
  );
}
