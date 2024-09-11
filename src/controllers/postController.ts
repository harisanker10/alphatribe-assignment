import { Request, Response } from 'express';
import { IPostRepository } from '../application/contracts/IPostRepository';
import { PostUseCase } from '../application/useCases/postUseCase';
import { ILikeRepository } from '../application/contracts/ILikeRepository';

export function PostController(
  postRepository: IPostRepository,
  likeRepository: ILikeRepository,
) {
  const postUseCase = PostUseCase(postRepository, likeRepository);

  return {
    async getPost(req: Request, res: Response) {
      const postId = req.params.postId;
      const post = await postUseCase.getPost(postId);
      res.status(200).json({ ...post });
    },

    async createPost(req: Request, res: Response) {
      const post = await postUseCase.createPost({
        ...req.body,
        userId: req.user?.id,
      });
      res.status(201).json({
        success: true,
        postId: post.id,
        message: 'Post created successfully',
      });
    },

    async getAllPosts(req: Request, res: Response) {
      const sortCriteria = req.query.sort as string;
      const order = req.query.order as string;
      const page = req.query.page as string;
      const limit = req.query.limit as string;

      let tags: string[] | string | undefined = req.query.tags as
        | string[]
        | string
        | undefined;
      if (typeof tags === 'string') {
        tags = [tags];
      }

      const sort: Record<string, any> = {};
      if (sortCriteria) {
        if (order === 'asc') {
          sort[sortCriteria] = 1;
        } else {
          sort[sortCriteria] = -1;
        }
      }
      const data = await postUseCase.getAllPost({
        stockSymbol: req.query.stockSymbol as string,
        sort: sortCriteria ? sort : { date: 1 },
        tags,
        page: parseInt(page),
        limit: parseInt(limit),
      });
      res.status(200).json(data);
    },

    async deletePost(req: Request, res: Response) {
      const postId = req.params.postId;
      const post = await postUseCase.deltePost(postId);
      res
        .status(204)
        .json({ success: true, message: 'Post deleted successfully' });
    },

    async likePost(req: Request, res: Response) {
      const userId = req.user?.id as string;
      const postId = req.params.postId;
      await postUseCase.likePost({ userId, postId });
      res.status(201).json({ success: true, message: 'Post liked' });
    },

    async unlikePost(req: Request, res: Response) {
      const userId = req.user?.id as string;
      const postId = req.params.postId;
      await postUseCase.unlikePost({ userId, postId });
      res.status(204).json({ success: true, message: 'Post unliked' });
    },
  };
}
