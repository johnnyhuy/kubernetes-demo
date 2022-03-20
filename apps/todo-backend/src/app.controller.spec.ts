import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'

describe('TodoController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    appController = app.get<AppController>(AppController)
  })
})
