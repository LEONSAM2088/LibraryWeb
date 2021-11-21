import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from "./person.entity";
import {ObjectID} from "typeorm";
import {CreatePersonDto} from "./dto/create-person.dto";
import {UpdatePersonDto} from "./dto/update-person.dto";



@Controller('person')
export class PersonController {
    constructor(private readonly personService: PersonService) {}


    @Post()
    createPerson(@Body() dto: CreatePersonDto) {
        return this.personService.addPerson(dto);
    }

    @Put(':id')
    editPerson(@Body() dto: UpdatePersonDto, @Param() id: ObjectID) {
        return this.personService.editPerson(dto, id);
    }

    @Get()
    getList(): Promise<Person[]> {
        return  this.personService.findAll();
    }

    @Get(':id')
    getUserInfo(@Param() id: ObjectID) {

        return  this.personService.getUserInfo(id);
    }

    @Delete(':id')
    deletePerson(@Param('id') id: ObjectID) {
       return this.personService.deletePerson(id);
    }

    @Put('sub/:id')
    giveSubUser(@Param('id') id: ObjectID ) {
        return this.personService.giveSubUser(id);
    }
}
