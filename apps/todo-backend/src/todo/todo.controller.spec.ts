import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { TodoModule } from './todo.module'
import { FetchFunction, makeFetch } from 'supertest-fetch'
import { INestApplication } from '@nestjs/common'

describe('Todos controller', () => {
  let app: INestApplication
  let fetch: FetchFunction
  let mongod: MongoMemoryServer

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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

    app = moduleFixture.createNestApplication()
    await app.init()
    fetch = makeFetch(app.getHttpServer())
  })

  afterAll(async () => {
    mongod.stop({ doCleanup: true })
    app.close()
  })

  it('should get todos', async () => {
    // Act
    const response = await fetch('/todos')

    // Assert
    expect(response.statusText).toEqual('OK')
  })
})
