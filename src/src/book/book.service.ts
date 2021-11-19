
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import {CreateBookDto} from "./dto/create-book.dto";
import {EditBookDto} from "./dto/edit-book.dto";

@Injectable()
export class BookService {
    constructor(
        @Inject('BOOK_REPOSITORY')
        private bookRepository: Repository<Book>,
    ) {}

    //----------------------------------------------Method one - create user-----------------------------------------\\
    async addBook(dto: CreateBookDto): Promise<Book> {
        return await this.bookRepository.save({...dto, isUsed: false, ownerId: null});
    }
    //--------------------------------------------------------------------------------------------------------------\\
    //--------------------------------------------Method three - delete user------------------------------------------\\
    async giveBook(dto: EditBookDto): Promise<EditBookDto> {
        return await this.bookRepository.save({...dto, isUsed: !!dto.ownerId});
    }
    //--------------------------------------------------------------------------------------------------------------\\





}



