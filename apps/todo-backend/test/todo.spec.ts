import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { FetchFunction, makeFetch } from 'supertest-fetch'
import { INestApplication } from '@nestjs/common'
import { TodoService } from '../src/todo/todo.service'
import { TodoModule } from '../src/todo/todo.module'

describe('Todos controller', () => {
  let app: INestApplication
  let fetch: FetchFunction
  let mongod: MongoMemoryServer
  let todoService: TodoService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create()
            return {
              uri: mongod.getUri(),
            }
          },
        }),
        TodoModule,
      ],
    }).compile()

    app = module.createNestApplication()
    await app.init()
    fetch = makeFetch(app.getHttpServer())

    todoService = await module.resolve(TodoService)
  })

  afterAll(async () => {
    mongod.stop({ doCleanup: true })
    app.close()
  })

  it('should get todos', async () => {
    // Arrange
    todoService.create({ content: 'test' })

    // Act
    const response = await fetch('/todos')
    const body = await response.json()

    // Assert
    expect(response.statusText).toEqual('OK')
    expect(body.length).toEqual(1)
  })
})
