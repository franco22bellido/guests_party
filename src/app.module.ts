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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (_configService: ConfigService) => ({
        type: 'postgres',
        ssl: true,
        host: _configService.get<string>('DB_HOST'),
        database: _configService.get<string>('DB_NAME'),
        port: _configService.get<number>('DB_PORT'),
        username: _configService.get<string>('DB_USERNAME'),
        password: _configService.get<string>('DB_PASSWORD'),
        entities: [Guest, User, Event],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    GuestsModule,
    UsersModule,
    AuthModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
