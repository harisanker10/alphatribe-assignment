import { Schema, model } from 'mongoose';

interface Comment {
  postId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
  comment: string;
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
    comment: {
      type: String,
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

export const commentModel = model<Comment>('Comment', commentSchema);
