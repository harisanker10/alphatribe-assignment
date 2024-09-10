import { Document, Model, Schema, model } from 'mongoose';

interface UserDoc extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture: string | undefined;
  bio: string | undefined;
  createdAt: number;
  updatedAt: number;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    bio: {
      type: String,
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

export const userModel = model<UserDoc, Model<UserDoc>>('User', userSchema);
