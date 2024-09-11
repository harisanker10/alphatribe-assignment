import { IPostRepository } from '@app/src/application/contracts/IPostRepository';
import { CommentEntity } from '@app/src/entities/commentEntity';
import { PostEntity } from '@app/src/entities/postEntity';
import { Post, postModel } from '../models/postModel';
import { Types } from 'mongoose';

//TODO: Cleanup on some methods for readability
export class PostRepository implements IPostRepository {
  async getPost(
    postId: string,
  ): Promise<PostEntity & { comments: CommentEntity[] | void }> {
    console.log({ postId });
    const postArr = await postModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(postId) },
      },
      {
        $lookup: {
          from: 'comments',
          as: 'comments',
          localField: '_id',
          foreignField: 'postId',
        },
      },
      {
        $lookup: {
          from: 'likes',
          as: 'likes',
          localField: '_id',
          foreignField: 'postId',
        },
      },
      {
        $addFields: {
          id: '$_id',
          likes: { $size: '$likes' },
        },
      },
      {
        $unset: '_id',
      },
      {
        $unset: '__v',
      },
    ]);
    return postArr[0];
  }

  async createPost({
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
  }): Promise<PostEntity> {
    return new postModel({
      title,
      tags,
      description,
      stockSymbol,
      userId,
    })
      .save()
      .then((doc) => ({
        ...(doc.toObject() as Post),
        likesCount: 0,
        userId: doc.userId.toString(),
      }));
  }

  async deletePost(postId: string): Promise<PostEntity | void> {
    //@ts-ignore
    return postModel.findOneAndDelete({ _id: postId });
  }

  async getAllPost({
    stockSymbol,
    tags,
    sort,
    page,
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
  }> {
    const match: Record<string, any> = {};
    const pipeline = [];

    if (stockSymbol) match.stockSymbol = stockSymbol;
    if (tags && tags.length) match.tags = { $in: tags };

    pipeline.push({ $match: match });
    pipeline.push({
      $lookup: {
        from: 'likes',
        as: 'likes',
        localField: '_id',
        foreignField: 'postId',
      },
    });

    const sortData: Record<string, any> = {};
    if (sort) {
      console.log({ sort });
      if (sort?.createdAt) sortData.createdAt = sort.createdAt;
      else if (sort?.likes) sortData.likes = sort.likes;
      pipeline.push({ $sort: sortData });
    }
    const skip = (page - 1) * limit;
    // pipeline.push({ $skip: skip });
    //
    // pipeline.push({ $limit: limit });

    //TODO: Total items cound is not total documnents in the collection, rather total documents on current match pattern. Need to write better query
    //
    const count = await postModel.countDocuments();
    const posts = await postModel.aggregate([
      ...pipeline,
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $addFields: {
          id: '$_id',
          likes: { $size: '$likes' },
        },
      },
      {
        $unset: '_id',
      },
      {
        $unset: '__v',
      },
    ]);
    return {
      posts,
      currentPage: page,
      items: posts.length,
      totalItems: count,
      totalPages: Math.floor(count / limit) + 1,
    };
  }
}
