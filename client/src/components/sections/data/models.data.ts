import type { AIModel, Tool } from '../types';

/**
 * AI Models for the scrolling showcase section
 * Each model includes display name, media type, and source URL
 */
export const AI_MODELS: AIModel[] = [
    {
        name: 'GPT img 1',
        type: 'image',
        src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/6825887e82ac8a8bb8139ebd_GPT_20img_201-12.avif',
    },
    {
        name: 'Wan',
        type: 'video',
        src: 'https://assets.weavy.ai/homepage/videos/wan.mp4',
    },
    {
        name: 'SD 3.5',
        type: 'image',
        src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/6825887d618a9071dd147d5f_SD_203_5-13.avif',
    },
    {
        name: 'Runway Gen-4',
        type: 'video',
        src: 'https://assets.weavy.ai/homepage/videos/runway_gen-4.mp4',
    },
    {
        name: 'Imagen 3',
        type: 'image',
        src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/6825887d65bf65cc5194ac05_Imagen_203-14.avif',
    },
    {
        name: 'Veo 3',
        type: 'video',
        src: 'https://assets.weavy.ai/homepage/videos/Veo2.mp4',
    },
    {
        name: 'Recraft V3',
        type: 'image',
        src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887eda73c12eaa4c3ed8_Recraft%20V3.avif',
    },
    {
        name: 'Kling',
        type: 'video',
        src: 'https://assets.weavy.ai/homepage/videos/kling.mp4',
    },
    {
        name: 'Flux Pro 1.1 Ultra',
        type: 'image',
        src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887d8a7b4e937a86ea6a_Flux%20Pro%201.1%20Ultra.avif',
    },
    {
        name: 'Minimax video',
        type: 'video',
        src: 'https://assets.weavy.ai/homepage/videos/minimax_video.mp4',
    },
    {
        name: 'Ideogram V3',
        type: 'image',
        src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887d9b7eb0abc91263b6_Ideogram%20V2.avif',
    },
    {
        name: 'Luma ray 2',
        type: 'video',
        src: 'https://assets.weavy.ai/homepage/videos/luma_ray_2.mp4',
    },
    {
        name: 'Minimax image 01',
        type: 'image',
        src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68258880f266d11a0748ab63_Minimax%20image%2001.avif',
    },
    {
        name: 'Hunyuan',
        type: 'video',
        src: 'https://assets.weavy.ai/homepage/videos/hunyuan.mp4',
    },
    {
        name: 'Bria',
        type: 'image',
        src: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825887d59ff2f86b8fba523_Bria.avif',
    },
];

/**
 * Professional tools with their demo assets
 */
export const PROFESSIONAL_TOOLS: Tool[] = [
    {
        id: 'invert',
        label: 'Invert',
        asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563d93b3ce65b54f07b_Invert%402x.avif',
    },
    {
        id: 'outpaint',
        label: 'Outpaint',
        asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6822456436dd3ce4b39b6372_Outpaint@2x.avif',
    },
    {
        id: 'crop',
        label: 'Crop',
        asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563af147b5d7c2496ff_Crop@2x.avif',
    },
    {
        id: 'inpaint',
        label: 'Inpaint',
        asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245634dee7dac1dc3ac42_Painter@2x.avif',
    },
    {
        id: 'mask',
        label: 'Mask Extractor',
        asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563d5cb54c747f189ae_Mask@2x.avif',
    },
    {
        id: 'upscale',
        label: 'Upscale',
        asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563290cc77eba8f086a_z%20depth%402x.avif',
    },
    {
        id: 'zdepth',
        label: 'Z Depth Extractor',
        asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/68224563290cc77eba8f086a_z%20depth@2x.avif',
    },
    {
        id: 'describer',
        label: 'Image Describer',
        asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/6825ab42a8f361a9518d5a7f_Image%20describer@2x.avif',
    },
    {
        id: 'channels',
        label: 'Channels',
        asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245646909d06ed8a17f4d_Channels@2x.avif',
    },
    {
        id: 'painter',
        label: 'Painter',
        asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245634dee7dac1dc3ac42_Painter@2x.avif',
    },
    {
        id: 'relight',
        label: 'Relight',
        asset: 'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682245638e6550c59d0bce8f_Upscale%402x.avif',
    },
];

/**
 * Default asset shown when no tool is selected
 */
export const DEFAULT_TOOL_ASSET =
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f5fd82e-0e64-4bc1-b8bd-486911a2d083-weavy-ai/assets/images/68223c9e9705b88c35e76dec_Default_402x-20.avif';
