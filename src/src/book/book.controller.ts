import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { BookService } from './book.service';
import {UpdateBookDto} from "./dto/update-book.dto";
import {ObjectID} from "typeorm";
import {CreateBookDto} from "./dto/create-book.dto";




@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}


    @Get()
    getBooks() {
        return this.bookService.getBooks();
    }

    @Post()
    createBook(@Body() dto: CreateBookDto) {

        return this.bookService.addBook(dto);
    }

    @Put('give/:id')
    giveBook(@Body() dto: UpdateBookDto, @Param() id: ObjectID) {
        return this.bookService.giveBook(dto, id);
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
