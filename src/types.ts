export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface TasksState {
  todo: Task[];
  inprogress: Task[];
  done: Task[];
}