export type DomainTask = {
  description: string;
  title: string;
  status: TaskStatus;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type GetTasksResponse = {
  error: string | null;
  items: DomainTask[];
  totalCount: number;
};

export type UpdateTaskModel = {
  description: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
};

export enum TaskStatus {
  New = 0,
  InProgress,
  Completed,
  Draft,
}

export enum TaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
