
import { Injectable, Inject } from '@nestjs/common';
import { Person } from './person.entity';
import {CreatePersonDto} from "./dto/create-person.dto";
import {EditPersonDto} from "./dto/edit-person.dto";
import {Repository} from "typeorm";



@Injectable()
export class PersonService {
    constructor(
        @Inject('PERSON_REPOSITORY')
        private personRepository: Repository<Person>
    ) {}


    //----------------------------------------------Method one - create user-----------------------------------------\\
    async addPerson(dto: CreatePersonDto): Promise<Person> {
        return await this.personRepository.save({...dto, hasSub: false});
    }
     //--------------------------------------------------------------------------------------------------------------\\
    //-----------------------------------------------Method two - edit user-------------------------------------------\\
    async editPerson(dto: EditPersonDto): Promise<EditPersonDto> {
        return await this.personRepository.save(dto);
    }
     //--------------------------------------------------------------------------------------------------------------\\
    //--------------------------------------------Method three - delete user------------------------------------------\\
    async deletePerson(id) {
        const user = await this.personRepository.findOne(id);
        await this.personRepository.manager.remove(user);

    }
     //--------------------------------------------------------------------------------------------------------------\\
    //----------------------------------Method four - Give the user a subscription------------------------------------\\
    async giveSubUser(id) {
        const user = await this.personRepository.findOne(id);
        user.hasSub = true;
        return await this.personRepository.manager.save(user);
    }
     //--------------------------------------------------------------------------------------------------------------\\
    // -------------------------------------------Method five - list of users-----------------------------------------\\
    async findAll(): Promise<Person[]> {
        return await this.personRepository.find();
    }
     //--------------------------------------------------------------------------------------------------------------\\
    //----------------------------------Method six - information about user and his books------------------------------------\\
    async getUserInfo(id) {
       return await this.personRepository
            .createQueryBuilder("owner").where(id)
            .leftJoinAndSelect("owner.books", "book").getOne()
    }
    //--------------------------------------------------------------------------------------------------------------\\



}



