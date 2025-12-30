import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IFolder extends Document {
    userId: Types.ObjectId;
    name: string;
    parentId: Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
}

const folderSchema = new Schema<IFolder>(
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
            trim: true,
            maxlength: 200,
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: 'Folder',
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index for efficient user folder queries
folderSchema.index({ userId: 1, parentId: 1 });
folderSchema.index({ userId: 1, updatedAt: -1 });

const Folder = mongoose.model<IFolder>('Folder', folderSchema);

export default Folder;
