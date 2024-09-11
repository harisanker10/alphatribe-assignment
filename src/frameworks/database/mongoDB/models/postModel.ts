import { Schema, model } from 'mongoose';

export interface Post {
  id: string;
  title: string;
  description: string;
  tags: string[];
  stockSymbol: string | undefined;
  userId: Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    stockSymbol: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: false,
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

export const postModel = model<Post>('Post', postSchema);
