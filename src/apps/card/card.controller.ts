import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CardService } from '../../services/card.service';
import { CardInput } from '../../models/card/card-input.model';
import { Cards } from 'src/entities/cards.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CardsLog } from 'src/entities/cards-log.entity';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() cardInput: CardInput, @Request() req): Promise<Cards> {
    return await this.cardService.create(cardInput, req);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Cards[]> {
    return await this.cardService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<Cards> {
    return await this.cardService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() cardInput: CardInput): Promise<Cards> {
    return await this.cardService.update(id, cardInput);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    await this.cardService.delete(id);
  }

  @Get(':cardId/logs')
  @UseGuards(JwtAuthGuard)
  async findLogsByCardId(@Param('cardId') cardId: string): Promise<CardsLog[]> {
    return await this.cardService.findLogsByCardId(cardId);
  }
}
