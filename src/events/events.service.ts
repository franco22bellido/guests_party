import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly _eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto, userId: number) {
    return await this._eventRepository.save({
      userId,
      startDate: createEventDto.startDate,
      eventName: createEventDto.eventName,
    });
  }

  async findAll(userId: number) {
    return await this._eventRepository.find({
      where: { userId },
      relations: { guests: false },
    });
  }

  async findOne(eventId: number, userId: number) {
    const event = await this._eventRepository.findOne({
      where: { id: eventId, userId },
      relations: { guests: true },
    });
    if (!event) {
      throw new NotFoundException('event not found');
    }
    return event;
  }

  async update(
    userId: number,
    eventId: number,
    updateEventDto: UpdateEventDto,
  ) {
    return await this._eventRepository.update(
      { id: eventId, userId },
      updateEventDto,
    );
  }

  async delete(userId: number, eventId: number) {
    //add validations
    try {
      return await this._eventRepository.delete({ id: eventId, userId });
    } catch (error) {
      console.log(error);
    }
  }
  async getRelationGuests(eventId: number, userId: number) {
    const event = await this._eventRepository.findOne({
      where: { id: eventId, userId },
      relations: { guests: true },
    });
    return event;
  }
}
