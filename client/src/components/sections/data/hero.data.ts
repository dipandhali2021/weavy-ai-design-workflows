import type { NodeExtent } from '../types';

/**
 * Initial nodes for the hero section React Flow diagram (Desktop)
 */
export const HERO_NODES = [
    {
        id: '1',
        type: 'imageNode',
        position: { x: 50, y: 650 },
        data: {
            label: 'RODIN 2.0',
            sublabel: '3D',
            image:
                'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd65ba87c69df161752e5_3d_card.avif',
            width: 140,
            height: 180,
        },
    },
    {
        id: '2',
        type: 'imageNode',
        position: { x: 50, y: 950 },
        data: {
            label: 'COLOR REFERENCE',
            image:
                'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd77722078ff43fe428f3_hcard-color%20reference.avif',
            width: 180,
            height: 110,
        },
    },
    {
        id: '3',
        type: 'imageNode',
        position: { x: 380, y: 700 },
        data: {
            label: 'STABLE DIFFUSION',
            sublabel: 'IMAGE',
            image:
                'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd7cbc22419b32bb9d8d8_hcard%20-%20STABLE%20DIFFUSION.avif',
            width: 300,
            height: 420,
        },
    },
    {
        id: '4',
        type: 'textNode',
        position: { x: 850, y: 720 },
        data: {
            label: 'TEXT',
            text: "a Great-Tailed Grackle bird is flying from the background and seating on the model's shoulder slowly and barely moves. the model looks at the camera. then bird flies away. cinematic.",
            width: 220,
        },
    },
    {
        id: '5',
        type: 'imageNode',
        position: { x: 850, y: 920 },
        data: {
            label: 'FLUX PRO 1.1',
            sublabel: 'IMAGE',
            image:
                'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6837510acbe777269734b387_bird_desktop.avif',
            width: 150,
            height: 220,
        },
    },
    {
        id: '6',
        type: 'videoNode',
        position: { x: 1200, y: 680 },
        data: {
            label: 'MINIMAX VIDEO',
            sublabel: 'VIDEO',
            video: 'https://assets.weavy.ai/homepage/hero/hero_video.mp4',
            width: 280,
            height: 420,
        },
    },
];

/**
 * Mobile-optimized nodes for the hero section React Flow diagram
 * Nodes are positioned vertically with smaller sizes for mobile screens
 */
export const HERO_NODES_MOBILE = [
    {
        id: '2',
        type: 'imageNode',
        position: { x: 0, y: 0 },
        data: {
            label: 'COLOR REFERENCE',
            image:
                'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd77722078ff43fe428f3_hcard-color%20reference.avif',
            width: 10,
            height: 40,
        },
    },
    {
        id: '1',
        type: 'imageNode',
        position: { x: 0, y: 80 },
        data: {
            label: 'RODIN 2.0',
            sublabel: '3D',
            image:
                'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd65ba87c69df161752e5_3d_card.avif',
            width: 130,
            height: 160,
        },
    },
    {
        id: '3',
        type: 'imageNode',
        position: { x: 20, y: 220 },
        data: {
            label: 'STABLE DIFFUSION',
            sublabel: 'IMAGE',
            image:
                'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd7cbc22419b32bb9d8d8_hcard%20-%20STABLE%20DIFFUSION.avif',
            width: 180,
            height: 280,
        },
    },
    {
        id: '5',
        type: 'imageNode',
        position: { x: 230, y: 420 },
        data: {
            label: 'FLUX PRO 1.1',
            sublabel: 'IMAGE',
            image:
                'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6837510acbe777269734b387_bird_desktop.avif',
            width: 130,
            height: 190,
        },
    },
    {
        id: '6',
        type: 'videoNode',
        position: { x: 30, y: 620 },
        data: {
            label: 'MINIMAX VIDEO',
            sublabel: 'VIDEO',
            video: 'https://assets.weavy.ai/homepage/hero/hero_video.mp4',
            width: 10,
            height: 40,
        },
    },
];

/**
 * Initial edges connecting the hero nodes
 */
export const HERO_EDGES = [
    {
        id: 'e1-3',
        source: '1',
        target: '3',
        animated: false,
        style: { stroke: '#c5c5c0', strokeWidth: 1.5 },
    },
    {
        id: 'e2-3',
        source: '2',
        target: '3',
        animated: false,
        style: { stroke: '#c5c5c0', strokeWidth: 1.5 },
    },
    {
        id: 'e3-4',
        source: '3',
        target: '4',
        animated: false,
        style: { stroke: '#c5c5c0', strokeWidth: 1.5 },
    },
    {
        id: 'e3-5',
        source: '3',
        target: '5',
        animated: false,
        style: { stroke: '#c5c5c0', strokeWidth: 1.5 },
    },
    {
        id: 'e4-6',
        source: '4',
        target: '6',
        animated: false,
        style: { stroke: '#c5c5c0', strokeWidth: 1.5 },
    },
    {
        id: 'e5-6',
        source: '5',
        target: '6',
        animated: false,
        style: { stroke: '#c5c5c0', strokeWidth: 1.5 },
    },
];

/**
 * Node extent limits for the hero React Flow diagram (Desktop)
 * Defines the bounding box for node positions
 */
export const HERO_NODE_EXTENT: NodeExtent = [
    [0, 600], // Top-left limit
    [1600, 1200], // Bottom-right limit
];

/**
 * Node extent limits for mobile screens
 * Adjusted for vertical layout
 */
export const HERO_NODE_EXTENT_MOBILE: NodeExtent = [
    [0, 600], // Top-left limit
    [400, 1200], // Bottom-right limit
];

