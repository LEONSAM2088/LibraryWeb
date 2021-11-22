import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { UpdateBookDto } from "./dto/update-book.dto";
import { DeleteResult, ObjectID, UpdateResult } from "typeorm";
import { CreateBookDto } from "./dto/create-book.dto";
import { Book } from "./book.entity";




@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}


    @Get()
    getBooks(): Promise<Book[]> {
        return this.bookService.getBooks();
    }

    @Post()
    createBook(@Body() dto: CreateBookDto): Promise<Book> {
        return this.bookService.addBook(dto);
    }

    @Put('give/:id')
    giveBook(@Body() dto: UpdateBookDto, @Param() id: ObjectID): Promise<UpdateResult> {
        return this.bookService.giveBook(dto, id);
    }

    @Delete(':id')
    deleteBook(@Param() id: ObjectID): Promise<DeleteResult> {
        return this.bookService.deleteBook(id);
    }

    @Put('back/:id')
    getBackBook(@Param() id: ObjectID): Promise<UpdateResult> {
        return this.bookService.getBackBook(id);
    }

}
