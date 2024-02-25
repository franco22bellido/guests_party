import { Guest } from "src/guests/entities/guest.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: "varchar", length: 255})
    eventName : string;

    @Column({type: 'varchar'})
    startDate : string;

    @CreateDateColumn()
    createdAt: Date;
    
    @Column({type : 'integer'})
    userId: number;


    @OneToMany(()=> Guest, (guest)=> guest.event, {cascade: false, eager: true})
    guests: Guest[];

    @ManyToOne(()=> User, user=> user.events)
    @JoinColumn({
        name: 'userId',
    })
    user: User;
}