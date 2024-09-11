import 'express-async-errors';
import { Router } from 'express';
import { AuthRouter } from './authRouter';
import { UserRepository } from '@app/src/frameworks/database/mongoDB/repositorires/userRepository';
import { AuthService } from '@app/src/frameworks/services/authService';
import { UserRouter } from './userRouter';
import { PostRouter } from './postRouter';
import { PostRepository } from '@app/src/frameworks/database/mongoDB/repositorires/postRepository';
import { CommentRepository } from '@app/src/frameworks/database/mongoDB/repositorires/commentRepository';
import { LikeRepository } from '@app/src/frameworks/database/mongoDB/repositorires/likeRepository';

export function initRoutes() {
  const router = Router();

  //Router might not be the right place to initialise project dependencies, but it is high enough that it can be injected to anywhere.
  const userRepository = new UserRepository();
  const postRepository = new PostRepository();
  const commentRepository = new CommentRepository();
  const likeRepository = new LikeRepository();
  const authService = new AuthService();

  const authRouter = AuthRouter(userRepository, authService);
  const userRouter = UserRouter(userRepository);
  const postRouter = PostRouter(
    postRepository,
    commentRepository,
    likeRepository,
  );
  router.use('/auth', authRouter);
  router.use('/user', userRouter);
  router.use('/posts', postRouter);

  return router;
}
