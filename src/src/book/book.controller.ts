import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { BookService } from './book.service';
import {CreateBookDto} from "./dto/create-book.dto";
import {EditBookDto} from "./dto/edit-book.dto";
import {ObjectID} from "typeorm";




@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}


    @Get()
    ListBooks() {
        return this.bookService.getBooks();
    }

    @Post()
    createBook(@Body() dto: CreateBookDto) {
        return this.bookService.addBook(dto);
    }

    @Put('give')
    giveBook(@Body() dto: EditBookDto) {
        return this.bookService.giveBook(dto);
    }

    @Delete(':id')
    deleteBook(@Param() id: ObjectID) {
        return this.bookService.deleteBook(id);
    }

    @Put('back/:id')
    getBackBook(@Param() id: ObjectID) {
        return this.bookService.getBackBook(id);
    }

}
