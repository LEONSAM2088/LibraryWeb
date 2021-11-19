import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from "./book.entity";
import {ObjectID} from "typeorm";
import {CreateBookDto} from "./dto/create-book.dto";
import {EditBookDto} from "./dto/edit-book.dto";
import {CreatePersonDto} from "../person/dto/create-person.dto";



@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    createPerson(@Body() dto: CreateBookDto) {
        return this.bookService.addBook(dto);
    }

    @Put('giveBook')
    giveBook(@Body() dto: EditBookDto) {
        return this.bookService.giveBook(dto);
    }

}
