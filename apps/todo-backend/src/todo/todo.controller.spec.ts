import { Test } from '@nestjs/testing'
import { TodoService } from './todo.service'
import { TodoController } from './todo.controller'
import { Todo } from './todo.schema'
import { getModelToken } from '@nestjs/mongoose'

describe('Todos controller', () => {
  let todoController: TodoController
  let todoService: TodoService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken('Todo'),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
      controllers: [TodoController],
    }).compile()

    todoService = module.get(TodoService)
    todoController = module.get(TodoController)
  })

  it('should find todo by ID', async () => {
    // Arrange
    const result = {
      id: '123-123-123',
      content: 'lorem',
      createdAt: new Date(),
    } as Todo
    jest
      .spyOn(todoService, 'findOne')
      .mockImplementation(() => new Promise((resolve) => resolve(result)))

    // Assert
    expect(await todoController.find(result.id)).toBe(result)
  })
})
