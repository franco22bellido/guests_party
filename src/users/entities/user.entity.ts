import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
