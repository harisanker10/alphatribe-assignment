import { ILikeRepository } from '../contracts/ILikeRepository';
import { IPostRepository } from '../contracts/IPostRepository';

export function PostUseCase(
  postRepository: IPostRepository,
  likeRepository: ILikeRepository,
) {
  return {
    getPost(postId: string) {
      return postRepository.getPost(postId);
    },
    getAllPost({
      limit,
      sort,
      stockSymbol,
      tags,
      page,
    }: {
      limit?: number | undefined;
      stockSymbol?: string | undefined;
      sort: { date?: 1 | -1 | undefined; likes?: 1 | -1 | undefined };
      page?: number | undefined;
      tags?: string[] | undefined;
    }) {
      const sortData: Record<string, any> = {};
      if (sort.date) {
        sortData.createdAt = sort.date;
      } else if (sort.likes) {
        sortData.likes = sort.likes;
      }
      return postRepository.getAllPost({
        limit: limit || 10,
        stockSymbol,
        sort: sortData,
        page: page || 1,
        tags: tags || [],
      });
    },

    createPost({
      title,
      description,
      userId,
      tags,
      stockSymbol,
    }: {
      stockSymbol?: string | undefined;
      tags: string[];
      userId: string;
      description: string;
      title: string;
    }) {
      return postRepository.createPost({
        stockSymbol,
        tags,
        userId,
        description,
        title,
      });
    },
    deltePost(postId: string) {
      return postRepository.deletePost(postId);
    },

    likePost({ postId, userId }: { postId: string; userId: string }) {
      return likeRepository.like({ postId, userId });
    },

    unlikePost({ postId, userId }: { postId: string; userId: string }) {
      return likeRepository.unlike({ postId, userId });
    },
  };
}
