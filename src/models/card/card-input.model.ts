import { IsEnum } from 'class-validator';
import { CardStatus } from '../../enums/card-status.enum';

export class CardInput {
  header: string;
  detail: string;

  @IsEnum(CardStatus)
  status: CardStatus;
}