import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post, Put, Delete, UseGuards} from '@nestjs/common/decorators';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateGuestDto } from './dto/createGuest.dto';
import { UpdateGuestDto } from './dto/updateGuest.dto';
import { GuestsService } from './guests.service';

@Controller('guests')
export class GuestsController {
    constructor(
        private readonly _guestService: GuestsService
    ){}


    @Post('/')
    createGuest(@Body() newGuest: CreateGuestDto){
        return this._guestService.createGuest(newGuest, 1 , 1);
    }
    @Get('/:token')
    getInfoByToken(@Param('token') token : string){
        return this._guestService.getInfoByToken(token);
    }
    
    @Put('/:token')
    updateOne(@Param('token') token: string){
        return this._guestService.setStateByToken(token);
    }
    @Delete("/:guestId")
    deleteOne(@Param('guestId') guestId: number){
        return this._guestService.deleteGuest(guestId);
    }

}