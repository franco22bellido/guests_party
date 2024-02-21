import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserRepository extends Repository<User>{

    constructor(private readonly _dataSource: DataSource){
        super(User, _dataSource.createEntityManager())
    }

    async findOneByEmail(email: string){
        return await this.findOne({where: {email}});
    }

}