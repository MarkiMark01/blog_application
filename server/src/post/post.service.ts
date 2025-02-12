import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private readonly postRepo: Repository<Post>) {}

  findAll() {
    return this.postRepo.find({ relations: ['comments'] });
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({ where: { id }, relations: ['comments'] });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  create(createPostDto: CreatePostDto) {
    return this.postRepo.save(createPostDto);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepo.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    await this.postRepo.remove(post);
    return { message: 'Post deleted successfully' };
  }
}