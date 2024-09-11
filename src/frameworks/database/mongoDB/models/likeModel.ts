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

export const likeModel = model<Like>('Like', likeSchema);
