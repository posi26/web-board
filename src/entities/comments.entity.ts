import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Comments {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'varchar', length: 255 })
    createName: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;

    @Index()
    @Column()
    cardId: string;

    @Index()
    @Column()
    userId: string;
}
