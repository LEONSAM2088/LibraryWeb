import { Injectable, Inject } from '@nestjs/common';
import { Person } from './person.entity';
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ApiError } from "../ApiError/ApiError";



@Injectable()
export class PersonService {
    constructor(
        @Inject('PERSON_REPOSITORY')
        private readonly personRepository: Repository<Person>
    ) {}

    //----------------------------------------------Method one - create user-----------------------------------------\\
    async addPerson(dto: CreatePersonDto): Promise<Person> {
        return await this.personRepository.save({...dto, hasSub: false});
    }
     //--------------------------------------------------------------------------------------------------------------\\
    //-----------------------------------------------Method two - edit user-------------------------------------------\\
    async editPerson(dto: UpdatePersonDto, id): Promise<UpdateResult> {
        return await this.personRepository.update(id, {...dto});
    }
     //--------------------------------------------------------------------------------------------------------------\\
    //--------------------------------------------Method three - delete user------------------------------------------\\
    async deletePerson(id): Promise<DeleteResult> {
        try {
            return await this.personRepository.delete(id);
        }
        catch (e) {
            ApiError.Forbidden_Error(e.detail)
        }
    }
     //--------------------------------------------------------------------------------------------------------------\\
    //----------------------------------Method four - Give the user a subscription------------------------------------\\
    async giveSubUser(id) {
        const user = await this.personRepository.findOne(id);

        if(user.hasSub===true)
            ApiError.Forbidden_Error('У пользователя уже есть абонемент!');
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
            .leftJoinAndSelect("owner.books", "book").getOne();
    }
    //--------------------------------------------------------------------------------------------------------------\\



}



