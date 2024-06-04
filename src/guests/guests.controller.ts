import { Controller, ParseIntPipe } from '@nestjs/common';
import {
  Body,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common/decorators';
import { RequestUser } from 'src/auth/dto/request.user';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateGuestDto } from './dto/createGuest.dto';
import { GuestsService } from './guests.service';

@Controller('guests')
export class GuestsController {
  constructor(private readonly _guestService: GuestsService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  createGuest(
    @Body() newGuest: CreateGuestDto,
    @Req() requestUser: RequestUser,
  ) {
    return this._guestService.createGuest(newGuest, requestUser.user.id);
  }
  @Get('/:token')
  getInfoByToken(@Param('token') token: string) {
    return this._guestService.getInfoByToken(token);
  }
  @UseGuards(AuthGuard)
  @Get('/regenerate/:guestId')
  reGenerateToken(
    @Param('guestId', ParseIntPipe) guestsId: number,
    @Req() requestUser: RequestUser,
  ) {
    return this._guestService.reGenerateToken(guestsId, requestUser.user.id);
  }

  @UseGuards(AuthGuard)
  @Put('/:token')
  setState(@Param('token') token: string, @Req() requestUser: RequestUser) {
    return this._guestService.setStateByToken(token, requestUser.user.id);
  }
  @UseGuards(AuthGuard)
  @Delete('/:guestId')
  deleteOne(@Param('guestId') guestId: number) {
    return this._guestService.deleteGuest(guestId);
  }
  @UseGuards(AuthGuard)
  @Put('/setStateById/:guestId')
  setStateById(
    @Param('guestId') guestId: number,
    @Req() requestUser: RequestUser,
  ) {
    return this._guestService.setStateById(guestId, requestUser.user.id);
  }
}
