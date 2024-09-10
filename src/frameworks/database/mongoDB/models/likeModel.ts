import { Schema, model } from 'mongoose';

interface Like {
  postId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}

const likeSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

export const postModel = model<Like>('User', likeSchema);
