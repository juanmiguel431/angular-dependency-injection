import { inject, Injectable, signal } from '@angular/core';
import { AddTask, Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { LoggingService } from '../services/logging.service';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks = signal<Task[]>([]);
  private _loggingService = inject(LoggingService);

  public get tasks() {
    return this._tasks.asReadonly();
  }

  public add(task: AddTask) {
    const newTask: Task = {
      id: uuidv4(),
      title: task.title,
      description: task.description,
      status: 'OPEN',
    };

    this._tasks.update((tasks) => [...tasks, newTask]);
    this._loggingService.log(`Task added: ${newTask.title}`);
  }

  public updateStatus(taskId: string, newStatus: TaskStatus) {
    this._tasks.update(tasks => {
      return tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      });
    });

    this._loggingService.log(`TaskId: ${taskId} - New status: ${newStatus}`);
  }
}
