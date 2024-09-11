import { ICommentRepository } from '@app/src/application/contracts/ICommentRepository';
import { commentModel } from '../models/commentModel';
import { CommentEntity } from '@app/src/entities/commentEntity';

export class CommentRepository implements ICommentRepository {
  createComment({
    userId,
    comment,
    postId,
  }: {
    userId: string;
    comment: string;
    postId: string;
  }): Promise<CommentEntity> {
    return (
      new commentModel({ userId, comment, postId })
        .save()
        //@ts-ignore
        .then((doc) => doc?.toObject() as CommentEntity)
    );
  }

  deleteComment(commentId: string): Promise<CommentEntity> {
    return (
      commentModel
        .findOneAndDelete({ _id: commentId })
        //@ts-ignore
        .then((doc) => doc?.toObject() as CommentEntity)
    );
  }
}
