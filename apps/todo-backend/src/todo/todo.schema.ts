import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  checked: boolean;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  completedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
