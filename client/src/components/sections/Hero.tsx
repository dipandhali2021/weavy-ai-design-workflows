'use client';

import { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ImageNode, TextNode, VideoNode } from './HeroNodes';
import { HERO_NODES, HERO_EDGES, HERO_NODE_EXTENT } from './data';

/**
 * Node type registry for React Flow
 */
const nodeTypes = {
  imageNode: ImageNode,
  textNode: TextNode,
  videoNode: VideoNode,
};

/**
 * Hero Section Component
 * 
 * Displays the main landing hero area with:
 * - Large "Weavy Artistic Intelligence" headline
 * - Interactive React Flow diagram showcasing AI workflow
 * - Draggable nodes connected by edges
 */
const HeroSection = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(HERO_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(HERO_EDGES);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <section
      className="relative w-full min-h-screen h-screen bg-[#bed3e2] overflow-visible z-50"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, transparent 50%, #ffffff 100%),
          linear-gradient(rgba(232, 232, 227, 0.7), rgba(232, 232, 227, 0.2)),
          url(https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681ccdbeb607e939f7db68fa_BG%20NET%20Hero.avif),
          linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, cover, cover, 10px 10px, 10px 10px',
        backgroundPosition: 'center bottom, center center, center top, 0 0, 0 0',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat, repeat',
      }}
    >
      {/* Hero Text Content (Overlay) */}
      <div className="absolute top-[150px] left-[65px] z-10 pointer-events-none select-none">
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-40">
            <h4 className="text-[80px] leading-[0.85] tracking-[-0.04em] text-black">
              Weavy
            </h4>
            <h4 className="text-[80px] leading-[0.85] tracking-[-0.04em] text-black">
              Artistic Intelligence
            </h4>
          </div>
          <div className="flex justify-start pl-[400px] mt-2">
            <p className="max-w-[500px] text-[17px] leading-[1.5] text-black/90 font-normal">
              Turn your creative vision into scalable workflows.
              <br />
              Access all AI models and professional editing tools
              <br />
              in one node based platform.
            </p>
          </div>
        </div>
      </div>

      {/* React Flow Container */}
      <div
        className="absolute bottom-[-30px] left-[5%] w-[90%] h-[calc(50%+100px)] rounded-b-lg z-1 overflow-hidden"
        style={{
          background:
            'linear-gradient(to bottom, rgba(247, 255, 168, 0) 0%, rgb(245, 245, 243) 40%, rgb(233, 233, 234) 70%, rgb(239, 255, 242) 100%)',
        }}
      >
        <div className="w-full h-full overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            zoomOnScroll={false}
            panOnScroll={false}
            panOnDrag={true}
            selectionOnDrag={false}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
            className="bg-transparent"
            nodeExtent={HERO_NODE_EXTENT}
            translateExtent={HERO_NODE_EXTENT}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
