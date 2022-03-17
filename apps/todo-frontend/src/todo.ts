export interface Todo {
  /**
   * Data
   */
  id: string;
  content: string;
  completedAt?: Date;

  /**
   * User interface
   */
  edit?: boolean;
  input?: any;
}