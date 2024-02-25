import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event)
    private readonly _eventRepository: Repository<Event>
  ){}

  async create(createEventDto: CreateEventDto) {
      
    return await this._eventRepository.save(createEventDto);
  }

  async findAll(userId: number) {
    return await this._eventRepository.find({where: {userId}});
  }

  async findOne(eventId: number, userId: number) {
    return await this._eventRepository.findOne({where: {id: eventId, userId}});
  }

  async update(eventId: number, updateEventDto: UpdateEventDto) {
    return await this._eventRepository.update(eventId, updateEventDto);
  }

  async delete(eventId: number) {
    return await this._eventRepository.delete(eventId);
  }
  async getRelationGuest(eventId: number, userId: number){
    const event = await this._eventRepository.findOne({where: {id: eventId, userId}, relations: {guests: true}});
    return event;
  }

}
