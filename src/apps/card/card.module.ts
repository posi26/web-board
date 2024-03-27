import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardService } from '../../services/card.service';
import { CardController } from './card.controller';
import { Cards } from '../../entities/cards.entity';
import { JwtService } from '@nestjs/jwt';
import { CardsLog } from 'src/entities/cards-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cards, CardsLog]),
  ],
  providers: [CardService, JwtService],
  controllers: [CardController]
})
export class CardModule { }
