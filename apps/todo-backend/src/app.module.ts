import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { env } from 'process'
import { ConfigModule } from '@nestjs/config'
import { TodoModule } from './todo/todo.module'
import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${env.MONGODB_HOST}/todo?authSource=admin`,
    ),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
