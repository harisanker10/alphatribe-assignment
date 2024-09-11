import { Request, Response } from 'express';
import { ICommentRepository } from '../application/contracts/ICommentRepository';
import { CommentUseCase } from '../application/useCases/commentUseCase';

export function CommentController(commentRepository: ICommentRepository) {
  const commentUseCase = CommentUseCase(commentRepository);
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
