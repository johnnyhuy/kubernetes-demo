export class BaseTodoDto {
  content: string
}

export class CreateTodoDto extends BaseTodoDto {}

export class UpdateTodoDto extends BaseTodoDto {
  completedAt: Date
}
