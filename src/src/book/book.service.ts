
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import {CreateBookDto} from "./dto/create-book.dto";
import {EditBookDto} from "./dto/edit-book.dto";
import {Person} from "../person/person.entity";

@Injectable()
export class BookService {
    constructor(
        @Inject('BOOK_REPOSITORY')
        private bookRepository: Repository<Book>,
        @Inject('PERSON_REPOSITORY')
        private personRepository: Repository<Person>
    ) {}

    //----------------------------------------------Method seven - create book-----------------------------------------\\
    async addBook(dto: CreateBookDto): Promise<Book> {
        return await this.bookRepository.save({...dto, isUsed: false, ownerId: null});
    }
     //--------------------------------------------------------------------------------------------------------------\\
    //--------------------------------------------Method eight - give book to the user------------------------------------------\\
    async giveBook(dto: EditBookDto): Promise<EditBookDto> {

        const countBooks = await this.bookRepository.findAndCount({where: {ownerId: dto.ownerId}});

        const person = await this.personRepository.findOne(dto.ownerId);

        const book = await this.bookRepository.findOne(dto.id);

        //If the user has a subscription AND has less than 5 books, AND the book is not used then give him book
        if(!book.isUsed && countBooks[1]<5 && person.hasSub)
            return await this.bookRepository.save({...dto, isUsed: true});
    }
     //--------------------------------------------------------------------------------------------------------------\\
    //--------------------------------------------Method nine - get back the book------------------------------------------\\
    async getBackBook(id) {
        const book = await this.bookRepository.findOne(id);
        book.ownerId=null;
        book.isUsed=false;
        return await this.bookRepository.save(book);
    }
    //--------------------------------------------------------------------------------------------------------------\\


    async getBooks(): Promise<Book[]> {
        return await this.bookRepository.find();
    }

    async deleteBook(id) {
        const book = await this.bookRepository.findOne(id);
        return await this.bookRepository.manager.remove(book);
    }
}



