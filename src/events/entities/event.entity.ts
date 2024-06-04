import { Guest } from 'src/guests/entities/guest.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  eventName: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'varchar', length: 55 })
  eventLocation: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'integer' })
  userId: number;

  @OneToMany(() => Guest, (guest) => guest.event, { eager: false })
  guests: Guest[];

  @ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'userId',
  })
  user: User;
}
