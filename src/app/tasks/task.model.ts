import { InjectionToken, Provider } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';
export type TaskFilter = TaskStatus | 'ALL';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface AddTask {
  title: string;
  description: string;
}

export type TaskStatusOption = {
  label: string;
  value: TaskStatus;
};

export const TaskStatusOptions: TaskStatusOption[] = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Completed', value: 'DONE' },
];

export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOption[]>('TASK_STATUS_OPTIONS',
  // { // This is only required if I want to register the token globally, which is not the case this time.
  //   providedIn: 'root',
  //   factory: () => TaskStatusOptions
  // }
);

export const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions
};
