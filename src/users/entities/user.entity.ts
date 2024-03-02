import { Event } from "src/events/entities/event.entity";
import { Guest } from "src/guests/entities/guest.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: "varchar", length: 255})
    username: string;
    @Column({unique: true, type: "varchar", length: 255, nullable: false})
    email: string;
    @Column({ nullable: false})
    password: string;

    @OneToMany(()=> Event, event => event.user)
    events: Event[]

    @OneToMany(()=> Guest, guest=> guest.user)
    guests: Guest[];

}