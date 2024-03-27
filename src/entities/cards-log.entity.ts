import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CardsLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cardId: string;

  @Column()
  header: string;

  @Column()
  detail: string;

  @Column()
  status: string;
  
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
