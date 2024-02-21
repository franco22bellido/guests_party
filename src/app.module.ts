import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Guest } from './guests/entities/guest.entity';
import { GuestsModule } from './guests/guests.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      database: "guests_party",
      port: 3306,
      username: "root",
      password: "Ironman312345aAA",
      entities: [Guest],
      synchronize: true,
    }),
    GuestsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
