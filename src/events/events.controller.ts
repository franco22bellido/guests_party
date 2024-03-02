import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RequestUser } from '../auth/dto/request.user'; 

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }


  @UseGuards(AuthGuard)
  @Get('')
  findAll(
    @Req() requestUser: RequestUser
  ) {
    return this.eventsService.findAll(requestUser.user.id);
  }


  @UseGuards(AuthGuard)
  @Get(':eventId/')
  findOne(@Param('eventId') eventId: number,
  @Req() requestUser: RequestUser) {
    return this.eventsService.findOne(eventId, requestUser.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto,
  @Req() requestUser: RequestUser) {
    return this.eventsService.update(requestUser.user.id ,id, updateEventDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number,
  @Req() requestUser: RequestUser) {
    return this.eventsService.delete(requestUser.user.id ,id);
  }

  @UseGuards(AuthGuard)
  @Get('guestsOfOneEvent/:id')
  getGuests(
    @Param('id') id: number,
    @Req() requestUser: RequestUser
  ){
    return this.eventsService.getRelationGuests(id ,requestUser.user.id);
  }

}
