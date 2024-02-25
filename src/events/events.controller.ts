import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get(':userId')
  findAll(
    @Param('userId') userId: number
  ) {
    return this.eventsService.findAll(userId);
  }

  @Get(':eventId/:userId')
  findOne(@Param('eventId') eventId: number,
  @Param('userId') userId: number) {
    return this.eventsService.findOne(eventId, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventsService.delete(id);
  }
}
