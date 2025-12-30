import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    googleId: string;
    email: string;
    name: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        googleId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
userSchema.index({ email: 1 });

const User = mongoose.model<IUser>('User', userSchema);

export default User;
