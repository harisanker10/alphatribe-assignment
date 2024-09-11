import { ILikeRepository } from '@app/src/application/contracts/ILikeRepository';
import { likeModel } from '../models/likeModel';

export class LikeRepository implements ILikeRepository {
  like({ postId, userId }: { postId: string; userId: string }): Promise<any> {
    return likeModel
      .findOneAndUpdate(
        { postId, userId },
        { postId, userId },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      )
      .then((doc) => doc.toObject());
  }

  unlike({ postId, userId }: { postId: string; userId: string }): Promise<any> {
    return likeModel.deleteOne({ postId, userId });
  }
}
