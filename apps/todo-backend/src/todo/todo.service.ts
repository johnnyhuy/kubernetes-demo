import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { Todo, TodoDocument } from './todo.schema';
import { Model } from 'mongoose';
import { v4 } from 'uuid';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly model: Model<TodoDocument>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.model.findById(id).exec();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await new this.model({
      ...createTodoDto,
      id: v4(),
      checked: false,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.model.findByIdAndUpdate(id, updateTodoDto).exec();
  }

  async delete(id: string): Promise<Todo> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
