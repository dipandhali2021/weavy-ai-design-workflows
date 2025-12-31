import { TextNode } from './TextNode';
import { ImageNode } from './ImageNode';
import { LLMNode } from './LLMNode';

export { TextNode, ImageNode, LLMNode };

/**
 * Node Types Export
 * 
 * Maps node type strings to their respective components
 * for use with React Flow.
 */
export const workflowNodeTypes = {
    text: TextNode,
    image: ImageNode,
    llm: LLMNode,
};
