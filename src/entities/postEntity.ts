export interface PostEntity {
  id: string;
  userId: string;
  title: string;
  description: string;
  stockSymbol?: string | undefined;
  likesCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
