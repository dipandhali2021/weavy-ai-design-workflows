'use client';
import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BaseEdge,
  getBezierPath,
  EdgeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ImageNode, TextNode } from './HeroNodes';

const nodeTypes = {
  imageNode: ImageNode,
  textNode: TextNode,
};

const initialNodes = [
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
    type: 'imageNode',
    position: { x: 1200, y: 680 },
    data: {
      label: 'MINIMAX VIDEO',
      sublabel: 'VIDEO',
      image:
        'https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681cd7cbc22419b32bb9d8d8_hcard%20-%20STABLE%20DIFFUSION.avif',
      width: 280,
      height: 420,
    },
  },
];

const nodeExtent: [[number, number], [number, number]] = [
  [0, 600],    // Top-left limit
  [1600, 1200] // Bottom-right limit
];

const initialEdges = [
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

const HeroSection = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <section
      className="relative w-full min-h-screen h-screen bg-[#e8e8e3] overflow-visible z-50"
      style={{
        backgroundImage: `
          url(https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681ccdbeb607e939f7db68fa_BG%20NET%20Hero.avif),
          linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: 'cover, 10px 10px, 10px 10px',
        backgroundPosition: 'center top, 0 0, 0 0',
        backgroundRepeat: 'no-repeat, repeat, repeat',
      }}
    >
      {/* Hero Text Content (Overlay) */}
      <div className="absolute top-[150px] left-[65px] z-10 pointer-events-none select-none">
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-40">
            <h4 className="text-[80px]  leading-[0.85] tracking-[-0.04em] text-black">
              Weavy
            </h4>
            <h4 className="text-[80px]  leading-[0.85] tracking-[-0.04em] text-black">
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

      {/* Lime Green Container Box for React Flow - Blends into next section */}
      <div 
        className="absolute bottom-[-30px] left-[5%] w-[90%] h-[calc(50%+100px)] rounded-b-lg z-1 overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(247, 255, 168, 0) 0%, rgb(245, 245, 243) 40%, rgb(233, 233, 234) 70%, rgb(239, 255, 242) 100%)',
        }}
      >
        {/* React Flow Playground inside lime box */}
        <div className="w-full h-full  overflow-hidden">
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
            nodeExtent={nodeExtent} 
            translateExtent={nodeExtent}
            
          ></ReactFlow>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
