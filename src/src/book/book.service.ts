
import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Book } from './book.entity';
import { UpdateBookDto } from "./dto/update-book.dto";
import { Person } from "../person/person.entity";
import { ApiError } from "../ApiError/ApiError";

@Injectable()
export class BookService {
    constructor(
        @Inject('BOOK_REPOSITORY')
        private bookRepository: Repository<Book>,
        @Inject('PERSON_REPOSITORY')
        private personRepository: Repository<Person>
    ) {}

    //----------------------------------------------Method seven - create book-----------------------------------------\\
    async addBook(dto): Promise<Book> {
        return await this.bookRepository.save({name: dto.name, isUsed: false, ownerId: null});
    }
     //--------------------------------------------------------------------------------------------------------------\\
    //--------------------------------------------Method eight - give book to the user------------------------------------------\\
     async giveBook(dto: UpdateBookDto, id): Promise<UpdateResult> {

        if(dto.ownerId==undefined) ApiError.Forbidden_Error('Id владельца не указан!');

        const countBooks = await this.bookRepository.findAndCount({where: {ownerId: dto.ownerId}});
        if(countBooks[1]>=5) ApiError.Forbidden_Error('Больше 5 книг давать нельзя!');

        const person = await this.personRepository.findOne(dto.ownerId);
        if(person.hasSub===false) ApiError.Payment_Error('Требуется абонемент!');

        const book = await this.bookRepository.findOne(id);
        if(book.isUsed===true) ApiError.Forbidden_Error('Книги нет в наличии!');

        return await this.bookRepository.update(id, {...dto, isUsed: true});

    }
     //--------------------------------------------------------------------------------------------------------------\\
    //--------------------------------------------Method nine - get back the book------------------------------------------\\
    async getBackBook(id): Promise<UpdateResult> {
        return await this.bookRepository.update(id, {isUsed: false, ownerId: null});
    }
    //--------------------------------------------------------------------------------------------------------------\\

    async getBooks(): Promise<Book[]> {
        return await this.bookRepository.find();
    }

    async deleteBook(id): Promise<DeleteResult> {
        return await this.bookRepository.delete(id);
    }
}



