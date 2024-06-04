import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { EventsService } from 'src/events/events.service';
import { CreateGuestDto } from './dto/createGuest.dto';
import { UpdateGuestDto } from './dto/updateGuest.dto';
import { GuestRepository } from './guest.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GuestsService {
  constructor(
    private readonly _guestRepository: GuestRepository,
    private readonly _jwtService: JwtService,
    private readonly _eventService: EventsService,
    private readonly _configService: ConfigService,
  ) {}

  async createGuest(createGuestDto: CreateGuestDto, userId: number) {
    try {
      const eventFound = await this._eventService.findOne(
        createGuestDto.eventId,
        userId,
      );

      if (!eventFound) {
        throw new NotFoundException('event not found');
      }

      const newGuest = this._guestRepository.create(createGuestDto);
      newGuest.userId = userId;
      const GuestSaved = await this._guestRepository.save(newGuest);

      //generate token
      const payload = { id: GuestSaved.id };
      const token = await this._jwtService.signAsync(payload, {
        secret: this._configService.get<string>('JWT_SECRET_GUESTS'),
      });
      const data = await this._guestRepository.findOne({
        where: { id: GuestSaved.id },
        relations: { user: true, event: true },
      });
      return {
        guest: data,
        token: token,
      };
    } catch (error) {
      return error;
    }
  }

  async updateGuest(guestId: number, guestUpdated: UpdateGuestDto) {
    return await this._guestRepository.update(guestId, guestUpdated);
  }
  async deleteGuest(guestId: number) {
    return await this._guestRepository.delete(guestId);
  }
  //add other functions of "CRUD"

  async getInfoByToken(token: string) {
    try {
      const ifTokenValid = this._jwtService.verify(token, {
        secret: this._configService.get<string>('JWT_SECRET_GUESTS'),
      });

      const guestFound = await this._guestRepository.findOne({
        where: { id: ifTokenValid.id },
        relations: { event: true, user: true },
      });

      if (!guestFound) {
        throw new HttpException('guest not found', HttpStatus.NOT_FOUND);
      }

      return {
        guest: guestFound,
      };
    } catch (error) {
      throw new HttpException('token malformed', HttpStatus.BAD_REQUEST);
    }
  }

  async setStateByToken(token: string, userId: number) {
    try {
      const payload = this._jwtService.verify(token, {
        secret: this._configService.get<string>('JWT_SECRET_GUESTS'),
      });

      const guestFound = await this._guestRepository.findOne({
        where: { id: payload.id, userId },
      });
      if (!guestFound) {
        throw new NotFoundException();
      }
      return await this._guestRepository.update(guestFound.id, {
        state: !guestFound.state,
      });
    } catch (error) {
      return new HttpException('token error', HttpStatus.UNAUTHORIZED);
    }
  }
  async setStateById(guestId: number, userId: number) {
    try {
      const guestFound = await this._guestRepository.findOne({
        where: { id: guestId, userId },
      });
      if (!guestFound) {
        throw new HttpException('guest not found', HttpStatus.NOT_FOUND);
      }

      return await this._guestRepository.update(guestFound.id, {
        state: !guestFound.state,
      });
    } catch (error) {
      return new HttpException(
        'error in set guest',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async reGenerateToken(guestId: number, userId: number) {
    const guestFound = await this._guestRepository.findOne({
      where: { userId, id: guestId },
      relations: { user: true, event: true },
    });

    if (!guestFound) {
      throw new HttpException('guest not found', HttpStatus.NOT_FOUND);
    }
    //generate token
    const payload = { id: guestFound.id };
    const token = this._jwtService.sign(payload, {
      secret: this._configService.get<string>('JWT_SECRET_GUESTS'),
    });

    return { guest: guestFound, token: token };
  }

  async selectGuestByUserId(userId: number) {
    return await this._guestRepository.find({
      where: { userId },
      relations: { event: true },
    });
  }

  async selectAllGuestByUserIdEventId(userId: number, eventId: number) {
    return await this._guestRepository.find({
      where: { userId, eventId },
      relations: { event: true },
    });
  }
}
