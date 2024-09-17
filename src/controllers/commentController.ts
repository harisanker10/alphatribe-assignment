import { Request, Response } from 'express';
import { ICommentRepository } from '../application/contracts/ICommentRepository';
import { CommentUseCase } from '../application/useCases/commentUseCase';
import { INotificationService } from '../application/contracts/services/INotificationService';
import { IPostRepository } from '../application/contracts/IPostRepository';

export function CommentController(
  commentRepository: ICommentRepository,
  notificationService: INotificationService,
  postRepository: IPostRepository,
) {
  const commentUseCase = CommentUseCase(
    commentRepository,
    postRepository,
    notificationService,
  );
  return {
    async createComment(req: Request, res: Response) {
      const postId = req.params.postId;
      const comment = await commentUseCase.createComment({
        userId: req.user?.id as string,
        postId,
        comment: req.body?.comment,
      });

      res.status(201).json({
        success: true,
        commentId: comment.id,
        message: 'Comment added successfully',
      });
    },
    async deleteComment(req: Request, res: Response) {
      await commentUseCase.deleteComment(req.params.commentId);
      res
        .status(204)
        .json({ success: true, message: 'Comment deleted successfully' });
    },
  };
}
