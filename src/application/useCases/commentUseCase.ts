import { ICommentRepository } from '../contracts/ICommentRepository';
import { IPostRepository } from '../contracts/IPostRepository';
import {
  INotificationService,
  NotificationEvents,
} from '../contracts/services/INotificationService';

export function CommentUseCase(
  commentRepository: ICommentRepository,
  postRepository: IPostRepository,
  notificationService: INotificationService,
) {
  return {
    async createComment({
      postId,
      comment: content,
      userId,
    }: {
      postId: string;
      comment: string;
      userId: string;
    }) {
      const comment = await commentRepository.createComment({
        postId,
        comment: content,
        userId,
      });
      const { userId: ownerId } = await postRepository.getPost(postId);
      notificationService.sendUserNotification(
        NotificationEvents.comment,
        ownerId,
        { postId, comment: content, commentBy: userId },
      );
      return comment;
    },

    deleteComment(postId: string) {
      return commentRepository.deleteComment(postId);
    },
  };
}
