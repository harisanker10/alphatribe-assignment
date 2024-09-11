import { IPostRepository } from '@app/src/application/contracts/IPostRepository';
import { PostController } from '@app/src/controllers/postController';
import { Router } from 'express';
import { protectRoute } from '../middlewares/authMiddleware';
import { CommentController } from '@app/src/controllers/commentController';
import { ICommentRepository } from '@app/src/application/contracts/ICommentRepository';
import { ILikeRepository } from '@app/src/application/contracts/ILikeRepository';

export function PostRouter(
  postRepository: IPostRepository,
  commentRepository: ICommentRepository,
  likeRepository: ILikeRepository,
) {
  const postController = PostController(postRepository, likeRepository);
  const commentsController = CommentController(commentRepository);
  const router = Router();
  router.route('/').post(protectRoute, postController.createPost);
  router.route('/').get(postController.getAllPosts);
  router.route('/:postId').get(postController.getPost);
  router.route('/:postId').delete(protectRoute, postController.deletePost);

  //theres is no need of seperating a comment router
  router
    .route('/:postId/comments')
    .post(protectRoute, commentsController.createComment);
  router
    .route('/:postId/comments/:commentId')
    .delete(protectRoute, commentsController.deleteComment);

  //like routes
  router.route('/:postId/like').post(protectRoute, postController.likePost);
  router.route('/:postId/like').delete(protectRoute, postController.unlikePost);

  return router;
}
