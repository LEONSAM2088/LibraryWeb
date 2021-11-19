import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { bookProviders } from "./book.providers";
import {DatabaseModule} from "../database/database.module";

import {personProviders} from "../person/person.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [BookController],
    providers: [ ...bookProviders, BookService, ...personProviders],
})
export class BookModule {}
