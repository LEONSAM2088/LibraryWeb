
import {Injectable, Inject} from '@nestjs/common';
import {Repository, UpdateResult} from 'typeorm';
import { Book } from './book.entity';
import { UpdateBookDto } from "./dto/update-book.dto";
import { Person } from "../person/person.entity";
import {ApiError} from "../ApiError/ApiError";

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
    //If the user has a subscription AND has less than 5 books, AND the book is not used then give him book
    async giveBook(dto: UpdateBookDto, id): Promise<UpdateResult> {

        const countBooks = await this.bookRepository.findAndCount({where: {ownerId: dto.ownerId}});
        if(countBooks[1]>=5) ApiError.Forbidden_Error('Больше 5 книг давать нельзя!')

        const person = await this.personRepository.findOne(dto.ownerId);
        if(!person.hasSub) ApiError.Payment_Error('Требуется абонимент!')

        const book = await this.bookRepository.findOne(id);
        if(book.isUsed) ApiError.Forbidden_Error('Книги нет в наличии!')

        return await this.bookRepository.update({id: id.id}, {...dto, isUsed: true})

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



