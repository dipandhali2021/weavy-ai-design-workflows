import type { HandleColor } from '../types';

/**
 * Handle color values for workflow nodes
 */
export const HANDLE_COLORS: Record<HandleColor, string> = {
    magenta: '#E879F9',
    green: '#10B981',
    cyan: '#22D3EE',
};

/**
 * Get handle style based on color and connection state
 * 
 * @param color - The handle color theme
 * @param isConnected - Whether the handle is connected
 * @returns CSS properties for the handle
 */
export function getHandleStyle(
    color: HandleColor,
    isConnected: boolean
): React.CSSProperties {
    const colorValue = HANDLE_COLORS[color];
    return {
        width: 18,
        height: 18,
        border: `3px solid ${colorValue}`,
        backgroundColor: isConnected ? colorValue : 'transparent',
        boxShadow: isConnected
            ? 'inset 0 0 0 3px hsl(var(--background))'
            : 'none',
    };
}
