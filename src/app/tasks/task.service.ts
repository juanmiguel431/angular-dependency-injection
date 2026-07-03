import { Injectable, signal } from '@angular/core';
import  { AddTask, Task } from './task.model';
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
}
