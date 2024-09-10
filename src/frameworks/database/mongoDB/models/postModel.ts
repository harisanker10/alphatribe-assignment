import { Schema, model } from 'mongoose';

interface Post {
  title: string;
  description: string;
  tags: string[];
  picture: string | undefined;
  userId: Schema.Types.ObjectId;
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
    },
    picture: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const postModel = model<Post>('User', postSchema);
