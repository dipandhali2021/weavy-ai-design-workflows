import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IWorkflowNode {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: Record<string, unknown>;
}

export interface IWorkflowEdge {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
    type?: string;
}

export interface IWorkflow extends Document {
    userId: Types.ObjectId;
    name: string;
    folderId: Types.ObjectId | null;
    nodes: IWorkflowNode[];
    edges: IWorkflowEdge[];
    thumbnail?: string;
    createdAt: Date;
    updatedAt: Date;
}

const workflowNodeSchema = new Schema<IWorkflowNode>(
    {
        id: { type: String, required: true },
        type: { type: String, required: true },
        position: {
            x: { type: Number, required: true },
            y: { type: Number, required: true },
        },
        data: { type: Schema.Types.Mixed, default: {} },
    },
    { _id: false }
);

const workflowEdgeSchema = new Schema<IWorkflowEdge>(
    {
        id: { type: String, required: true },
        source: { type: String, required: true },
        target: { type: String, required: true },
        sourceHandle: { type: String },
        targetHandle: { type: String },
        type: { type: String },
    },
    { _id: false }
);

const workflowSchema = new Schema<IWorkflow>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            default: 'untitled',
            trim: true,
        },
        folderId: {
            type: Schema.Types.ObjectId,
            ref: 'Folder',
            default: null,
            index: true,
        },
        nodes: {
            type: [workflowNodeSchema],
            default: [],
        },
        edges: {
            type: [workflowEdgeSchema],
            default: [],
        },
        thumbnail: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

// Compound index for efficient user workflow queries
workflowSchema.index({ userId: 1, updatedAt: -1 });

const Workflow = mongoose.model<IWorkflow>('Workflow', workflowSchema);

export default Workflow;
