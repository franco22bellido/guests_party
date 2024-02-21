import { Module } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { GuestsController } from './guests.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Guest } from './entities/guest.entity';
import { GuestRepository } from './guest.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guest]),
    AuthModule
  ],
  providers: [GuestsService, GuestRepository],
  controllers: [GuestsController]
})
export class GuestsModule {}