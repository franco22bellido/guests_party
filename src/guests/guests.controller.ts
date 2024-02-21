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
        return this._guestService.createGuest(newGuest);
    }
    
    @Get('/:guestId')
    selectOne(@Param('guestId') guestId: number){
        return this._guestService.selectGuest(guestId);
    }
    @Put('/:guestId')
    updateOne(@Param('guestId') guestId: number, @Body() guestUpdated: UpdateGuestDto){
        return this._guestService.updateGuest(guestId, guestUpdated);
    }
    @Delete("/:guestId")
    deleteOne(@Param('guestId') guestId: number){
        return this._guestService.deleteGuest(guestId);
    }
    @Post('/setState/:guestId')
    setState(@Param('guestId') guestId: number, @Body('state')state: boolean){
        return this._guestService.setStateOfOneGuest(guestId, state);
    }
}