import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { TodoModule } from './todo.module'
import { TodoService } from './todo.service'

describe('TodoService', () => {
  let service: TodoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const mongod = await MongoMemoryServer.create()
            const uri = mongod.getUri()
            return {
              uri: uri,
            }
          },
        }),
        TodoModule,
      ],
    }).compile()

    service = module.get<TodoService>(TodoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
