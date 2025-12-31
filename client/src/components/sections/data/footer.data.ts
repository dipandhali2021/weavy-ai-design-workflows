import type { FooterColumn, SocialLink } from '../types';

/**
 * Footer navigation link columns
 */
export const FOOTER_LINKS: FooterColumn[] = [
    {
        title: 'Get Started',
        links: [
            { label: 'REQUEST A DEMO', href: '#' },
            { label: 'PRICING', href: '/pricing' },
            { label: 'ENTERPRISE', href: '/enterprise' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'ABOUT', href: '/about-us' },
            { label: 'CAREERS', href: '#' },
            { label: 'TRUST', href: '#' },
            { label: 'TERMS', href: '#' },
            { label: 'PRIVACY', href: '#' },
        ],
    },
    {
        title: 'Connect',
        links: [{ label: 'COLLECTIVE', href: '/collective' }],
    },
    {
        title: 'Resources',
        links: [{ label: 'KNOWLEDGE CENTER', href: '#' }],
    },
];

/**
 * Social media links configuration
 */
export const SOCIAL_LINKS: SocialLink[] = [
    {
        platform: 'LinkedIn',
        href: 'https://www.linkedin.com/company/weavy-ai',
        icon: 'linkedin',
    },
    {
        platform: 'Instagram',
        href: 'https://www.instagram.com/weavy_ai/',
        icon: 'instagram',
    },
    {
        platform: 'Twitter',
        href: 'https://x.com/Weavy_ai',
        icon: 'twitter',
    },
    {
        platform: 'Discord',
        href: 'https://discord.gg/jB6vn2ewxW',
        icon: 'discord',
    },
    {
        platform: 'YouTube',
        href: 'https://www.youtube.com/@Weavy-ai',
        icon: 'youtube',
    },
];

/**
 * Footer logo and branding assets
 */
export const FOOTER_ASSETS = {
    logo: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68222dc898cffdbd87733f23_footer-logo%2Btagline%20DESKTOP.svg',
    soc2Badge: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/69398e51b66cfd37e959fee4_image-SOC2_weavy.avif',
};
