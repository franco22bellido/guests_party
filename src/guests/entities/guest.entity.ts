import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity()
export class Guest {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: 'varchar', length: 255 })
    firstName: string;

    @Column({ type: 'varchar', length: 255 })
    lastName: string;

    @Column({ type: 'boolean', default: false })
    state: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}