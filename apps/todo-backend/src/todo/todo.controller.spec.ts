import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken, MongooseModule } from '@nestjs/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Todo, TodoDocument } from './todo.schema'
import { TodoModule } from './todo.module'
import request from 'supertest'
import { Model } from 'mongoose'

describe('Todos controller', () => {
  let todoModel: Model<TodoDocument>
  let app: any

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const mongod = new MongoMemoryServer()
            const uri = await mongod.getUri()
            return {
              uri: uri,
            }
          },
        }),
        TodoModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    todoModel = moduleFixture.get<Model<TodoDocument>>(getModelToken(Todo.name))
    await app.init()
  })

  beforeEach(() => {
    // return catModel.create(mockTodo);
  })

  afterEach(() => todoModel.remove({}))

  it('GET /cats', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect((res) => {
        expect(res.body.length > 0).toBe(true)
      })
  })

  afterAll(() => {
    app.close()
  })
})
