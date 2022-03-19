export interface Todo {
  /**
   * Data
   */
  id?: string;
  content: string;
  completedAt?: Date | null;

  /**
   * User interface
   */
  // TODO: Move this into components instead of
  // adding it to this interface
  edit?: boolean;
  textInput?: any;
  checkbox?: any;
}