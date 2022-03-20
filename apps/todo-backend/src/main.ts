import { NestFactory } from '@nestjs/core'
import { env } from 'process'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  await app.listen(env.APP_PORT, env.APP_HOST)
}
bootstrap()
