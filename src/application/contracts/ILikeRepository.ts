export interface ILikeRepository {
  like({ postId, userId }: { postId: string; userId: string }): Promise<any>;
  unlike({ postId, userId }: { postId: string; userId: string }): Promise<any>;
}
