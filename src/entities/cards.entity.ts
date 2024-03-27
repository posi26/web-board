import { CardStatus } from 'src/enums/card-status.enum';
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Cards {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    header: string;

    @Column()
    detail: string;

    @Column({
        type: 'enum',
        enum: CardStatus,
        default: CardStatus.TODO
    })
    status: CardStatus;

    @Column()
    createEmail: string;

    @Column()
    createName: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @Index()
    @Column()
    userId: string;
}