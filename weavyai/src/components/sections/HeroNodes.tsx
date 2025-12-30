'use client';
import { Handle, Position } from '@xyflow/react';

export const ImageNode = ({ data }: any) => {
  return (
    <div className="group select-none">
      <div className="flex items-center gap-3 mb-2 px-1">
        {data.sublabel && (
          <span className="text-[10px] font-bold tracking-[0.15em] text-black/40 uppercase">
            {data.sublabel}
          </span>
        )}
        <span className="text-[10px] font-bold tracking-[0.15em] text-black uppercase">
          {data.label}
        </span>
      </div>
      <div
        className="relative rounded-[12px] overflow-hidden bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/5"
        style={{ width: data.width, height: data.height }}
      >
        <img
          src={data.image}
          alt={data.label}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Connection Handles */}
        <Handle
          type="target"
          position={Position.Left}
          className="!w-[10px] !h-[10px] !bg-white !border-[2px] !border-black/20 !-left-[5px]"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!w-[10px] !h-[10px] !bg-white !border-[2px] !border-black/20 !-right-[5px]"
        />
        {/* Connection Handles */}
        <Handle
          type="target"
          position={Position.Left}
          className="!w-[10px] !h-[10px] !bg-white !border-[2px] !border-black/20 !-left-[5px]"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!w-[10px] !h-[10px] !bg-white !border-[2px] !border-black/20 !-right-[5px]"
        />
      </div>
    </div>
  );
};

export const TextNode = ({ data }: any) => {
  return (
    <div className="group select-none">
      <div className="flex items-center gap-3 mb-2 px-1">
        <span className="text-[10px] font-bold tracking-[0.15em] text-black uppercase">
          {data.label}
        </span>
      </div>
      <div
        className="relative p-4 rounded-lg bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/5"
        style={{ width: data.width }}
      >
        <p className="text-[11px] leading-[1.6] text-black/60 font-medium">
          {data.text}
        </p>
        <Handle
          type="target"
          position={Position.Left}
          className="!w-[10px] !h-[10px] !bg-white !border-[2px] !border-black/20 !-left-[5px]"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!w-[10px] !h-[10px] !bg-white !border-[2px] !border-black/20 !-right-[5px]"
        />
      </div>
    </div>
  );
};

export const VideoNode = ({ data }: any) => {
  return (
    <div className="group select-none">
      <div className="flex items-center gap-3 mb-2 px-1">
        {data.sublabel && (
          <span className="text-[10px] font-bold tracking-[0.15em] text-black/40 uppercase">
            {data.sublabel}
          </span>
        )}
        <span className="text-[10px] font-bold tracking-[0.15em] text-black uppercase">
          {data.label}
        </span>
      </div>
      <div
        className="relative rounded-[12px] overflow-hidden bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/5"
        style={{ width: data.width, height: data.height }}
      >
        <video
          src={data.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Connection Handles */}
        <Handle
          type="target"
          position={Position.Left}
          className="!w-[10px] !h-[10px] !bg-white !border-[2px] !border-black/20 !-left-[5px]"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!w-[10px] !h-[10px] !bg-white !border-[2px] !border-black/20 !-right-[5px]"
        />
      </div>
    </div>
  );
};
