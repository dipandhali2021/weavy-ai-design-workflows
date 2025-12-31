'use client';

import * as React from 'react';
import type { ShowcaseItem } from '../types';

/**
 * ShowcaseCard Component
 * 
 * A card displaying a template/showcase item
 */
export function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <button
      type="button"
      className="relative h-[120px] w-[190px] shrink-0 overflow-hidden rounded-md bg-card shadow-xs"
    >
      <img
        src={item.imageUrl}
        alt="content poster"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <span className="absolute bottom-3 left-3 right-3 truncate text-[13px] font-medium text-white">
        {item.title}
      </span>
    </button>
  );
}
