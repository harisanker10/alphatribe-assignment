import { CommentEntity } from '@app/src/entities/commentEntity';
import { PostEntity } from '@app/src/entities/postEntity';

export interface IPostRepository {
  createPost({
    stockSymbol,
    description,
    title,
    tags,
    userId,
  }: {
    stockSymbol?: string | undefined;
    title: string;
    description: string;
    tags?: string[] | undefined;
    userId: string;
  }): Promise<PostEntity>;

  getAllPost({
    stockSymbol,
    tags,
    page,
    sort,
    limit,
  }: {
    stockSymbol?: string | undefined;
    tags?: string[] | undefined;
    sort: { createdAt?: 1 | -1 | undefined; likes?: 1 | -1 | undefined };
    page: number;
    limit: number;
  }): Promise<{
    posts: PostEntity[] | void;
    currentPage: number;
    items: number;
    totalPages: number;
    totalItems: number;
  }>;

  getPost(
    postId: string,
  ): Promise<PostEntity & { comments: CommentEntity[] | void }>;

  deletePost(postId: string): Promise<PostEntity | void>;
}
