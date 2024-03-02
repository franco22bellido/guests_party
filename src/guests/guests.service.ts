import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { EventsService } from 'src/events/events.service';
import { CreateGuestDto } from './dto/createGuest.dto';
import { UpdateGuestDto } from './dto/updateGuest.dto';
import { GuestRepository } from './guest.repository';

@Injectable()
export class GuestsService {

    constructor(
        private readonly _guestRepository: GuestRepository,
        private readonly _jwtService: JwtService,
        private readonly _eventService: EventsService
    ){}

    async createGuest(createGuestDto: CreateGuestDto, userId: number){
        
        try {
            const eventFound =  await this._eventService.findOne(createGuestDto.eventId, userId);

            if(!eventFound){
                throw new NotFoundException();
            }
    
            let newGuest = this._guestRepository.create(createGuestDto);
            newGuest.userId = userId;
            const GuestSaved = await this._guestRepository.save(newGuest);
    
            //generate token
            const payload = {id : GuestSaved.id};
            let token = this._jwtService.sign(payload, {secret: "guestSecret"});
            
    
            return token;
        } catch (error) {
            return new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateGuest(guestId: number, guestUpdated: UpdateGuestDto){
        return await this._guestRepository.update(guestId, guestUpdated);
    }
    async deleteGuest(guestId: number){
        return await this._guestRepository.delete(guestId);
    }
    //add other functions of "CRUD"

    
    async getInfoByToken(token: string, userId: number){
        try {
            const ifTokenValid = this._jwtService.verify(token , {secret: 'guestSecret'});

            const guestFound = await this._guestRepository.findOne({where : {id: ifTokenValid.id, userId},
            relations: {event: true, user: true}});
            
            if(!guestFound){
                throw new HttpException('user not found in your guest list', HttpStatus.NOT_FOUND);
            }

            return guestFound;

        } catch (error) {
            throw new HttpException( 'error guest token', HttpStatus.UNAUTHORIZED );    
        }
    }

    async setStateByToken(token : string, userId: number){
        try {
            const payload = this._jwtService.verify(token, {secret : 'guestSecret'});

            let guestFound = await this._guestRepository.findOne({where: {id: payload.id, userId}});
            if(!guestFound){
                throw new NotFoundException();
            }
            
            return await this._guestRepository.update(guestFound.id, {state: ! guestFound.state});


        } catch (error) {
            return new HttpException('token error', HttpStatus.UNAUTHORIZED);
        }
    }

    async selectGuestByUserId(userId: number){
        return await this._guestRepository.find({where: {userId}, relations: {event: true}});
    }

    async selectAllGuestByUserIdEventId(userId: number, eventId: number){
        return await this._guestRepository.find({where: {userId, eventId}, relations: {event: true}});
    }
 
}