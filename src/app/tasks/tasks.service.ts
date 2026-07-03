import { Injectable, signal } from '@angular/core';
import  { AddTask, Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  public add(task: AddTask) {
    const newTask: Task = {
      id: uuidv4(),
      title: task.title,
      description: task.description,
      status: 'OPEN',
    };

    this.tasks.update((tasks) => [...tasks, newTask]);
  }
}
