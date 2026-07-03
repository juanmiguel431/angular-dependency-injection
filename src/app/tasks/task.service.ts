import { Injectable, signal } from '@angular/core';
import { AddTask, Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks = signal<Task[]>([]);

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
  }
}
