import type { ParallaxImage } from '../types';

/**
 * Parallax images for the Control The Outcome section
 * Each image has position, scroll, and mouse movement configurations
 */
export const PARALLAX_IMAGES: ParallaxImage[] = [
    {
        src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee1e4018d126165811a7b_Astro.avif',
        alt: 'Astronaut',
        className: 'absolute w-[70%] h-auto object-contain',
        left: '18%',
        top: '-5%',
        baseX: -3,
        baseY: 1.3,
        scrollMultiplier: [-5, -2],
        mouseMultiplier: 30,
        additionalTransform: 'rotateZ(-1deg)',
    },
    {
        src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682eecb4b45672741cafa0f6_phone.avif',
        alt: 'Phone Interface',
        className: 'absolute w-[22%] h-auto object-contain blur-[2px]',
        left: '65%',
        top: '30%',
        baseX: -19,
        baseY: 5.7,
        scrollMultiplier: [-25, -8],
        mouseMultiplier: -80,
        zIndex: 50,
    },
    {
        src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682ee1e3553ccb7b1eac8758_text%20-%20in%20astro.svg',
        alt: 'Text Layer',
        className: 'z-20 absolute w-[30%] h-auto object-contain',
        left: '40%',
        top: '50%',
        baseX: -11,
        baseY: 20,
        scrollMultiplier: [-15, -10],
        mouseMultiplier: 50,
        zIndex: 60,
    },
];
