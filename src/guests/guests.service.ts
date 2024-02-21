import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateGuestDto } from './dto/createGuest.dto';
import { UpdateGuestDto } from './dto/updateGuest.dto';
import { Guest } from './entities/guest.entity';
import { GuestRepository } from './guest.repository';

@Injectable()
export class GuestsService {

    constructor(
        private readonly _guestRepository: GuestRepository
    ){}

    async createGuest(createGuestDto: CreateGuestDto){

        const newGuest = this._guestRepository.create(createGuestDto);

        console.log(newGuest);
        return await this._guestRepository.save(newGuest);
    }
    async selectGuest(guestId: number){
        return await this._guestRepository.findOne({where: {id: guestId}});
    }
    async updateGuest(guestId: number, guestUpdated: UpdateGuestDto){
        return await this._guestRepository.update(guestId, guestUpdated);
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


    //findAllByUserIdAndEvent, findByUserIdWhereStateIsTrue
    //al crear un guest es buena idea generar un token con un qr.
    //para setear un usuario a true seria necesario enviar ese token para darle el true al ingreso
    //por ahora solo se manda el id de ese usuario
    //poder generar un token de un usuario cuando sea necesario o se pierda el anterior.
}