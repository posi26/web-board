import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cards } from '../entities/cards.entity';
import { CardInput } from '../models/card/card-input.model';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { CardsLog } from '../entities/cards-log.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Cards)
    private readonly cardRepository: Repository<Cards>,
    @InjectRepository(CardsLog) 
    private readonly cardsLogRepository: Repository<CardsLog>,
  ) { }

  async create(cardInput: CardInput, req: any): Promise<Cards> {
    const id = randomUUID();
    const createDate = new Date();
    const newCard: Cards = {
      id,
      header: cardInput.header,
      detail: cardInput.detail,
      status: cardInput.status,
      createEmail: req.user.email,
      createName: req.user.name,
      createDate,
      userId: req.user.sub
    };
    return this.cardRepository.save(newCard);
  }

  async findAll(): Promise<Cards[]> {
    return this.cardRepository.find();
  }

  async findById(id: string): Promise<Cards> {
    const card = await this.cardRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async update(id: string, cardInput: CardInput): Promise<Cards> {
    const existingCard = await this.findById(id);
    const createDate = new Date();

    const cardsLog: CardsLog = {
      id: randomUUID(),
      cardId: id,
      header: existingCard.header,
      detail: existingCard.detail,
      status: existingCard.status,
      createdAt: createDate
    };
    await this.cardsLogRepository.save(cardsLog);
    
    const updatedCard = { ...existingCard, ...cardInput };
    return this.cardRepository.save(updatedCard);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.cardRepository.delete(id);
  }

  async findLogsByCardId(cardId: string): Promise<CardsLog[]> {
    return this.cardsLogRepository.find({ where: { cardId } });
  }
}
