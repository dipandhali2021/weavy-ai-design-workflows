import type { ChipPosition } from '../types';

/**
 * Pre-defined positions for tool chips in the Professional Tools section
 */
export const CHIP_POSITIONS: ChipPosition[] = [
    { toolId: 'crop', top: '23%', left: '3%' },
    { toolId: 'invert', top: '15%', right: '8%' },
    { toolId: 'outpaint', top: '30%', left: '23%' },
    { toolId: 'inpaint', top: '38%', left: '8%' },
    { toolId: 'mask', top: '44%', right: '5%' },
    { toolId: 'upscale', top: '50%', left: '21%' },
    { toolId: 'painter', top: '22%', right: '22%' },
    { toolId: 'channels', top: '35%', right: '18%' },
    { toolId: 'describer', top: '18%', left: '18%' },
    { toolId: 'relight', top: '52%', left: '5%' },
    { toolId: 'zdepth', top: '53%', right: '18%' },
];
