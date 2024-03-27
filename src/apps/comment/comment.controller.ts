import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { CommentService } from '../../services/comment.service'
import { CommentInput } from '../../models/comment/comment-input.model';
import { Comments } from 'src/entities/comments.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() commentInput: CommentInput, @Req() req: any): Promise<Comments> {
        return this.commentService.create(commentInput, req.user.sub, req.user.name);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(): Promise<Comments[]> {
        return this.commentService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findById(@Param('id') id: string): Promise<Comments> {
        return this.commentService.findById(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id') id: string,
        @Body() commentInput: CommentInput,
        @Req() req: any
    ): Promise<Comments> {
        const canUpdate = await this.commentService.canUserUpdateComment(id, req.user.sub);
        if (!canUpdate) {
            throw new UnauthorizedException('You are not authorized to update this comment');
        }
        return this.commentService.update(id, commentInput, req.user.name);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: string, @Req() req: any): Promise<void> {
        const canDelete = await this.commentService.canUserDeleteComment(id, req.user.sub);
        if (!canDelete) {
            throw new UnauthorizedException('You are not authorized to delete this comment');
        }
        this.commentService.delete(id);
    }

    @Get('by-card/:cardId')
    @UseGuards(JwtAuthGuard)
    findByCardId(@Param('cardId') cardId: string): Promise<Comments[]> {
        return this.commentService.findByCardId(cardId);
    }
}
