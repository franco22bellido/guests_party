import { Injectable } from "@nestjs/common";
import { Repository, DataSource} from "typeorm";
import { Guest } from "./entities/guest.entity";

@Injectable()
export class GuestRepository extends Repository<Guest>{
    
    constructor(_dataSource: DataSource){
        super(Guest, _dataSource.createEntityManager());
    }


    async updateState(id: number, state: boolean){
        return await this.update({id}, {state});
    }
}