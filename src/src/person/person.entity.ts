import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Book} from "../book/book.entity";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column()
    hasSub: boolean;


    @Column('text')
    mail: string;

    @OneToMany(() => Book, book => book.owner)
    books: Book[];

}