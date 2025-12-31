'use client';

import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ImageNode, TextNode, VideoNode } from './HeroNodes';
import { HERO_NODES, HERO_EDGES, HERO_NODE_EXTENT, HERO_NODES_MOBILE, HERO_NODE_EXTENT_MOBILE } from './data';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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
 * - Fully responsive design for mobile screens
 */
const HeroSection = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Use mobile-optimized nodes on smaller screens
  const initialNodes = useMemo(() => isMobile ? HERO_NODES_MOBILE : HERO_NODES, [isMobile]);
  const nodeExtent = useMemo(() => isMobile ? HERO_NODE_EXTENT_MOBILE : HERO_NODE_EXTENT, [isMobile]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(HERO_EDGES);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <section
      className="relative w-full min-h-screen bg-[#bed3e2] overflow-visible z-50"
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
      <div className="absolute mr-2 top-24 md:top-32 left-4 md:left-16 z-10 pointer-events-none select-none max-w-7xl">
  <div className="flex flex-col gap-6 md:gap-8">
    {/* Title Section */}
    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-25">
      <h1 className="text-7xl lg:text-8xl leading-none tracking-tight text-black font-normal">
        Weavy
      </h1>
      <div className="flex flex-col md:items-start items-end">
        <h2 className="text-7xl lg:text-8xl leading-none tracking-tight text-black font-normal">
          Artistic
        </h2>
        <h2 className="text-7xl lg:text-8xl leading-none tracking-tight text-black font-normal ">
          Intelligence
        </h2>
      </div>
    </div>
    
    {/* Description */}
    <div className="md:pl-80 pl-12 ">
      <p className="max-w-md md:max-w-lg text-base md:text-lg leading-relaxed text-black/90">
        Turn your creative vision into scalable workflows. Access all AI models and professional editing tools in one node based platform.
      </p>
    </div>
  </div>
</div>

      {/* React Flow Container */}
      <div
        className="absolute bottom-0 md:bottom-[-30px] left-0 md:left-[5%] w-full md:w-[90%] h-[60%] h-[calc(20%+200px)] md:h-[calc(50%+100px)] rounded-b-lg z-1 overflow-hidden"
        style={{
          background:
            'linear-gradient(to bottom, rgba(247, 255, 168, 0) 0%, rgb(245, 245, 243) 40%, rgb(233, 233, 234) 70%, rgb(239, 255, 242) 100%)',
        }}
      >
        <div className="w-full h-full overflow-hidden">
          <ReactFlow
            key={isMobile ? 'mobile' : 'desktop'}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: isMobile ? 0.1 : 0.2 }}
            zoomOnScroll={false}
            panOnScroll={false}
            panOnDrag={true}
            selectionOnDrag={false}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
            className="bg-transparent"
            nodeExtent={nodeExtent}
            translateExtent={nodeExtent}
            minZoom={isMobile ? 0.3 : 0.5}
            maxZoom={isMobile ? 0.8 : 1.5}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
