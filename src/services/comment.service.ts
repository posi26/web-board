import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentInput } from '../models/comment/comment-input.model';
import { randomUUID } from 'crypto';
import { Comments } from '../entities/comments.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) { }

  async create(commentInput: CommentInput, userId: string, name: string): Promise<Comments> {
    const id = randomUUID();
    const createDate = new Date();
    const newComment: Comments = {
      id,
      content: commentInput.content,
      createName: name,
      createDate,
      isDeleted: false,
      cardId: commentInput.cardId,
      userId: userId
    };
    return await this.commentRepository.save(newComment);
  }

  async findAll(): Promise<Comments[]> {
    return await this.commentRepository.find({ where: { isDeleted: false } });
  }

  async findById(id: string): Promise<Comments> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment || comment.isDeleted) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: string, commentInput: CommentInput, name: string): Promise<Comments> {
    const existingComment = await this.findById(id);
    existingComment.content = commentInput.content;
    existingComment.createName = name;
    return await this.commentRepository.save(existingComment);
  }

  async delete(id: string): Promise<void> {
    const existingComment = await this.findById(id);
    existingComment.isDeleted = true;
    await this.commentRepository.save(existingComment);
  }

  async findByCardId(cardId: string): Promise<Comments[]> {
    return this.commentRepository.find({ where: { cardId, isDeleted: false } });
  }

  async canUserUpdateComment(id: string, userId: string): Promise<boolean> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    return comment.userId === userId;
  }

  async canUserDeleteComment(id: string, userId: string): Promise<boolean> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    return comment.userId === userId;
  }
}
