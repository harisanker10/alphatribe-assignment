import { ICommentRepository } from '../contracts/ICommentRepository';

export function CommentUseCase(commentRepository: ICommentRepository) {
  return {
    createComment({
      postId,
      comment,
      userId,
    }: {
      postId: string;
      comment: string;
      userId: string;
    }) {
      return commentRepository.createComment({ postId, comment, userId });
    },

    deleteComment(postId: string) {
      return commentRepository.deleteComment(postId);
    },
  };
}
