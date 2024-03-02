import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
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

    @Column({type: "integer"})
    eventId : number

    @Column({type: 'integer'})
    userId: number;

    @ManyToOne(()=> Event, event=> event.guests)
    @JoinColumn({
        name: "eventId",
        referencedColumnName: "id"
    })
    event: Event

    @ManyToOne(()=> User, user => user.guests)
    @JoinColumn({
        name: "userId",
        referencedColumnName: "id"
    })
    user: User;
}