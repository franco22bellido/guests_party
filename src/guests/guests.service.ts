import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { UpdateGuestDto } from './dto/updateGuest.dto';
import { Guest } from './entities/guest.entity';
import { GuestRepository } from './guest.repository';

@Injectable()
export class GuestsService {

    constructor(
        private readonly _guestRepository: GuestRepository
    ){}

    async createGuest(firstName:string , lastName:string){
        const newGuest = this._guestRepository.create({firstName, lastName});

        return await this._guestRepository.save(newGuest);
    }
    async selectGuest(guestId: number){
        return await this._guestRepository.findOne({where: {id: guestId}});
    }
    async updateGuest(guestId: number, guestUpdated: UpdateGuestDto){
        this._guestRepository.update(guestId, guestUpdated);
    }
    async deleteGuest(guestId: number){
        return await this._guestRepository.delete(guestId);
    }
    async setStateOfOneGuest(guestId: number, state: boolean){
        if(!state){
            return new HttpException('state cannot be a empty', HttpStatus.NOT_ACCEPTABLE)
        }
        return await this._guestRepository.updateState(guestId, state);
    }

    //findAllByUserIdAndEvent, findByUserIdWhereStateIsTrue,
    
}