import { CommentEntity } from '@app/src/entities/commentEntity';

export interface ICommentRepository {
  createComment({
    userId,
    comment,
    postId,
  }: {
    userId: string;
    comment: string;
    postId: string;
  }): Promise<CommentEntity>;

  deleteComment(commentId: string): Promise<CommentEntity>;
}
