import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { personProviders } from "./person.providers";
import {DatabaseModule} from "../database/database.module";
import {BookModule} from "../book/book.module";

@Module({
    imports: [DatabaseModule],
    controllers: [PersonController],
    providers: [ ...personProviders, PersonService],
})
export class PersonModule {}
