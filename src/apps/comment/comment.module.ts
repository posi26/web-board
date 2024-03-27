import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from '../../services/comment.service';
import { Comments } from 'src/entities/comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Comments]),
    ],
    controllers: [CommentController],
    providers: [CommentService, JwtService],
})
export class CommentModule { }