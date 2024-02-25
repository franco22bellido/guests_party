import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Guest } from './guests/entities/guest.entity';
import { GuestsModule } from './guests/guests.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { Event } from './events/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      database: "guests_party",
      port: 3306,
      username: "root",
      password: "Ironman312345aAA",
      entities: [Guest, User, Event],
      synchronize: true,
    }),
    GuestsModule,
    UsersModule,
    AuthModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
