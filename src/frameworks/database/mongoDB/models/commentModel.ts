import { Schema, model } from 'mongoose';

interface Comment {
  postId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  content: string;
}

const commentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const postModel = model<Comment>('User', commentSchema);
