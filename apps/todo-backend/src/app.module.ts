import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(
    //   `mongodb://${env.MONGODB_HOST}/${env.MONGODB_DATABASE}`,
    // ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
