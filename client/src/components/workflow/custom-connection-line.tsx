'use client';

import * as React from 'react';
import {
    ConnectionLineComponent,
    getStraightPath,
    type ConnectionLineComponentProps,
} from '@xyflow/react';
import { useWorkflowStore } from '@/stores/workflowStore';
import { validateConnection } from '@/lib/connectionValidation';
import { AlertCircle } from 'lucide-react';

/**
 * Custom Connection Line Component
 * 
 * Shows visual feedback during connection dragging:
 * - Green line when connection is valid
 * - Red line with error icon when connection is invalid
 */
export const CustomConnectionLine: ConnectionLineComponent = ({
    fromX,
    fromY,
    toX,
    toY,
    fromHandle,
    fromNode,
    connectionStatus,
}: ConnectionLineComponentProps) => {
    const nodes = useWorkflowStore((s) => s.nodes);
    const edges = useWorkflowStore((s) => s.edges);

    // Determine if current connection attempt is valid
    const isValid = React.useMemo(() => {
        // If we don't have a target yet (just started dragging), show as valid
        if (!connectionStatus || connectionStatus === 'invalid') {
            // connectionStatus from React Flow tells us if there's a valid target
            // If invalid, we show red
            if (connectionStatus === 'invalid') {
                return false;
            }
        }

        return true;
    }, [connectionStatus]);

    // Calculate straight path
    const [path] = getStraightPath({
        sourceX: fromX,
        sourceY: fromY,
        targetX: toX,
        targetY: toY,
    });

    // Color based on validity
    const strokeColor = isValid ? '#22C55E' : '#EF4444'; // Green or Red

    return (
        <g>
            {/* Main connection line */}
            <path
                d={path}
                fill="none"
                stroke={strokeColor}
                strokeWidth={2.5}
                strokeLinecap="round"
                className="animated-connection"
                style={{
                    strokeDasharray: isValid ? '8 4' : '4 4',
                    animation: 'dashmove 0.5s linear infinite',
                }}
            />
            {/* Invalid connection indicator */}
            {!isValid && (
                <g transform={`translate(${toX - 12}, ${toY - 12})`}>
                    <circle
                        cx={12}
                        cy={12}
                        r={14}
                        fill="#1F2937"
                        stroke="#EF4444"
                        strokeWidth={2}
                    />
                    <foreignObject x={4} y={4} width={16} height={16}>
                        <div className="flex items-center justify-center w-full h-full">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                    </foreignObject>
                </g>
            )}
        </g>
    );
};

// CSS animation for the dashed line
export const connectionLineStyles = `
  @keyframes dashmove {
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: -12;
    }
  }
`;
