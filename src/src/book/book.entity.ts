import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from "../person/person.entity";

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column()
    isUsed: boolean;

    @Column({nullable: true})
    ownerId: number;

    @ManyToOne(() => Person, owner => owner.books)
    owner: Person;
}