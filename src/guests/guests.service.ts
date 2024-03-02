import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { CreateGuestDto } from './dto/createGuest.dto';
import { UpdateGuestDto } from './dto/updateGuest.dto';
import { GuestRepository } from './guest.repository';

@Injectable()
export class GuestsService {

    constructor(
        private readonly _guestRepository: GuestRepository,
        private readonly _jwtService: JwtService
    ){}

    async createGuest(createGuestDto: CreateGuestDto, userId: number, eventId: number){
        const newGuest = this._guestRepository.create(createGuestDto);
        //generate token
        
        const GuestSaved = await this._guestRepository.save(newGuest);
        const payload = {id : GuestSaved.id};
        let token = this._jwtService.sign(payload, {secret: "guestSecret"});
        

        return token;
    }

    async updateGuest(guestId: number, guestUpdated: UpdateGuestDto){
        return await this._guestRepository.update(guestId, guestUpdated);
    }
    async deleteGuest(guestId: number){
        return await this._guestRepository.delete(guestId);
    }

    
    async getInfoByToken(token: string){
        try {
            const ifTokenValid = this._jwtService.verify(token , {secret: 'guestSecret'});
            const guestFound = await this._guestRepository.findOne({where : {id: ifTokenValid.id},
            relations: {event: true, user: true}});
            return guestFound;

        } catch (error) {
            throw new HttpException( 'error token', HttpStatus.UNAUTHORIZED );    
        }
    }
    async setStateByToken(token : string){
        //varias validaciones tambien, como por ejemplo, si este token le pertenece al usuario,
        //que solo me lo muestre antes de setearlo
        try {
            const payload = this._jwtService.verify(token, {secret : 'guestSecret'});

            let guestFound = await this._guestRepository.findOne({where: {id: payload.id}});
            
            return await this._guestRepository.update(guestFound.id, {state: ! guestFound.state});


        } catch (error) {
            return new HttpException('token error', HttpStatus.UNAUTHORIZED);
        }



        //despues queda solo hacer un setstate de la db
    }

    selectGuestByUserId(){}
    selectAllGuestByUserIdEventId(){}
    
 
}