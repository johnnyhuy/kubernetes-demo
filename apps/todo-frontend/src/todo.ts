export interface Todo {
  id: string;
  edit?: boolean;
  content: string;
  completedAt?: Date;
  input?: any;
}